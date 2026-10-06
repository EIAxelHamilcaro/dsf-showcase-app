"use client";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  useId,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { toTelHref } from "@/lib/seo/phone";
import { cn } from "@/lib/utils";
import type { Config1 } from "@/payload-types";
import { ContactButton } from "./contactButton";

interface NavItem {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

interface NavBarInteractiveProps {
  items: NavItem[];
  config: Config1;
}

const desktopLinkClass =
  "flex min-h-11 items-center gap-1 rounded-md px-3 text-base font-semibold whitespace-nowrap hover:bg-muted hover:text-primary";

const mobileLinkClass =
  "flex min-h-12 w-full items-center justify-between rounded-md px-3 text-lg font-semibold hover:bg-muted hover:text-primary";

export default function NavBarInteractive({
  items,
  config,
}: NavBarInteractiveProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const id = useId();
  const servicesTrigger = useRef<HTMLButtonElement>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const phone = config.phone ?? "";

  const scrollToServices = (event: MouseEvent<HTMLElement>) => {
    if (!isHomePage) {
      return;
    }

    event.preventDefault();
    document.getElementById("services")?.scrollIntoView();
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  const closeMobileMenuOnEscape = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Escape" || !mobileMenuOpen) {
      return;
    }

    closeMobileMenu();
    menuTrigger.current?.focus();
  };

  const toggleDesktopDropdown = (event: MouseEvent<HTMLButtonElement>) => {
    const isMouseClick =
      (event.nativeEvent as PointerEvent).pointerType === "mouse";

    setDesktopDropdownOpen((isOpen) => isMouseClick || !isOpen);
  };

  const closeDesktopDropdownOnEscape = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Escape" || !desktopDropdownOpen) {
      return;
    }

    setDesktopDropdownOpen(false);
    servicesTrigger.current?.focus();
  };

  const closeDesktopDropdownOnFocusOut = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setDesktopDropdownOpen(false);
    }
  };

  return (
    <>
      <nav aria-label="Navigation principale" className="hidden xl:block">
        <ul className="flex items-center">
          {items.map((item) =>
            item.children ? (
              <li
                className="relative"
                key={item.href}
                onBlur={closeDesktopDropdownOnFocusOut}
                onKeyDown={closeDesktopDropdownOnEscape}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") {
                    setDesktopDropdownOpen(true);
                  }
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType === "mouse") {
                    setDesktopDropdownOpen(false);
                  }
                }}
              >
                <Button
                  aria-controls={`${id}-services`}
                  aria-expanded={desktopDropdownOpen}
                  className={desktopLinkClass}
                  onClick={toggleDesktopDropdown}
                  ref={servicesTrigger}
                  type="button"
                  variant="ghost"
                >
                  {item.label}
                  <ChevronDown aria-hidden="true" className="size-4" />
                </Button>

                <ul
                  className={cn(
                    "absolute top-full left-0 z-50 w-md flex-col gap-1 rounded-lg border bg-background p-2 shadow-lg",
                    desktopDropdownOpen ? "flex" : "hidden",
                  )}
                  id={`${id}-services`}
                >
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        className="block rounded-md p-3 hover:bg-muted"
                        href={child.href}
                        onClick={() => setDesktopDropdownOpen(false)}
                      >
                        <span className="block font-bold text-primary">
                          {child.label}
                        </span>
                        {child.description ? (
                          <span className="block text-small text-muted-foreground">
                            {child.description}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.href}>
                <Link className={desktopLinkClass} href={item.href}>
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>

      <div className="flex items-center gap-2 sm:gap-3 xl:gap-1">
        <Button
          asChild
          className="px-0 text-base font-extrabold text-primary has-[>svg]:px-0 max-[359px]:text-small sm:text-lg sm:has-[>svg]:px-3"
          variant="link"
        >
          <a href={toTelHref(phone)}>
            <Phone aria-hidden="true" className="size-5 max-[400px]:hidden" />
            {phone}
          </a>
        </Button>
        <ContactButton className="hidden sm:inline-flex font-bold">
          Devis gratuit
        </ContactButton>
        <Button
          aria-controls={mobileMenuOpen ? `${id}-menu` : undefined}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="xl:hidden"
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          onKeyDown={closeMobileMenuOnEscape}
          ref={menuTrigger}
          size="icon"
          variant="quiet"
        >
          {mobileMenuOpen ? (
            <X aria-hidden="true" className="size-6" />
          ) : (
            <Menu aria-hidden="true" className="size-6" />
          )}
        </Button>
      </div>

      {mobileMenuOpen ? (
        <nav
          aria-label="Navigation principale"
          className="xl:hidden basis-full border-t mt-2 pt-2 pb-3 max-h-[calc(100dvh-5rem)] overflow-y-auto"
          id={`${id}-menu`}
          onKeyDown={closeMobileMenuOnEscape}
        >
          <ul className="flex flex-col gap-1">
            {items.map((item) => (
              <li key={item.href}>
                {item.children ? (
                  <>
                    <Button
                      aria-controls={
                        mobileServicesOpen ? `${id}-mobile-services` : undefined
                      }
                      aria-expanded={mobileServicesOpen}
                      className={mobileLinkClass}
                      onClick={() => setMobileServicesOpen((isOpen) => !isOpen)}
                      type="button"
                      variant="ghost"
                    >
                      {item.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "size-5",
                          mobileServicesOpen && "rotate-180",
                        )}
                      />
                    </Button>

                    {mobileServicesOpen ? (
                      <ul
                        className="ml-3 flex flex-col gap-1 border-l-2 border-primary pl-2"
                        id={`${id}-mobile-services`}
                      >
                        <li>
                          <Link
                            className={cn(mobileLinkClass, "text-primary")}
                            href={item.href}
                            onClick={(event) => {
                              scrollToServices(event);
                              closeMobileMenu();
                            }}
                          >
                            Voir tous les services
                          </Link>
                        </li>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              className="block rounded-md px-3 py-2 hover:bg-muted"
                              href={child.href}
                              onClick={closeMobileMenu}
                            >
                              <span className="block text-lg font-semibold">
                                {child.label}
                              </span>
                              {child.description ? (
                                <span className="block text-small text-muted-foreground">
                                  {child.description}
                                </span>
                              ) : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </>
                ) : (
                  <Link
                    className={mobileLinkClass}
                    href={item.href}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <ContactButton
            className="mt-3 w-full sm:hidden font-bold"
            onClick={closeMobileMenu}
            size="lg"
          >
            Devis gratuit
          </ContactButton>
        </nav>
      ) : null}
    </>
  );
}
