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
import type { GlobalSelect } from "@/payload-types";
import Logo from "../../public/logo.png";

interface NavBarInteractiveProps {
  items: { label: string; href: string }[];
  global: GlobalSelect;
}

export default function NavBarInteractive({
  items,
  global,
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

      <NavigationMenuList className="hidden lg:flex">
        {items.map((item, i) => (
          <NavigationMenuItem key={`nav_item_${i.toString()}`}>
            <Button asChild type="button" variant={"link"}>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      <NavigationMenuList className="hidden lg:flex">
        <NavigationMenuItem>
          <a
            className="flex items-center text-primary px-3 py-2"
            href="tel:+33254975323"
          >
            <Phone className="h-4 w-4 mr-2" />
            <span className="font-medium">{global.phone}</span>
          </a>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button>Devis gratuit</Button>
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
          <NavigationMenuItem className="w-full px-5">
            <a
              className="flex items-center text-primary"
              href="tel:+33254975323"
            >
              <Phone className="h-4 w-4 mr-2" />
              <span className="font-medium">02 54 97 53 23</span>
            </a>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full pb-2 px-5">
            <Button className="w-full">Devis gratuit</Button>
          </NavigationMenuItem>
          <Separator className="pb-0 mb-0" />
        </NavigationMenuList>
      )}
    </>
  );
}
