import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { Container, Section, SectionHeading } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { serviceIcons, services, type Service } from "@/content/services";

export function ServicesOverview() {
  const [featured, ...rest] = services;

  return (
    <Section id="services">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title="Every part of the move, handled by one team."
            description="From a full house move to a single piece of furniture, each service is quoted individually with the crew, vehicle and materials set out in writing."
            action={
              <Button asChild variant="secondary" size="sm" className="group">
                <Link href="/services">
                  View all services
                  <ArrowRight className="u-arrow size-4" aria-hidden="true" />
                </Link>
              </Button>
            }
          />
        </Reveal>

        <Stagger
          stagger={0.06}
          delay={0.05}
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3"
        >
          {/* Flagship service gets a wide, darker card so the grid has weight
              and rhythm rather than seven identical tiles. */}
          <StaggerItem className="sm:col-span-2 lg:col-span-3">
            <FeaturedServiceCard service={featured} />
          </StaggerItem>

          {rest.map((service) => (
            <StaggerItem key={service.slug} className="h-full">
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}

function FeaturedServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.icon];

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group u-card u-lift u-focus-ring relative flex h-full flex-col gap-6 rounded-xl bg-navy-950 p-6 text-white shadow-card md:flex-row md:items-center md:gap-8 md:p-8"
    >
      <span className="u-icon-tile flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white group-hover:border-white/25 group-hover:bg-white/15 md:size-14">
        <Icon className="size-6 md:size-7" strokeWidth={1.6} aria-hidden="true" />
      </span>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white sm:text-xl">
          {service.title}
        </h3>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-white/70">
          {service.summary}
        </p>
      </div>

      <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-white">
        Explore this service
        <ArrowRight className="u-arrow size-4" aria-hidden="true" />
      </span>
    </Link>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = serviceIcons[service.icon];

  return (
    <Link
      href={`/services/${service.slug}`}
      className="group u-card u-lift u-focus-ring flex h-full flex-col gap-5 rounded-xl border border-line bg-white p-6 shadow-card hover:border-navy-200 hover:shadow-lift"
    >
      <span className="u-icon-tile flex size-11 items-center justify-center rounded-lg border border-line bg-surface-subtle text-navy-800 group-hover:border-navy-200 group-hover:bg-navy-50">
        <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
      </span>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-ink sm:text-xl">
          {service.title}
        </h3>
        <p className="text-[15px] leading-relaxed text-ink-soft">
          {service.summary}
        </p>
      </div>

      <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-royal-700">
        View service
        <ArrowRight className="u-arrow size-4" aria-hidden="true" />
      </span>
    </Link>
  );
}
