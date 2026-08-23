import type { Metadata } from "next";
import { cookies } from "next/headers";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminResetDevicesForm from "@/components/admin/AdminResetDevicesForm";
import AdminSendAccessForm from "@/components/admin/AdminSendAccessForm";
import { READER_BOOKS } from "@/lib/bookCatalog";
import { ADMIN_SESSION_COOKIE, readAdminSessionToken } from "@/lib/adminAuth";
import { isEbookStoreConfigured } from "@/lib/ebookStore";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  const session = readAdminSessionToken(cookies().get(ADMIN_SESSION_COOKIE)?.value);
  const isLoggedIn = session.ok;
  const emailConfigured = Boolean(
    process.env.EBOOK_EMAIL_PREVIEW === "true" ||
      (process.env.RESEND_API_KEY && process.env.EBOOK_FROM_EMAIL && isEbookStoreConfigured())
  );

  return (
    <main className="min-h-screen bg-rose/30 px-6 py-10">
      <div className="mx-auto max-w-3xl">
        {isLoggedIn ? (
          <>
            <AdminSendAccessForm books={READER_BOOKS} emailConfigured={emailConfigured} />
            <div className="mt-6">
              <AdminResetDevicesForm />
            </div>
          </>
        ) : (
          <div className="mx-auto max-w-md rounded-softer bg-cream-white p-8 shadow-soft">
            <p className="font-hand text-2xl text-lavender-dark mb-2">Deci na dar</p>
            <h1 className="font-serif text-3xl font-semibold text-brown mb-2">
              Admin panel
            </h1>
            <p className="font-sans text-sm text-brown-light mb-8">
              Prijava je potrebna za slanje pristupa kupcima.
            </p>
            <AdminLoginForm />
          </div>
        )}
      </div>
    </main>
  );
}
