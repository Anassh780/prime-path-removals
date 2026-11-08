import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/shared/reveal";
import { faqs } from "@/content/faqs";

/** Compact FAQ — three of the most common pre-enquiry questions. */
export function ContactFaq() {
  const items = faqs.slice(0, 3);

  return (
    <Reveal delay={0.05}>
      <div className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
        <Accordion type="single" collapsible className="border-t border-line">
          {items.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`contact-faq-${index}`}
              className="border-line"
            >
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Reveal>
  );
}
