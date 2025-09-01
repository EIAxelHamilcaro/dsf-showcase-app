import { Clock, MapPin, Users, Wrench } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export function AboutSection() {
  const features = [
    {
      icon: MapPin,
      title: "100% Local",
      description: "Artisan français, intervention dans votre région",
    },
    {
      icon: Clock,
      title: "15 ans d'expérience",
      description: "Expertise reconnue dans l'adaptation de salles de bain",
    },
    {
      icon: Users,
      title: "Spécialiste seniors",
      description: "Comprend les besoins spécifiques des personnes âgées",
    },
    {
      icon: Wrench,
      title: "Travail artisanal",
      description: "Qualité française, finitions soignées",
    },
  ];

  return (
    <section className="py-16 lg:py-24" id="a-propos">
      <div className="max-w-6xl mx-auto px-6">
        {/* Intro */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Un artisan de confiance à votre service
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Depuis 15 ans, je transforme les salles de bain pour les rendre plus
            sûres et confortables. Mon engagement : une solution personnalisée
            avec un savoir-faire 100% français.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map(({ icon: Icon, title, description }, i) => (
            <Card className="text-center" key={`feature_card_${i.toString()}`}>
              <CardContent className="pt-6">
                <Icon className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Argumentaire */}
        <div className="grid lg:grid-cols-2 gap-8 items-center bg-muted rounded-lg p-8 lg:p-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">
              Pourquoi choisir un artisan français ?
            </h3>
            <p className="text-muted-foreground">
              <strong>Proximité :</strong> déplacement rapide dans votre région
              pour évaluer vos besoins et réaliser les travaux.
            </p>
            <p className="text-muted-foreground">
              <strong>Qualité :</strong> matériaux français de premier choix,
              respect des normes de sécurité.
            </p>
            <p className="text-muted-foreground">
              <strong>Accompagnement :</strong> aide dans les démarches
              financières et crédits d’impôt disponibles.
            </p>
          </div>
          <div className="aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              alt="Artisan français au travail dans une salle de bain"
              className="object-cover w-full h-full"
              height={600}
              src="/french-craftsman-working-on-bathroom-installation.png"
              width={800}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
