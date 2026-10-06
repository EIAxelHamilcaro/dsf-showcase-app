"use client";
import {
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  contactFieldsSchema,
  fieldErrorsOf,
} from "@/lib/contact/contactSchema";
import { submitContact } from "@/lib/contact/submitContact";
import { useTurnstile } from "./useTurnstile";

export type ContactErrors = Record<string, string>;

interface ContactSubmissionOptions {
  onFieldErrors?: (errors: ContactErrors) => void;
}

interface ContactSubmission {
  formRef: RefObject<HTMLFormElement | null>;
  errors: ContactErrors;
  formError: string;
  isPending: boolean;
  turnstileWidget: ReactNode;
  clearError: (field: string) => void;
  check: (values: object, extraErrors?: ContactErrors) => boolean;
  submit: (values: object, extraErrors?: ContactErrors) => Promise<boolean>;
}

const fieldsToCorrect = "Certains champs du formulaire sont à corriger.";
const verificationUnavailable =
  "La vérification anti-robot est indisponible, appelez-nous pour votre demande.";
const verificationPending =
  "La vérification anti-robot n'a pas abouti, patientez quelques secondes puis renvoyez votre demande, ou appelez-nous.";

export function useContactSubmission({
  onFieldErrors,
}: ContactSubmissionOptions = {}): ContactSubmission {
  const turnstile = useTurnstile();
  const formRef = useRef<HTMLFormElement>(null);
  const isSending = useRef(false);
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [formError, setFormError] = useState("");
  const [focusRequest, setFocusRequest] = useState(0);

  useEffect(() => {
    if (focusRequest === 0) {
      return;
    }

    formRef.current
      ?.querySelector<HTMLElement>('[aria-invalid="true"]')
      ?.focus();
  }, [focusRequest]);

  const reportFieldErrors = (fieldErrors: ContactErrors) => {
    setErrors(fieldErrors);
    setFormError(fieldsToCorrect);
    onFieldErrors?.(fieldErrors);
    setFocusRequest((request) => request + 1);
  };

  const clearError = (field: string) =>
    setErrors(({ [field]: _cleared, ...others }) => others);

  const check = (values: object, extraErrors: ContactErrors = {}) => {
    const parsed = contactFieldsSchema.safeParse(values);
    const fieldErrors = {
      ...(parsed.success ? {} : fieldErrorsOf(parsed.error)),
      ...extraErrors,
    };

    if (Object.keys(fieldErrors).length > 0) {
      reportFieldErrors(fieldErrors);
      return false;
    }

    setErrors({});
    setFormError("");
    return true;
  };

  const submit = async (values: object, extraErrors?: ContactErrors) => {
    if (
      isSending.current ||
      !check(values, extraErrors) ||
      !turnstile.isAvailable
    ) {
      return false;
    }

    isSending.current = true;
    setIsPending(true);

    const turnstileToken = await turnstile.getToken();
    const result = turnstileToken
      ? await submitContact({ ...values, turnstileToken })
      : undefined;

    isSending.current = false;
    setIsPending(false);

    if (!result) {
      setFormError(verificationPending);
      return false;
    }

    turnstile.reset();

    if (result.ok) {
      return true;
    }

    const { turnstileToken: tokenError, ...fieldErrors } =
      result.fieldErrors ?? {};

    if (Object.keys(fieldErrors).length > 0) {
      reportFieldErrors(fieldErrors);
      return false;
    }

    setFormError(tokenError ?? result.message);
    return false;
  };

  return {
    formRef,
    errors,
    formError: turnstile.isAvailable ? formError : verificationUnavailable,
    isPending,
    turnstileWidget: turnstile.widget,
    clearError,
    check,
    submit,
  };
}
