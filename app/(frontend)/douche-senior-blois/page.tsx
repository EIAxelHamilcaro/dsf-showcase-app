import { CheckCircle2, Clock, Euro, MapPin, Phone, Shield } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getPayload } from "payload";
import { ContactButton } from "@/app/_components/contactButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import payloadConfig from "@/payload.config";

export const metadata: Metadata = {
  title: "Douche Senior Blois | Artisan Certifié | Devis Gratuit 24h",
  description:
    "Installation douche sécurisée à Blois et agglo (Vineuil, La Chaussée-Saint-Victor). Artisan local certifié. Intervention en 1 jour. ",
  alternates: {
    canonical: "https://www.douche-senior-france.com/douche-senior-blois",
  },
  openGraph: {
    title: "Douche Senior Blois | Artisan Certifié",
    description:
      "Artisan local pour l'installation de douche sécurisée à Blois. Intervention rapide, aide financière disponible.",
    url: "https://www.douche-senior-france.com/douche-senior-blois",
  },
};

export default async function DoucheSeniorBloisPage() {
  const payload = await getPayload({ config: payloadConfig });
  const config = await payload.findByID({
    collection: "config",
    id: 1,
    depth: 1,
  });

  const quartiers = [
    "Centre-ville Blois",
    "Vineuil",
    "La Chaussée-Saint-Victor",
    "Saint-Gervais-la-Forêt",
    "Villebarou",
    "Saint-Denis-sur-Loire",
    "Les Grouets",
    "Vienne",
    "La Croix Chevalier",
    "Bas-Rivière",
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-2 text-primary font-semibold">
              <MapPin className="h-5 w-5" />
              <span>Blois et agglomération - Loir-et-Cher (41)</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              Installation{" "}
              <span className="text-primary">Douche Sécurisée</span> pour
              Seniors à Blois
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Artisan local certifié Handibat & Silverbat. Transformation de
              votre baignoire en douche plain-pied en 1 journée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ContactButton size="lg">Devis gratuit 24h</ContactButton>
              <Button asChild size="lg" variant="secondary">
                <a href={`tel:${config?.phone?.replace(/\s/g, "")}`}>
                  <Phone className="mr-2 h-5 w-5" />
                  {config?.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Pourquoi nous faire confiance à Blois ?
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Artisan local</h3>
                <p className="text-sm text-muted-foreground">
                  Basé à Selles-sur-Cher, intervention rapide sur Blois et toute
                  l'agglo
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Installation 1 jour</h3>
                <p className="text-sm text-muted-foreground">
                  Le matin baignoire, le soir douche sécurisée utilisable
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Certifié Handibat</h3>
                <p className="text-sm text-muted-foreground">
                  Label officiel pour l'adaptation PMR et seniors
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Euro className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Aides financières</h3>
                <p className="text-sm text-muted-foreground">
                  On vous accompagne pour MaPrimeAdapt et autres aides
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Secteurs d'intervention */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Intervention sur Blois et toute l'agglomération
            </h2>
            <p className="text-center text-lg mb-8 text-muted-foreground">
              Nous intervenons dans tous les quartiers de Blois et communes
              environnantes :
            </p>
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

      {/* Témoignage local */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span className="text-yellow-500 text-xl" key={i}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-lg mb-4 italic">
                  "Installation rapide et soignée. L'équipe est arrivée à 8h,
                  tout était terminé à 17h. Ma mère peut maintenant se doucher
                  sans risque dans son appartement des Grouets. Merci !"
                </p>
                <p className="font-semibold">Marie L. - Blois (Les Grouets)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Nos prestations à Blois
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-3">
                  Remplacement baignoire → douche
                </h3>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">
                      Dépose complète de votre ancienne baignoire
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">
                      Installation receveur extra-plat antidérapant
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">
                      Parois, barres d'appui, siège si besoin
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">
                      Robinetterie thermostatique sécurisée
                    </span>
                  </li>
                </ul>
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
                  Douche PMR sur-mesure
                </h3>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">
                      Accès plain-pied sans ressaut
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">
                      Dimensions adaptées fauteuil roulant
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">
                      Équipements certifiés normes PMR
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">
                      Éligible aides financières maximales
                    </span>
                  </li>
                </ul>
                <Button asChild className="p-0" variant="link">
                  <Link href="/installation-douche-pmr">En savoir plus →</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Aides financières */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Aides financières disponibles à Blois
            </h2>
            <p className="text-lg mb-8 text-muted-foreground">
              Ne payez pas le prix fort ! Plusieurs aides existent pour financer
              votre douche sécurisée :
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2">MaPrimeAdapt</h3>
                  <p className="text-sm text-muted-foreground">
                    Aide de l'État pour l'adaptation du logement. Prise en
                    charge importante selon vos revenus.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2">Crédit d'impôt</h3>
                  <p className="text-sm text-muted-foreground">
                    25% de crédit d'impôt sur les équipements d'accessibilité
                  </p>
                </CardContent>
              </Card>
            </div>
            <Button asChild size="lg">
              <Link href="/aides-financieres">Tout savoir sur les aides →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Vous habitez Blois ou l'agglomération ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Demandez votre devis gratuit maintenant. Visite à domicile et
            réponse sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ContactButton size="lg" variant="secondary">
              Demander un devis gratuit
            </ContactButton>
            <Button asChild size="lg" variant="secondary">
              <a href={`tel:${config?.phone?.replace(/\s/g, "")}`}>
                <Phone className="mr-2 h-5 w-5" />
                {config?.phone}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
