import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toTelHref } from "@/lib/seo/phone";

export const inverseButtonClass =
  "bg-white text-primary hover:bg-primary hover:text-white border-white";

interface PhoneButtonProps {
  phone: string;
  label?: string | null;
}

export function PhoneButton({ phone, label }: PhoneButtonProps) {
  if (!phone.trim()) {
    return null;
  }

  return (
    <Button asChild className={inverseButtonClass} size="lg">
      <a href={toTelHref(phone)}>
        <Phone className="mr-2 h-5 w-5" />
        {label || phone}
      </a>
    </Button>
  );
}
