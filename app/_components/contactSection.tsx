import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toTelHref } from "@/lib/seo/phone";
import type { Config1 } from "@/payload-types";
import { ContactForm } from "./contactForm";
import { PageSection, SectionHeader } from "./pageSection";

export interface ContactSectionProps {
  config: Config1;
}

export function ContactSection({ config }: ContactSectionProps) {
  const zone = config.form_section?.work_zone;
  const delays = config.form_section?.time_section;

  return (
    <PageSection id="contact" tone="tint">
      <SectionHeader
        heading="Demandez votre devis gratuit"
        intro="Intervention rapide dans votre région. Étude personnalisée de vos besoins."
      />

      <div className="grid items-start gap-grout lg:grid-cols-[3fr_2fr]">
        <Card>
          <h3>Écrivez-nous</h3>
          <ContactForm phone={config.phone} />
        </Card>

        <ul className="tile-wall">
          {config.phone ? (
            <li className="tile grid gap-inline" data-emphasis="strong">
              <Phone aria-hidden="true" className="icon-mark" />
              <h3>Appelez-nous directement</h3>
              <a className="link" data-size="lg" href={toTelHref(config.phone)}>
                {config.phone}
              </a>
              <p>{config.form_section?.disponibility}</p>
            </li>
          ) : null}

          <li className="tile grid gap-inline">
            <Mail aria-hidden="true" className="icon-mark" />
            <h3>Par e-mail</h3>
            <a className="link" href={`mailto:${config.email}`}>
              {config.email}
            </a>
            <p className="soft">Réponse sous 24 heures maximum</p>
          </li>

          <li className="tile grid gap-inline">
            <MapPin aria-hidden="true" className="icon-mark" />
            <h3>{zone?.title}</h3>
            <p className="soft">
              {zone?.region}
              <br />
              {zone?.radius}
            </p>
          </li>

          <li className="tile grid gap-inline">
            <Clock aria-hidden="true" className="icon-mark" />
            <h3>{delays?.title}</h3>
            <ul className="soft">
              <li>{delays?.list?.devis}</li>
              <li>{delays?.list?.travaux}</li>
              <li>{delays?.list?.total}</li>
            </ul>
          </li>
        </ul>
      </div>
    </PageSection>
  );
}
