import Link from "next/link";

import { Reveal } from "@/components/shared/reveal";

const STEPS = [
  {
    title: "Your message reaches the team",
    description:
      "Contact submissions are read by the Prime House team. They are not passed to an automated sales sequence.",
  },
  {
    title: "We reply by email",
    description:
      "We use the email address you give us, so check it before you send. If you would rather be called, include a number and the best time to reach you.",
  },
  {
    title: "If anything is unclear, we ask",
    description:
      "We would rather check a detail than guess. If your message needs more information before we can answer, we will ask before confirming anything.",
  },
];

/** Honest outline of what happens after a message is sent. */
export function ContactNextSteps() {
  return (
    <Reveal delay={0.08}>
      <section
        aria-labelledby="contact-next-heading"
        className="rounded-xl border border-line bg-white p-6 shadow-card sm:p-7"
      >
        <h2
          id="contact-next-heading"
          className="text-lg font-semibold text-ink sm:text-xl"
        >
          What happens next
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          No scripts and no automated replies, just a short, clear outline of
          how we handle an enquiry.
        </p>

        <ol className="mt-5 flex flex-col gap-4">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="flex items-start gap-3 border-t border-line pt-4 first:border-t-0 first:pt-0"
            >
              <span
                className="w-9 shrink-0 font-display text-[1.75rem] font-semibold leading-none tracking-[-0.02em] tabular-nums text-navy-300"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium leading-relaxed text-ink">
                  {step.title}
                </p>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-ink-soft">
          Ready to price the move?{" "}
          <Link
            href="/quote"
            className="font-medium text-navy-900 link-underline transition-colors hover:text-accent-600"
          >
            Start with the quote form
          </Link>
          .
        </p>
      </section>
    </Reveal>
  );
}
