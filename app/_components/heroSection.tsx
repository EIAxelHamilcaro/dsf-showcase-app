import { Check, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toTelHref } from "@/lib/seo/phone";
import type { Config1, Media } from "@/payload-types";
import { DownloadDialog } from "./downloadDialog";
import { PageSection } from "./pageSection";
import { HighlightedTitle } from "./richText";

export interface HeroSectionProps {
  config: Config1;
}

export default function HeroSection({ config }: HeroSectionProps) {
  const heroImage = config.hero_image as Media;
  const tags = [
    config.main_tags?.main_tag_1,
    config.main_tags?.main_tag_2,
    config.main_tags?.main_tag_3,
  ].filter(Boolean);

  return (
    <PageSection
      className="items-center lg:grid-cols-[1.1fr_0.9fr]"
      id="accueil"
      tone="tint"
    >
      <div className="grid gap-block">
        <div className="grid gap-stack">
          <HighlightedTitle content={config.main_title} />
          <p className="lead">{config.sub_main_title}</p>
        </div>

        <ul className="flex flex-wrap gap-x-block gap-y-inline">
          {tags.map((tag) => (
            <li className="flex items-center gap-inline" key={tag}>
              <Check aria-hidden="true" className="icon-mark" data-size="sm" />
              <strong>{tag}</strong>
            </li>
          ))}
        </ul>

        <div className="grid gap-stack">
          <div className="flex flex-wrap gap-inline">
            <Button asChild size="lg">
              <Link href="#contact">{config.main_button?.main_button_1}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#realisations">
                {config.main_button?.main_button_2}
              </Link>
            </Button>
          </div>

          {config.phone ? (
            <p>
              Ou appelez-nous, nous répondons à vos questions :{" "}
              <a className="link" data-size="lg" href={toTelHref(config.phone)}>
                <Phone
                  aria-hidden="true"
                  className="icon-mark"
                  data-size="sm"
                />
                {config.phone}
              </a>
            </p>
          ) : null}

          <div className="rule-top flex flex-wrap gap-inline">
            <DownloadDialog
              description="Répondez à quelques questions pour personnaliser votre guide."
              label="Télécharger le guide"
              link={(config.main_button.guide_pdf as Media).url || ""}
              phone={config.phone}
              title="Recevez votre guide gratuit"
            />
            <DownloadDialog
              description="Répondez à quelques questions pour accéder à la documentation complète."
              label="Télécharger la documentation"
              link={(config.main_button.doc_pdf as Media).url || ""}
              phone={config.phone}
              title="Recevez votre documentation"
            />
          </div>
        </div>
      </div>

      <figure className="grid gap-grout">
        <div className="frame aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5]">
          <Image
            alt="Douche senior de plain-pied avec barres d'appui et sol antidérapant, installée en une journée"
            className="object-cover"
            fetchPriority="high"
            fill
            preload
            sizes="(min-width: 64rem) 540px, 100vw"
            src={heroImage.url || ""}
          />
        </div>
        <figcaption className="frame-caption">
          <strong>{config.hero_image_label?.hero_image_label_1}</strong>
          <p className="small">{config.hero_image_label?.hero_image_label_2}</p>
        </figcaption>
      </figure>
    </PageSection>
  );
}
