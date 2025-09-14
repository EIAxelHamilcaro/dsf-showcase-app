import {
  Accessibility,
  Lightbulb,
  Shield,
  Flower as Shower,
  Thermometer,
  Wrench,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ServicesSection() {
  const services = [
    {
      icon: Shower,
      title: "Douches sécurisées",
      description:
        "Remplacement de baignoire par douche à l'italienne, receveur antidérapant, parois adaptées",
    },
    {
      icon: Shield,
      title: "Barres d'appui",
      description:
        "Installation de barres de maintien ergonomiques, fixation renforcée selon normes",
    },
    {
      icon: Accessibility,
      title: "Sièges de douche",
      description:
        "Sièges rabattables, fixes ou amovibles, adaptés à tous les besoins",
    },
    {
      icon: Wrench,
      title: "Rehausse WC",
      description:
        "Cuvettes surélevées, abattants avec accoudoirs pour faciliter l'usage",
    },
    {
      icon: Lightbulb,
      title: "Éclairage adapté",
      description:
        "Éclairage LED renforcé, détecteurs de mouvement, éclairage d'urgence",
    },
    {
      icon: Thermometer,
      title: "Robinetterie thermostatique",
      description: "Mitigeurs à sécurité anti-brûlure, commandes ergonomiques",
    },
  ];

  return (
    <section className="py-20 bg-background" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
            Nos services d'adaptation
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Chaque installation est personnalisée selon vos besoins spécifiques.
            Nous utilisons uniquement des équipements certifiés et de qualité
            française.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <Card
              className="hover:shadow-lg transition-shadow"
              key={`service_${index.toString()}`}
            >
              <CardHeader>
                <service.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-primary/5 rounded-lg p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Aides financières disponibles
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Saviez-vous que vous pouvez bénéficier d'aides pour financer vos
              travaux d'adaptation ?
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3 text-xl font-bold shadow-lg">
                30%
              </div>
              <h4 className="font-semibold mb-2 text-lg">Crédit d'impôt</h4>
              <p className="text-muted-foreground">Jusqu'à 30% des travaux</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3 text-xl font-bold shadow-lg">
                ANAH
              </div>
              <h4 className="font-semibold mb-2 text-lg">Aide ANAH</h4>
              <p className="text-muted-foreground">Subventions selon revenus</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3 text-xl font-bold shadow-lg">
                APA
              </div>
              <h4 className="font-semibold mb-2 text-lg">APA</h4>
              <p className="text-muted-foreground">Allocation personnalisée</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3 text-xl font-bold shadow-lg">
                CAF
              </div>
              <h4 className="font-semibold mb-2 text-lg">Aide CAF</h4>
              <p className="text-muted-foreground">Prêt à l'amélioration</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground text-base">
              <strong>Je vous accompagne</strong> dans toutes vos démarches
              administratives pour maximiser vos aides.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
