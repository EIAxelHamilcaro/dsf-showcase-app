import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toTelHref } from "@/lib/seo/phone";

export interface PhoneButtonProps {
  phone: string;
  label?: string | null;
}

export function PhoneButton({ phone, label }: PhoneButtonProps) {
  if (!phone.trim()) {
    return null;
  }

  return (
    <Button asChild size="lg" variant="outline">
      <a href={toTelHref(phone)}>
        <Phone aria-hidden="true" />
        {label || phone}
      </a>
    </Button>
  );
}
