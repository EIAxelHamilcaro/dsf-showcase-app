import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { PageLink } from "@/lib/pages/pageLinks";
import { cn } from "@/lib/utils";

export const linkChipClass = "h-auto shrink py-2 whitespace-normal text-left";

export interface RelatedLinksProps {
  links: PageLink[];
  isReadingWidth?: boolean;
}

export function RelatedLinks({
  links,
  isReadingWidth = false,
}: RelatedLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Pages liées"
      className="mx-auto max-w-page px-gutter py-10"
    >
      <ul
        className={cn(
          "flex flex-wrap gap-3",
          isReadingWidth && "mx-auto max-w-reading",
        )}
      >
        {links.map((link) => (
          <li key={link.href}>
            <Button asChild className={linkChipClass} variant="quiet">
              <Link href={link.href}>{link.label}</Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
