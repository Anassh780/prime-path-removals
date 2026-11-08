"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-navy-950/45 backdrop-blur-[2px]",
      "data-[state=open]:animate-[fade-in_0.2s_ease-out_both] data-[state=closed]:animate-fade-out",
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & {
    side?: "left" | "right";
    title?: string;
  }
>(({ className, children, side = "right", title, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-y-0 z-50 flex w-[min(24rem,88vw)] flex-col bg-white shadow-overlay",
        "data-[state=open]:animate-slide-in-panel",
        side === "right"
          ? "right-0 border-l border-line data-[state=closed]:animate-slide-out-right"
          : "left-0 border-r border-line data-[state=closed]:animate-slide-out-left",
        className,
      )}
      {...props}
    >
      {title ? (
        <SheetPrimitive.Title className="sr-only">{title}</SheetPrimitive.Title>
      ) : null}
      <SheetPrimitive.Close
        className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-md text-ink-muted transition-colors duration-150 hover:bg-surface-muted hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-royal-600/15"
        aria-label="Close menu"
      >
        <X className="size-5" />
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = "SheetContent";

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetOverlay,
  SheetPortal,
};
