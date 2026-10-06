export function toE164(phone: string | null | undefined): string | undefined {
  const compact = (phone ?? "").replace(/[^\d+]/g, "");

  if (/^\+\d{8,15}$/.test(compact)) {
    return compact;
  }

  if (/^0033\d{9}$/.test(compact)) {
    return `+${compact.slice(2)}`;
  }

  if (/^0\d{9}$/.test(compact)) {
    return `+33${compact.slice(1)}`;
  }

  return undefined;
}

export function toTelHref(phone: string): string {
  return `tel:${toE164(phone) ?? phone.replace(/\s/g, "")}`;
}
