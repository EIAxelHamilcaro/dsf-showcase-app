import { MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { PageLink } from "@/lib/pages/pageLinks";

const citiesByDepartment: Record<string, string> = {
  "/loir-et-cher": "Blois, Romorantin, Vendôme",
  "/indre-et-loire": "Tours, Joué-lès-Tours, Amboise",
  "/loiret": "Orléans, Montargis, Olivet",
  "/indre": "Châteauroux, Issoudun, Le Blanc",
  "/cher": "Bourges, Vierzon, St-Amand",
};

const displayOrder = Object.keys(citiesByDepartment);

const displayRank = (href: string) => {
  const rank = displayOrder.indexOf(href);

  return rank === -1 ? displayOrder.length : rank;
};

interface RegionalNavSectionProps {
  departments: PageLink[];
  cities: PageLink[];
}

export function RegionalNavSection({
  departments,
  cities,
}: RegionalNavSectionProps) {
  const orderedDepartments = [...departments].sort(
    (first, second) => displayRank(first.href) - displayRank(second.href),
  );

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-muted">
      <div className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Toute la région Centre-Val de Loire
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Artisan certifié présent dans les 5 départements. Installation
              rapide partout en région Centre.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {orderedDepartments.map((dept) => (
              <Link href={dept.href} key={dept.href}>
                <Card className="h-full hover:border-primary transition-all duration-200 hover:shadow-lg cursor-pointer group">
                  <CardContent className="pt-6 text-center">
                    <MapPin className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-lg md:text-xl mb-2 group-hover:text-primary transition-colors">
                      {dept.label}
                    </h3>
                    {citiesByDepartment[dept.href] ? (
                      <p className="text-sm md:text-base text-muted-foreground">
                        {citiesByDepartment[dept.href]}
                      </p>
                    ) : null}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              + toutes les communes des 5 départements
            </p>
            <nav
              aria-label="Villes desservies"
              className="mt-6 flex flex-wrap justify-center gap-2"
            >
              {cities.map((city) => (
                <Button asChild key={city.href} variant="outline">
                  <Link href={city.href}>{city.label}</Link>
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
