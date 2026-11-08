import { ArrowDown } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/shared/reveal";
import { services } from "@/content/services";

/**
 * In-page index of the seven services. Links jump to the matching row on the
 * services listing, so the page can be scanned before it is read.
 */
export function ServicesIndex() {
  return (
    <nav
      aria-label="Services on this page"
      className="rounded-2xl border border-line bg-white text-ink shadow-card"
    >
      <div className="border-b border-line px-5 py-4">
        <span className="eyebrow">On this page</span>
      </div>

      <Stagger immediate stagger={0.035} className="p-2">
        <ol>
          {services.map((service, index) => (
            <StaggerItem key={service.slug} as="li">
              <a
                href={`#${service.slug}`}
                className="group u-card u-focus-ring flex items-center gap-4 rounded-lg px-3 py-2.5 hover:bg-surface-subtle"
              >
                <span className="font-display text-xs font-semibold tabular-nums text-ink-muted transition-colors duration-150 group-hover:text-royal-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-sm font-medium text-ink">
                  {service.navLabel}
                </span>
                <ArrowDown
                  className="size-3.5 shrink-0 text-ink-muted transition-[transform,color] duration-150 ease-out group-hover:translate-y-0.5 group-hover:text-royal-700"
                  aria-hidden="true"
                />
              </a>
            </StaggerItem>
          ))}
        </ol>
      </Stagger>
    </nav>
  );
}
