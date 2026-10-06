"use client";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toTelHref } from "@/lib/seo/phone";
import { cn } from "@/lib/utils";
import { ContactButton } from "./contactButton";

export interface NavItem {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

const isNotHome = (item: NavItem) => item.href !== "/#accueil";

export interface NavBarInteractiveProps {
  items: NavItem[];
  phone: string;
}

export default function NavBarInteractive({
  items,
  phone,
}: NavBarInteractiveProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuServicesOpen, setIsMenuServicesOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const id = useId();
  const services = useRef<HTMLLIElement>(null);
  const servicesTrigger = useRef<HTMLButtonElement>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isServicesOpen) {
      return;
    }

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!services.current?.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);

    return () =>
      document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, [isServicesOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMenuServicesOpen(false);
  };

  const closeMenuOnEscape = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Escape" || !isMenuOpen) {
      return;
    }

    closeMenu();
    menuTrigger.current?.focus();
  };

  const closeServicesOnEscape = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Escape" || !isServicesOpen) {
      return;
    }

    setIsServicesOpen(false);
    servicesTrigger.current?.focus();
  };

  return (
    <>
      <nav aria-label="Navigation principale" className="hidden xl:block">
        <ul className="flex items-center">
          {items.filter(isNotHome).map((item) =>
            item.children ? (
              <li
                className="relative"
                key={item.href}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setIsServicesOpen(false);
                  }
                }}
                onKeyDown={closeServicesOnEscape}
                ref={services}
              >
                <Button
                  aria-controls={`${id}-services`}
                  aria-expanded={isServicesOpen}
                  onClick={() => setIsServicesOpen((isOpen) => !isOpen)}
                  ref={servicesTrigger}
                  type="button"
                  variant="ghost"
                >
                  {item.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(isServicesOpen && "rotate-180")}
                  />
                </Button>

                <ul
                  className={cn(
                    "menu-panel absolute top-full left-0 z-50 w-md",
                    !isServicesOpen && "hidden",
                  )}
                  id={`${id}-services`}
                >
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        className="menu-item"
                        href={child.href}
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <span className="menu-item-title">{child.label}</span>
                        {child.description ? (
                          <span className="small soft">
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
                <Link className="nav-link" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>

      <div className="flex items-center gap-grout">
        {phone ? (
          <Button
            aria-label={`Appeler le ${phone}`}
            asChild
            data-emphasis="phone"
            variant="link"
          >
            <a href={toTelHref(phone)}>
              <Phone aria-hidden="true" className="max-[24rem]:hidden" />
              <span className="min-[26rem]:hidden">Appeler</span>
              <span className="max-[26rem]:hidden">{phone}</span>
            </a>
          </Button>
        ) : null}
        <ContactButton className="max-md:hidden">Devis gratuit</ContactButton>
        <Button
          aria-controls={`${id}-menu`}
          aria-expanded={isMenuOpen}
          className="xl:hidden"
          onClick={() => (isMenuOpen ? closeMenu() : setIsMenuOpen(true))}
          onKeyDown={closeMenuOnEscape}
          ref={menuTrigger}
          type="button"
          variant="secondary"
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          {isMenuOpen ? "Fermer" : "Menu"}
        </Button>
      </div>

      <nav
        aria-label="Navigation principale"
        className={cn(
          "rule-top max-h-[calc(100dvh-var(--header-height))] basis-full overflow-y-auto pb-stack xl:hidden",
          !isMenuOpen && "hidden",
        )}
        id={`${id}-menu`}
        onKeyDown={closeMenuOnEscape}
      >
        <ul>
          {items.map((item) => (
            <li key={item.href}>
              {item.children ? (
                <>
                  <Button
                    aria-controls={`${id}-menu-services`}
                    aria-expanded={isMenuServicesOpen}
                    className="nav-link w-full justify-between"
                    data-size="lg"
                    onClick={() => setIsMenuServicesOpen((isOpen) => !isOpen)}
                    type="button"
                    variant="ghost"
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(isMenuServicesOpen && "rotate-180")}
                    />
                  </Button>

                  <ul
                    className={cn(
                      "rule-start",
                      !isMenuServicesOpen && "hidden",
                    )}
                    id={`${id}-menu-services`}
                  >
                    <li>
                      <Link
                        className="nav-link"
                        data-size="lg"
                        href={item.href}
                        onClick={closeMenu}
                      >
                        Voir tous les services
                      </Link>
                    </li>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          className="menu-item"
                          href={child.href}
                          onClick={closeMenu}
                        >
                          <span className="menu-item-title">{child.label}</span>
                          {child.description ? (
                            <span className="small soft">
                              {child.description}
                            </span>
                          ) : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  className="nav-link"
                  data-size="lg"
                  href={item.href}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <ContactButton
          className="w-full md:hidden"
          onClick={() => {
            closeMenu();
            menuTrigger.current?.focus();
          }}
          size="lg"
        >
          Devis gratuit
        </ContactButton>
      </nav>
    </>
  );
}
