import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "Quels sont les délais pour une installation ?",
      answer:
        "Après votre demande, je me déplace sous 48h pour établir un devis gratuit. Les travaux commencent généralement 1 à 2 semaines après validation du devis et durent en moyenne 2 à 3 jours selon la complexité du projet.",
    },
    {
      question: "Quelles aides financières sont disponibles ?",
      answer:
        "Plusieurs aides existent : crédit d'impôt jusqu'à 30%, subventions ANAH selon vos revenus, APA (Allocation Personnalisée d'Autonomie), prêts CAF à taux préférentiel. Je vous accompagne dans toutes vos démarches pour maximiser vos aides.",
    },
    {
      question: "Faut-il tout refaire ou peut-on adapter l'existant ?",
      answer:
        "Dans la plupart des cas, nous pouvons adapter votre salle de bain existante sans tout démolir. Remplacement de baignoire par douche, ajout de barres d'appui, changement de sol... Chaque solution est étudiée pour minimiser les travaux.",
    },
    {
      question: "Les équipements sont-ils garantis ?",
      answer:
        "Tous nos équipements sont certifiés et garantis 2 ans minimum. La main d'œuvre est garantie 1 an. Nous utilisons uniquement des matériaux de qualité française respectant les normes de sécurité les plus strictes.",
    },
    {
      question: "Intervenez-vous pendant que j'habite chez moi ?",
      answer:
        "Oui, nous organisons les travaux pour minimiser la gêne. Nous protégeons votre logement, travaillons proprement et vous laissons toujours accès à un point d'eau. La plupart des installations se font en 2-3 jours maximum.",
    },
    {
      question: "Le devis est-il vraiment gratuit et sans engagement ?",
      answer:
        "Absolument ! Le déplacement et l'établissement du devis sont entièrement gratuits et sans aucun engagement de votre part. Vous recevez une étude détaillée avec photos et recommandations personnalisées.",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
            Questions fréquentes
          </h2>
          <p className="text-xl text-muted-foreground text-pretty">
            Toutes les réponses à vos questions sur l'adaptation de salle de
            bain
          </p>
        </div>

        <Accordion className="space-y-4" collapsible type="single">
          {faqs.map((faq, index) => (
            <AccordionItem
              className="border border-border rounded-lg px-6"
              key={`faq_${index.toString()}`}
              value={`item-${index}`}
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
