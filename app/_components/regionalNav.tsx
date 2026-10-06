import { MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { PageLink } from "@/lib/pages/pageLinks";
import { cn } from "@/lib/utils";
import { PageSection, sectionLeadClass } from "./pageSection";
import { linkChipClass } from "./relatedLinks";

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
    <PageSection tone="muted">
      <div className="mb-10 space-y-4 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Toute la région Centre-Val de Loire
        </h2>
        <p className={cn(sectionLeadClass, "mx-auto max-w-3xl")}>
          Artisan certifié présent dans les 5 départements. Installation rapide
          partout en région Centre.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {orderedDepartments.map((dept) => (
          <Link
            className="group flex items-start gap-4 rounded-xl border bg-background p-6 hover:border-primary"
            href={dept.href}
            key={dept.href}
          >
            <MapPin
              aria-hidden="true"
              className="mt-1 size-8 shrink-0 text-primary"
            />
            <div>
              <h3 className="text-xl font-bold text-primary underline group-hover:no-underline">
                {dept.label}
              </h3>
              {citiesByDepartment[dept.href] ? (
                <p className="text-muted-foreground">
                  {citiesByDepartment[dept.href]}
                </p>
              ) : null}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground">
          + toutes les communes des 5 départements
        </p>
        {cities.length > 0 ? (
          <nav
            aria-label="Villes desservies"
            className="mt-6 flex flex-wrap justify-center gap-3"
          >
            {cities.map((city) => (
              <Button
                asChild
                className={linkChipClass}
                key={city.href}
                variant="outline"
              >
                <Link href={city.href}>{city.label}</Link>
              </Button>
            ))}
          </nav>
        ) : null}
      </div>
    </PageSection>
  );
}
