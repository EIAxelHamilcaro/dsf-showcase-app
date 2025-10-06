import { Award, Heart, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Config1, Media } from "@/payload-types";
import { RichTextBoldOnly } from "./richText";

export default function HeroSection({ config }: { config: Config1 }) {
  const heroImage = config.hero_image as Media;

  return (
    <section
      className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted mx-auto px-10 lg:px-52"
      id="accueil"
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-10 text-pretty">
            <RichTextBoldOnly content={config.main_title} />

            <p className="text-2xl">{config.sub_main_title}</p>
          </div>

          <div className="flex flex-wrap gap-6 text-lg font-bold">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>{config.main_tags?.main_tag_1}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <span>{config.main_tags?.main_tag_2}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <span>{config.main_tags?.main_tag_3}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 flex-wrap">
            <Button asChild size="lg">
              <Link href="#contact">{config.main_button?.main_button_1}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#realisations">
                {config.main_button?.main_button_2}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link
                href={(config.main_button.guide_pdf as Media).url || ""}
                target="_blank"
              >
                Télécharger votre guide gratuitement
              </Link>
            </Button>
            <Button asChild size="lg" variant="destructive">
              <Link
                href={(config.main_button.doc_pdf as Media).url || ""}
                target="_blank"
              >
                Télécharger notre documentation gratuitement
              </Link>
            </Button>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <Card className="overflow-hidden p-0">
            <CardContent className="p-0 relative w-full h-[35rem]">
              <Image
                alt="Salle de bain moderne adaptée aux seniors"
                fill
                src={heroImage.url || ""}
                style={{ objectFit: "cover" }}
              />
            </CardContent>
          </Card>

          <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground px-4 py-3 rounded-lg shadow-lg">
            <p className="font-semibold text-lg">
              {config.hero_image_label?.hero_image_label_1}
            </p>
            <p className="text-base opacity-90">
              {config.hero_image_label?.hero_image_label_2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
