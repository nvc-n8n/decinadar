import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { sendVerificationCodeEmail } from "@/lib/email";
import {
  clearVerificationCode,
  issueVerificationCode,
} from "@/lib/ebookStore";
import { readPendingEbookGrant } from "@/lib/ebookSession";

export const runtime = "nodejs";

export async function POST() {
  const pending = await readPendingEbookGrant(cookies());

  if (!pending.ok) {
    return NextResponse.json(
      { error: "Link nije važeći. Otvorite ponovo link iz emaila." },
      { status: 401 }
    );
  }

  const issued = await issueVerificationCode(pending.payload);

  if (!issued.ok) {
    const message =
      issued.reason === "cooldown"
        ? "Kod je već poslat. Sačekajte minut pre ponovnog slanja."
        : issued.reason === "hour-limit"
          ? "Previše zahteva za kod. Pokušajte ponovo za sat vremena."
          : "Pristup više nije aktivan. Zatražite novi link.";

    return NextResponse.json({ error: message }, { status: 429 });
  }

  const result = await sendVerificationCodeEmail({
    to: pending.payload.email,
    name: pending.payload.name,
    code: issued.code,
  });

  if (!result.ok) {
    await clearVerificationCode(pending.payload.grantId).catch(() => {});
    return NextResponse.json(
      { error: "Kod trenutno nije moguće poslati. Pokušajte ponovo." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, preview: result.preview });
}
