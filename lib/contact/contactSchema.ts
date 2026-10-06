import { z } from "zod";

export const phonePattern = /^(?=(?:\D*\d){10,15}\D*$)\+?[\d\s().-]+$/;

const invalidValue = "Cette valeur n'est pas valide";

const optionalText = (max: number, tooLong: string) =>
  z
    .string({ error: invalidValue })
    .trim()
    .max(max, { error: tooLong })
    .optional();

const optionalFlag = z.boolean({ error: invalidValue }).optional();

const answer = optionalText(200, "Cette réponse est trop longue");

export const contactFieldsSchema = z.object({
  name: z
    .string({ error: "Le nom est requis" })
    .trim()
    .min(1, { error: "Le nom est requis" })
    .max(120, { error: "Le nom est trop long (120 caractères maximum)" }),
  phone: z
    .string({ error: "Le téléphone est requis" })
    .trim()
    .min(1, { error: "Le téléphone est requis" })
    .regex(phonePattern, { error: "Le format du téléphone est invalide" }),
  email: z
    .string({ error: "L'email est requis" })
    .trim()
    .min(1, { error: "L'email est requis" })
    .max(254, { error: "Le format de l'email est invalide" })
    .refine((value) => z.email().safeParse(value).success, {
      error: "Le format de l'email est invalide",
    }),
  adress: z
    .string({ error: "L'adresse est requise" })
    .trim()
    .min(1, { error: "L'adresse est requise" })
    .max(300, { error: "L'adresse est trop longue (300 caractères maximum)" }),
  message: optionalText(
    2000,
    "Le message est trop long (2000 caractères maximum)",
  ),
  step1: answer,
  step2: answer,
  step3: answer,
  step4: answer,
  consentMain: optionalFlag,
  consentPartners: optionalFlag,
  website: z.string({ error: invalidValue }).optional(),
});

export const contactSchema = contactFieldsSchema.extend({
  turnstileToken: z
    .string({ error: "Veuillez valider la vérification anti-robot" })
    .min(1, { error: "Veuillez valider la vérification anti-robot" }),
});

export type ContactFields = z.infer<typeof contactFieldsSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export function fieldErrorsOf(error: z.ZodError): FieldErrors {
  const errors: Record<string, string> = {};

  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? "form");

    errors[field] ??= issue.message;
  }

  return errors;
}
