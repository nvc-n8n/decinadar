import nextEnv from "@next/env";
import { Redis } from "@upstash/redis";

nextEnv.loadEnvConfig(process.cwd());

const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

if (!url || !token) {
  throw new Error("Redis environment variables are missing");
}

const redis = new Redis({ url, token });
const key = `ebook:health:${Date.now()}`;

await redis.set(key, "ok", { ex: 30 });
const value = await redis.get(key);
await redis.del(key);

if (value !== "ok") {
  throw new Error("Redis read/write check failed");
}

console.log("Redis OK");
