"use client";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { type ReactNode, useCallback, useRef, useState } from "react";
import { testSiteKey } from "@/lib/contact/turnstileKeys";

const siteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
  (process.env.NODE_ENV === "production" ? undefined : testSiteKey);

interface TurnstileState {
  token: string | undefined;
  reset: () => void;
  widget: ReactNode;
  isAvailable: boolean;
}

export function useTurnstile(): TurnstileState {
  const instance = useRef<TurnstileInstance>(null);
  const [token, setToken] = useState<string>();

  const reset = useCallback(() => {
    setToken(undefined);
    instance.current?.reset();
  }, []);

  const widget = siteKey ? (
    <Turnstile
      onError={() => setToken(undefined)}
      onExpire={() => setToken(undefined)}
      onSuccess={setToken}
      options={{ language: "fr", size: "flexible" }}
      ref={instance}
      siteKey={siteKey}
    />
  ) : null;

  return { token, reset, widget, isAvailable: siteKey !== undefined };
}
