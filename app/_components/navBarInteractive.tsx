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
    <>
      <div className="lg:hidden flex justify-between w-full items-center">
        <Image alt="Logo de Douche Senior France" src={Logo} width={150} />
        <Button
          className="lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          size="sm"
          variant="outline"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <NavigationMenuList className="hidden lg:flex pl-40">
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

      {open && (
        <NavigationMenuList className="w-screen flex-col lg:hidden items-start p-2 pb-0 bg-card">
          {items.map((item, i) => (
            <NavigationMenuItem key={`nav_item_${i.toString()}`}>
              <Button
                asChild
                className="text-base"
                type="button"
                variant={"link"}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            </NavigationMenuItem>
          ))}
          <Separator />
          <NavigationMenuItem className="w-full">
            <a
              className="flex items-center text-primary"
              href="tel:+33254975323"
            >
              <Phone className="h-4 w-4 mr-2" />
              <span className="font-medium">02 54 97 53 23</span>
            </a>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full pb-2">
            <Button asChild className="w-full">
              <Link href="#contact">Devis gratuit</Link>
            </Button>
          </NavigationMenuItem>
          <Separator className="pb-0 mb-0" />
        </NavigationMenuList>
      )}
    </>
  );
}
