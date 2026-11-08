"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-lg",
    "font-medium transition-[background-color,color,border-color,box-shadow,translate,scale] duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-royal-600/20 focus-visible:border-royal-500",
    "disabled:pointer-events-none disabled:opacity-55",
    "active:translate-y-px",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-navy-900 text-white shadow-xs hover:bg-navy-800 hover:shadow-sm active:bg-navy-950 active:shadow-none",
        accent:
          "bg-accent-600 text-white shadow-xs hover:bg-accent-700 hover:shadow-sm active:bg-accent-700 active:shadow-none",
        secondary:
          "border border-line-strong bg-white text-ink shadow-xs hover:border-navy-300 hover:bg-surface-subtle hover:shadow-sm active:shadow-none",
        outline:
          "border border-navy-900/15 bg-transparent text-navy-900 hover:border-navy-900/25 hover:bg-navy-50",
        ghost: "text-ink-soft hover:bg-surface-muted hover:text-ink",
        link: "h-auto rounded-sm p-0 py-1 -my-1 text-royal-700 underline-offset-4 hover:underline active:translate-y-0",
      },
      size: {
        sm: "h-9 px-3.5 text-[13px]",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-[15px]",
        icon: "size-11",
      },
    },
    compoundVariants: [
      { variant: "link", size: "sm", class: "h-auto px-0" },
      { variant: "link", size: "md", class: "h-auto px-0" },
      { variant: "link", size: "lg", class: "h-auto px-0" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingText?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      loadingText,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={asChild ? undefined : disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {asChild ? (
          children
        ) : (
          <>
            {/*
             * The label keeps its space while loading so the button never
             * changes width; the spinner crossfades over the top instead.
             */}
            <span
              className={cn(
                "inline-flex items-center justify-center gap-[inherit] transition-opacity duration-150 ease-out",
                loading && "opacity-0",
              )}
            >
              {children}
            </span>
            {loading ? (
              <span className="absolute inset-0 flex items-center justify-center gap-2 px-3 animate-[fade-in_0.15s_ease-out_both]">
                <Loader2
                  className="size-4 shrink-0 animate-spin"
                  aria-hidden="true"
                />
                {loadingText ? (
                  <span className="min-w-0 truncate">{loadingText}</span>
                ) : null}
              </span>
            ) : null}
          </>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
