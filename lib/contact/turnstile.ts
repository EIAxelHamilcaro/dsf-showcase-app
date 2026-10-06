import { describeError } from "./describeError";
import { isTestKey, testSecretKey } from "./turnstileKeys";

export type TurnstileOutcome = "valid" | "rejected" | "unavailable";

export interface VerifyTurnstileInput {
  token: string;
  secret: string | undefined;
  siteKey: string | undefined;
  isProduction: boolean;
  isDeployed: boolean;
  remoteIp?: string;
  fetchFn?: typeof fetch;
  logError: (message: string, context: Record<string, unknown>) => void;
}

const siteverifyUrl =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile({
  token,
  secret,
  siteKey,
  isProduction,
  isDeployed,
  remoteIp,
  fetchFn = fetch,
  logError,
}: VerifyTurnstileInput): Promise<TurnstileOutcome> {
  const isConfigured = Boolean(secret && siteKey);

  if (!isConfigured && (isProduction || isDeployed)) {
    logError("Turnstile is not configured, every request is refused", {
      hasSecretKey: Boolean(secret),
      hasSiteKey: Boolean(siteKey),
    });

    return "unavailable";
  }

  if (isDeployed && (isTestKey(secret) || isTestKey(siteKey))) {
    logError(
      "Turnstile runs on Cloudflare test keys on a deployed environment, every request is refused",
      {
        isTestSecretKey: isTestKey(secret),
        isTestSiteKey: isTestKey(siteKey),
      },
    );

    return "unavailable";
  }

  const body = new URLSearchParams({
    secret: isConfigured && secret ? secret : testSecretKey,
    response: token,
  });

  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  try {
    const response = await fetchFn(siteverifyUrl, {
      method: "POST",
      body,
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      logError("Turnstile verification answered an error", {
        status: response.status,
      });

      return "unavailable";
    }

    const result = (await response.json()) as { success?: boolean };

    return result.success === true ? "valid" : "rejected";
  } catch (error) {
    logError(
      "Turnstile verification could not be reached",
      describeError(error),
    );

    return "unavailable";
  }
}
