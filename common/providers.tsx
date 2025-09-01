import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
}
