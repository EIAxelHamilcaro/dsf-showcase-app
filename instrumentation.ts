export function register() {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  const missing = [
    process.env.TURNSTILE_SECRET_KEY ? undefined : "TURNSTILE_SECRET_KEY",
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
      ? undefined
      : "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  ].filter(Boolean);

  if (missing.length > 0) {
    // biome-ignore lint/suspicious/noConsole: server log read in the hosting dashboard
    console.error(
      `[contact] Turnstile is not configured (${missing.join(", ")} missing), the contact forms refuse every request`,
    );
  }
}
