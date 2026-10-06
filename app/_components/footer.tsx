import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { PageLink } from "@/lib/pages/pageLinks";
import { toTelHref } from "@/lib/seo/phone";
import type { Config1 } from "@/payload-types";

interface FooterProps {
  config: Config1;
  legalLinks: PageLink[];
}

const contactLinkClass =
  "flex min-h-11 items-center gap-3 underline hover:no-underline";

export function Footer({ config, legalLinks }: FooterProps) {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-page px-gutter pt-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <h3 className="text-xl font-extrabold">
              {config?.footer_section?.title}
            </h3>
            <p className="max-w-reading text-background/80">
              {config?.footer_section?.description}
            </p>
          </div>

          <div>
            <h4 className="mb-2 text-lg font-bold">Contact</h4>
            {config?.phone ? (
              <a className={contactLinkClass} href={toTelHref(config.phone)}>
                <Phone aria-hidden="true" className="size-5 shrink-0" />
                <span>{config.phone}</span>
              </a>
            ) : null}
            <a className={contactLinkClass} href={`mailto:${config?.email}`}>
              <Mail aria-hidden="true" className="size-5 shrink-0" />
              <span className="break-all">{config?.email}</span>
            </a>
            <div className="flex min-h-11 items-center gap-3">
              <MapPin aria-hidden="true" className="size-5 shrink-0" />
              <span>{config?.footer_section?.region}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-2 border-t border-background/30 py-6 text-center text-small">
          <p className="text-background/80">
            ©{new Date().getFullYear()} Douche Senior France. Tous droits
            réservés. | Artisan français certifié | Devis gratuit
          </p>

          {legalLinks.length > 0 ? (
            <nav
              aria-label="Informations légales"
              className="flex flex-wrap justify-center gap-x-6"
            >
              {legalLinks.map((link) => (
                <Link
                  className="inline-flex min-h-11 items-center underline hover:no-underline"
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ) : null}

          <p className="text-background/80">
            Site conçu par{" "}
            <Link
              className="inline-flex min-h-11 items-center font-semibold underline hover:no-underline"
              href="https://axelhamilcaro.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Axel Hamilcaro - Developpeur Web
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
