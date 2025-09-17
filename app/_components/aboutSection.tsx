import { Clock, MapPin, Users, Wrench } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { Config1, Media } from "@/payload-types";

export function AboutSection({ config }: { config: Config1 }) {
  const features = [
    {
      icon: MapPin,
      title: config.about_features?.about_feature_1?.about_feature_title_1,
      description: config.about_features?.about_feature_1?.about_feature_text_1,
    },
    {
      icon: Clock,
      title: config.about_features?.about_feature_2?.about_feature_title_2,
      description: config.about_features?.about_feature_2?.about_feature_text_2,
    },
    {
      icon: Users,
      title: config.about_features?.about_feature_3?.about_feature_title_3,
      description: config.about_features?.about_feature_3?.about_feature_text_3,
    },
    {
      icon: Wrench,
      title: config.about_features?.about_feature_4?.about_feature_title_4,
      description: config.about_features?.about_feature_4?.about_feature_text_4,
    },
  ];

  return (
    <section className="py-16 lg:py-24" id="a-propos">
      <div className="max-w-6xl mx-auto px-6">
        {/* Intro */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {config.about_title}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {config.about_text}
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map(({ icon: Icon, title, description }, i) => (
            <Card className="text-center" key={`feature_card_${i.toString()}`}>
              <CardContent className="pt-6">
                <Icon className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Argumentaire */}
        <div className="grid lg:grid-cols-2 gap-8 items-center bg-muted rounded-lg p-8 lg:p-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              {config.about_section.about_heading}
            </h3>
            <p className="text-muted-foreground">
              <strong>
                {config.about_section.about_paragraphs?.para_1?.split(":")[0]} :
              </strong>
              {config.about_section.about_paragraphs?.para_1?.split(":")[1]}
            </p>
            <p className="text-muted-foreground">
              <strong>
                {config.about_section.about_paragraphs?.para_2?.split(":")[0]} :
              </strong>
              {config.about_section.about_paragraphs?.para_2?.split(":")[1]}
            </p>
            <p className="text-muted-foreground">
              <strong>
                {config.about_section.about_paragraphs?.para_3?.split(":")[0]} :
              </strong>
              {config.about_section.about_paragraphs?.para_3?.split(":")[1]}
            </p>
          </div>
          <div className="aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              alt="Artisan français au travail dans une salle de bain"
              className="object-cover w-full h-full"
              height={800}
              src={(config.about_image as Media).url || ""}
              width={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
