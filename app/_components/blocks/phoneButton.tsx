import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toTelHref } from "@/lib/seo/phone";

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
      size="xl"
      variant={isOnPrimary ? "inverse" : "outlinePrimary"}
    >
      <a href={toTelHref(phone)}>
        <Phone aria-hidden="true" className="size-5" />
        {label || phone}
      </a>
    </Button>
  );
}
