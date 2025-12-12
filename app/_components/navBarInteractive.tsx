"use client";
import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import type { Config1 } from "@/payload-types";
import Logo from "../../public/logo.png";

interface NavBarInteractiveProps {
  items: { label: string; href: string }[];
  config: Config1;
}

export default function NavBarInteractive({
  items,
  config,
}: NavBarInteractiveProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="lg:hidden flex justify-between w-full items-center">
        <Image
          alt="Logo de Douche Senior France"
          src={Logo}
          width={120}
          className="w-28 sm:w-36"
        />
        <Button
          className="lg:hidden p-2"
          onClick={() => setOpen((prev) => !prev)}
          size="icon"
          variant="outline"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <NavigationMenuList className="hidden lg:flex pl-8 xl:pl-20 2xl:pl-40">
        {items.map((item, i) => (
          <NavigationMenuItem key={`nav_item_${i.toString()}`}>
            <Button asChild type="button" variant={"link"}>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      <NavigationMenuList className="hidden lg:flex gap-3">
        <NavigationMenuItem>
          <Button asChild variant="link">
            <Link
              className="flex items-center text-primary py-2"
              href="tel:+33254975323"
            >
              <Phone className="h-4 w-4" />
              <span className="font-medium text-xl">{config.phone}</span>
            </Link>
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button asChild className="w-full">
            <Link href="#contact">Devis gratuit</Link>
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>

      {/* Mobile menu */}
      {open && (
        <nav className="lg:hidden w-full mt-4 pb-4 border-t border-border">
          <ul className="flex flex-col w-full pt-4 space-y-1">
            {items.map((item, i) => (
              <li key={`nav_mobile_${i.toString()}`} className="w-full">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block w-full py-3 px-2 text-base font-medium hover:bg-muted rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Separator className="my-4" />
          <div className="space-y-3 px-2">
            <a
              className="flex items-center text-primary py-2"
              href="tel:+33254975323"
            >
              <Phone className="h-5 w-5 mr-3" />
              <span className="font-medium text-lg">{config.phone}</span>
            </a>
            <Button asChild className="w-full" size="lg">
              <Link href="#contact" onClick={() => setOpen(false)}>
                Devis gratuit
              </Link>
            </Button>
          </div>
        </nav>
      )}
    </div>
  );
}
