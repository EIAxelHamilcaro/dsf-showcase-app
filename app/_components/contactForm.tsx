"use client";
import { CircleCheck, Loader2 } from "lucide-react";
import { type ChangeEvent, type FormEvent, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { FormError, PhoneFallback } from "./contactFeedback";
import { ContactFields, emptyContact } from "./contactFields";
import { useContactSubmission } from "./useContactSubmission";

export interface ContactFormProps {
  phone?: string | null;
}

export function ContactForm({ phone }: ContactFormProps) {
  const id = useId();
  const [values, setValues] = useState(emptyContact);
  const [isSent, setIsSent] = useState(false);
  const { formRef, errors, formError, isPending, turnstileWidget, ...form } =
    useContactSubmission();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSent(await form.submit(values));
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setValues((previous) => ({ ...previous, [name]: value }));
    form.clearError(name);
  };

  const writeAnother = () => {
    setValues(emptyContact);
    setIsSent(false);
  };

  if (isSent) {
    return (
      <output
        className="notice grid justify-items-start gap-stack"
        data-tone="success"
        ref={(node) => node?.focus()}
        tabIndex={-1}
      >
        <CircleCheck aria-hidden="true" className="icon-mark" />
        <strong>Votre demande est envoyée.</strong>
        <span>
          Nous vous rappelons sous 24 heures pour préparer votre devis.
        </span>
        <Button onClick={writeAnother} type="button" variant="secondary">
          Envoyer une autre demande
        </Button>
      </output>
    );
  }

  return (
    <form
      className="grid gap-stack"
      noValidate
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <ContactFields
        errors={errors}
        id={id}
        onChange={handleChange}
        values={values}
      />

      {turnstileWidget}

      <FormError message={formError} />

      <Button
        aria-busy={isPending}
        className="w-full"
        disabled={isPending}
        size="lg"
        type="submit"
      >
        {isPending ? (
          <>
            <Loader2 aria-hidden="true" className="animate-spin" />
            Envoi en cours
          </>
        ) : (
          "Envoyer ma demande"
        )}
      </Button>

      <PhoneFallback phone={phone} />
    </form>
  );
}
