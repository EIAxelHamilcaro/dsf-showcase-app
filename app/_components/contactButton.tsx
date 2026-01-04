"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface WindowWithModal extends Window {
  openContactModal?: () => void;
}

declare const window: WindowWithModal;

export function ContactButton({
  children,
  variant = "default",
  size = "default",
  className,
  onClick,
}: {
  children: ReactNode;
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  onClick?: () => void;
}) {
  const handleClick = () => {
    if (window?.openContactModal) {
      window.openContactModal();
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      className={className}
      onClick={handleClick}
      size={size}
      variant={variant}
    >
      {children}
    </Button>
  );
}
