import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Container, Section, SectionHeading } from "@/components/shared/section";
import { RelatedServices } from "@/components/services/related-services";
import { ServiceDetailHero } from "@/components/services/service-detail-hero";
import { ServiceEnquiryCard } from "@/components/services/service-enquiry-card";
import { ServicesCta } from "@/components/services/services-cta";
import { getService, services } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    return buildMetadata({
      title: "Service not found",
      description: "The service you are looking for could not be found.",
      path: `/services/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  return (
    <>
      <ServiceDetailHero service={service} />

      <Section tone="default">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <Reveal>
                <SectionHeading
                  eyebrow="The service"
                  title={<>How we handle {service.navLabel.toLowerCase()}</>}
                  description={service.description}
                />
              </Reveal>

              <Reveal delay={0.06} className="mt-12">
                <div className="grid gap-10 sm:grid-cols-2 lg:gap-12">
                  <section aria-labelledby="whats-included">
                    <h3
                      id="whats-included"
                      className="text-xl font-semibold text-ink sm:text-2xl"
                    >
                      What’s included
                    </h3>

                    <ul className="mt-5 border-t border-line">
                      {service.includes.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 border-b border-line py-3.5"
                        >
                          <Check
                            className="mt-0.5 size-4 shrink-0 text-royal-600"
                            strokeWidth={2.25}
                            aria-hidden="true"
                          />
                          <span className="text-sm leading-relaxed text-ink-soft">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section aria-labelledby="why-it-works">
                    <h3
                      id="why-it-works"
                      className="text-xl font-semibold text-ink sm:text-2xl"
                    >
                      Why it works
                    </h3>

                    <ol className="mt-5 border-t border-line">
                      {service.benefits.map((benefit, index) => (
                        <li
                          key={benefit}
                          className="flex gap-4 border-b border-line py-3.5"
                        >
                          <span className="font-display text-base font-semibold tabular-nums text-royal-700">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm leading-relaxed text-ink-soft">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </section>
                </div>
              </Reveal>

              <div className="mt-10 rounded-xl border border-royal-200 bg-royal-50 p-5 sm:p-6">
                <p className="text-sm leading-relaxed text-ink-soft">
                  Not sure this is the right service?{" "}
                  <Link
                    href="/contact"
                    className="rounded-sm font-medium text-royal-700 underline-offset-4 hover:underline"
                  >
                    Tell us about your move
                  </Link>{" "}
                  and we will confirm what is required.
                </p>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <Reveal delay={0.1}>
                  <ServiceEnquiryCard service={service} />
                </Reveal>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <RelatedServices currentSlug={service.slug} />

      <ServicesCta
        eyebrow="Next step"
        title={`Request your quote for ${service.navLabel.toLowerCase()}`}
        description="Share a few details about the move and we will confirm what is possible, then put everything in writing before you commit."
        quoteHref={`/quote?service=${service.slug}`}
        quoteLabel="Get a quote"
      />
    </>
  );
}
