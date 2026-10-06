"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
import { PageSection, sectionLeadClass } from "./pageSection";

const sourceLabels = { direct: "Avis direct", google: "Avis Google" };
const slideImageSizes =
  "(min-width: 1296px) 588px, (min-width: 768px) 50vw, 100vw";
const slideFrameClass = "relative aspect-[4/5] overflow-hidden rounded-xl";
const slideLabelClass =
  "absolute top-3 left-3 rounded-full px-4 py-1 text-lg font-bold text-white";
const arrowClass =
  "size-12 rounded-full border-control-border bg-background shadow-md";

export function GallerySection({ config }: { config: Config1 }) {
  const projects = config.caroussel_section || [];
  const testimonials = config.testimonials_section || [];
  const aggregate = computeAggregateRating(config);

  const [currentProject, setCurrentProject] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const clearAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  const startAutoplay = () => {
    clearAutoplay();
    autoplayRef.current = setInterval(() => {
      nextProject(false);
    }, 8000);
  };

  const nextProject = (manual = true) => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
    if (manual) startAutoplay();
  };

  const prevProject = (manual = true) => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
    if (manual) startAutoplay();
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: ok
  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!prefersReducedMotion) {
      startAutoplay();
    }

    return clearAutoplay;
  }, []);

  return (
    <PageSection className="overflow-hidden" id="realisations" tone="muted">
      <div className="mb-10 space-y-4 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Nos réalisations avant / après
        </h2>
        <p className={sectionLeadClass}>
          Découvrez comment nous transformons les salles de bain
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentProject * 100}%)` }}
        >
          {projects.map((project, index) => (
            <div
              aria-hidden={index !== currentProject}
              className="grid w-full shrink-0 grid-cols-1 gap-4 md:grid-cols-2 md:gap-6"
              key={`project_${index.toString()}`}
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
                <span className={cn(slideLabelClass, "bg-primary")}>Après</span>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute inset-y-0 left-3 flex items-center">
          <Button
            aria-label="Projet précédent"
            className={arrowClass}
            onClick={() => prevProject(true)}
            size="icon"
            variant="outline"
          >
            <ChevronLeft aria-hidden="true" className="size-6" />
          </Button>
        </div>
        <div className="absolute inset-y-0 right-3 flex items-center">
          <Button
            aria-label="Projet suivant"
            className={arrowClass}
            onClick={() => nextProject(true)}
            size="icon"
            variant="outline"
          >
            <ChevronRight aria-hidden="true" className="size-6" />
          </Button>
        </div>
      </div>

      <fieldset
        aria-label="Navigation des projets"
        className="mt-4 mb-section flex flex-wrap justify-center"
      >
        {projects.map((_, index) => (
          <Button
            aria-current={index === currentProject ? "true" : undefined}
            aria-label={`Voir projet ${index + 1}`}
            className="group size-11 rounded-full hover:bg-background"
            key={`dot_${index.toString()}`}
            onClick={() => {
              setCurrentProject(index);
              startAutoplay();
            }}
            size="icon"
            type="button"
            variant="ghost"
          >
            <span className="size-4 rounded-full border-2 border-muted-foreground group-aria-[current=true]:border-primary group-aria-[current=true]:bg-primary" />
          </Button>
        ))}
      </fieldset>

      <div className="space-y-8">
        <h3 className="text-3xl md:text-4xl font-bold text-center">
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
        <div className="overflow-hidden motion-reduce:overflow-x-auto">
          <div className="flex gap-6 animate-scroll-inf">
            {[false, true].map((isClone) => (
              <div
                aria-hidden={isClone}
                className={cn("flex gap-6", isClone && "motion-reduce:hidden")}
                key={isClone ? "clone" : "original"}
              >
                {testimonials.map((testimonial, index) => {
                  const review = toRatedReview(testimonial);

                  return (
                    <Card
                      className="w-80 sm:w-96 shrink-0 bg-background shadow-none"
                      key={testimonial.id ?? index.toString()}
                    >
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
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageSection>
  );
}
