import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
      <Section className="pb-10 pt-14 md:pb-14 md:pt-20 lg:pb-16 lg:pt-24">
        <Container>
          <Reveal className="max-w-3xl">
            <span className="eyebrow">
              <span className="h-px w-6 bg-royal-600/40" aria-hidden="true" />
              Contact
            </span>
            <h1 className="mt-5 font-display text-4xl leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl lg:text-6xl">
              Talk to us about your move
            </h1>
          </Reveal>
          <Reveal delay={0.08} className="max-w-3xl">
            <p className="mt-6 text-[15px] leading-relaxed text-ink-soft sm:text-base">
              Whether you are planning a house move, an office relocation or a
              single item collection, tell us what you need and we will come
              back to you with a clear answer.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Looking for a price first?{" "}
              <Link
                href="/quote"
                className="font-medium text-royal-700 link-underline transition-colors hover:text-royal-800"
              >
                Use the quote form
              </Link>{" "}
              — it captures the addresses, dates and access details we need in
              one go.
            </p>
          </Reveal>
        </Container>
      </Section>

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
            </Reveal>
            <ContactFaq />
          </div>
        </Container>
      </Section>

      <Section tone="navy">
        <Container className="max-w-5xl">
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
