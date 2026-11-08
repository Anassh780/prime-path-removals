import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container, Section, SectionHeading } from "@/components/shared/section";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { serviceIcons, services } from "@/content/services";

/**
 * Three related services, chosen cyclically from the service list so every
 * detail page points at a useful spread of the range.
 */
export function RelatedServices({ currentSlug }: { currentSlug: string }) {
  const currentIndex = services.findIndex(
    (service) => service.slug === currentSlug,
  );

  const ordered =
    currentIndex === -1
      ? services
      : [
          ...services.slice(currentIndex + 1),
          ...services.slice(0, currentIndex),
        ];

  const related = ordered.slice(0, 3);

  return (
    <Section tone="subtle" className="border-t border-line">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Keep exploring"
            title="Related services"
            description="If your move needs more than one service, these are the ones to consider alongside this."
            action={
              <Button asChild variant="secondary" size="sm">
                <Link href="/services">View all services</Link>
              </Button>
            }
          />
        </Reveal>

        <Stagger
          stagger={0.06}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {related.map((service) => {
            const Icon = serviceIcons[service.icon];

            return (
              <StaggerItem key={service.slug} className="h-full">
                <Link
                  href={`/services/${service.slug}`}
                  aria-label={`View ${service.title}`}
                  className="group u-card u-lift flex h-full flex-col rounded-xl border border-line bg-white p-6 shadow-card hover:border-navy-200 hover:shadow-lift active:translate-y-px"
                >
                  <span className="u-icon-tile inline-flex size-12 items-center justify-center rounded-xl bg-navy-900 text-white shadow-xs ring-1 ring-inset ring-white/10 group-hover:bg-navy-800">
                    <Icon
                      className="size-5"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>

                  <h3 className="mt-5 text-lg font-semibold text-ink transition-colors duration-150 group-hover:text-royal-700 sm:text-xl">
                    {service.title}
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                    {service.summary}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-royal-700">
                    View service
                    <ArrowRight className="u-arrow size-4" aria-hidden="true" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
