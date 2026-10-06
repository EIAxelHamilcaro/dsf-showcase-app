import type { ChangeEvent, HTMLInputTypeAttribute } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { errorIdOf, FieldError } from "./contactFeedback";
import type { ContactErrors } from "./useContactSubmission";

type FieldChange = (
  event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => void;

const describedBy = (id: string, hint?: string, error?: string) =>
  [hint ? `${id}-hint` : null, error ? errorIdOf(id) : null]
    .filter(Boolean)
    .join(" ") || undefined;

export interface TextFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: FieldChange;
  hint?: string;
  error?: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email";
}

export function TextField({
  id,
  name,
  label,
  value,
  onChange,
  hint,
  error,
  type = "text",
  autoComplete,
  inputMode,
}: TextFieldProps) {
  return (
    <div className="field">
      <Label htmlFor={id}>{label}</Label>
      {hint ? (
        <p className="field-hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
      <Input
        aria-describedby={describedBy(id, hint, error)}
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        id={id}
        inputMode={inputMode}
        name={name}
        onChange={onChange}
        required
        type={type}
        value={value}
      />
      <FieldError error={error} id={id} />
    </div>
  );
}

export interface ContactValues {
  name: string;
  phone: string;
  email: string;
  adress: string;
  message?: string;
}

export const emptyContact: ContactValues = {
  name: "",
  phone: "",
  email: "",
  adress: "",
  message: "",
};

export interface ContactFieldsProps {
  id: string;
  values: ContactValues;
  errors: ContactErrors;
  onChange: FieldChange;
}

export function ContactFields({
  id,
  values,
  errors,
  onChange,
}: ContactFieldsProps) {
  const messageId = `${id}-message`;
  const messageHint =
    "Facultatif. Décrivez votre salle de bain ou votre besoin.";

  return (
    <>
      <p className="field-hint">
        Tous les champs sont obligatoires, sauf le message.
      </p>
      <TextField
        autoComplete="name"
        error={errors.name}
        id={`${id}-name`}
        label="Nom et prénom"
        name="name"
        onChange={onChange}
        value={values.name}
      />
      <TextField
        autoComplete="tel"
        error={errors.phone}
        hint="Exemple : 02 54 00 00 00"
        id={`${id}-phone`}
        inputMode="tel"
        label="Téléphone"
        name="phone"
        onChange={onChange}
        type="tel"
        value={values.phone}
      />
      <TextField
        autoComplete="email"
        error={errors.email}
        hint="Exemple : prenom.nom@orange.fr"
        id={`${id}-email`}
        inputMode="email"
        label="Adresse e-mail"
        name="email"
        onChange={onChange}
        type="email"
        value={values.email}
      />
      <TextField
        autoComplete="address-level2"
        error={errors.adress}
        hint="La ville et le code postal suffisent."
        id={`${id}-adress`}
        label="Adresse du logement"
        name="adress"
        onChange={onChange}
        value={values.adress}
      />
      <div className="field">
        <Label htmlFor={messageId}>Votre message</Label>
        <p className="field-hint" id={`${messageId}-hint`}>
          {messageHint}
        </p>
        <Textarea
          aria-describedby={describedBy(messageId, messageHint, errors.message)}
          aria-invalid={Boolean(errors.message)}
          id={messageId}
          name="message"
          onChange={onChange}
          value={values.message ?? ""}
        />
        <FieldError error={errors.message} id={messageId} />
      </div>
    </>
  );
}
