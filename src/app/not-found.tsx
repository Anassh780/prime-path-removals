import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  Home,
  LayoutGrid,
  Mail,
  MessageSquare,
} from "lucide-react";

import { LogoMark } from "@/components/brand/logo";
import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { Container, Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";

const helpfulLinks = [
  {
    href: "/services",
    label: "Our services",
    description: "House, office and commercial moves, packing and clearances.",
    icon: LayoutGrid,
  },
  {
    href: "/about",
    label: "About us",
    description: "How we plan a move and what you can expect from the crew.",
    icon: Home,
  },
  {
    href: "/quote",
    label: "Get a quote",
    description: "Tell us the details of your move and we will price it in writing.",
    icon: ClipboardCheck,
  },
  {
    href: "/contact",
    label: "Contact",
    description: "Ask a question or get in touch about an existing booking.",
    icon: MessageSquare,
  },
] as const;

export default function NotFound() {
  return (
    <Section tone="subtle">
      <Container>
        {/* A calm single entrance — this page is already a dead end, so the
            motion only settles the card into place and then stops. */}
        <Reveal immediate y={12} duration={0.5}>
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="px-6 py-12 sm:px-10 lg:px-12 lg:py-16">
                <span className="eyebrow">
                  <span
                    className="h-px w-6 bg-accent-600/50"
                    aria-hidden="true"
                  />
                  Error 404
                </span>

                <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl">
                  Page not found
                </h1>

                <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft sm:text-base">
                  The page you asked for does not exist, or it has been renamed
                  since the link was created. Nothing has gone wrong with any
                  enquiry you have already sent. Use one of the links below to
                  pick up where you left off.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button asChild variant="accent" size="lg">
                    <Link href="/quote">
                      Get a free quote
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="/">
                      <Home className="size-4" aria-hidden="true" />
                      Back to home
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="relative flex flex-col justify-between gap-10 border-t border-white/10 bg-navy-950 px-6 py-10 sm:px-10 lg:border-l lg:border-t-0 lg:px-12 lg:py-16">
                <div
                  className="bg-grid absolute inset-0 opacity-40"
                  aria-hidden="true"
                />
                <div className="relative flex items-center gap-3">
                  <LogoMark className="size-9" tone="inverse" />
                  <span className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
                    Prime House Removals
                  </span>
                </div>
                <div className="relative">
                  <p
                    className="font-display text-[5.5rem] leading-none tracking-[-0.04em] text-white/10 sm:text-[7rem]"
                    aria-hidden="true"
                  >
                    404
                  </p>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/65">
                    If you followed a link from an email or a saved page, the
                    address may simply be out of date.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Stagger
          immediate
          delay={0.12}
          stagger={0.05}
          className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {helpfulLinks.map((link) => {
            const Icon = link.icon;
            return (
              <StaggerItem key={link.href} className="h-full">
                <Link
                  href={link.href}
                  className="group u-card u-lift flex h-full items-start gap-3 rounded-xl border border-line bg-white p-5 shadow-xs hover:border-navy-300 hover:shadow-lift focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-royal-600/20"
                >
                  <span className="u-icon-tile mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-subtle text-navy-800">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                      {link.label}
                      <ArrowRight
                        className="u-arrow size-3.5 text-ink-muted"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-sm leading-relaxed text-ink-soft">
                      {link.description}
                    </span>
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal immediate delay={0.28} y={8} className="mt-8">
          <p className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            Still stuck?{" "}
            <Link
              href="/contact"
              className="link-underline font-medium text-royal-700 hover:text-royal-800"
            >
              Send us a message
            </Link>{" "}
            and we will point you in the right direction.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
