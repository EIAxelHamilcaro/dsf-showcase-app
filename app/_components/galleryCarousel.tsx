"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  computeAggregateRating,
  formatRating,
  formatReviewDate,
  toRatedReview,
} from "@/lib/seo/reviews";
import { cn } from "@/lib/utils";
import type { Config1, Media } from "@/payload-types";
import { PageSection, SectionHeader, sectionTitleClass } from "./pageSection";

const sourceLabels = { direct: "Avis direct", google: "Avis Google" };
const slideImageSizes =
  "(min-width: 1296px) 588px, (min-width: 768px) 50vw, 100vw";
const slideFrameClass = "relative aspect-[4/5] overflow-hidden rounded-xl";
const slideLabelClass =
  "absolute top-3 left-3 rounded-full px-4 py-1 text-lg font-bold text-white";
const arrowClass =
  "size-12 rounded-full shadow-md md:absolute md:top-[calc(50%-2rem)] md:-translate-y-1/2";

export function GallerySection({ config }: { config: Config1 }) {
  const projects = config.caroussel_section || [];
  const testimonials = config.testimonials_section || [];
  const aggregate = computeAggregateRating(config);
  const testimonialsTitleId = useId();

  const [currentProject, setCurrentProject] = useState(0);

  const showProject = (index: number) => {
    setCurrentProject((index + projects.length) % projects.length);
  };

  return (
    <PageSection id="realisations" tone="muted">
      <SectionHeader
        className="mb-10"
        heading="Nos réalisations avant / après"
        intro="Découvrez comment nous transformons les salles de bain"
        isCentered
      />

      <div className="relative mb-section">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentProject * 100}%)` }}
          >
            {projects.map((project, index) => (
              <div
                aria-hidden={index !== currentProject}
                className="grid w-full shrink-0 grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
                key={project.id ?? index.toString()}
              >
                <div className={slideFrameClass}>
                  <Image
                    alt={`Baignoire ancienne avant remplacement par douche sécurisée senior - ${project.description || `Réalisation ${index + 1}`}`}
                    className="object-cover"
                    fill
                    sizes={slideImageSizes}
                    src={(project.before as Media)?.url || "/placeholder.svg"}
                  />
                  <span className={cn(slideLabelClass, "bg-destructive")}>
                    Avant
                  </span>
                </div>

                <div className={slideFrameClass}>
                  <Image
                    alt={`Douche sécurisée plain-pied pour senior après installation - ${project.description || `Réalisation ${index + 1}`}`}
                    className="object-cover"
                    fill
                    sizes={slideImageSizes}
                    src={(project.after as Media)?.url || "/placeholder.svg"}
                  />
                  <span className={cn(slideLabelClass, "bg-primary")}>
                    Après
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-6">
          <Button
            aria-label="Projet précédent"
            className={cn(arrowClass, "md:left-3")}
            onClick={() => showProject(currentProject - 1)}
            size="icon"
            variant="quiet"
          >
            <ChevronLeft aria-hidden="true" className="size-6" />
          </Button>

          <output
            aria-label={`${currentProject + 1} / ${projects.length}`}
            className="text-lg font-bold before:content-[attr(aria-label)] md:hidden"
          />

          <fieldset
            aria-label="Navigation des projets"
            className="hidden flex-wrap justify-center md:flex"
          >
            {projects.map((project, index) => (
              <Button
                aria-current={index === currentProject ? "true" : undefined}
                aria-label={`Voir projet ${index + 1}`}
                className="group size-11 rounded-full hover:bg-background"
                key={project.id ?? index.toString()}
                onClick={() => showProject(index)}
                size="icon"
                type="button"
                variant="ghost"
              >
                <span className="size-4 rounded-full border-2 border-muted-foreground group-aria-[current=true]:border-primary group-aria-[current=true]:bg-primary" />
              </Button>
            ))}
          </fieldset>

          <Button
            aria-label="Projet suivant"
            className={cn(arrowClass, "md:right-3")}
            onClick={() => showProject(currentProject + 1)}
            size="icon"
            variant="quiet"
          >
            <ChevronRight aria-hidden="true" className="size-6" />
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        <h3
          className={cn(sectionTitleClass, "text-center")}
          id={testimonialsTitleId}
        >
          Témoignages clients
        </h3>
        {aggregate ? (
          <p className="text-lg text-center">
            {formatRating(aggregate.ratingValue)}/5 sur {aggregate.reviewCount}{" "}
            {aggregate.origin === "google" ? "avis Google" : "avis"}
            {aggregate.origin === "google" && config.google_profile_url ? (
              <>
                {" "}
                <a
                  className="inline-flex min-h-11 items-center font-bold text-primary underline"
                  href={config.google_profile_url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Voir la fiche
                </a>
              </>
            ) : null}
          </p>
        ) : null}
        <ul
          aria-labelledby={testimonialsTitleId}
          className="flex snap-x snap-mandatory items-start gap-6 overflow-x-auto pb-4"
          // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrollable list must be reachable with the keyboard
          tabIndex={0}
        >
          {testimonials.map((testimonial, index) => {
            const review = toRatedReview(testimonial);

            return (
              <li
                className="w-[85%] shrink-0 snap-start sm:w-96"
                key={testimonial.id ?? index.toString()}
              >
                <Card className="bg-background shadow-none">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                        {testimonial?.title?.charAt(0)}
                      </div>
                      <div>
                        <CardTitle className="text-xl leading-snug">
                          {testimonial.title}
                        </CardTitle>
                        <p className="text-muted-foreground">
                          {testimonial.age} • {testimonial.location}
                        </p>
                        {review ? (
                          <p className="text-muted-foreground">
                            {formatRating(review.rating)}/5 •{" "}
                            {sourceLabels[review.source]}
                            {review.date ? (
                              <>
                                {" • "}
                                <time dateTime={review.date}>
                                  {formatReviewDate(review.date)}
                                </time>
                              </>
                            ) : null}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </PageSection>
  );
}
