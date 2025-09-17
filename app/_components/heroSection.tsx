import { Award, Heart, Shield } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Config1, Media } from "@/payload-types";
import { RichTextBoldOnly } from "./richText";
import Link from "next/link";

export default function HeroSection({ config }: { config: Config1 }) {
  const heroImage = config.hero_image as Media;

  return (
    <section
      className="py-16 lg:py-28 bg-gradient-to-b from-background to-muted"
      id="accueil"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <RichTextBoldOnly content={config.main_title} />

              <p className="text-lg text-muted-foreground">
                {config.sub_main_title}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
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

            <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
              <Button asChild size="lg">
                <a href="#contact">{config.main_button?.main_button_1}</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#realisations">{config.main_button?.main_button_2}</a>
              </Button>
              <Button
                variant="destructive"
                size="lg"
                asChild
              >
                <Link href={(config.main_button.guide_pdf as Media).url || ""} target="_blank">
                  Télécharger votre guide gratuitement
                </Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <Card className="overflow-hidden p-0">
              <CardContent className="p-0 relative w-full h-64">
                <Image
                  alt="Salle de bain moderne adaptée aux seniors"
                  fill
                  sizes="100vw"
                  src={heroImage.url || ""}
                  style={{ objectFit: "cover" }}
                />
              </CardContent>
            </Card>

            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground px-4 py-3 rounded-lg shadow-lg">
              <p className="font-semibold">
                {config.hero_image_label?.hero_image_label_1}
              </p>
              <p className="text-sm opacity-90">
                {config.hero_image_label?.hero_image_label_2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
