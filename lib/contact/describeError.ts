export interface ErrorSummary {
  [key: string]: unknown;
  errorName: string;
  errorCode?: string | number;
}

const codeOf = (value: unknown): string | number | undefined => {
  if (typeof value !== "object" || value === null) {
    return undefined;
  }

  const { code } = value as { code?: unknown };

  return typeof code === "string" || typeof code === "number"
    ? code
    : undefined;
};

export function describeError(error: unknown): ErrorSummary {
  const cause = error instanceof Error ? error.cause : undefined;

  return {
    errorName: error instanceof Error ? error.name : typeof error,
    errorCode: codeOf(error) ?? codeOf(cause),
  };
}
