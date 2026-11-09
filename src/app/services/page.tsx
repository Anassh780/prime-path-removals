import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Container, Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { ServiceRow } from "@/components/services/service-row";
import { ServicesCta } from "@/components/services/services-cta";
import { ServicesIndex } from "@/components/services/services-index";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Removal Services",
  description:
    "House, office and commercial removals, packing, furniture transport, waste removal and property clearance. Explore the full range of Prime House Removals services.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      {/* Page top reads as a designed band: navy-950 with a faint inverse dot
          grid, white display heading and the jump-link index as a white card. */}
      <Section tone="navy" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-inverse opacity-60"
        />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            <Reveal immediate y={20} className="lg:col-span-7">
              <span className="eyebrow text-accent-300">
                <span
                  className="h-px w-6 bg-accent-300/60"
                  aria-hidden="true"
                />
                Our services
              </span>

              <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                Removal services
              </h1>

              <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-navy-300 sm:text-base">
                Complete moving solutions from single items to full commercial
                relocations. Tailored to your property and quoted in writing.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild variant="accent" size="lg" className="group">
                  <Link href="/quote">
                    Get a quote
                    <ArrowRight className="u-arrow size-4" aria-hidden="true" />
                  </Link>
                </Button>

                <Button asChild variant="secondary" size="lg">
                  <Link href="/contact">Ask a question</Link>
                </Button>
              </div>

              <p className="mt-6 text-sm text-navy-300">
                No obligation. Fixed pricing confirmed in writing.
              </p>
            </Reveal>

            <div className="hidden lg:col-span-5 lg:block">
              <ServicesIndex />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="default" className="py-0 md:py-0 lg:py-0">
        <Container>
          <div className="divide-y divide-line">
            {services.map((service, index) => (
              <ServiceRow key={service.slug} service={service} index={index} />
            ))}
          </div>
        </Container>
      </Section>

      <ServicesCta
        title="Ready to plan your move?"
        description="Tell us your addresses and dates. We will send an itemised quote with fixed pricing and no obligation."
      />
    </>
  );
}
