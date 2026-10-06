import {
  Accessibility,
  Lightbulb,
  Shield,
  Flower as Shower,
  Thermometer,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Config1 } from "@/payload-types";
import { PageSection, sectionLeadClass } from "./pageSection";

const aidBadgeClass =
  "mx-auto mb-3 flex size-28 items-center justify-center rounded-full text-xl font-extrabold text-white";

export function ServicesSection({ config }: { config: Config1 }) {
  const services = [
    {
      icon: Shower,
      title: config.services_section?.about_feature_1?.about_feature_title_1,
      description:
        config.services_section?.about_feature_1?.about_feature_text_1,
    },
    {
      icon: Shield,
      title: config.services_section?.about_feature_2?.about_feature_title_2,
      description:
        config.services_section?.about_feature_2?.about_feature_text_2,
    },
    {
      icon: Accessibility,
      title: config.services_section?.about_feature_3?.about_feature_title_3,
      description:
        config.services_section?.about_feature_3?.about_feature_text_3,
    },
    {
      icon: Wrench,
      title: config.services_section?.about_feature_4?.about_feature_title_4,
      description:
        config.services_section?.about_feature_4?.about_feature_text_4,
    },
    {
      icon: Lightbulb,
      title: config.services_section?.about_feature_5?.about_feature_title_5,
      description:
        config.services_section?.about_feature_5?.about_feature_text_5,
    },
    {
      icon: Thermometer,
      title: config.services_section?.about_feature_6?.about_feature_title_6,
      description:
        config.services_section?.about_feature_6?.about_feature_text_6,
    },
  ];

  const aids = [
    {
      href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F10752",
      badgeClass: "bg-primary",
      help: config.financial_section?.financial_help_1,
    },
    {
      href: "https://france-renov.gouv.fr/aides/maprimeadapt",
      badgeClass: "bg-success",
      help: config.financial_section?.financial_help_2,
    },
  ];

  return (
    <PageSection id="services">
      <div className="mb-10 space-y-4 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Nos services d'adaptation
        </h2>
        <p className={cn(sectionLeadClass, "mx-auto max-w-3xl")}>
          Chaque installation est personnalisée selon vos besoins spécifiques.
          Nous utilisons uniquement des équipements certifiés et de qualité
          française.
        </p>
      </div>

      <div className="mb-section grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card className="gap-4 shadow-none" key={service.title}>
            <CardHeader className="flex items-center gap-4">
              <service.icon
                aria-hidden="true"
                className="size-9 shrink-0 text-primary"
              />
              <CardTitle className="text-xl leading-snug">
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-8 rounded-xl bg-surface-tint p-6 md:p-10">
        <div className="space-y-4 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            {config.financial_section?.title}
          </h3>
          <p className="mx-auto max-w-reading text-lg">
            {config.financial_section?.description}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {aids.map(({ href, badgeClass, help }) => (
            <div className="max-w-xs min-w-56 flex-1 text-center" key={href}>
              <Link
                className="group block rounded-lg"
                href={href}
                rel="noopener"
                target="_blank"
              >
                <div className={cn(aidBadgeClass, badgeClass)}>
                  {help?.icon_text}
                </div>
                <h4 className="mb-2 text-lg font-bold text-primary underline group-hover:no-underline">
                  {help?.title}
                </h4>
                <p className="text-muted-foreground">{help?.description}</p>
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-lg md:text-xl">
          {config.financial_section?.sub_description}
        </p>
      </div>
    </PageSection>
  );
}
