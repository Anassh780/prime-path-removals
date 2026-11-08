import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { serviceIcons, type Service } from "@/content/services";
import { cn } from "@/lib/utils";

type ServiceRowProps = {
  service: Service;
  index: number;
};

/**
 * One service in the listing. The meta column (number, icon tile, label)
 * alternates sides on large screens so the page reads as an editorial list
 * rather than seven identical cards.
 */
export function ServiceRow({ service, index }: ServiceRowProps) {
  const Icon = serviceIcons[service.icon];
  const reversed = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  return (
    <article id={service.slug} className="group py-12 lg:py-16">
      <Reveal y={18}>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
          <div
            className={cn(
              "flex flex-wrap items-center gap-x-5 gap-y-4 lg:col-span-3 lg:flex-col lg:items-start lg:gap-5",
              reversed && "lg:order-2 lg:items-end lg:text-right",
            )}
          >
            <span
              className="font-display text-4xl leading-none tracking-[-0.04em] tabular-nums text-navy-300 transition-colors duration-200 group-hover:text-royal-700 lg:text-[3.5rem]"
              aria-hidden="true"
            >
              {number}
            </span>

            <span className="u-icon-tile inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-white shadow-xs ring-1 ring-inset ring-white/10 group-hover:bg-navy-800 lg:size-14">
              <Icon
                className="size-5 lg:size-6"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </span>

            <span className="eyebrow">{service.navLabel}</span>
          </div>

          <div className={cn("lg:col-span-9", reversed && "lg:order-1")}>
            <h2 className="font-display text-2xl leading-tight tracking-[-0.02em] text-ink sm:text-3xl">
              <Link
                href={`/services/${service.slug}`}
                className="rounded-sm transition-colors duration-150 group-hover:text-royal-700"
              >
                {service.title}
              </Link>
            </h2>

            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
              {service.summary}
            </p>

            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {service.benefits.slice(0, 3).map((benefit) => (
                <li
                  key={benefit}
                  className="flex gap-2.5 text-sm leading-relaxed text-ink-soft"
                >
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-royal-600"
                    strokeWidth={2.25}
                    aria-hidden="true"
                  />
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="mt-7">
              <Button asChild variant="link" size="sm" className="group">
                <Link href={`/services/${service.slug}`}>
                  View {service.navLabel.toLowerCase()}
                  <ArrowRight className="u-arrow size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </article>
  );
}
