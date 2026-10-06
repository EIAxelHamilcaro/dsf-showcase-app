"use client";
import { Check, Loader2 } from "lucide-react";
import { type ChangeEvent, type FormEvent, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  errorProps,
  FieldError,
  FormError,
  PhoneFallback,
} from "./contactFeedback";
import { useContactSubmission } from "./useContactSubmission";

const fieldClass = "mt-1 h-12 text-lg md:text-lg";

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  message: "",
  adress: "",
};

export function ContactForm({ phone }: { phone?: string | null }) {
  const id = useId();
  const [formData, setFormData] = useState(emptyForm);
  const [isSent, setIsSent] = useState(false);
  const { formRef, errors, formError, isPending, turnstileWidget, ...form } =
    useContactSubmission();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSent(await form.submit(formData));
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({ ...previous, [name]: value }));
    form.clearError(name);
  };

  if (isSent) {
    return (
      <output
        className="block text-center space-y-4 py-6 outline-none"
        ref={(node) => node?.focus()}
        tabIndex={-1}
      >
        <Check aria-hidden="true" className="mx-auto size-16 text-success" />
        <p className="text-2xl font-bold">Merci pour votre demande !</p>
        <p className="text-lg">Votre demande a bien été envoyée.</p>
      </output>
    );
  }

  return (
    <form
      className="space-y-4"
      noValidate
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div>
        <Label className="text-lg" htmlFor={`${id}-name`}>
          Nom complet *
        </Label>
        <Input
          {...errorProps(`${id}-name`, errors.name)}
          autoComplete="name"
          className={fieldClass}
          name="name"
          onChange={handleChange}
          placeholder="Votre nom et prénom"
          required
          value={formData.name}
        />
        <FieldError error={errors.name} id={`${id}-name`} />
      </div>

      <div>
        <Label className="text-lg" htmlFor={`${id}-phone`}>
          Téléphone *
        </Label>
        <Input
          {...errorProps(`${id}-phone`, errors.phone)}
          autoComplete="tel"
          className={fieldClass}
          inputMode="tel"
          name="phone"
          onChange={handleChange}
          placeholder="01 23 45 67 89"
          required
          type="tel"
          value={formData.phone}
        />
        <FieldError error={errors.phone} id={`${id}-phone`} />
      </div>

      <div>
        <Label className="text-lg" htmlFor={`${id}-email`}>
          Email *
        </Label>
        <Input
          {...errorProps(`${id}-email`, errors.email)}
          autoComplete="email"
          className={fieldClass}
          inputMode="email"
          name="email"
          onChange={handleChange}
          placeholder="votre@email.fr"
          required
          type="email"
          value={formData.email}
        />
        <FieldError error={errors.email} id={`${id}-email`} />
      </div>

      <div>
        <Label className="text-lg" htmlFor={`${id}-adress`}>
          Adresse *
        </Label>
        <Input
          {...errorProps(`${id}-adress`, errors.adress)}
          autoComplete="street-address"
          className={fieldClass}
          name="adress"
          onChange={handleChange}
          placeholder="Votre adresse complète"
          required
          value={formData.adress}
        />
        <FieldError error={errors.adress} id={`${id}-adress`} />
      </div>

      <div>
        <Label className="text-lg" htmlFor={`${id}-message`}>
          Message (optionnel)
        </Label>
        <Textarea
          {...errorProps(`${id}-message`, errors.message)}
          className="mt-1 min-h-32 text-lg md:text-lg"
          name="message"
          onChange={handleChange}
          placeholder="Décrivez votre projet..."
          value={formData.message}
        />
        <FieldError error={errors.message} id={`${id}-message`} />
      </div>

      {turnstileWidget}

      <FormError message={formError} />

      <Button
        aria-busy={isPending}
        className="h-14 w-full text-xl font-bold"
        disabled={isPending}
        size="lg"
        type="submit"
      >
        {isPending ? (
          <>
            <Loader2 aria-hidden="true" className="size-5 animate-spin" />
            Envoi en cours...
          </>
        ) : (
          "Envoyer ma demande"
        )}
      </Button>

      <PhoneFallback phone={phone} />
    </form>
  );
}
