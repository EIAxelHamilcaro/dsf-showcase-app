import { Award, Heart, Shield } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HeroSection() {
  return (
    <section
      className="py-16 lg:py-28 bg-gradient-to-b from-background to-muted"
      id="accueil"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                Votre salle de bain{" "}
                <span className="text-primary">sécurisée</span> et{" "}
                <span className="text-primary">confortable</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Pensée pour les seniors, réalisée par un artisan français avec
                15 ans d’expérience
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Sécurité garantie</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                <span>Confort adapté</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span>Artisan français</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <a href="#contact">Demander un devis gratuit</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#realisations">Voir nos réalisations</a>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Image
                  alt="Salle de bain moderne adaptée aux seniors"
                  className="object-cover w-full h-full"
                  height={600}
                  src="/placeholder-x8qmm.png"
                  width={800}
                />
              </CardContent>
            </Card>
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground px-4 py-3 rounded-lg shadow-lg">
              <p className="font-semibold">+200 installations</p>
              <p className="text-sm opacity-90">réalisées avec succès</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
