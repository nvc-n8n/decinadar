import { formatBookList } from "./bookCatalog";

const DEFAULT_FROM = "Deci na dar <onboarding@resend.dev>";
const DEFAULT_REPLY_TO = "tamara.decinadar@gmail.com";

type SendAccessEmailInput = {
  to: string;
  name?: string;
  readerUrl: string;
  bookIds: string[];
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function getSiteUrl(request: Request) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (configured) return configured.replace(/\/$/, "");

  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost || request.headers.get("host") || "localhost:3000";
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const protocol = forwardedProto || (host.includes("localhost") ? "http" : "https");

  return `${protocol}://${host}`;
}

function buildAccessEmail({
  name,
  readerUrl,
  bookIds,
}: Omit<SendAccessEmailInput, "to">) {
  const greeting = name ? `Zdravo ${name}` : "Zdravo";
  const safeGreeting = escapeHtml(greeting);
  const safeUrl = escapeHtml(readerUrl);
  const safeBooks = escapeHtml(formatBookList(bookIds));

  const text = [
    `${greeting},`,
    "",
    "Tvoj Deci na dar materijal je spreman za čitanje.",
    `Materijali: ${formatBookList(bookIds)}.`,
    "Pristup nema vremensko ograničenje:",
    readerUrl,
    "",
    "Topao pozdrav,",
    "Tamara",
  ].join("\n");

  const html = `
    <div style="margin:0;padding:32px;background:#FAF4E3;font-family:Arial,sans-serif;color:#2D2A26;">
      <div style="max-width:600px;margin:0 auto;background:#FFFDF7;border-radius:22px;padding:34px;box-shadow:0 10px 36px rgba(45,42,38,0.08);">
        <p style="margin:0 0 12px;font-size:16px;line-height:1.6;">${safeGreeting},</p>
        <h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:32px;line-height:1.15;color:#2D2A26;">
          Tvoj Deci na dar materijal je spreman
        </h1>
        <p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#6B6560;">
          Hvala ti na poverenju. Klikom na dugme otvara se tvoj privatni panel za čitanje.
        </p>
        <div style="margin:0 0 24px;padding:16px 18px;background:#FAF4E3;border-radius:16px;color:#6B6560;font-size:15px;line-height:1.6;">
          <strong style="color:#2D2A26;">U panelu:</strong> ${safeBooks}
        </div>
        <a href="${safeUrl}" style="display:inline-block;background:#B1BFEB;color:#2D2A26;text-decoration:none;font-weight:700;border-radius:999px;padding:14px 24px;">
          Otvori panel za čitanje
        </a>
        <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#9A9490;">
          Pristup nema vremensko ograničenje. Ako dugme ne radi, kopiraj ovaj link u browser:<br />
          <span style="word-break:break-all;">${safeUrl}</span>
        </p>
        <p style="margin:24px 0 0;font-size:15px;line-height:1.6;color:#6B6560;">
          Topao pozdrav,<br />Tamara
        </p>
      </div>
    </div>
  `;

  return { html, text };
}

export async function sendAccessEmail(input: SendAccessEmailInput) {
  const { html, text } = buildAccessEmail(input);

  return sendTransactionalEmail({
    to: input.to,
    subject: "Tvoj Deci na dar materijal",
    html,
    text,
  });
}

type TransactionalEmailInput = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

async function sendTransactionalEmail({
  to,
  subject,
  html,
  text,
}: TransactionalEmailInput) {
  if (process.env.EBOOK_EMAIL_PREVIEW === "true") {
    return { ok: true, preview: true };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EBOOK_FROM_EMAIL || "";

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      return { ok: true, preview: true };
    }

    return { ok: false, error: "Nedostaje RESEND_API_KEY." };
  }

  if (!from && process.env.NODE_ENV === "production") {
    return { ok: false, error: "Nedostaje EBOOK_FROM_EMAIL sa verifikovanim domenom." };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: from || DEFAULT_FROM,
      to,
      reply_to: process.env.EBOOK_REPLY_TO || DEFAULT_REPLY_TO,
      subject,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    console.error("Resend access email failed:", details);

    return { ok: false, error: "Resend trenutno nije prihvatio email." };
  }

  return { ok: true, preview: false };
}

export async function sendVerificationCodeEmail({
  to,
  name,
  code,
}: {
  to: string;
  name?: string;
  code: string;
}) {
  const greeting = name ? `Zdravo ${escapeHtml(name)}` : "Zdravo";
  const html = `
    <div style="margin:0;padding:32px;background:#FAF4E3;font-family:Arial,sans-serif;color:#2D2A26;">
      <div style="max-width:520px;margin:0 auto;background:#FFFDF7;border-radius:22px;padding:34px;text-align:center;box-shadow:0 10px 36px rgba(45,42,38,0.08);">
        <p style="margin:0 0 12px;font-size:16px;line-height:1.6;">${greeting},</p>
        <h1 style="margin:0 0 14px;font-family:Georgia,serif;font-size:30px;line-height:1.15;">Kod za čitanje</h1>
        <p style="margin:0 0 22px;font-size:16px;line-height:1.7;color:#6B6560;">
          Unesi ovaj kod na stranici Deci na dar. Kod važi 10 minuta.
        </p>
        <div style="display:inline-block;margin:0 0 22px;padding:15px 24px;background:#E7EAF8;border-radius:16px;font-size:30px;font-weight:700;letter-spacing:8px;">
          ${code}
        </div>
        <p style="margin:0;font-size:13px;line-height:1.6;color:#9A9490;">
          Ako nisi pokušao/la da otvoriš materijal, ignoriši ovu poruku.
        </p>
      </div>
    </div>
  `;
  const text = [
    name ? `Zdravo ${name},` : "Zdravo,",
    "",
    `Tvoj kod za čitanje je: ${code}`,
    "Kod važi 10 minuta.",
    "",
    "Ako nisi pokušao/la da otvoriš materijal, ignoriši ovu poruku.",
  ].join("\n");

  return sendTransactionalEmail({
    to,
    subject: "Kod za pristup materijalu",
    html,
    text,
  });
}
