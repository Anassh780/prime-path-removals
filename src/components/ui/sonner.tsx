"use client";

import { Toaster as SonnerToaster } from "sonner";

/**
 * Toast styling — deliberately SaaS-grade: white surface, hairline border,
 * layered shadow, brand-coloured icon rail. No default Sonner look.
 */
export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      offset={20}
      gap={10}
      closeButton
      toastOptions={{
        duration: 5000,
        classNames: {
          toast:
            "!rounded-lg !border !border-line !bg-white !shadow-lift !font-sans !p-4 !gap-3 !text-ink",
          title: "!text-sm !font-semibold !text-ink !leading-snug",
          description: "!text-[13px] !text-ink-soft !leading-relaxed",
          icon: "!mt-0.5",
          success: "[&_[data-icon]]:!text-emerald-600",
          error: "[&_[data-icon]]:!text-red-600",
          warning: "[&_[data-icon]]:!text-accent-600",
          closeButton:
            "!rounded-md !border-line !bg-white !text-ink-muted !transition-colors hover:!bg-surface-muted",
          actionButton:
            "!rounded-md !bg-navy-900 !text-white !transition-colors hover:!bg-navy-800",
          cancelButton:
            "!rounded-md !bg-surface-muted !text-ink-soft !transition-colors hover:!bg-surface-muted/80",
        },
      }}
    />
  );
}
