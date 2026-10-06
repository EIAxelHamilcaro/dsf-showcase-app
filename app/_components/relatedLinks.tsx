import Link from "next/link";
import type { PageLink } from "@/lib/pages/pageLinks";
import { PageSection } from "./pageSection";

export interface RelatedLinksProps {
  links: PageLink[];
}

export function RelatedLinks({ links }: RelatedLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <PageSection tone="muted">
      <nav aria-labelledby="pages-liees" className="grid gap-stack">
        <h2 id="pages-liees">À lire aussi</h2>
        <ul className="tile-wall sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className="tile flex h-full items-center"
                data-size="compact"
                href={link.href}
              >
                <span className="tile-title">{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </PageSection>
  );
}
