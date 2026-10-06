import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

export function CloseDialogButton() {
  return (
    <DialogClose asChild>
      <Button
        aria-label="Fermer la fenêtre"
        className="absolute top-3 right-3"
        size="icon"
        variant="secondary"
      >
        <X aria-hidden="true" />
      </Button>
    </DialogClose>
  );
}
