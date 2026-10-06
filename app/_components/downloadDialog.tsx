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
        size="xl"
        variant="quiet"
      >
        <Download aria-hidden="true" className="size-5 text-primary" />
        {label}
      </Button>
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogContent
          className="max-w-[95vw] sm:max-w-lg"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            trigger.current?.focus();
          }}
        >
          <DialogHeader className="sm:text-center">
            <DialogTitle className="text-xl sm:text-2xl font-bold">
              {title}
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground">
              {description}
            </DialogDescription>
          </DialogHeader>
          <ModalMultiStepForm link={link} phone={phone} />
        </DialogContent>
      </Dialog>
    </>
  );
}
