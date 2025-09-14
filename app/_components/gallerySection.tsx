"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function GallerySection() {
  const [currentProject, setCurrentProject] = useState(0);

  const projects = [
    {
      title: "Transformation complète - Maison de retraite",
      before: "/old-bathroom-before-renovation.png",
      after: "/placeholder-qv9a7.png",
      description:
        "Remplacement baignoire par douche sécurisée, barres d'appui, sol antidérapant",
    },
    {
      title: "Adaptation domicile - Couple senior",
      before: "/placeholder-f1886.png",
      after: "/placeholder-958e2.png",
      description: "Douche à l'italienne, siège rabattable, éclairage renforcé",
    },
    {
      title: "Rénovation sécurisée - Appartement",
      before: "/placeholder-ypjt5.png",
      after: "/placeholder-d0yle.png",
      description: "Optimisation espace, WC rehaussé, mitigeur thermostatique",
    },
  ];

  const testimonials = [
    {
      name: "Marie D.",
      age: "72 ans",
      text: "Grâce à cette installation, ma salle de bain est enfin sécurisée. Je peux me doucher en toute tranquillité.",
      location: "Lyon",
    },
    {
      name: "Pierre et Jacqueline M.",
      age: "68 et 70 ans",
      text: "Travail impeccable, artisan très professionnel. Nous recommandons vivement !",
      location: "Marseille",
    },
    {
      name: "Robert L.",
      age: "75 ans",
      text: "Installation rapide et soignée. Enfin une douche adaptée à mes besoins.",
      location: "Toulouse",
    },
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

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
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative">
                <div className="grid md:grid-cols-2">
                  <div className="relative">
                    <Image
                      alt="Avant transformation"
                      className="w-full h-64 md:h-80 object-cover"
                      height={100}
                      src={
                        projects[currentProject].before || "/placeholder.svg"
                      }
                      width={100}
                    />
                    <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      Avant
                    </div>
                  </div>
                  <div className="relative">
                    <Image
                      alt="Après transformation"
                      className="w-full h-64 md:h-80 object-cover"
                      height={100}
                      src={projects[currentProject].after || "/placeholder.svg"}
                      width={100}
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
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">
            Témoignages clients
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={`testimonial_${index.toString()}`}>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="text-sm">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-muted-foreground">
                      {testimonial.age} - {testimonial.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
