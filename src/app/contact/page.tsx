import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BoxStack, FloorPlan } from "@/components/brand/motifs";
import { ContactChannels } from "@/components/contact/contact-channels";
import { ContactFaq } from "@/components/contact/contact-faq";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactNextSteps } from "@/components/contact/contact-next-steps";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact us",
  description:
    "Contact Prime House Removals about a house move, office relocation, packing, furniture transport or property clearance. Send a message and we will reply by email.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      {/* Designed page top: dotted grid wash, oversized heading, navy panel. */}
      <section className="relative overflow-hidden border-b border-line bg-white">
        <div
          className="pointer-events-none absolute inset-0 bg-grid opacity-60"
          aria-hidden="true"
        />
        <Container className="relative py-16 md:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
            <div>
              <Reveal immediate y={20} duration={0.6}>
                <span className="eyebrow">
                  <span
                    className="h-px w-6 bg-royal-600/40"
                    aria-hidden="true"
                  />
                  Contact
                </span>
                <h1 className="mt-5 max-w-[36rem] font-display text-4xl leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl lg:text-6xl xl:text-[4.5rem] xl:leading-[1.02]">
                  Talk to us about your move
                </h1>
              </Reveal>
              <Reveal immediate delay={0.08} y={16}>
                <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
                  Whether you are planning a house move, an office relocation or
                  a single item collection, tell us what you need and we will
                  come back to you with a clear answer.
                </p>
              </Reveal>
            </div>

            <Reveal immediate delay={0.14} y={16}>
              <div className="relative overflow-hidden rounded-2xl border border-navy-800 bg-navy-950 p-7 sm:p-9">
                <FloorPlan className="pointer-events-none absolute -right-8 -bottom-6 w-[18rem] opacity-20" />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                    Looking for a price first?
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-navy-200">
                    <Link
                      href="/quote"
                      className="font-medium text-royal-300 underline-offset-4 transition-colors duration-150 hover:text-royal-200 hover:underline"
                    >
                      Use the quote form
                    </Link>{" "}
                    to share the addresses, dates and access details we
                    need in one go.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <Section tone="subtle">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
            <div className="flex flex-col gap-6 lg:col-span-5">
              <ContactChannels />
              <ContactNextSteps />
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Common questions"
                title="Before you get in touch"
                description="The answers below cover what people ask most often before a move is booked. If your question is not here, send it through the form above."
              />
              <BoxStack className="mt-10 hidden w-40 opacity-90 lg:block" />
            </Reveal>
            <ContactFaq />
          </div>
        </Container>
      </Section>

      {/* The page's one full-bleed navy band: the closing conversion prompt. */}
      <Section
        tone="navy"
        className="relative overflow-hidden border-t border-white/10"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-grid-inverse"
          aria-hidden="true"
        />
        <Container className="relative max-w-5xl">
          <Reveal>
            <SectionHeading
              tone="inverse"
              eyebrow="Next step"
              title="Get your move priced in writing"
              description="The quote form takes the addresses, your preferred date and the access details we need to price the job properly. It takes a few minutes and there is no obligation."
              action={
                <Button variant="accent" size="lg" asChild>
                  <Link href="/quote" className="group">
                    Request a quote
                    <ArrowRight className="u-arrow size-4" aria-hidden="true" />
                  </Link>
                </Button>
              }
            />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
