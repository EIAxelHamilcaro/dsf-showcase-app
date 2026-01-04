"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ContactForm } from "./contactForm";

interface WindowWithModal extends Window {
  openContactModal?: () => void;
}

declare const window: WindowWithModal;

export function ContactModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Définir la fonction globale
    window.openContactModal = () => {
      setOpen(true);
    };

    // Nettoyer au démontage
    return () => {
      delete window.openContactModal;
    };
  }, []);

  const handleSuccess = () => {
    setOpen(false);
  };

  return (
    <Dialog modal onOpenChange={setOpen} open={open}>
      <DialogContent className="max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        <DialogTitle className="text-2xl font-bold">
          Demandez votre devis gratuit
        </DialogTitle>
        <DialogDescription className="text-muted-foreground">
          Intervention rapide dans votre région. Étude personnalisée de vos
          besoins.
        </DialogDescription>
        <ContactForm onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
