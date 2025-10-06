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
import type { Config1, Media } from "@/payload-types";

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

  return (
    <section
      className="py-16 lg:py-24 bg-background px-10 lg:px-32 mx-auto"
      id="services"
    >
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-foreground mb-4 text-balance">
          Nos services d'adaptation
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
          Chaque installation est personnalisée selon vos besoins spécifiques.
          Nous utilisons uniquement des équipements certifiés et de qualité
          française.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {services.map((service, index) => (
          <Card
            className="hover:shadow-lg transition-shadow"
            key={`service_${index.toString()}`}
          >
            <CardHeader className="flex items-center gap-6">
              <service.icon className="text-primary" size={40} />
              <CardTitle className="text-xl">{service.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-primary/5 rounded-lg p-8 lg:p-12">
        <div className="text-center mb-8">
          <h3 className="text-3xl lg:text-3xl font-bold mb-4">
            {config.financial_section?.title}
          </h3>
          <p className="max-w-2xl mx-auto text-lg">
            {config.financial_section?.description}
          </p>
        </div>

        <div className="flex justify-center gap-6">
          <div className="text-center">
            <Link
              className="group block transition-transform duration-200 hover:-translate-y-1"
              href={
                (config.financial_section?.financial_help_1?.impot_pdf as Media)
                  ?.url || ""
              }
              target="_blank"
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full size-30 flex items-center justify-center mx-auto mb-3 text-xl font-bold shadow-lg group-hover:shadow-xl group-hover:from-blue-400 group-hover:to-blue-500 transition-all duration-300">
                {config.financial_section?.financial_help_1?.icon_text}
              </div>
              <h4 className="underline text-blue-500 font-semibold mb-2 text-lg group-hover:text-blue-600 transition-colors duration-200">
                {config.financial_section?.financial_help_1?.title}
              </h4>
              <p className="text-muted-foreground group-hover:text-blue-500 transition-colors duration-200">
                {config.financial_section?.financial_help_1?.description}
              </p>
            </Link>
          </div>

          <div className="text-center">
            <Link
              className="group block transition-transform duration-200 hover:-translate-y-1"
              href={"https://france-renov.gouv.fr/aides/maprimeadapt"}
              target="_blank"
            >
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full size-30 flex items-center justify-center mx-auto mb-3 text-xl font-bold shadow-lg">
                {config.financial_section?.financial_help_2?.icon_text}
              </div>
              <h4 className="underline text-blue-500 font-semibold mb-2 text-lg">
                {config.financial_section?.financial_help_2?.title}
              </h4>
              <p className="text-muted-foreground">
                {config.financial_section?.financial_help_2?.description}
              </p>
            </Link>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-xl">{config.financial_section?.sub_description}</p>
        </div>
      </div>
    </section>
  );
}
