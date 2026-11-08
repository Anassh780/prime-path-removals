import * as React from "react";

import { cn } from "@/lib/utils";

type Tone = "default" | "subtle" | "navy" | "plain";

const sectionTone: Record<Tone, string> = {
  default: "bg-white",
  subtle: "bg-surface-subtle",
  navy: "bg-navy-950 text-white",
  plain: "",
};

export function Container({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("container-page", className)} {...props}>
      {children}
    </div>
  );
}

export function Section({
  className,
  tone = "default",
  children,
  ...props
}: React.ComponentProps<"section"> & { tone?: Tone }) {
  return (
    <section
      className={cn(
        "py-16 md:py-20 lg:py-24",
        sectionTone[tone],
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  tone?: "default" | "inverse";
  className?: string;
  action?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  className,
  action,
  as: Heading = "h2",
}: SectionHeadingProps) {
  const inverse = tone === "inverse";

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" && "items-center text-center",
        action && align === "left" && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-4",
          align === "center" ? "items-center" : "items-start",
          align === "center" ? "max-w-2xl" : "max-w-2xl",
        )}
      >
        {eyebrow ? (
          <span
            className={cn(
              "eyebrow",
              inverse ? "text-accent-300" : "text-royal-700",
            )}
          >
            <span
              className={cn(
                "h-px w-6",
                inverse ? "bg-accent-300/60" : "bg-royal-600/40",
              )}
              aria-hidden="true"
            />
            {eyebrow}
          </span>
        ) : null}

        <Heading
          className={cn(
            "text-[1.75rem] leading-[1.15] tracking-[-0.02em] sm:text-4xl lg:text-[2.6rem]",
            inverse ? "text-white" : "text-ink",
          )}
        >
          {title}
        </Heading>

        {description ? (
          <p
            className={cn(
              "text-[15px] leading-relaxed sm:text-base",
              inverse ? "text-white/70" : "text-ink-soft",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
