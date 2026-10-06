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
import type { Config1, Media } from "@/payload-types";

const sourceLabels = { direct: "Avis direct", google: "Avis Google" };

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
    <section
      className="py-12 md:py-16 lg:py-24 bg-muted w-full mx-auto px-4 sm:px-10 md:px-16 lg:px-32 overflow-hidden"
      id="realisations"
    >
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Nos réalisations avant / après
        </h2>
        <p className="text-lg md:text-xl">
          Découvrez comment nous transformons les salles de bain
        </p>
      </div>

      <div className="relative overflow-hidden mb-16 max-w-full">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentProject * 100}%)` }}
        >
          {projects.map((project, index) => (
            <div
              className="shrink-0 w-full grid grid-cols-1 md:grid-cols-2 gap-6"
              key={`project_${index.toString()}`}
            >
              <div className="relative w-full h-80 sm:h-112 md:h-140 lg:h-180">
                <Image
                  alt={`Baignoire ancienne avant remplacement par douche sécurisée senior - ${project.description || `Réalisation ${index + 1}`}`}
                  className="object-cover rounded-xl shadow-lg"
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  src={(project.before as Media)?.url || "/placeholder.svg"}
                />
                <span className="absolute top-3 left-3 bg-destructive text-white px-2 py-1 sm:px-3 rounded-full text-sm sm:text-lg font-semibold">
                  Avant
                </span>
              </div>

              <div className="relative w-full h-80 sm:h-112 md:h-140 lg:h-180">
                <Image
                  alt={`Douche sécurisée plain-pied pour senior après installation - ${project.description || `Réalisation ${index + 1}`}`}
                  className="object-cover rounded-xl shadow-lg"
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  src={(project.after as Media)?.url || "/placeholder.svg"}
                />
                <span className="absolute top-3 left-3 bg-primary text-white px-2 py-1 sm:px-3 rounded-full text-sm sm:text-lg font-semibold">
                  Après
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute inset-y-0 left-3 flex items-center">
          <Button
            aria-label="Projet précédent"
            className="bg-background/80 backdrop-blur-sm rounded-full"
            onClick={() => prevProject(true)}
            size="icon"
            variant="outline"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>
        <div className="absolute inset-y-0 right-3 flex items-center">
          <Button
            aria-label="Projet suivant"
            className="bg-background/80 backdrop-blur-sm rounded-full"
            onClick={() => nextProject(true)}
            size="icon"
            variant="outline"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/** biome-ignore assist/source/useSortedAttributes: ok */}
      <div
        className="flex justify-center mt-4 mb-16 gap-2 flex-wrap px-4"
        role="tablist"
        aria-label="Navigation des projets"
      >
        {projects.map((_, index) => (
          <button
            aria-current={index === currentProject ? "true" : "false"}
            aria-label={`Voir projet ${index + 1}`}
            className={`relative w-11 h-11 min-w-11 min-h-11 p-0 rounded-full transition-colors cursor-pointer flex items-center justify-center ${
              index === currentProject ? "" : "hover:bg-muted-foreground/10"
            }`}
            key={`dot_${index.toString()}`}
            onClick={() => {
              setCurrentProject(index);
              startAutoplay();
            }}
            type="button"
          >
            <span
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentProject
                  ? "bg-primary"
                  : "bg-muted-foreground/30"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="px-4 md:px-6 flex flex-col items-center justify-center">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Témoignages clients
        </h3>
        {aggregate ? (
          <p className="text-base md:text-lg text-center mb-8">
            {formatRating(aggregate.ratingValue)}/5 sur {aggregate.reviewCount}{" "}
            {aggregate.origin === "google" ? "avis Google" : "avis"}
            {aggregate.origin === "google" && config.google_profile_url ? (
              <>
                {" "}
                <a
                  className="underline"
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
        <div className="relative w-full md:w-11/12 overflow-hidden">
          <div className="flex gap-4 md:gap-6 animate-scroll-inf">
            {[...Array(2)].map((_) => (
              <div
                className="flex gap-4 md:gap-6"
                key={`clone_testimonial_${Math.random() * 1000}`}
              >
                {testimonials.map((testimonial, index) => {
                  const review = toRatedReview(testimonial);

                  return (
                    <Card
                      className="p-4 md:p-6 w-72 sm:w-80 md:w-96 mb-1 border rounded-2xl shadow-sm hover:shadow-md transition-shadow shrink-0"
                      key={`testmonial_$${Math.random() * 1000}-${index.toString}`}
                    >
                      <CardHeader className="p-0 mb-0 gap-0">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 md:w-15 md:h-15 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                            {testimonial?.title?.charAt(0)}
                          </div>
                          <div>
                            <CardTitle className="text-lg md:text-xl">
                              {testimonial.title}
                            </CardTitle>
                            <p className="text-sm md:text-base">
                              {testimonial.age} • {testimonial.location}
                            </p>
                            {review ? (
                              <p className="text-sm md:text-base text-muted-foreground">
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
                      <CardContent className="p-0 mt-0">
                        <p className="text-base md:text-lg italic">
                          "{testimonial.text}"
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
