"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Config1, Media } from "@/payload-types";

export function GallerySection({ config }: { config: Config1 }) {
  const projects = config.caroussel_section || [];
  const testimonials = config.testimonials_section || [];

  const [currentProject, setCurrentProject] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const clearAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  const startAutoplay = () => {
    clearAutoplay();
    autoplayRef.current = setInterval(() => {
      nextProject(false);
    }, 5000);
  };

  const nextProject = (manual = true) => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
    if (manual) startAutoplay();
  };

  const prevProject = (manual = true) => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
    if (manual) startAutoplay();
  };

  useEffect(() => {
    startAutoplay();
    return clearAutoplay;
  }, []);

  return (
    <section className="py-20 bg-muted flex justify-center" id="realisations">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Nos réalisations avant / après
          </h2>
          <p className="text-xl text-muted-foreground">
            Découvrez comment nous transformons les salles de bain
          </p>
        </div>

        {/* Carrousel */}
        <div className="relative overflow-hidden mb-16 max-w-full">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentProject * 100}%)` }}
          >
            {projects.map((project, index) => (
              <div
                className="flex-shrink-0 w-full grid grid-cols-1 md:grid-cols-2 gap-6"
                key={index}
              >
                {/* Avant */}
                <div className="relative w-full h-[500px] md:h-[700px]">
                  <Image
                    alt="Avant transformation"
                    className="object-cover rounded-xl shadow-lg"
                    fill
                    sizes="100vw"
                    src={(project.before as Media)?.url || "/placeholder.svg"}
                  />
                  <span className="absolute top-3 left-3 bg-destructive text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Avant
                  </span>
                </div>

                {/* Après */}
                <div className="relative w-full h-[500px] md:h-[700px]">
                  <Image
                    alt="Après transformation"
                    className="object-cover rounded-xl shadow-lg"
                    fill
                    sizes="100vw"
                    src={(project.after as Media)?.url || "/placeholder.svg"}
                  />
                  <span className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Après
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Boutons nav */}
          <div className="absolute inset-y-0 left-3 flex items-center">
            <Button
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
              className="bg-background/80 backdrop-blur-sm rounded-full"
              onClick={() => nextProject(true)}
              size="icon"
              variant="outline"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-4 mb-16 space-x-2">
          {projects.map((_, index) => (
            <button
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentProject
                  ? "bg-primary"
                  : "bg-muted-foreground/30"
              }`}
              key={index}
              onClick={() => {
                setCurrentProject(index);
                startAutoplay();
              }}
            />
          ))}
        </div>

        {/* Témoignages */}
        <div className="px-6 flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold text-center mb-8">
            Témoignages clients
          </h3>
          <div className="relative w-11/12 overflow-hidden">
            <div className="flex gap-6 animate-scroll-inf">
              {/* Ta liste, rendue 2x pour la continuité */}
              {[...Array(2)].map((_, cloneIndex) => (
                <div className="flex gap-6" key={cloneIndex}>
                  {testimonials.map((testimonial, index) => (
                    <Card
                      className="p-6 w-72 border rounded-2xl shadow-sm hover:shadow-md transition-shadow flex-shrink-0"
                      key={`${cloneIndex}-${index}`}
                    >
                      <CardHeader className="p-0 mb-0 gap-0">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                            {testimonial?.title?.charAt(0)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {testimonial.title}
                            </CardTitle>
                            <p className="text-xs text-muted-foreground">
                              {testimonial.age} • {testimonial.location}
                            </p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0 mt-0">
                        <p className="text-muted-foreground italic">
                          “{testimonial.text}”
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
