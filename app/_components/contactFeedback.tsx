import { toTelHref } from "@/lib/seo/phone";

export const errorIdOf = (id: string) => `${id}-error`;

export const errorProps = (id: string, error: string | undefined) => ({
  id,
  "aria-invalid": Boolean(error),
  "aria-describedby": error ? errorIdOf(id) : undefined,
});

export interface FieldErrorProps {
  id: string;
  error?: string;
}

export function FieldError({ id, error }: FieldErrorProps) {
  if (!error) {
    return null;
  }

  return (
    <p className="field-error" id={errorIdOf(id)}>
      {error}
    </p>
  );
}

export interface PhoneFallbackProps {
  phone?: string | null;
}

export function PhoneFallback({ phone }: PhoneFallbackProps) {
  if (!phone) {
    return null;
  }

  return (
    <p>
      Vous préférez téléphoner ? Appelez-nous au{" "}
      <a className="link" href={toTelHref(phone)}>
        {phone}
      </a>
    </p>
  );
}

export interface FormErrorProps {
  message: string;
  phone?: string | null;
}

export function FormError({ message, phone }: FormErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="notice" data-tone="error" role="alert">
      <p>{message}</p>
      <PhoneFallback phone={phone} />
    </div>
  );
}
