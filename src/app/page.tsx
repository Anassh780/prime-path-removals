import type { Metadata } from "next";

import { Coverage } from "@/components/home/coverage";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { HeroEstimateSection } from "@/components/home/hero-estimate-section";
import { MovingShowcase } from "@/components/home/moving-showcase";
import { Process } from "@/components/home/process";
import { ServicesOverview } from "@/components/home/services-overview";
import { Testimonials } from "@/components/home/testimonials";
import { WhyChoose } from "@/components/home/why-choose";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  path: "/",
});

/** Structured data limited to facts the business has actually supplied. */
const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.legalName,
  url: siteConfig.url,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationSchema) }}
      />
      <Hero />
      <HeroEstimateSection />
      <ServicesOverview />
      <MovingShowcase />
      <WhyChoose />
      <Process />
      <Testimonials />
      <Coverage />
      <Faq />
      <FinalCta />
    </>
  );
}
