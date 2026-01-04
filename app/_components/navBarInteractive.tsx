"use client";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Config1 } from "@/payload-types";
import Logo from "../../public/logo.png";
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

export default function NavBarInteractive({
  items,
  config,
}: NavBarInteractiveProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleServiceClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHomePage) {
      return;
    }
    e.preventDefault();
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      {/* Mobile header */}
      <div className="lg:hidden flex justify-between w-full items-center">
        <Image
          alt="Logo de Douche Senior France"
          className="w-28 sm:w-36"
          src={Logo}
          width={120}
        />
        <Button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          size="icon"
          variant="outline"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Desktop menu */}
      <nav className="hidden lg:flex items-center w-full relative">
        {/* Navigation links - centered */}
        <ul className="flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {items.map((item, i) => (
            <li className="relative group" key={`nav_item_${i.toString()}`}>
              {item.children ? (
                <div
                  className="relative"
                  onMouseEnter={() => setDesktopDropdownOpen(true)}
                  onMouseLeave={() => setDesktopDropdownOpen(false)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                    onClick={(e) => {
                      if (isHomePage) {
                        handleServiceClick(e as any);
                      }
                      setDesktopDropdownOpen(!desktopDropdownOpen);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setDesktopDropdownOpen(!desktopDropdownOpen);
                      }
                      if (e.key === "Escape") {
                        setDesktopDropdownOpen(false);
                      }
                    }}
                    aria-expanded={desktopDropdownOpen}
                    aria-haspopup="menu"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${desktopDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown */}
                  <div
                    className={`absolute left-0 top-full pt-2 transition-all duration-200 z-50 ${
                      desktopDropdownOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
                    role="menu"
                    aria-hidden={!desktopDropdownOpen}
                  >
                    <div className="bg-background border border-border rounded-lg shadow-xl overflow-hidden w-[450px]">
                      <ul className="p-2 gap-1 flex flex-col">
                        {item.children.map((child, j) => (
                          <li key={`nav_child_${i.toString()}_${j.toString()}`} role="none">
                            <Link
                              className="block p-3 rounded-md transition-all duration-150 hover:bg-primary/10 hover:border-primary/20 border border-transparent group/item"
                              href={child.href}
                              role="menuitem"
                              onClick={() => setDesktopDropdownOpen(false)}
                            >
                              <div className="text-sm font-semibold leading-none mb-1.5 text-foreground group-hover/item:text-primary transition-colors">
                                {child.label}
                              </div>
                              {child.description && (
                                <p className="text-xs leading-snug text-muted-foreground">
                                  {child.description}
                                </p>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  className="block px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  href={item.href}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2 ml-auto">
          <Button asChild variant="link">
            <Link
              className="flex items-center gap-1.5 text-primary py-2"
              href="tel:+33254975323"
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium text-lg whitespace-nowrap">
                {config.phone}
              </span>
            </Link>
          </Button>
          <ContactButton>Devis gratuit</ContactButton>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden w-full mt-4 pb-4 border-t border-border">
          <ul className="flex flex-col w-full pt-4 space-y-1">
            {items.map((item, i) => (
              <li className="w-full" key={`nav_mobile_${i.toString()}`}>
                {item.children ? (
                  <div className="w-full">
                    <button
                      className="flex items-center justify-between w-full py-3 px-2 text-base font-medium text-foreground hover:bg-muted rounded-md transition-colors"
                      onClick={() => setMobileServicesOpen((prev) => !prev)}
                      type="button"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {mobileServicesOpen && (
                      <ul className="ml-4 space-y-1 mt-2">
                        <li>
                          <Link
                            className="block w-full py-2 px-2 text-sm text-primary font-medium hover:bg-muted rounded-md transition-colors"
                            href={item.href}
                            onClick={(e) => {
                              handleServiceClick(e);
                              setMobileMenuOpen(false);
                              setMobileServicesOpen(false);
                            }}
                          >
                            Voir tous les services
                          </Link>
                        </li>
                        {item.children.map((child, j) => (
                          <li
                            key={`nav_mobile_child_${i.toString()}_${j.toString()}`}
                          >
                            <Link
                              className="block w-full py-2 px-2 text-sm hover:bg-muted rounded-md transition-colors"
                              href={child.href}
                              onClick={() => {
                                setMobileMenuOpen(false);
                                setMobileServicesOpen(false);
                              }}
                            >
                              <div className="font-medium">{child.label}</div>
                              {child.description && (
                                <div className="text-xs text-muted-foreground mt-0.5">
                                  {child.description}
                                </div>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    className="block w-full py-3 px-2 text-base font-medium hover:bg-muted rounded-md transition-colors"
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="border-t border-border mt-4 pt-4 space-y-3 px-2">
            <a
              className="flex items-center text-primary py-2"
              href="tel:+33254975323"
            >
              <Phone className="h-5 w-5 mr-3" />
              <span className="font-medium text-lg">{config.phone}</span>
            </a>
            <ContactButton
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                setMobileServicesOpen(false);
              }}
              size="lg"
            >
              Devis gratuit
            </ContactButton>
          </div>
        </nav>
      )}
    </div>
  );
}
