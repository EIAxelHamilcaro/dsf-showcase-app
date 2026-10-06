import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { PageLink } from "@/lib/pages/pageLinks";

interface RelatedLinksProps {
  links: PageLink[];
}

export function RelatedLinks({ links }: RelatedLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Pages liées"
      className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32 py-8 flex flex-wrap gap-2 justify-center"
    >
      {links.map((link) => (
        <Button asChild key={link.href} variant="outline">
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </nav>
  );
}
