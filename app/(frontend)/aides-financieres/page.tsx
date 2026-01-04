import { CheckCircle2, Euro, FileText, Phone, Users } from "lucide-react";
import type { Metadata } from "next";
import { getPayload } from "payload";
import { ContactButton } from "@/app/_components/contactButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import payloadConfig from "@/payload.config";

export const metadata: Metadata = {
  title: "Aides Financières Douche Senior 2026 | MaPrimeAdapt, Crédit d'Impôt",
  description:
    "Toutes les aides pour financer votre douche senior : MaPrimeAdapt et crédit d'impôt. On vous accompagne dans vos démarches. ",
  alternates: {
    canonical: "https://www.douche-senior-france.com/aides-financieres",
  },
};

export default async function AidesFinancieresPage() {
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
              Aides Financières pour{" "}
              <span className="text-primary">Douche Senior</span> en 2026
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Ne payez pas le prix fort ! Plusieurs aides cumulables existent
              pour financer l'installation de votre douche sécurisée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ContactButton size="lg">
                Simuler mes aides gratuitement
              </ContactButton>
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

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Les principales aides disponibles
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-primary">
              <CardContent className="pt-6">
                <Euro className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">MaPrimeAdapt</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Aide de l'État pour l'adaptation du logement des personnes
                  âgées ou en situation de handicap.
                </p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm">
                    <strong>Montant :</strong> Selon vos revenus (prise en
                    charge importante possible)
                  </p>
                  <p className="text-sm">
                    <strong>Conditions :</strong> Propriétaire occupant ou
                    locataire, + 60 ans ou situation handicap
                  </p>
                  <p className="text-sm">
                    <strong>Plafond travaux :</strong> 22 000 €
                  </p>
                </div>
                <div className="bg-primary/10 p-3 rounded-lg">
                  <p className="text-xs font-semibold">
                    ⚠️ Artisan certifié Handibat OBLIGATOIRE (nous le sommes !)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <FileText className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">Crédit d'impôt 25%</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Crédit d'impôt sur le revenu pour l'installation d'équipements
                  d'accessibilité.
                </p>
                <div className="space-y-2 mb-4">
                  <p className="text-sm">
                    <strong>Montant :</strong> 25% des dépenses d'équipements
                  </p>
                  <p className="text-sm">
                    <strong>Plafond :</strong> 5 000 € pour une personne seule,
                    10 000 € pour un couple
                  </p>
                  <p className="text-sm">
                    <strong>Cumulable :</strong> Avec MaPrimeAdapt
                  </p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-xs">
                    Exemple : 10 000 € de travaux = 2 500 € de crédit d'impôt
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Comment obtenir ces aides ?
            </h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">
                        Contactez-nous pour un devis
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Nous établissons un devis gratuit détaillé de vos
                        travaux.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Nous vous accompagnons</h3>
                      <p className="text-sm text-muted-foreground">
                        On vous aide à identifier les aides auxquelles vous avez
                        droit et à monter vos dossiers.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">
                        Dépôt des demandes d'aides
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Transmission des dossiers aux organismes. Certaines
                        aides nécessitent une demande AVANT travaux.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">
                        Installation de votre douche
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Une fois les accords obtenus, nous réalisons
                        l'installation en 1 journée.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Besoin d'aide pour vos démarches ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nous vous accompagnons gratuitement pour identifier et obtenir
            toutes les aides auxquelles vous avez droit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ContactButton size="lg" variant="secondary">
              Être accompagné gratuitement
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
