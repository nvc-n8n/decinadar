import {
  createHash,
  createHmac,
  randomBytes,
  randomInt,
  timingSafeEqual,
} from "crypto";
import { Redis } from "@upstash/redis";
import type { EbookAccessPayload } from "./ebookAccess";
import {
  getEbookAccessSecret,
  getTokenMaxAge,
  isPermanentEbookAccess,
  normalizeEmail,
} from "./ebookAccess";

const MAX_DEVICES = 2;
const OTP_TTL_SECONDS = 10 * 60;
const OTP_COOLDOWN_SECONDS = 60;
const OTP_MAX_PER_HOUR = 5;
const OTP_MAX_ATTEMPTS = 5;

type StoredGrant = {
  grantId: string;
  email: string;
  name?: string;
  books: string[];
  exp: number;
};

type StoredOtp = {
  hash: string;
  attempts: number;
};

type OtpIssueResult =
  | { ok: true; code: string }
  | { ok: false; reason: "cooldown" | "hour-limit" | "revoked" };

type OtpVerifyResult =
  | { ok: true; deviceToken: string }
  | {
      ok: false;
      reason: "invalid" | "expired" | "too-many-attempts" | "device-limit" | "revoked";
    };

let redisClient: Redis | null = null;

function getRedis() {
  if (redisClient) return redisClient;

  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error("Missing Upstash Redis configuration");
  }

  redisClient = new Redis({ url, token });
  return redisClient;
}

function emailKey(email: string) {
  return createHash("sha256").update(normalizeEmail(email)).digest("hex");
}

function grantKey(grantId: string) {
  return `ebook:grant:${grantId}`;
}

function activeGrantKey(email: string) {
  return `ebook:active:${emailKey(email)}`;
}

function devicesKey(grantId: string) {
  return `ebook:devices:${grantId}`;
}

function otpKey(grantId: string) {
  return `ebook:otp:${grantId}`;
}

function otpCooldownKey(grantId: string) {
  return `ebook:otp-cooldown:${grantId}`;
}

function otpHourKey(grantId: string) {
  return `ebook:otp-hour:${grantId}`;
}

