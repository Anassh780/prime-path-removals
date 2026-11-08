"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-line-strong bg-white px-3.5 text-sm text-ink shadow-xs",
          "placeholder:text-ink-muted/80",
          "transition-[border-color,box-shadow,background-color] duration-150 ease-out",
          "hover:border-navy-300",
          "focus:border-royal-500 focus:outline-none focus:ring-4 focus:ring-royal-600/15",
          "disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:text-ink-muted disabled:opacity-80",
          "aria-invalid:border-red-400 aria-invalid:hover:border-red-500 aria-invalid:focus:border-red-500 aria-invalid:focus:ring-red-500/15",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[112px] w-full resize-y rounded-lg border border-line-strong bg-white px-3.5 py-3 text-sm leading-relaxed text-ink shadow-xs",
        "placeholder:text-ink-muted/80",
        "transition-[border-color,box-shadow,background-color] duration-150 ease-out",
        "hover:border-navy-300",
        "focus:border-royal-500 focus:outline-none focus:ring-4 focus:ring-royal-600/15",
        "disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:text-ink-muted disabled:opacity-80",
        "aria-invalid:border-red-400 aria-invalid:hover:border-red-500 aria-invalid:focus:border-red-500 aria-invalid:focus:ring-red-500/15",
        className,
      )}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Input, Textarea };
