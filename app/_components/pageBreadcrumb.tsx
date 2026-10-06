import Link from "next/link";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type { PageLink } from "@/lib/pages/pageLinks";

interface PageBreadcrumbProps {
  trail: PageLink[];
}

export function PageBreadcrumb({ trail }: PageBreadcrumbProps) {
  const current = trail.at(-1);
  const ancestors = trail.slice(0, -1);

  return (
    <Breadcrumb
      aria-label="Fil d'Ariane"
      className="container mx-auto px-4 sm:px-10 md:px-16 lg:px-32 py-3"
    >
      <BreadcrumbList>
        {ancestors.map((link) => (
          <Fragment key={link.href}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={link.href}>{link.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </Fragment>
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
