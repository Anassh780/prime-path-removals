import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] transition-colors duration-150 ease-out",
  {
    variants: {
      variant: {
        neutral: "border-line bg-surface-subtle text-ink-soft",
        navy: "border-navy-200 bg-navy-50 text-navy-800",
        royal: "border-royal-200 bg-royal-50 text-royal-700",
        accent: "border-accent-200 bg-accent-50 text-accent-700",
        outline: "border-line-strong bg-transparent text-ink-soft",
        inverse: "border-white/15 bg-white/10 text-white/90",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
