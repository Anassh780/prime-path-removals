import type { Metadata } from "next";

import { buildMetadata } from "@/lib/seo";

import { AboutCta } from "@/components/about/about-cta";
import { AboutHero } from "@/components/about/about-hero";
import { Approach } from "@/components/about/approach";
import { Expectations } from "@/components/about/expectations";
import { HowWeWork } from "@/components/about/how-we-work";
import { MissionValues } from "@/components/about/mission-values";

export const metadata: Metadata = buildMetadata({
  title: "About us",
  description:
    "How Prime House Removals plans and delivers house, office and commercial moves: one point of contact, itemised written quotations, and crews briefed on access, parking and handling before move day.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Approach />
      <HowWeWork />
      <MissionValues />
      <Expectations />
      <AboutCta />
    </>
  );
}
