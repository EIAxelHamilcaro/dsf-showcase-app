import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SDB Seniors</h3>
            <p className="text-background/80 mb-4">
              Votre spécialiste français de l'adaptation de salles de bain pour
              seniors. Sécurité, confort et savoir-faire artisanal depuis 15
              ans.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@sdb-seniors.fr</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Région Auvergne-Rhône-Alpes</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-1 text-background/80">
              <li>Douches sécurisées</li>
              <li>Barres d'appui</li>
              <li>Sols antidérapants</li>
              <li>Rehausse WC</li>
              <li>Sièges de douche</li>
              <li>Éclairage adapté</li>
            </ul>
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
