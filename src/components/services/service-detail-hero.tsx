import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Container } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/services/breadcrumb";
import { serviceIcons, type Service } from "@/content/services";

/**
 * Service detail hero. The navy-950 band makes the top of every service page
 * read as a designed surface: breadcrumb, service identity, H1, summary and the
 * two primary routes — a quote pre-selected for this service, or back to the
 * list.
 */
export function ServiceDetailHero({ service }: { service: Service }) {
  const Icon = serviceIcons[service.icon];

  return (
    <section className="relative overflow-hidden border-b border-navy-800 bg-navy-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-inverse opacity-60"
      />

      <Container className="relative py-8 md:py-10 lg:py-12">
        <Reveal immediate x={-6} y={0} duration={0.4}>
          <Breadcrumb
            tone="inverse"
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: service.title },
            ]}
          />
        </Reveal>

        <div className="relative mt-10 lg:mt-14">
          <Icon
            className="pointer-events-none absolute -top-3 right-0 hidden size-40 text-white/10 lg:block"
            strokeWidth={1}
            aria-hidden="true"
          />

          <Reveal immediate delay={0.08} y={16} className="relative max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-royal-300 shadow-xs ring-1 ring-inset ring-white/15 sm:size-14">
                <Icon
                  className="size-5 sm:size-6"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </span>
              <span className="eyebrow text-accent-300">
                <span
                  className="h-px w-6 bg-accent-300/60"
                  aria-hidden="true"
                />
                {service.navLabel}
              </span>
            </div>

            <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
              {service.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-300">
              {service.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="accent" size="lg" className="group">
                <Link href={`/quote?service=${service.slug}`}>
                  Get a quote
                  <ArrowRight className="u-arrow size-4" aria-hidden="true" />
                </Link>
              </Button>

              <Button asChild variant="secondary" size="lg">
                <Link href="/services">Back to services</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
