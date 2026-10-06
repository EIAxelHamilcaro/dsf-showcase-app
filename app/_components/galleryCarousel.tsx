"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Media } from "@/payload-types";

const slideImageSizes = "(min-width: 48rem) 50vw, 100vw";

export interface GalleryProject {
  id?: string | null;
  description?: string | null;
  before?: number | Media | null;
  after?: number | Media | null;
}

export interface GalleryCarouselProps {
  projects: GalleryProject[];
}

const urlOf = (image: GalleryProject["before"]) =>
  typeof image === "object" && image?.url ? image.url : "";

export function GalleryCarousel({ projects }: GalleryCarouselProps) {
  const [current, setCurrent] = useState(0);

  const show = (index: number) =>
    setCurrent((index + projects.length) % projects.length);

  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      aria-label="Photos avant et après travaux"
      aria-roledescription="carrousel"
      className="grid gap-stack"
    >
      <ul>
        {projects.map((project, index) => {
          const position = `réalisation ${index + 1}`;
          const name = project.description
            ? `${position}, ${project.description}`
            : position;

          return (
            <li
              aria-label={`${index + 1} sur ${projects.length} : ${name}`}
              aria-roledescription="diapositive"
              className="tile-wall md:grid-cols-2"
              hidden={index !== current}
              key={project.id ?? index.toString()}
            >
              <figure className="frame aspect-[4/5]">
                <Image
                  alt={`Avant travaux, ancienne salle de bain avec baignoire : ${name}`}
                  className="object-cover"
                  fill
                  sizes={slideImageSizes}
                  src={urlOf(project.before)}
                />
                <figcaption className="frame-label">Avant</figcaption>
              </figure>
              <figure className="frame aspect-[4/5]">
                <Image
                  alt={`Après travaux, douche sécurisée de plain-pied : ${name}`}
                  className="object-cover"
                  fill
                  sizes={slideImageSizes}
                  src={urlOf(project.after)}
                />
                <figcaption className="frame-label" data-tone="primary">
                  Après
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-inline">
        <Button
          onClick={() => show(current - 1)}
          size="lg"
          type="button"
          variant="secondary"
        >
          <ChevronLeft aria-hidden="true" />
          Précédente
        </Button>
        <p aria-live="polite">
          <strong>
            Réalisation {current + 1} sur {projects.length}
          </strong>
        </p>
        <Button onClick={() => show(current + 1)} size="lg" type="button">
          Suivante
          <ChevronRight aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}
