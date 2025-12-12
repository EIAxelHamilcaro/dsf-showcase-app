import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Config1 } from "@/payload-types";

export function Footer({ config }: { config: Config1 }) {
  return (
    <footer className="pt-8 lg:pt-12 bg-foreground text-background mx-auto px-4 sm:px-10 md:px-16 lg:px-32">
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
            {config?.footer_section?.title}
          </h3>
          <p className="text-background/80 mb-4 text-sm sm:text-base">
            {config?.footer_section?.description}
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Contact</h4>
          <div className="space-y-2 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <span className="break-all">{config?.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              <span className="break-all">{config?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>{config?.footer_section?.region}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-background/20 mt-6 sm:mt-8 py-4 text-center space-y-2">
        <p className="text-background/60 text-xs sm:text-sm">
          ©{new Date().getFullYear()} Douche Senior France. Tous droits
          réservés. | Artisan français certifié | Devis gratuit
        </p>

        <p className="text-background/50 text-xs">
          Site conçu par{" "}
          <Link
            className="hover:text-primary font-medium transition-colors"
            href="https://www.linkedin.com/in/axelhamilcaro"
            rel="noopener noreferrer"
            target="_blank"
          >
            Axel Hamilcaro
          </Link>
        </p>
      </div>
    </footer>
  );
}
