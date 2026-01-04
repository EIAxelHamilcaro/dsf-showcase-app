import { MapPin } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export function RegionalNavSection() {
  const departments = [
    {
      name: "Loir-et-Cher (41)",
      slug: "/loir-et-cher",
      cities: "Blois, Romorantin, Vendôme",
    },
    {
      name: "Indre-et-Loire (37)",
      slug: "/indre-et-loire",
      cities: "Tours, Joué-lès-Tours, Amboise",
    },
    {
      name: "Loiret (45)",
      slug: "/loiret",
      cities: "Orléans, Montargis, Olivet",
    },
    {
      name: "Indre (36)",
      slug: "/indre",
      cities: "Châteauroux, Issoudun, Le Blanc",
    },
    {
      name: "Cher (18)",
      slug: "/cher",
      cities: "Bourges, Vierzon, St-Amand",
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Toute la région Centre-Val de Loire
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Artisan certifié présent dans les 5 départements. Installation rapide
              partout en région Centre.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {departments.map((dept) => (
              <Link href={dept.slug} key={dept.slug}>
                <Card className="h-full hover:border-primary transition-all duration-200 hover:shadow-lg cursor-pointer group">
                  <CardContent className="pt-6 text-center">
                    <MapPin className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-lg md:text-xl mb-2 group-hover:text-primary transition-colors">
                      {dept.name}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {dept.cities}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              + toutes les communes des 5 départements
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
