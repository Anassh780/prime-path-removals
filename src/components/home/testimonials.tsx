import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  MessageSquareQuote,
  PenLine,
  ShieldCheck,
  Star,
} from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Container, Section, SectionHeading } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import {
  testimonials,
  testimonialsEnabled,
  type Testimonial,
} from "@/content/testimonials";

const publishingPrinciples = [
  {
    icon: BadgeCheck,
    title: "Tied to a completed move",
    description:
      "Feedback is only published when it relates to a move we carried out.",
  },
  {
    icon: ShieldCheck,
    title: "Shared with permission",
    description:
      "We ask before publishing a customer's comments, name or location.",
  },
  {
    icon: PenLine,
    title: "Shown as written",
    description:
      "Quotes are not reworded and ratings are not added or adjusted.",
  },
];

/**
 * Customer feedback.
 *
 * testimonialsEnabled is false until real, verified reviews are added to
 * @/content/testimonials. The empty state is a deliberate part of the design:
 * it explains why there is nothing here yet and invites past customers to
 * get in touch. No quotes, names or ratings are ever invented.
 */
export function Testimonials() {
  return (
    <Section id="testimonials" tone="subtle">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="Customer feedback"
            description="We only publish feedback from real customers, with their permission — never invented quotes or ratings."
          />
        </Reveal>

        <Reveal delay={0.06} className="mt-10 lg:mt-12">
          {testimonialsEnabled ? (
            <TestimonialGrid testimonials={testimonials} />
          ) : (
            <EmptyState />
          )}
        </Reveal>
      </Container>
    </Section>
  );
}

function EmptyState() {
  return (
    <div className="grid overflow-hidden rounded-2xl border border-line bg-white lg:grid-cols-[1.15fr_0.85fr]">
      <div className="flex flex-col gap-6 p-7 sm:p-10 lg:p-12">
        <span className="flex size-12 items-center justify-center rounded-xl bg-navy-900 text-white shadow-card">
          <MessageSquareQuote className="size-5" aria-hidden="true" />
        </span>

        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold text-ink sm:text-2xl">
            Reviews are being collected
          </h3>
          <p className="max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
            We are gathering verified feedback from recent customers. As soon as
            a customer is happy for their comments to be published, their review
            will appear here alongside the move details and the service they
            booked.
          </p>
          <p className="max-w-xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
            Until then we would rather leave this space honest than fill it with
            testimonials we cannot stand behind.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button variant="primary" asChild className="group">
            <Link href="/contact">
              Share your experience
              <ArrowRight className="u-arrow size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="/quote">Get a quote</Link>
          </Button>
        </div>

        <p className="max-w-xl border-t border-line pt-5 text-sm leading-relaxed text-ink-muted">
          Moved with us recently? We would like to hear how it went, whether it
          was straightforward or not. Feedback is reviewed before anything is
          published.
        </p>
      </div>

      <div className="border-t border-line bg-surface-subtle p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-royal-700">
          How we publish feedback
        </p>
        <ul className="mt-6 flex flex-col gap-6">
          {publishingPrinciples.map((principle) => (
            <li key={principle.title} className="flex gap-3.5">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-navy-700">
                <principle.icon className="size-4" aria-hidden="true" />
              </span>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-ink">{principle.title}</p>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {principle.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TestimonialGrid({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial) => (
        <figure
          key={`${testimonial.name}-${testimonial.quote}`}
          className="flex h-full flex-col gap-5 rounded-xl border border-line bg-white p-6 shadow-card"
        >
          <div
            className="flex items-center gap-0.5"
            role="img"
            aria-label={`Rated ${testimonial.rating} out of 5`}
          >
            {Array.from({ length: testimonial.rating }).map((_, index) => (
              <Star
                key={index}
                className="size-3.5 fill-accent-500 text-accent-500"
                aria-hidden="true"
              />
            ))}
          </div>

          <blockquote className="flex-1 text-[15px] leading-relaxed text-ink-soft">
            <p>{`\u201c${testimonial.quote}\u201d`}</p>
          </blockquote>

          <figcaption className="border-t border-line pt-4">
            <p className="text-sm font-medium text-ink">{testimonial.name}</p>
            <p className="mt-1 text-sm text-ink-muted">
              {testimonial.location} · {testimonial.service}
            </p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
