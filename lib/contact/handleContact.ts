import {
  type ContactInput,
  contactSchema,
  type FieldErrors,
  fieldErrorsOf,
} from "./contactSchema";
import { describeError } from "./describeError";
import type { TurnstileOutcome } from "./turnstile";

export type Lead = Omit<ContactInput, "turnstileToken">;

export interface LeadMail {
  subject: string;
  text: string;
}

export interface ContactDeps {
  verifyToken: (token: string) => Promise<TurnstileOutcome>;
  saveLead: (lead: Lead) => Promise<number | string>;
  sendMail: (mail: LeadMail) => Promise<unknown>;
  logError: (message: string, context: Record<string, unknown>) => void;
}

export type ContactErrorCode =
  | "VALIDATION_FAILED"
  | "TURNSTILE_REJECTED"
  | "TURNSTILE_UNAVAILABLE"
  | "LEAD_SAVE_FAILED";

export type ContactResponse =
  | { success: true }
  | {
      success: false;
      code: ContactErrorCode;
      error: string;
      fieldErrors?: FieldErrors;
    };

export interface ContactResult {
  status: number;
  body: ContactResponse;
}

const accepted: ContactResult = { status: 200, body: { success: true } };

const refused = (
  status: number,
  code: ContactErrorCode,
  error: string,
): ContactResult => ({ status, body: { success: false, code, error } });

const leadMail = (lead: Lead): LeadMail => ({
  subject: `Nouveau contact : ${lead.name}`,
  text: [
    `Nom : ${lead.name}`,
    `Téléphone : ${lead.phone}`,
    `Email : ${lead.email}`,
    `Adresse : ${lead.adress}`,
    `Type : ${lead.step1 || "--"}`,
    `Logement : ${lead.step2 || "--"}`,
    `Type Salle de bain: ${lead.step3 || "--"}`,
    `Age: ${lead.step4 || "--"}`,
    "Message :",
    lead.message || "--",
  ].join("\n"),
});

export async function handleContact(
  raw: unknown,
  deps: ContactDeps,
): Promise<ContactResult> {
  if (typeof raw !== "object" || raw === null) {
    return refused(
      400,
      "VALIDATION_FAILED",
      "Votre demande n'a pas pu être lue, rechargez la page puis réessayez.",
    );
  }

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: 400,
      body: {
        success: false,
        code: "VALIDATION_FAILED",
        error: "Certains champs du formulaire sont à corriger.",
        fieldErrors: fieldErrorsOf(parsed.error),
      },
    };
  }

  const { turnstileToken, ...lead } = parsed.data;
  const outcome = await deps.verifyToken(turnstileToken);

  if (outcome === "rejected") {
    return refused(
      403,
      "TURNSTILE_REJECTED",
      "La vérification anti-robot a échoué, veuillez recommencer.",
    );
  }

  if (outcome === "unavailable") {
    return refused(
      503,
      "TURNSTILE_UNAVAILABLE",
      "La vérification anti-robot est momentanément indisponible, réessayez dans quelques minutes ou appelez-nous.",
    );
  }

  const leadId = await deps.saveLead(lead).catch((error: unknown) => {
    deps.logError("Lead could not be saved", describeError(error));

    return undefined;
  });

  const isEmailed = await deps.sendMail(leadMail(lead)).then(
    () => true,
    (error: unknown) => {
      deps.logError("Lead email could not be sent", {
        ...describeError(error),
        leadId,
      });

      return false;
    },
  );

  if (leadId === undefined && !isEmailed) {
    return refused(
      500,
      "LEAD_SAVE_FAILED",
      "Votre demande n'a pas pu être enregistrée, réessayez ou appelez-nous.",
    );
  }

  return accepted;
}
