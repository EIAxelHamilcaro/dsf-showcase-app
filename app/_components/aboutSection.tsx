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
      className="py-12 md:py-16 lg:py-24 text-lg mx-auto px-4 sm:px-10 md:px-16 lg:px-32 overflow-hidden"
      id="a-propos"
    >
      {/* Intro */}
      <div className="text-center mb-8 sm:mb-12 md:mb-16">
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
            <Image
              alt="Label Handibat"
              className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-200 w-20 sm:w-28 md:w-32"
              height={80}
              src="/logo-handibat.webp"
              width={120}
            />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {config.about_title}
            </h2>
            <Image
              alt="Label Silverbat"
              className="object-contain opacity-90 hover:opacity-100 transition-opacity duration-200 w-24 sm:w-32 md:w-40"
              height={1000}
              src="/logo-silverbat.webp"
              width={160}
            />
          </div>

          <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            {config.about_text}
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-16">
        {features.map(({ icon: Icon, title, description }, i) => (
          <Card className="text-center" key={`feature_card_${i.toString()}`}>
            <CardHeader className="pb-2 sm:pb-4">
              <Icon className="text-primary mx-auto" size={32} />
              <h3 className="font-semibold text-sm sm:text-base">{title}</h3>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Argumentaire */}
      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center bg-muted rounded-lg p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold">
            {config.about_section.about_heading}
          </h3>
          <p className="text-sm sm:text-base md:text-lg">
            <strong>
              {config.about_section.about_paragraphs?.para_1?.split(":")[0]} :
            </strong>
            {config.about_section.about_paragraphs?.para_1?.split(":")[1]}
          </p>
          <p className="text-sm sm:text-base md:text-lg">
            <strong>
              {config.about_section.about_paragraphs?.para_2?.split(":")[0]} :
            </strong>
            {config.about_section.about_paragraphs?.para_2?.split(":")[1]}
          </p>
          <p className="text-sm sm:text-base md:text-lg">
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
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            src={(config.about_image as Media).url || ""}
            width={600}
          />
        </div>
      </div>
    </section>
  );
}
