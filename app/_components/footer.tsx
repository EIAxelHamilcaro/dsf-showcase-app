import { Mail, MapPin, Phone } from "lucide-react";
import type { Config1 } from "@/payload-types";

export function Footer({ config }: { config: Config1 }) {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              {config?.footer_section?.title}
            </h3>
            <p className="text-background/80 mb-4">
              {config?.footer_section?.description}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>{config?.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{config?.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{config?.footer_section?.region}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/60 text-sm">
            © 2025 Douche Senior France. Tous droits réservés. | Artisan
            français certifié | Devis gratuit
          </p>
        </div>
      </div>
    </footer>
  );
}
