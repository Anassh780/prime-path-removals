import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type Crumb = {
  label: string;
  href?: string;
};

/**
 * Compact breadcrumb trail for service detail pages.
 * The final item is the current page and is marked with aria-current.
 * `tone="inverse"` is for the navy-950 page-top band; the default stays
 * light-surface for any future light usage.
 */
export function Breadcrumb({
  items,
  tone = "default",
}: {
  items: Crumb[];
  tone?: "default" | "inverse";
}) {
  const inverse = tone === "inverse";

  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm",
          inverse ? "text-navy-300" : "text-ink-muted",
        )}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight
                  className={cn(
                    "size-3.5 shrink-0",
                    inverse ? "text-navy-300/60" : "text-ink-muted/70",
                  )}
                  aria-hidden="true"
                />
              ) : null}

              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "u-focus-ring inline-block rounded-sm py-1 -my-1 transition-colors duration-150",
                    inverse
                      ? "text-navy-300 hover:text-white"
                      : "text-ink-muted hover:text-royal-700",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={inverse ? "text-white/80" : "text-ink-soft"}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
