"use client";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { isTestKey, testSiteKey } from "@/lib/contact/turnstileKeys";

const tokenWaitInMs = 10_000;
const flexibleWidgetQuery = "(min-width: 22.5rem)";
const isDeployed = Boolean(process.env.NEXT_PUBLIC_VERCEL_ENV);
const configuredSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const fallbackSiteKey =
  process.env.NODE_ENV === "production" || isDeployed ? undefined : testSiteKey;

const siteKey =
  isDeployed && isTestKey(configuredSiteKey)
    ? undefined
    : configuredSiteKey || fallbackSiteKey;

interface TurnstileState {
  getToken: () => Promise<string | undefined>;
  reset: () => void;
  widget: ReactNode;
  isAvailable: boolean;
}

type TokenListener = (token: string | undefined) => void;

export function useTurnstile(): TurnstileState {
  const instance = useRef<TurnstileInstance>(null);
  const token = useRef<string>(undefined);
  const listeners = useRef<TokenListener[]>([]);
  const [hasFailed, setHasFailed] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    setIsCompact(!window.matchMedia(flexibleWidgetQuery).matches);
  }, []);

  const publish = useCallback((received: string | undefined) => {
    token.current = received;

    for (const listener of listeners.current.splice(0)) {
      listener(received);
    }
  }, []);

  const expire = useCallback(() => {
    token.current = undefined;
  }, []);

  const reset = useCallback(() => {
    token.current = undefined;
    instance.current?.reset();
  }, []);

  const fail = useCallback(() => {
    publish(undefined);
    setHasFailed(true);
  }, [publish]);

  const succeed = useCallback(
    (received: string) => {
      publish(received);
      setHasFailed(false);
    },
    [publish],
  );

  const getToken = useCallback(
    () =>
      new Promise<string | undefined>((resolve) => {
        if (token.current) {
          resolve(token.current);
          return;
        }

        listeners.current.push(resolve);
        setTimeout(() => resolve(undefined), tokenWaitInMs);
      }),
    [],
  );

  const widget = siteKey ? (
    <Turnstile
      onError={fail}
      onExpire={expire}
      onSuccess={succeed}
      onUnsupported={fail}
      options={{ language: "fr", size: isCompact ? "compact" : "flexible" }}
      ref={instance}
      scriptOptions={{ onError: fail }}
      siteKey={siteKey}
    />
  ) : null;

  return {
    getToken,
    reset,
    widget,
    isAvailable: siteKey !== undefined && !hasFailed,
  };
}
