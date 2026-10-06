import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { PageLink } from "@/lib/pages/pageLinks";
import { toTelHref } from "@/lib/seo/phone";
import type { Config1 } from "@/payload-types";

interface FooterLinksProps {
  heading: string;
  links: PageLink[];
}

function FooterLinks({ heading, links }: FooterLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <nav aria-label={heading}>
      <h3>{heading}</h3>
      <ul>
        {links.map((link) => (
          <li key={link.href}>
            <Link className="footer-link" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export interface FooterProps {
  config: Config1;
  serviceLinks: PageLink[];
  departmentLinks: PageLink[];
  cityLinks: PageLink[];
  legalLinks: PageLink[];
}

export function Footer({
  config,
  serviceLinks,
  departmentLinks,
  cityLinks,
  legalLinks,
}: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="grid gap-block sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="grid content-start gap-stack">
          <h2>{config.footer_section?.title}</h2>
          <p className="soft">{config.footer_section?.description}</p>
          <address>
            {config.phone ? (
              <a className="footer-link" href={toTelHref(config.phone)}>
                <Phone
                  aria-hidden="true"
                  className="icon-mark"
                  data-size="sm"
                />
                {config.phone}
              </a>
            ) : null}
            {config.email ? (
              <a className="footer-link" href={`mailto:${config.email}`}>
                <Mail aria-hidden="true" className="icon-mark" data-size="sm" />
                {config.email}
              </a>
            ) : null}
            <p className="flex min-h-target items-center gap-inline">
              <MapPin aria-hidden="true" className="icon-mark" data-size="sm" />
              {config.footer_section?.region}
            </p>
          </address>
        </div>

        <FooterLinks heading="Nos services" links={serviceLinks} />
        <FooterLinks heading="Départements" links={departmentLinks} />
        <FooterLinks heading="Villes" links={cityLinks} />
      </div>

      <div className="rule-top flex flex-wrap items-center justify-between gap-x-block">
        <p className="small soft">
          © {new Date().getFullYear()} Douche Senior France. Artisan français
          certifié, devis gratuit.
        </p>

        {legalLinks.length > 0 ? (
          <nav aria-label="Informations légales">
            <ul className="flex flex-wrap gap-x-block">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link className="footer-link small" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        <a
          className="footer-link small"
          href="https://axelhamilcaro.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Site conçu par Axel Hamilcaro, développeur web
        </a>
      </div>
    </footer>
  );
}
