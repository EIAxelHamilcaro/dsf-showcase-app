import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import type { PageLink } from "@/lib/pages/pageLinks";

export interface PageBreadcrumbProps {
  trail: PageLink[];
}

export function PageBreadcrumb({ trail }: PageBreadcrumbProps) {
  const current = trail.at(-1);
  const ancestors = trail.slice(0, -1);

  return (
    <Breadcrumb aria-label="Fil d'Ariane">
      <BreadcrumbList>
        {ancestors.map((link) => (
          <BreadcrumbItem key={link.href}>
            <BreadcrumbLink asChild>
              <Link href={link.href}>{link.label}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
        {current ? (
          <BreadcrumbItem>
            <BreadcrumbPage>{current.label}</BreadcrumbPage>
          </BreadcrumbItem>
        ) : null}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
