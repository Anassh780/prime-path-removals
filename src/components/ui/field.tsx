import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Field primitives — the shared layout for every form control so labels,
 * hints and error messages sit identically across the whole site.
 */

function Field({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

function FieldLabel({
  className,
  required,
  children,
  ...props
}: React.ComponentProps<"label"> & { required?: boolean }) {
  return (
    <label
      className={cn(
        "flex items-center gap-1 text-[13px] font-medium text-ink transition-colors duration-150 ease-out",
        className,
      )}
      {...props}
    >
      {children}
      {required ? (
        <span className="text-accent-600" aria-hidden="true">
          *
        </span>
      ) : null}
    </label>
  );
}

function FieldHint({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-xs leading-relaxed text-ink-muted", className)} {...props} />
  );
}

function FieldError({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  if (!children) return null;
  return (
    <p
      role="alert"
      className={cn(
        "flex animate-nudge-in items-start gap-1.5 text-xs font-medium leading-relaxed text-red-600",
        className,
      )}
      {...props}
    >
      <span
        className="mt-[3px] size-1.5 shrink-0 rounded-full bg-red-500"
        aria-hidden="true"
      />
      {children}
    </p>
  );
}

/** Small "Optional" tag for non-required fields. */
function OptionalTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "ml-1 text-[11px] font-normal uppercase tracking-wide text-ink-muted",
        className,
      )}
    >
      Optional
    </span>
  );
}

export { Field, FieldLabel, FieldHint, FieldError, OptionalTag };
