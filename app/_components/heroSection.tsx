import { Award, Heart, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { Config1, Media } from "@/payload-types";
import { ModalMultiStepForm } from "./multiStepForm";
import { RichTextBoldOnly } from "./richText";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function HeroSection({ config }: { config: Config1 }) {
  const heroImage = config.hero_image as Media;

  return (
    <section
      className="py-12 md:py-16 lg:py-24 bg-gradient-to-b from-background to-muted mx-auto px-4 sm:px-10 md:px-16 lg:px-32 xl:px-52 overflow-hidden"
      id="accueil"
    >
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="space-y-8">
          <div className="space-y-10 text-pretty">
            <RichTextBoldOnly content={config.main_title} />

            <p className="text-lg sm:text-xl md:text-2xl">
              {config.sub_main_title}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-6 text-base sm:text-lg font-bold">
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

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="#contact">{config.main_button?.main_button_1}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Link href="#realisations">
                {config.main_button?.main_button_2}
              </Link>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-sm sm:text-base"
                >
                  Télécharger le guide
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] sm:max-w-lg">
                <div className="text-center space-y-2 mb-4">
                  <DialogTitle className="text-xl sm:text-2xl font-bold text-foreground">
                    Recevez votre guide gratuit
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground">
                    Répondez à quelques questions pour personnaliser votre guide
                  </p>
                </div>
                <ModalMultiStepForm
                  link={(config.main_button.guide_pdf as Media).url || ""}
                />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="destructive"
                  className="w-full sm:w-auto text-sm sm:text-base"
                >
                  Télécharger la documentation
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] sm:max-w-lg">
                <div className="text-center space-y-2 mb-4">
                  <DialogTitle className="text-xl sm:text-2xl font-bold text-foreground">
                    Recevez votre documentation
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground">
                    Répondez à quelques questions pour accéder à la
                    documentation complète
                  </p>
                </div>
                <ModalMultiStepForm
                  link={(config.main_button.doc_pdf as Media).url || ""}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="relative">
          <Card className="overflow-hidden p-0">
            <CardContent className="p-0 relative w-full h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[35rem]">
              <Image
                alt="Salle de bain moderne adaptée aux seniors"
                fill
                priority
                loading="eager"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                src={heroImage.url || ""}
                style={{ objectFit: "cover" }}
              />
            </CardContent>
          </Card>

          <div className="absolute -bottom-4 left-2 sm:-bottom-6 sm:-left-6 bg-primary text-primary-foreground px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-lg max-w-[calc(100%-1rem)] sm:max-w-none">
            <p className="font-semibold text-sm sm:text-lg">
              {config.hero_image_label?.hero_image_label_1}
            </p>
            <p className="text-xs sm:text-base opacity-90">
              {config.hero_image_label?.hero_image_label_2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
