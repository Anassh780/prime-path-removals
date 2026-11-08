"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, RotateCcw } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Container, Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";

/**
 * Route-level error boundary. It deliberately shows no stack trace, request
 * data or technical detail: the visitor gets a plain explanation and two real
 * routes forward. Next passes a `digest` hash for server-side errors, which we
 * surface only as a short reference.
 */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Section tone="subtle">
      <Container>
        {/* One calm entrance: nothing here should feel like a failure state
            performing at the visitor. Controls stay interactive throughout. */}
        <Reveal immediate y={12} duration={0.45} className="mx-auto max-w-2xl">
          <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-10">
            <span className="flex size-11 items-center justify-center rounded-lg border border-royal-100 bg-royal-50 text-royal-700">
              <AlertTriangle className="size-5" aria-hidden="true" />
            </span>

            <h1 className="mt-6 font-display text-4xl leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl">
              Something went wrong
            </h1>

            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft sm:text-base">
              This page stopped before it could finish loading. Try again — if
              the problem continues, contact us directly and we will pick it up
              from there.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button onClick={reset} variant="primary" size="lg">
                <RotateCcw className="size-4" aria-hidden="true" />
                Try again
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/contact">
                  Contact us
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5 text-sm text-ink-muted">
              <Link
                href="/"
                className="link-underline text-royal-700 hover:text-royal-800"
              >
                Back to home
              </Link>
              <Link
                href="/services"
                className="link-underline text-royal-700 hover:text-royal-800"
              >
                Browse services
              </Link>
              {error.digest ? (
                <span className="text-xs text-ink-muted">
                  Reference: {error.digest}
                </span>
              ) : null}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
