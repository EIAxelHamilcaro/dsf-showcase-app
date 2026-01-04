import { CheckCircle2, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getPayload } from "payload";
import { ContactButton } from "@/app/_components/contactButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import payloadConfig from "@/payload.config";

export const metadata: Metadata = {
  title:
    "Douche Senior Indre-et-Loire (37) | Installation Rapide | Artisan Certifié",
  description:
    "Artisan douche senior en Indre-et-Loire : Tours, Joué-lès-Tours, Saint-Cyr-sur-Loire. Installation en 1 jour, aide financière. ",
  alternates: {
    canonical: "https://www.douche-senior-france.com/indre-et-loire",
  },
  openGraph: {
    title: "Douche Senior Indre-et-Loire (37) | Installation Rapide",
    description:
      "Artisan certifié pour l'installation de douche sécurisée dans le 37. Intervention rapide dans tout le département.",
    url: "https://www.douche-senior-france.com/indre-et-loire",
  },
};

export default async function IndreEtLoirePage() {
  const payload = await getPayload({ config: payloadConfig });
  const config = await payload.findByID({
    collection: "config",
    id: 1,
    depth: 1,
  });

  const villes = [
    "Tours",
    "Joué-lès-Tours",
    "Saint-Cyr-sur-Loire",
    "Saint-Pierre-des-Corps",
    "Amboise",
    "Chinon",
    "Loches",
    "Montlouis-sur-Loire",
    "Chambray-lès-Tours",
    "Ballan-Miré",
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              Installation Douche Senior en{" "}
              <span className="text-primary">Indre-et-Loire (37)</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Artisan certifié pour la transformation de votre salle de bain en
              douche sécurisée. Intervention rapide sur tout le département.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ContactButton size="lg">Devis gratuit immédiat</ContactButton>
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

      {/* Pourquoi nous choisir */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Pourquoi choisir un artisan local en Indre-et-Loire ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <CheckCircle2 className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">Proximité garantie</h3>
                <p className="text-muted-foreground">
                  Intervention rapide dans tout le département : Tours,
                  Joué-lès-Tours, Amboise et toutes les communes
                  d'Indre-et-Loire.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <CheckCircle2 className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  Installation en 1 journée
                </h3>
                <p className="text-muted-foreground">
                  Votre baignoire est remplacée par une douche plain-pied
                  sécurisée en une seule journée. Vous pouvez l'utiliser dès le
                  soir même.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <CheckCircle2 className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">
                  Certifications Handibat & Silverbat
                </h3>
                <p className="text-muted-foreground">
                  Artisan certifié pour les travaux d'adaptation PMR. Éligible
                  aux aides financières (MaPrimeAdapt).
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Villes couvertes */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-8">
              <MapPin className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-center">
                Zones d'intervention dans le 37
              </h2>
            </div>
            <p className="text-center text-lg mb-8 text-muted-foreground">
              Nous intervenons dans toutes les villes et communes
              d'Indre-et-Loire pour l'installation de votre douche sécurisée :
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {villes.map((ville) => (
                <div
                  className="bg-background p-4 rounded-lg text-center font-semibold"
                  key={ville}
                >
                  {ville}
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-muted-foreground">
              Et toutes les autres communes du département...
            </p>
          </div>
        </div>
      </section>

      {/* Nos services */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Nos services d'adaptation de salle de bain en Indre-et-Loire
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">
                  Remplacement baignoire par douche
                </h3>
                <p className="text-muted-foreground mb-4">
                  Transformation complète de votre baignoire en douche italienne
                  sécurisée avec sol antidérapant et barres d'appui.
                </p>
                <Button asChild className="p-0" variant="link">
                  <Link href="/remplacement-baignoire-par-douche">
                    En savoir plus →
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">
                  Installation douche PMR
                </h3>
                <p className="text-muted-foreground mb-4">
                  Douche aux normes PMR (Personnes à Mobilité Réduite) avec
                  accès plain-pied et équipements adaptés.
                </p>
                <Button asChild className="p-0" variant="link">
                  <Link href="/installation-douche-pmr">En savoir plus →</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">
                  Aménagement complet salle de bain
                </h3>
                <p className="text-muted-foreground mb-4">
                  Adaptation globale de votre salle de bain pour seniors :
                  douche, lavabo, WC, éclairage, revêtements.
                </p>
                <Button asChild className="p-0" variant="link">
                  <Link href="/amenagement-salle-bain-senior">
                    En savoir plus →
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">
                  Aides financières MaPrimeAdapt
                </h3>
                <p className="text-muted-foreground mb-4">
                  Accompagnement complet pour obtenir les aides financières :
                  prise en charge importante possible.
                </p>
                <Button asChild className="p-0" variant="link">
                  <Link href="/aides-financieres">En savoir plus →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à sécuriser votre salle de bain en Indre-et-Loire ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Demandez votre devis gratuit dès maintenant. Réponse sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ContactButton size="lg" className="bg-white text-primary hover:bg-primary hover:text-white border-white">
              Demander un devis gratuit
            </ContactButton>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-primary hover:text-white border-white">
              <a href={`tel:${config?.phone?.replace(/\s/g, "")}`}>
                <Phone className="mr-2 h-5 w-5" />
                Appeler maintenant
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
