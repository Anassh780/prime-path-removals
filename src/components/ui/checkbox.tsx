"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer size-5 shrink-0 rounded-[5px] border border-line-strong bg-white shadow-xs",
      "transition-[background-color,border-color,box-shadow,scale] duration-150 ease-out",
      "hover:border-navy-400 active:scale-[0.97]",
      "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-royal-600/15",
      "data-[state=checked]:border-navy-900 data-[state=checked]:bg-navy-900 data-[state=checked]:text-white",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "aria-invalid:border-red-400",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current animate-scale-in">
      <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
