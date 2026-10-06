"use client";
import { Download } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CloseDialogButton } from "./closeDialogButton";
import { ModalMultiStepForm } from "./multiStepForm";

export interface DownloadDialogProps {
  label: string;
  title: string;
  description: string;
  link: string;
  phone?: string | null;
}

export function DownloadDialog({
  label,
  title,
  description,
  link,
  phone,
}: DownloadDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        aria-haspopup="dialog"
        onClick={() => setIsOpen(true)}
        ref={trigger}
        variant="secondary"
      >
        <Download aria-hidden="true" />
        {label}
      </Button>
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogContent
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            trigger.current?.focus();
          }}
          showCloseButton={false}
        >
          <div className="dialog-body">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <ModalMultiStepForm link={link} phone={phone} />
          </div>
          <CloseDialogButton />
        </DialogContent>
      </Dialog>
    </>
  );
}
