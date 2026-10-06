"use client";

import type { VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { Button, type buttonVariants } from "@/components/ui/button";

interface WindowWithModal extends Window {
  openContactModal?: () => void;
}

declare const window: WindowWithModal;

export interface ContactButtonProps
  extends VariantProps<typeof buttonVariants> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ContactButton({
  children,
  variant,
  size,
  className,
  onClick,
}: ContactButtonProps) {
  const handleClick = () => {
    window.openContactModal?.();
    onClick?.();
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
