import { CheckCircle2, Clock, Euro, Phone, Shield } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { getPayload } from "payload";
import { ContactButton } from "@/app/_components/contactButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import payloadConfig from "@/payload.config";

export const metadata: Metadata = {
  title:
    "Remplacement Baignoire par Douche | Installation 1 Jour | Centre-Val de Loire",
  description:
    "Transformez votre baignoire en douche sécurisée en 1 journée. Artisan certifié Handibat. Aide financière disponible (MaPrimeAdapt). ",
  alternates: {
    canonical:
      "https://www.douche-senior-france.com/remplacement-baignoire-par-douche",
  },
  openGraph: {
    title: "Remplacement Baignoire par Douche Senior | 1 Jour",
    description:
      "Transformation complète baignoire → douche sécurisée en 1 journée. Artisan certifié, aides financières disponibles.",
    url: "https://www.douche-senior-france.com/remplacement-baignoire-par-douche",
  },
};

export default async function RemplacementBaignoirePage() {
  const payload = await getPayload({ config: payloadConfig });
  const config = await payload.findByID({
    collection: "config",
    id: 1,
    depth: 1,
  });

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              Remplacement de{" "}
              <span className="text-primary">Baignoire par Douche</span>{" "}
              Sécurisée
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Fini la peur de tomber en enjambant votre baignoire.
              Transformation complète en douche plain-pied en une seule journée.
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

      {/* Pourquoi remplacer */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Pourquoi remplacer votre baignoire par une douche ?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-3">Sécurité</h3>
                <p className="text-sm text-muted-foreground">
                  Plus besoin d'enjamber un rebord haut. Accès plain-pied sans
                  risque de chute.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-3">Autonomie</h3>
                <p className="text-sm text-muted-foreground">
                  Gardez votre indépendance. Douchez-vous seul(e) en toute
                  sécurité.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-3">Rapidité</h3>
                <p className="text-sm text-muted-foreground">
                  Installation complète en 1 journée. Le matin baignoire, le
                  soir douche.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Euro className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-3">Aides financières</h3>
                <p className="text-sm text-muted-foreground">
                  Éligible MaPrimeAdapt et autres aides. Reste à charge réduit.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Comment se passe le remplacement ?
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Dépose de la baignoire
                  </h3>
                  <p className="text-muted-foreground">
                    Démontage complet de votre ancienne baignoire. Évacuation de
                    tous les gravats. Protection de votre logement pendant les
                    travaux.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Installation du receveur
                  </h3>
                  <p className="text-muted-foreground">
                    Pose d'un receveur extra-plat antidérapant. Parfaitement
                    étanche. Accès plain-pied sans ressaut (ou très bas selon
                    configuration).
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Équipements de sécurité
                  </h3>
                  <p className="text-muted-foreground">
                    Installation des parois, barres d'appui, siège rabattable si
                    nécessaire. Robinetterie thermostatique pour éviter les
                    brûlures.
                  </p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Finitions et nettoyage
                  </h3>
                  <p className="text-muted-foreground">
                    Habillage des murs si nécessaire. Raccordements plomberie.
                    Nettoyage complet. Votre douche est prête à utiliser le soir
                    même !
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Équipements inclus */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Équipements inclus dans votre douche
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Receveur extra-plat antidérapant
                </h3>
                <p className="text-sm text-muted-foreground">
                  Surface antidérapante pour éviter les glissades. Accès
                  plain-pied ou ressaut minimal selon votre salle de bain.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Parois de douche sécurisées
                </h3>
                <p className="text-sm text-muted-foreground">
                  Verre trempé ou acrylique résistant. Ouverture facile, système
                  anti-éclaboussures.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Barres d'appui murales
                </h3>
                <p className="text-sm text-muted-foreground">
                  Fixation renforcée pour un maintien sûr. Positionnement adapté
                  à vos besoins.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Robinetterie thermostatique
                </h3>
                <p className="text-sm text-muted-foreground">
                  Température constante, pas de risque de brûlure. Commandes
                  faciles à manipuler.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Siège de douche (option)
                </h3>
                <p className="text-sm text-muted-foreground">
                  Siège rabattable ou fixe selon vos préférences. Permet de se
                  doucher assis confortablement.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Fabrication 100% française
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tous nos équipements sont fabriqués en France. Qualité et
                  durabilité garanties.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Aides */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Financement : quelles aides pour remplacer votre baignoire ?
            </h2>
            <p className="text-lg mb-8 text-muted-foreground">
              Ne payez pas le prix fort ! Vous pouvez bénéficier de plusieurs
              aides cumulables :
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left mb-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2">MaPrimeAdapt</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Aide de l'État pour l'adaptation du logement. Montant selon
                    vos revenus.
                  </p>
                  <p className="text-xs font-semibold text-primary">
                    Prise en charge importante possible
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2">Crédit d'impôt 25%</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Crédit d'impôt sur les équipements d'accessibilité PMR
                  </p>
                  <p className="text-xs font-semibold text-primary">
                    Jusqu'à 5 000 € par personne
                  </p>
                </CardContent>
              </Card>
            </div>
            <Button asChild size="lg">
              <Link href="/aides-financieres">
                Tout savoir sur les aides financières →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Zones d'intervention */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Remplacement de baignoire en Centre-Val de Loire
            </h2>
            <p className="text-lg mb-8 text-muted-foreground">
              Nous intervenons dans 5 départements pour transformer votre
              baignoire en douche sécurisée :
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <Link href="/loir-et-cher">
                <Card className="hover:border-primary transition-colors cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <p className="font-bold">Loir-et-Cher (41)</p>
                    <p className="text-sm text-muted-foreground">
                      Blois, Romorantin...
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/indre-et-loire">
                <Card className="hover:border-primary transition-colors cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <p className="font-bold">Indre-et-Loire (37)</p>
                    <p className="text-sm text-muted-foreground">
                      Tours, Joué...
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/loiret">
                <Card className="hover:border-primary transition-colors cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <p className="font-bold">Loiret (45)</p>
                    <p className="text-sm text-muted-foreground">
                      Orléans, Montargis...
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/indre">
                <Card className="hover:border-primary transition-colors cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <p className="font-bold">Indre (36)</p>
                    <p className="text-sm text-muted-foreground">
                      Châteauroux, Issoudun...
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/cher">
                <Card className="hover:border-primary transition-colors cursor-pointer">
                  <CardContent className="pt-6 text-center">
                    <p className="font-bold">Cher (18)</p>
                    <p className="text-sm text-muted-foreground">
                      Bourges, Vierzon...
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à remplacer votre baignoire par une douche sécurisée ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Demandez votre devis gratuit. Visite à domicile et réponse sous 24h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ContactButton size="lg" className="bg-white text-primary hover:bg-primary hover:text-white border-white">
              Demander un devis gratuit
            </ContactButton>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-primary hover:text-white border-white">
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
