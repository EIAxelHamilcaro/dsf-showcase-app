import { toTelHref } from "@/lib/seo/phone";

export const errorProps = (id: string, error: string | undefined) => ({
  id,
  "aria-invalid": Boolean(error),
  "aria-describedby": error ? `${id}-error` : undefined,
});

export function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) {
    return null;
  }

  return (
    <p className="text-base text-destructive mt-1" id={`${id}-error`}>
      {error}
    </p>
  );
}

export function PhoneFallback({ phone }: { phone?: string | null }) {
  if (!phone) {
    return null;
  }

  return (
    <p className="text-base">
      Vous pouvez aussi nous appeler au{" "}
      <a className="font-semibold underline" href={toTelHref(phone)}>
        {phone}
      </a>
      .
    </p>
  );
}

export function FormError({
  message,
  phone,
}: {
  message: string;
  phone?: string | null;
}) {
  if (!message) {
    return null;
  }

  return (
    <div
      className="p-3 bg-destructive/10 border border-destructive text-destructive rounded-md"
      role="alert"
    >
      <p>{message}</p>
      <PhoneFallback phone={phone} />
    </div>
  );
}
