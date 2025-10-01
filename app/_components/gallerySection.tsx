"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Config1, Media } from "@/payload-types";

export function GallerySection({ config }: { config: Config1 }) {
  const [currentProject, setCurrentProject] = useState(0);

  const projects = config.caroussel_section || [];

  const testimonials = config.testimonials_section || [];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const maxColBeforeAnim = 8;

  return (
    <section className="py-20 bg-muted" id="realisations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
            Nos réalisations avant/après
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Découvrez comment nous transformons les salles de bain pour plus de
            sécurité et de confort
          </p>
        </div>

        <div className="mb-16">
          <Card className="overflow-hidden p-4">
            <CardContent className="p-0">
              <div className="relative">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative w-full h-64 md:h-80">
                    <Image
                      alt="Avant transformation"
                      className="object-cover rounded-lg"
                      fill
                      src={
                        (projects[currentProject].before as Media).url ||
                        "/placeholder.svg"
                      }
                    />
                    <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      Avant
                    </div>
                  </div>

                  <div className="relative w-full h-64 md:h-80">
                    <Image
                      alt="Après transformation"
                      className="object-cover rounded-lg"
                      fill
                      src={
                        (projects[currentProject].after as Media).url ||
                        "/placeholder.svg"
                      }
                    />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      Après
                    </div>
                  </div>
                </div>

                <div className="absolute inset-y-0 left-4 flex items-center">
                  <Button
                    className="bg-background/80 backdrop-blur"
                    onClick={prevProject}
                    size="icon"
                    variant="outline"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </div>

                <div className="absolute inset-y-0 right-4 flex items-center">
                  <Button
                    className="bg-background/80 backdrop-blur"
                    onClick={nextProject}
                    size="icon"
                    variant="outline"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {projects[currentProject].title}
                </h3>
                <p className="text-muted-foreground">
                  {projects[currentProject].description}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-4 space-x-2">
            {projects.map((_, index) => (
              <button
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentProject
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                }`}
                key={`project_${index.toString()}`}
                onClick={() => setCurrentProject(index)}
                type="button"
              />
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="px-6">
          <h3 className="text-2xl font-bold text-center mb-8">
            Témoignages clients
          </h3>

          <div className="relative w-full overflow-hidden flex justify-center gap-6">
            <div
              className={cn(
                testimonials.length < maxColBeforeAnim
                  ? `grid gap-6 pb-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${testimonials.length <= 4 ? testimonials.length : 4}`
                  : "grid grid-rows-2 grid-flow-col gap-6 pb-4 [grid-auto-columns:18rem] animate-scroll-inf",
              )}
            >
              {(testimonials.length < maxColBeforeAnim
                ? testimonials
                : [...testimonials, ...testimonials]
              ).map((testimonial, index) => (
                <Card
                  className={cn(
                    "p-6 w-72 border rounded-2xl shadow-sm hover:shadow-md transition-shadow",
                    testimonials.length >= maxColBeforeAnim &&
                      index % 2 === 1 &&
                      "translate-x-36",
                  )}
                  key={`testimonial_${index.toString()}`}
                >
                  <CardHeader className="p-0 mb-2">
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

                  <CardContent className="p-0">
                    <p className="text-muted-foreground italic">
                      “{testimonial.text}”
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
