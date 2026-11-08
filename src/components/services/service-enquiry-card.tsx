import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Service } from "@/content/services";

/**
 * Sticky navy enquiry card on service detail pages. The quote link carries the
 * service slug so the quote form opens with this service already selected.
 */
export function ServiceEnquiryCard({ service }: { service: Service }) {
  return (
    <div className="rounded-2xl bg-navy-950 p-6 text-white shadow-card sm:p-7">
      <span className="eyebrow text-accent-300">
        <span className="h-px w-6 bg-accent-300/60" aria-hidden="true" />
        Get a quote
      </span>

      <h2 className="mt-5 font-display text-2xl leading-tight tracking-[-0.02em] text-white">
        Request a quote for {service.navLabel.toLowerCase()}
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-white/70">
        Tell us the addresses, your dates and anything that needs special care.
        We will confirm what is possible and put everything in writing before
        you commit.
      </p>

      <Button asChild variant="accent" size="lg" className="group mt-6 w-full">
        <Link href={`/quote?service=${service.slug}`}>
          Start your quote
          <ArrowRight className="u-arrow size-4" aria-hidden="true" />
        </Link>
      </Button>

      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white/50">
          Prefer to talk first?
        </p>
        <Link
          href="/contact"
          className="group u-focus-ring mt-2 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-white transition-colors duration-150 hover:text-accent-300"
        >
          Ask us a question
          <ArrowUpRight className="u-arrow size-4" aria-hidden="true" />
        </Link>
      </div>

      <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-relaxed text-white/50">
        No obligation. Availability, crew size and timing are confirmed in your
        written quote.
      </p>
    </div>
  );
}
