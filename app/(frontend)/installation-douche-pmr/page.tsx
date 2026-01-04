import { CheckCircle2, Phone } from "lucide-react";
import type { Metadata } from "next";
import { getPayload } from "payload";
import { ContactButton } from "@/app/_components/contactButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import payloadConfig from "@/payload.config";

export const metadata: Metadata = {
  title: "Installation Douche PMR | Normes Accessibilité | Centre-Val de Loire",
  description:
    "Installation douche PMR (Personnes à Mobilité Réduite) aux normes. Artisan certifié Handibat. Accès plain-pied, aides financières. ",
  alternates: {
    canonical: "https://www.douche-senior-france.com/installation-douche-pmr",
  },
};

export default async function DouchePMRPage() {
  const payload = await getPayload({ config: payloadConfig });
  const config = await payload.findByID({
    collection: "config",
    id: 1,
    depth: 1,
  });

  return (
    <main className="min-h-screen">
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              Installation <span className="text-primary">Douche PMR</span> aux
              Normes
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Douche adaptée aux Personnes à Mobilité Réduite. Artisan certifié
              Handibat & Silverbat. Respect strict des normes d'accessibilité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ContactButton size="lg">Devis gratuit</ContactButton>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-primary hover:text-white border-white">
                <a href={`tel:${config?.phone?.replace(/\s/g, "")}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {config?.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Qu'est-ce qu'une douche PMR ?
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-6 text-muted-foreground">
              Une douche PMR (Personnes à Mobilité Réduite) est une douche
              spécialement conçue pour être accessible aux personnes en fauteuil
              roulant ou ayant des difficultés de déplacement.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Accès plain-pied
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Aucun ressaut ou seuil maximum de 2 cm. Accessible en
                    fauteuil roulant.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Dimensions adaptées
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Surface minimale 150x150 cm pour circulation fauteuil.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Barres d'appui normées
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Positionnement et hauteur selon normes PMR. Résistance 150
                    kg minimum.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Siège de douche
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Siège rabattable ou fixe à hauteur normée (45-50 cm).
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Pourquoi choisir un artisan certifié Handibat ?
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-8 text-center text-muted-foreground">
              Le label Handibat garantit que l'artisan maîtrise les normes
              d'accessibilité PMR et peut réaliser des travaux conformes.
            </p>
            <div className="grid gap-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2">
                    ✓ Conformité garantie aux normes
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Respect strict de la réglementation PMR et accessibilité.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2">
                    ✓ Éligibilité aux aides maximales
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Certification obligatoire pour certaines aides
                    (MaPrimeAdapt).
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2">✓ Expertise reconnue</h3>
                  <p className="text-sm text-muted-foreground">
                    Formation spécialisée adaptation du logement.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Besoin d'une douche PMR conforme ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Devis gratuit par artisan certifié Handibat. Visite à domicile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ContactButton size="lg" className="bg-white text-primary hover:bg-primary hover:text-white border-white">
              Demander un devis
            </ContactButton>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-primary hover:text-white border-white">
              <a href={`tel:${config?.phone?.replace(/\s/g, "")}`}>
                <Phone className="mr-2 h-5 w-5" />
                Appeler
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
