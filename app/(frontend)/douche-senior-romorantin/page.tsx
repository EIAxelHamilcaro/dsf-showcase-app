import { Clock, Euro, MapPin, Phone, Shield } from "lucide-react";
import type { Metadata } from "next";
import { getPayload } from "payload";
import { ContactButton } from "@/app/_components/contactButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import payloadConfig from "@/payload.config";

export const metadata: Metadata = {
  title: "Douche Senior Romorantin | Artisan Local | Devis Gratuit",
  description:
    "Installation douche sécurisée à Romorantin-Lanthenay et Sologne. Artisan local certifié. Installation 1 jour. ",
  alternates: {
    canonical: "https://www.douche-senior-france.com/douche-senior-romorantin",
  },
  openGraph: {
    title: "Douche Senior Romorantin | Artisan Local",
    description:
      "Artisan local pour l'installation de douche sécurisée à Romorantin. Intervention rapide, aide financière disponible.",
    url: "https://www.douche-senior-france.com/douche-senior-romorantin",
  },
};

export default async function DoucheSeniorRomorantinPage() {
  const payload = await getPayload({ config: payloadConfig });
  const config = await payload.findByID({
    collection: "config",
    id: 1,
    depth: 1,
  });

  const quartiers = [
    "Romorantin-Lanthenay",
    "Pruniers-en-Sologne",
    "Selles-sur-Cher",
    "Gièvres",
    "Mennetou-sur-Cher",
    "Villefranche-sur-Cher",
    "Millançay",
    "La Ferté-Beauharnais",
  ];

  return (
    <main className="min-h-screen">
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-2 text-primary font-semibold">
              <MapPin className="h-5 w-5" />
              <span>Romorantin et Sologne - Loir-et-Cher (41)</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              Installation{" "}
              <span className="text-primary">Douche Sécurisée</span> pour
              Seniors à Romorantin
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Artisan local basé en Sologne. Transformation de votre baignoire
              en douche sécurisée en 1 journée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ContactButton size="lg">Devis gratuit 24h</ContactButton>
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
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Très local</h3>
                <p className="text-sm text-muted-foreground">
                  Basé en Sologne, à proximité
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">1 journée</h3>
                <p className="text-sm text-muted-foreground">
                  Installation ultra-rapide
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Certifié</h3>
                <p className="text-sm text-muted-foreground">
                  Handibat & Silverbat
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Euro className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Aides</h3>
                <p className="text-sm text-muted-foreground">MaPrimeAdapt</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Zones d'intervention en Sologne
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quartiers.map((q) => (
                <div
                  className="bg-background p-4 rounded-lg text-center font-semibold text-sm"
                  key={q}
                >
                  {q}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Vous habitez Romorantin ou la Sologne ?
          </h2>
          <p className="text-xl mb-8">Devis gratuit sous 24h</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ContactButton size="lg" className="bg-white text-primary hover:bg-primary hover:text-white border-white">
              Devis gratuit
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
