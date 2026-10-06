import type { FieldErrors } from "./contactSchema";

export type SubmitResult =
  | { ok: true }
  | { ok: false; code: string; message: string; fieldErrors?: FieldErrors };

const unreachable =
  "Connexion impossible, vérifiez votre réseau puis réessayez ou appelez-nous.";
const unexpected = "Une erreur est survenue, réessayez ou appelez-nous.";

export async function submitContact(
  payload: Record<string, unknown>,
): Promise<SubmitResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { ok: true };
    }

    const body = (await response.json().catch(() => null)) as {
      code?: string;
      error?: string;
      fieldErrors?: FieldErrors;
    } | null;

    return {
      ok: false,
      code: body?.code ?? "UNKNOWN",
      message: body?.error ?? unexpected,
      fieldErrors: body?.fieldErrors,
    };
  } catch {
    return { ok: false, code: "NETWORK_ERROR", message: unreachable };
  }
}
