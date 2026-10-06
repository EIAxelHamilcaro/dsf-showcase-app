"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CloseDialogButton } from "./closeDialogButton";
import { ContactForm } from "./contactForm";

interface WindowWithModal extends Window {
  openContactModal?: () => void;
}

declare const window: WindowWithModal;

export interface ContactModalProps {
  phone?: string | null;
}

export function ContactModal({ phone }: ContactModalProps) {
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
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent
        onCloseAutoFocus={(event) => {
          if (opener.current instanceof HTMLElement) {
            event.preventDefault();
            opener.current.focus();
          }
        }}
        showCloseButton={false}
      >
        <div className="dialog-body">
          <DialogHeader>
            <DialogTitle>Demandez votre devis gratuit</DialogTitle>
            <DialogDescription>
              Nous vous rappelons sous 24 heures. Le devis est gratuit et sans
              engagement.
            </DialogDescription>
          </DialogHeader>
          <ContactForm phone={phone} />
        </div>
        <CloseDialogButton />
      </DialogContent>
    </Dialog>
  );
}
