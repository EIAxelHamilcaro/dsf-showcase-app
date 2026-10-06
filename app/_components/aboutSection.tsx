import { Clock, MapPin, Users, Wrench } from "lucide-react";
import Image from "next/image";
import type { Config1, Media } from "@/payload-types";
import { PageSection, sectionLeadClass } from "./pageSection";

const certificationLogoClass = "relative h-20 w-28 md:h-24 md:w-36";

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

  const paragraphs = [
    config.about_section.about_paragraphs?.para_1,
    config.about_section.about_paragraphs?.para_2,
    config.about_section.about_paragraphs?.para_3,
  ];

  return (
    <PageSection id="a-propos">
      <div className="space-y-12">
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          <div className="grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-4 md:grid-cols-[auto_1fr_auto]">
            <div className={certificationLogoClass}>
              <Image
                alt="Certification Handibat pour l'accessibilité PMR et adaptation du logement aux personnes âgées"
                className="object-contain"
                fill
                sizes="144px"
                src="/logo-handibat.webp"
              />
            </div>
            <h2 className="order-last col-span-2 text-3xl sm:text-4xl md:order-none md:col-span-1 lg:text-5xl font-extrabold tracking-tight">
              {config.about_title}
            </h2>
            <div className={certificationLogoClass}>
              <Image
                alt="Label Silverbat spécialiste de l'adaptation des salles de bain pour seniors et personnes âgées"
                className="object-contain"
                fill
                sizes="144px"
                src="/logo-silverbat.webp"
              />
            </div>
          </div>

          <p className={`${sectionLeadClass} mx-auto max-w-reading`}>
            {config.about_text}
          </p>
        </div>

        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              className="space-y-3 border-t-2 border-primary pt-5"
              key={title}
            >
              <Icon aria-hidden="true" className="size-9 text-primary" />
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>

        <div className="grid items-center gap-8 rounded-xl bg-muted p-6 md:p-10 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {config.about_section.about_heading}
            </h3>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>
                <strong>{paragraph?.split(":")[0]} :</strong>
                {paragraph?.split(":")[1]}
              </p>
            ))}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              alt="Artisan français au travail dans une salle de bain"
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 540px, 100vw"
              src={(config.about_image as Media).url || ""}
            />
          </div>
        </div>
      </div>
    </PageSection>
  );
}
