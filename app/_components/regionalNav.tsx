import { MapPin } from "lucide-react";
import Link from "next/link";
import type { PageLink } from "@/lib/pages/pageLinks";
import { PageSection, SectionHeader } from "./pageSection";

const citiesByDepartment: Record<string, string> = {
  "/loir-et-cher": "Blois, Romorantin, Vendôme",
  "/indre-et-loire": "Tours, Joué-lès-Tours, Amboise",
  "/loiret": "Orléans, Montargis, Olivet",
  "/indre": "Châteauroux, Issoudun, Le Blanc",
  "/cher": "Bourges, Vierzon, Saint-Amand-Montrond",
};

const displayOrder = Object.keys(citiesByDepartment);

const displayRank = (href: string) => {
  const rank = displayOrder.indexOf(href);

  return rank === -1 ? displayOrder.length : rank;
};

export interface RegionalNavSectionProps {
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
    <PageSection id="zone-intervention" tone="muted">
      <SectionHeader
        heading="Toute la région Centre-Val de Loire"
        intro="Artisan certifié présent dans les 5 départements. Installation rapide partout en région Centre."
      />

      <nav aria-label="Départements desservis">
        <ul className="tile-wall sm:grid-cols-2 lg:grid-cols-3">
          {orderedDepartments.map((department) => (
            <li key={department.href}>
              <Link
                className="tile flex h-full items-start gap-stack"
                href={department.href}
              >
                <MapPin aria-hidden="true" className="icon-mark" />
                <span className="grid">
                  <strong className="tile-title">{department.label}</strong>
                  <span className="soft">
                    {citiesByDepartment[department.href]}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {cities.length > 0 ? (
        <nav aria-labelledby="villes-desservies" className="grid gap-stack">
          <h3 id="villes-desservies">Nos pages par ville</h3>
          <ul className="tile-wall" data-fit="auto">
            {cities.map((city) => (
              <li key={city.href}>
                <Link
                  className="tile flex h-full items-center"
                  data-size="compact"
                  href={city.href}
                >
                  <span className="tile-title">{city.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="soft">
            Nous intervenons aussi dans toutes les autres communes des 5
            départements.
          </p>
        </nav>
      ) : null}
    </PageSection>
  );
}
