import { Award, Heart, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Config1, Media } from "@/payload-types";
import { DownloadDialog } from "./downloadDialog";
import { PageSection } from "./pageSection";
import { RichTextBoldOnly } from "./richText";

export default function HeroSection({ config }: { config: Config1 }) {
  const heroImage = config.hero_image as Media;
  const tags = [
    { key: "shield", icon: Shield, label: config.main_tags?.main_tag_1 },
    { key: "heart", icon: Heart, label: config.main_tags?.main_tag_2 },
    { key: "award", icon: Award, label: config.main_tags?.main_tag_3 },
  ];

  return (
    <PageSection id="accueil" tone="hero">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div className="min-w-0 space-y-8">
          <RichTextBoldOnly content={config.main_title} />

          <p className="max-w-reading text-xl md:text-2xl">
            {config.sub_main_title}
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-lg font-bold">
            {tags.map(({ key, icon: Icon, label }) => (
              <div className="flex items-center gap-2" key={key}>
                <Icon aria-hidden="true" className="size-6 text-primary" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="grid max-w-xl auto-rows-fr gap-3 sm:grid-cols-2">
            <Button asChild size="xl">
              <Link href="#contact">{config.main_button?.main_button_1}</Link>
            </Button>
            <Button asChild size="xl" variant="outlinePrimary">
              <Link href="#realisations">
                {config.main_button?.main_button_2}
              </Link>
            </Button>
            <DownloadDialog
              description="Répondez à quelques questions pour personnaliser votre guide"
              label="Télécharger le guide"
              link={(config.main_button.guide_pdf as Media).url || ""}
              phone={config.phone}
              title="Recevez votre guide gratuit"
            />
            <DownloadDialog
              description="Répondez à quelques questions pour accéder à la documentation complète"
              label="Télécharger la documentation"
              link={(config.main_button.doc_pdf as Media).url || ""}
              phone={config.phone}
              title="Recevez votre documentation"
            />
          </div>
        </div>

        <div className="relative pb-6">
          <div className="relative aspect-[4/5] sm:aspect-[3/2] lg:aspect-[4/5] overflow-hidden rounded-xl">
            <Image
              alt="Douche senior sécurisée plain-pied avec barres d'appui et sol antidérapant - Installation en 1 jour"
              className="object-cover"
              fetchPriority="high"
              fill
              preload
              sizes="(min-width: 1024px) 540px, 100vw"
              src={heroImage.url || ""}
            />
          </div>

          <div className="absolute bottom-0 left-3 right-3 sm:right-auto sm:max-w-md rounded-lg bg-primary px-4 py-3 text-primary-foreground shadow-lg">
            <p className="text-base sm:text-lg font-bold">
              {config.hero_image_label?.hero_image_label_1}
            </p>
            <p className="text-small">
              {config.hero_image_label?.hero_image_label_2}
            </p>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
