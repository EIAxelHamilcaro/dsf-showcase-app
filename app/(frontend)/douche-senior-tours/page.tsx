import { Clock, Euro, MapPin, Phone, Shield } from "lucide-react";
import type { Metadata } from "next";
import { getPayload } from "payload";
import { ContactButton } from "@/app/_components/contactButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import payloadConfig from "@/payload.config";

export const metadata: Metadata = {
  title: "Douche Senior Tours | Artisan Certifié | Devis Gratuit 24h",
  description:
    "Installation douche sécurisée à Tours et agglo (Joué-lès-Tours, Saint-Cyr). Artisan local certifié. Intervention en 1 jour. ",
  alternates: {
    canonical: "https://www.douche-senior-france.com/douche-senior-tours",
  },
  openGraph: {
    title: "Douche Senior Tours | Artisan Certifié",
    description:
      "Artisan local pour l'installation de douche sécurisée à Tours. Intervention rapide, aide financière disponible.",
    url: "https://www.douche-senior-france.com/douche-senior-tours",
  },
};

export default async function DoucheSeniorToursPage() {
  const payload = await getPayload({ config: payloadConfig });
  const config = await payload.findByID({
    collection: "config",
    id: 1,
    depth: 1,
  });

  const quartiers = [
    "Centre-ville Tours",
    "Joué-lès-Tours",
    "Saint-Cyr-sur-Loire",
    "Saint-Pierre-des-Corps",
    "Chambray-lès-Tours",
    "Ballan-Miré",
    "La Riche",
    "Saint-Avertin",
    "Fondettes",
    "Montlouis-sur-Loire",
  ];

  return (
    <main className="min-h-screen">
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-2 text-primary font-semibold">
              <MapPin className="h-5 w-5" />
              <span>Tours et agglomération - Indre-et-Loire (37)</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              Installation{" "}
              <span className="text-primary">Douche Sécurisée</span> pour
              Seniors à Tours
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Artisan certifié Handibat & Silverbat. Transformation de votre
              baignoire en douche plain-pied en 1 journée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ContactButton size="lg">Devis gratuit 24h</ContactButton>
              <Button asChild size="lg" variant="outline">
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
            Votre artisan de confiance à Tours
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Proximité</h3>
                <p className="text-sm text-muted-foreground">
                  Intervention rapide sur Tours et toute l'agglomération
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">1 journée</h3>
                <p className="text-sm text-muted-foreground">
                  Installation complète en une seule journée
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Certifications</h3>
                <p className="text-sm text-muted-foreground">
                  Handibat & Silverbat pour adaptation PMR
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Euro className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Aides</h3>
                <p className="text-sm text-muted-foreground">
                  Accompagnement MaPrimeAdapt et autres aides
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Intervention sur Tours et toute l'agglomération
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {quartiers.map((quartier) => (
                <div
                  className="bg-background p-4 rounded-lg text-center font-semibold text-sm"
                  key={quartier}
                >
                  {quartier}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Vous habitez Tours ou l'agglomération ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Demandez votre devis gratuit. Réponse sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ContactButton size="lg" variant="outline">
              Devis gratuit
            </ContactButton>
            <Button asChild size="lg" variant="outline">
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
