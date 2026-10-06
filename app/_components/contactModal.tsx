"use client";

import { useEffect, useRef, useState } from "react";
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

export function ContactModal({ phone }: { phone?: string | null }) {
  const [open, setOpen] = useState(false);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    window.openContactModal = () => {
      opener.current = document.activeElement;
      setOpen(true);
    };

    return () => {
      delete window.openContactModal;
    };
  }, []);

  return (
    <Dialog modal onOpenChange={setOpen} open={open}>
      <DialogContent
        className="max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        onCloseAutoFocus={(event) => {
          if (opener.current instanceof HTMLElement) {
            event.preventDefault();
            opener.current.focus();
          }
        }}
      >
        <DialogTitle className="text-2xl font-bold">
          Demandez votre devis gratuit
        </DialogTitle>
        <DialogDescription className="text-muted-foreground">
          Intervention rapide dans votre région. Étude personnalisée de vos
          besoins.
        </DialogDescription>
        <ContactForm phone={phone} />
      </DialogContent>
    </Dialog>
  );
}
