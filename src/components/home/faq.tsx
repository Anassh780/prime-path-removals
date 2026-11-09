import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Container, Section, SectionHeading } from "@/components/shared/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/content/faqs";

/**
 * Frequently asked questions — all entries come from @/content/faqs.
 * The contact prompt is a real route, not a decorative button.
 */
export function Faq() {
  return (
    <Section id="faq" tone="subtle">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow="FAQs"
                title="Questions, answered plainly"
                description="Common questions about booking, pricing, and moving day."
              />

              <div className="mt-8 rounded-xl border border-navy-100 bg-navy-50 p-5">
                <span className="flex size-9 items-center justify-center rounded-lg bg-navy-900 text-white">
                  <MessageSquare className="size-4" aria-hidden="true" />
                </span>
                <p className="mt-4 text-sm font-medium text-ink">
                  Still have questions?
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  Send your move details for direct answers with no sales
                  pressure.
                </p>
                <Button variant="link" size="md" asChild className="group mt-3">
                  <Link href="/contact">
                    Contact the team
                    <ArrowRight className="u-arrow size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-line bg-white px-5 sm:px-7">
              <Accordion
                type="single"
                collapsible
                defaultValue="faq-0"
                className="border-t-0"
              >
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={faq.question}
                    value={`faq-${index}`}
                    className="last:border-b-0"
                  >
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-[15px] leading-relaxed text-ink-soft">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
