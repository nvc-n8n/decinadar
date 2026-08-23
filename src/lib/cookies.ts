export function shouldUseSecureCookie(request?: Request) {
  if (process.env.NODE_ENV !== "production") return false;
  if (!request) return true;

  const host = new URL(request.url).hostname;
  return host !== "localhost" && host !== "127.0.0.1" && host !== "::1";
}
