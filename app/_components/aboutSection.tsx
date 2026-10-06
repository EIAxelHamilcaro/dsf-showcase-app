import { Clock, MapPin, Users, Wrench } from "lucide-react";
import Image from "next/image";
import type { Config1, Media } from "@/payload-types";
import { PageSection, SectionHeader } from "./pageSection";

const splitLabel = (paragraph: string) => {
  const separator = paragraph.indexOf(":");

  return separator === -1
    ? { label: "", text: paragraph }
    : {
        label: paragraph.slice(0, separator).trim(),
        text: paragraph.slice(separator + 1).trim(),
      };
};

export interface AboutSectionProps {
  config: Config1;
}

export function AboutSection({ config }: AboutSectionProps) {
  const about = config.about_features;
  const features = [
    {
      icon: MapPin,
      title: about?.about_feature_1?.about_feature_title_1,
      description: about?.about_feature_1?.about_feature_text_1,
    },
    {
      icon: Clock,
      title: about?.about_feature_2?.about_feature_title_2,
      description: about?.about_feature_2?.about_feature_text_2,
    },
    {
      icon: Users,
      title: about?.about_feature_3?.about_feature_title_3,
      description: about?.about_feature_3?.about_feature_text_3,
    },
    {
      icon: Wrench,
      title: about?.about_feature_4?.about_feature_title_4,
      description: about?.about_feature_4?.about_feature_text_4,
    },
  ];

  const paragraphs = Object.values(config.about_section.about_paragraphs ?? {})
    .filter((paragraph): paragraph is string => Boolean(paragraph))
    .map(splitLabel);

  return (
    <>
      <PageSection id="a-propos">
        <div className="grid items-end gap-block lg:grid-cols-[3fr_2fr]">
          <SectionHeader
            heading={config.about_title}
            intro={config.about_text}
          />
          <ul className="flex items-center gap-block lg:justify-end">
            <li>
              <Image
                alt="Marque Handibat : accessibilité et adaptation du logement"
                height={96}
                src="/logo-handibat.webp"
                width={96}
              />
            </li>
            <li>
              <Image
                alt="Label Silverbat : adaptation des salles de bain pour les seniors"
                height={64}
                src="/logo-silverbat.webp"
                width={160}
              />
            </li>
          </ul>
        </div>

        <ul className="tile-wall sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <li className="tile grid content-start gap-inline" key={title}>
              <Icon aria-hidden="true" className="icon-mark" />
              <h3>{title}</h3>
              <p className="soft">{description}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection className="items-center lg:grid-cols-2" tone="muted">
        <div className="grid gap-stack">
          <h2>{config.about_section.about_heading}</h2>
          <dl className="grid gap-stack">
            {paragraphs.map(({ label, text }) => (
              <div className="rule-start" key={label || text}>
                <dt>
                  <strong>{label}</strong>
                </dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="frame aspect-[4/3]">
          <Image
            alt="Salle de bain adaptée par Douche Senior France : douche de plain-pied, siège et barre d'appui"
            className="object-cover"
            fill
            sizes="(min-width: 64rem) 540px, 100vw"
            src={(config.about_image as Media).url || ""}
          />
        </div>
      </PageSection>
    </>
  );
}