function secretHash(value: string) {
  return createHmac("sha256", getEbookAccessSecret()).update(value).digest("hex");
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

function storedGrantMatches(payload: EbookAccessPayload, grant: StoredGrant | null) {
  return Boolean(
    grant &&
      grant.grantId === payload.grantId &&
      grant.email === payload.email &&
      grant.exp === payload.exp &&
      (grant.exp === 0 || grant.exp >= Math.floor(Date.now() / 1000))
  );
}

function getGrantTtl(payload: EbookAccessPayload) {
  return isPermanentEbookAccess(payload) ? null : getTokenMaxAge(payload);
}

export function isEbookStoreConfigured() {
  return Boolean(
    (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) &&
      (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN)
  );
}

export async function stageAccessGrant(payload: EbookAccessPayload) {
  const ttl = getGrantTtl(payload);
  if (ttl === 0) throw new Error("Grant already expired");

  const grant: StoredGrant = {
    grantId: payload.grantId,
    email: payload.email,
    name: payload.name,
    books: payload.books,
    exp: payload.exp,
  };

  if (ttl === null) {
    await getRedis().set(grantKey(payload.grantId), grant);
  } else {
    await getRedis().set(grantKey(payload.grantId), grant, { ex: ttl });
  }
}

export async function activateAccessGrant(payload: EbookAccessPayload) {
  const redis = getRedis();
  const ttl = getGrantTtl(payload);
  if (ttl === 0) throw new Error("Grant already expired");

  const activeKey = activeGrantKey(payload.email);
  const previousGrantId = await redis.get<string>(activeKey);
  const transaction = redis.multi();

  if (ttl === null) {
    transaction.set(activeKey, payload.grantId);
  } else {
    transaction.set(activeKey, payload.grantId, { ex: ttl });
  }

  if (previousGrantId && previousGrantId !== payload.grantId) {
    transaction.del(
      grantKey(previousGrantId),
      devicesKey(previousGrantId),
      otpKey(previousGrantId),
      otpCooldownKey(previousGrantId),
      otpHourKey(previousGrantId)
    );
  }

  await transaction.exec();
}

export async function removeStagedGrant(grantId: string) {
  await getRedis().del(grantKey(grantId));
}

export async function isActiveGrant(payload: EbookAccessPayload) {
  const redis = getRedis();
  const [grant, activeGrantId] = await Promise.all([
    redis.get<StoredGrant>(grantKey(payload.grantId)),
    redis.get<string>(activeGrantKey(payload.email)),
  ]);

  return activeGrantId === payload.grantId && storedGrantMatches(payload, grant);
}

export async function issueVerificationCode(payload: EbookAccessPayload): Promise<OtpIssueResult> {
  if (!(await isActiveGrant(payload))) return { ok: false, reason: "revoked" };

  const redis = getRedis();
  const cooldown = await redis.set(otpCooldownKey(payload.grantId), "1", {
    nx: true,
    ex: OTP_COOLDOWN_SECONDS,
  });

  if (!cooldown) return { ok: false, reason: "cooldown" };

  const hourKey = otpHourKey(payload.grantId);
  const sentThisHour = await redis.incr(hourKey);
  if (sentThisHour === 1) await redis.expire(hourKey, 60 * 60);
  if (sentThisHour > OTP_MAX_PER_HOUR) return { ok: false, reason: "hour-limit" };

  const code = String(randomInt(100000, 1000000));
  const otp: StoredOtp = {
    hash: secretHash(`${payload.grantId}:${code}`),
    attempts: 0,
  };

  await redis.set(otpKey(payload.grantId), otp, { ex: OTP_TTL_SECONDS });
  return { ok: true, code };
}

export async function clearVerificationCode(grantId: string) {
  await getRedis().del(otpKey(grantId));
}

export async function verifyCodeAndRegisterDevice(
  payload: EbookAccessPayload,
  code: string
): Promise<OtpVerifyResult> {
  if (!(await isActiveGrant(payload))) return { ok: false, reason: "revoked" };

  const redis = getRedis();
  const key = otpKey(payload.grantId);
  const otp = await redis.get<StoredOtp>(key);

  if (!otp) return { ok: false, reason: "expired" };
  if (otp.attempts >= OTP_MAX_ATTEMPTS) {
    return { ok: false, reason: "too-many-attempts" };
  }

  const expected = secretHash(`${payload.grantId}:${code}`);
  if (!safeEqual(otp.hash, expected)) {
    const attempts = otp.attempts + 1;
    const ttl = await redis.ttl(key);

    if (ttl > 0) {
      await redis.set(key, { ...otp, attempts }, { ex: ttl });
    }

    return {
      ok: false,
      reason: attempts >= OTP_MAX_ATTEMPTS ? "too-many-attempts" : "invalid",
    };
  }

  const deviceToken = randomBytes(32).toString("base64url");
  const deviceHash = secretHash(`device:${deviceToken}`);
  const ttl = getGrantTtl(payload);
  const registered = await redis.eval<[string, string, string, string], number>(
    `
      local current = redis.call("ZSCORE", KEYS[1], ARGV[1])
      if current then
        redis.call("ZADD", KEYS[1], ARGV[2], ARGV[1])
        if tonumber(ARGV[4]) > 0 then
          redis.call("EXPIRE", KEYS[1], ARGV[4])
        end
        return 1
      end

      local count = redis.call("ZCARD", KEYS[1])
      if count >= tonumber(ARGV[3]) then
        return 0
      end

      redis.call("ZADD", KEYS[1], ARGV[2], ARGV[1])
      if tonumber(ARGV[4]) > 0 then
        redis.call("EXPIRE", KEYS[1], ARGV[4])
      end
      return 1
    `,
    [devicesKey(payload.grantId)],
    [deviceHash, String(Date.now()), String(MAX_DEVICES), String(ttl || 0)]
  );

  if (!registered) return { ok: false, reason: "device-limit" };

  await redis.del(key);
  return { ok: true, deviceToken };
}

export async function isDeviceAuthorized(payload: EbookAccessPayload, deviceToken: string) {
  if (!deviceToken || !(await isActiveGrant(payload))) return false;

  const redis = getRedis();
  const deviceHash = secretHash(`device:${deviceToken}`);
  const score = await redis.zscore(devicesKey(payload.grantId), deviceHash);

  if (score === null) return false;

  await redis.zadd(devicesKey(payload.grantId), {
    score: Date.now(),
    member: deviceHash,
  });
  return true;
}

export async function revokeDevice(payload: EbookAccessPayload, deviceToken: string) {
  if (!deviceToken) return;
  const deviceHash = secretHash(`device:${deviceToken}`);
  await getRedis().zrem(devicesKey(payload.grantId), deviceHash);
}

export async function resetDevicesForEmail(email: string) {
  const redis = getRedis();
  const grantId = await redis.get<string>(activeGrantKey(email));
  if (!grantId) return false;

  await redis.del(
    devicesKey(grantId),
    otpKey(grantId),
    otpCooldownKey(grantId),
    otpHourKey(grantId)
  );
  return true;
}

export function maskEmail(email: string) {
  const [local, domain] = normalizeEmail(email).split("@");
  if (!local || !domain) return email;
  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}${"*".repeat(Math.max(2, local.length - visible.length))}@${domain}`;
}

export const EBOOK_MAX_DEVICES = MAX_DEVICES;
