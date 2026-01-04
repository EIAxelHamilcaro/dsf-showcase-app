import { CheckCircle2, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getPayload } from "payload";
import { ContactButton } from "@/app/_components/contactButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import payloadConfig from "@/payload.config";

export const metadata: Metadata = {
  title:
    "Aménagement Salle de Bain Senior | Adaptation Complète | Centre-Val de Loire",
  description:
    "Aménagement complet salle de bain pour seniors : douche, lavabo, WC, éclairage. Artisan certifié. Aides financières disponibles. ",
  alternates: {
    canonical:
      "https://www.douche-senior-france.com/amenagement-salle-bain-senior",
  },
};

export default async function AmenagementSalleBainPage() {
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
              Aménagement{" "}
              <span className="text-primary">Salle de Bain Senior</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Adaptation complète de votre salle de bain pour plus de sécurité
              et de confort au quotidien.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ContactButton size="lg">Devis gratuit</ContactButton>
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
            Pourquoi aménager sa salle de bain après 70 ans ?
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg mb-8 text-muted-foreground">
              La salle de bain est la pièce où ont lieu 46% des chutes à
              domicile chez les seniors. Un aménagement adapté permet de :
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <CheckCircle2 className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-bold mb-2">
                    Réduire les risques de chute
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Sol antidérapant, barres d'appui, éclairage adapté.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <CheckCircle2 className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-bold mb-2">Garder son autonomie</h3>
                  <p className="text-sm text-muted-foreground">
                    Continuer à vivre chez soi en toute sécurité.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <CheckCircle2 className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-bold mb-2">
                    Faciliter les gestes quotidiens
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Équipements ergonomiques, hauteurs adaptées.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <CheckCircle2 className="h-8 w-8 text-primary mb-3" />
                  <h3 className="font-bold mb-2">Valoriser son logement</h3>
                  <p className="text-sm text-muted-foreground">
                    Salle de bain moderne et accessible.
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
            Les aménagements possibles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-3">Douche sécurisée</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Remplacement baignoire par douche plain-pied, barres d'appui,
                  siège, sol antidérapant.
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
                <h3 className="font-bold mb-3">Lavabo PMR</h3>
                <p className="text-sm text-muted-foreground">
                  Lavabo à hauteur adaptée, passage fauteuil, robinetterie
                  ergonomique.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-3">WC surélevés</h3>
                <p className="text-sm text-muted-foreground">
                  Cuvette surélevée, barres de maintien, espace de circulation
                  adapté.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-3">Éclairage renforcé</h3>
                <p className="text-sm text-muted-foreground">
                  Spots LED puissants, interrupteurs accessibles, veilleuse
                  automatique.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-3">Sol antidérapant</h3>
                <p className="text-sm text-muted-foreground">
                  Revêtement sécurisé, évacuation eau optimisée.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-3">Porte adaptée</h3>
                <p className="text-sm text-muted-foreground">
                  Élargissement porte, poignée ergonomique, seuil supprimé.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Financement de l'aménagement
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Un aménagement complet peut être financé par plusieurs aides
            cumulables : MaPrimeAdapt et crédit d'impôt.
          </p>
          <Button asChild size="lg">
            <Link href="/aides-financieres">
              Découvrir les aides disponibles →
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Projet d'aménagement salle de bain senior ?
          </h2>
          <p className="text-xl mb-8">
            Visite gratuite à domicile. Devis personnalisé sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ContactButton size="lg" variant="outline">
              Demander un devis
            </ContactButton>
            <Button asChild size="lg" variant="outline">
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
