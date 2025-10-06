import { Clock, MapPin, Users, Wrench } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
    <section
      className="py-16 lg:py-24 text-lg mx-auto px-10 lg:px-32"
      id="a-propos"
    >
      {/* Intro */}
      <div className="text-center mb-16">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <Image
              alt="Label Handibat"
              className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-200"
              height={80}
              src="/logo-handibat.webp"
              width={120}
            />
            <h1 className="text-4xl md:text-5xl font-extrabold  tracking-tight">
              {config.about_title}
            </h1>
            <Image
              alt="Label Silverbat"
              className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-200"
              height={1000}
              src="/logo-silverbat.webp"
              width={160}
            />
          </div>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
            {config.about_text}
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map(({ icon: Icon, title, description }, i) => (
          <Card className="text-center" key={`feature_card_${i.toString()}`}>
            <CardHeader>
              <Icon className="text-primary mx-auto" size={40} />
              <h3 className="font-semibold">{title}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-lg">{description}</p>
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
          <p className="text-lg">
            <strong>
              {config.about_section.about_paragraphs?.para_1?.split(":")[0]} :
            </strong>
            {config.about_section.about_paragraphs?.para_1?.split(":")[1]}
          </p>
          <p className="text-lg">
            <strong>
              {config.about_section.about_paragraphs?.para_2?.split(":")[0]} :
            </strong>
            {config.about_section.about_paragraphs?.para_2?.split(":")[1]}
          </p>
          <p className="text-lg">
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
    </section>
  );
}
