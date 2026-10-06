import {
  Accessibility,
  LayoutGrid,
  ShieldCheck,
  ShowerHead,
  Thermometer,
  Toilet,
} from "lucide-react";
import type { Config1 } from "@/payload-types";
import { NewTabHint } from "./newTabHint";
import { PageSection, SectionHeader } from "./pageSection";

export interface ServicesSectionProps {
  config: Config1;
}

export function ServicesSection({ config }: ServicesSectionProps) {
  const offer = config.services_section;
  const services = [
    {
      icon: ShowerHead,
      title: offer?.about_feature_1?.about_feature_title_1,
      description: offer?.about_feature_1?.about_feature_text_1,
    },
    {
      icon: ShieldCheck,
      title: offer?.about_feature_2?.about_feature_title_2,
      description: offer?.about_feature_2?.about_feature_text_2,
    },
    {
      icon: Accessibility,
      title: offer?.about_feature_3?.about_feature_title_3,
      description: offer?.about_feature_3?.about_feature_text_3,
    },
    {
      icon: Toilet,
      title: offer?.about_feature_4?.about_feature_title_4,
      description: offer?.about_feature_4?.about_feature_text_4,
    },
    {
      icon: LayoutGrid,
      title: offer?.about_feature_5?.about_feature_title_5,
      description: offer?.about_feature_5?.about_feature_text_5,
    },
    {
      icon: Thermometer,
      title: offer?.about_feature_6?.about_feature_title_6,
      description: offer?.about_feature_6?.about_feature_text_6,
    },
  ];

  const aids = [
    {
      href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F10752",
      tone: "primary",
      help: config.financial_section?.financial_help_1,
    },
    {
      href: "https://france-renov.gouv.fr/aides/maprimeadapt",
      tone: "success",
      help: config.financial_section?.financial_help_2,
    },
  ];

  return (
    <>
      <PageSection id="services">
        <SectionHeader
          heading="Nos services d'adaptation"
          intro="Chaque installation est personnalisée selon vos besoins. Nous utilisons uniquement des équipements certifiés et de qualité française."
        />

        <ul className="tile-wall sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description }) => (
            <li className="tile grid content-start gap-inline" key={title}>
              <Icon aria-hidden="true" className="icon-mark" />
              <h3>{title}</h3>
              <p className="soft">{description}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection id="aides" tone="tint">
        <SectionHeader
          heading={config.financial_section?.title}
          intro={config.financial_section?.description}
        />

        <ul className="tile-wall md:grid-cols-2">
          {aids.map(({ href, tone, help }) => (
            <li key={href}>
              <a
                className="tile flex h-full flex-wrap items-center gap-block"
                href={href}
                rel="noopener"
                target="_blank"
              >
                <span className="seal" data-tone={tone}>
                  {help?.icon_text}
                </span>
                <span className="grid flex-1 basis-56 gap-inline">
                  <strong className="flex items-center gap-inline">
                    <span className="tile-title">{help?.title}</span>
                    <NewTabHint />
                  </strong>
                  <span className="soft">{help?.description}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="lead">{config.financial_section?.sub_description}</p>
      </PageSection>
    </>
  );
}
