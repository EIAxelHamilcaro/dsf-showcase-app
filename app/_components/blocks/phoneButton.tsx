import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toTelHref } from "@/lib/seo/phone";

const largeActionClass =
  "h-auto min-h-14 shrink px-6 py-2 text-lg font-bold whitespace-normal text-center border-2";

export const primaryActionClass = `${largeActionClass} border-primary`;

export const outlineActionClass = `${largeActionClass} border-primary bg-white text-primary hover:bg-primary hover:text-white`;

export const inverseButtonClass = `${largeActionClass} border-white bg-white text-primary hover:bg-primary hover:text-white`;

export interface PhoneButtonProps {
  phone: string;
  label?: string | null;
  isOnPrimary?: boolean;
}

export function PhoneButton({
  phone,
  label,
  isOnPrimary = false,
}: PhoneButtonProps) {
  if (!phone.trim()) {
    return null;
  }

  return (
    <Button
      asChild
      className={isOnPrimary ? inverseButtonClass : outlineActionClass}
      size="lg"
    >
      <a href={toTelHref(phone)}>
        <Phone aria-hidden="true" className="size-5" />
        {label || phone}
      </a>
    </Button>
  );
}
