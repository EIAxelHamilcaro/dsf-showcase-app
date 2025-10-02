import {
  Accessibility,
  Lightbulb,
  Shield,
  Flower as Shower,
  Thermometer,
  Wrench,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Config1 } from "@/payload-types";

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
    <section className="py-20 bg-background" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
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
              <CardHeader>
                <service.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-primary/5 rounded-lg p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              {config.financial_section?.title}
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {config.financial_section?.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3 text-xl font-bold shadow-lg">
                {config.financial_section?.financial_help_1?.icon_text}
              </div>
              <h4 className="font-semibold mb-2 text-lg">
                {config.financial_section?.financial_help_1?.title}
              </h4>
              <p className="text-muted-foreground">
                {config.financial_section?.financial_help_1?.description}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3 text-xl font-bold shadow-lg">
                {config.financial_section?.financial_help_2?.icon_text}
              </div>
              <h4 className="font-semibold mb-2 text-lg">
                {config.financial_section?.financial_help_2?.title}
              </h4>
              <p className="text-muted-foreground">
                {config.financial_section?.financial_help_2?.description}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3 text-xl font-bold shadow-lg">
                {config.financial_section?.financial_help_3?.icon_text}
              </div>
              <h4 className="font-semibold mb-2 text-lg">
                {config.financial_section?.financial_help_3?.title}
              </h4>
              <p className="text-muted-foreground">
                {config.financial_section?.financial_help_3?.description}
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3 text-xl font-bold shadow-lg">
                {config.financial_section?.financial_help_4?.icon_text}
              </div>
              <h4 className="font-semibold mb-2 text-lg">
                {config.financial_section?.financial_help_4?.title}
              </h4>
              <p className="text-muted-foreground">
                {config.financial_section?.financial_help_4?.description}
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground text-base">
              {config.financial_section?.sub_description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
