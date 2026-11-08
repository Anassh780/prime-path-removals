"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, CheckCircle2, MapPin } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { Container, Section, SectionHeading } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldHint, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { siteConfig } from "@/config/site";

/** Loose UK postcode shape check — validation only, never an availability claim. */
const UK_POSTCODE_PATTERN = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

function formatPostcode(value: string) {
  const compact = value.replace(/\s+/g, "").toUpperCase();
  if (compact.length < 5) return compact;
  return `${compact.slice(0, -3)} ${compact.slice(-3)}`;
}

/**
 * Coverage checker.
 *
 * The business confirms availability per move, so this section deliberately
 * does not list covered areas or return a "we cover you" answer. It validates
 * a UK postcode, states plainly that availability is confirmed in the written
 * quote, and passes the postcode through to the quote form.
 */
export function Coverage() {
  const [postcode, setPostcode] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [confirmed, setConfirmed] = React.useState<string | null>(null);

  const inputId = "coverage-postcode";
  const hintId = "coverage-postcode-hint";
  const errorId = "coverage-postcode-error";

  const quoteHref = confirmed
    ? `/quote?postcode=${encodeURIComponent(confirmed)}`
    : "/quote";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = postcode.trim();

    if (!value) {
      setConfirmed(null);
      setError("Enter the postcode for either end of your move.");
      return;
    }

    if (!UK_POSTCODE_PATTERN.test(value)) {
      setConfirmed(null);
      setError(
        "That does not look like a UK postcode. Check it and try again — for example, M1 4BT.",
      );
      return;
    }

    setError(null);
    setConfirmed(formatPostcode(value));
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPostcode(event.target.value);
    if (error) setError(null);
    if (confirmed) setConfirmed(null);
  }

  return (
    <Section id="coverage" tone="default">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Coverage"
              title={siteConfig.coverage.headline}
              description={siteConfig.coverage.description}
            />

            <ul className="mt-8 flex flex-col gap-3.5">
              {siteConfig.coverage.notes.map((note) => (
                <li key={note} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-royal-50 text-royal-700">
                    <Check className="size-3" aria-hidden="true" />
                  </span>
                  <span className="text-[15px] leading-relaxed text-ink-soft">
                    {note}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-md border-t border-line pt-6 text-sm leading-relaxed text-ink-muted">
              We do not publish a list of covered areas because availability
              depends on the date, crew size and route. It is always confirmed
              in writing before you book.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-navy-100 bg-navy-50 p-6 sm:p-8">
              <div className="flex items-start gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-royal-700 shadow-xs">
                  <MapPin className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink">
                    Check your area
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    Enter the postcode for either end of your move. We will
                    confirm availability in your written quote.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate className="mt-6">
                <Field>
                  <FieldLabel htmlFor={inputId}>UK postcode</FieldLabel>
                  <Input
                    id={inputId}
                    name="postcode"
                    value={postcode}
                    onChange={handleChange}
                    placeholder="M1 4BT"
                    autoComplete="postal-code"
                    inputMode="text"
                    spellCheck={false}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? `${hintId} ${errorId}` : hintId}
                  />
                  <FieldHint id={hintId}>
                    Checking a postcode does not book anything or confirm
                    availability.
                  </FieldHint>
                  <FieldError
                    key={error ?? "no-error"}
                    id={errorId}
                    className="animate-nudge-in"
                  >
                    {error}
                  </FieldError>
                </Field>

                <Button
                  type="submit"
                  variant="primary"
                  className="group mt-4 w-full sm:w-auto"
                >
                  Check postcode
                  <ArrowRight className="u-arrow size-4" aria-hidden="true" />
                </Button>
              </form>

              {confirmed ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="mt-6 animate-pop-in rounded-xl border border-royal-100 bg-white p-4 shadow-xs sm:p-5"
                >
                  <div className="flex gap-3">
                    <CheckCircle2
                      className="mt-0.5 size-5 shrink-0 text-royal-700"
                      aria-hidden="true"
                    />
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium leading-relaxed text-navy-900">
                        Thanks — we will confirm availability for{" "}
                        <span className="whitespace-nowrap">{confirmed}</span> in
                        your written quote.
                      </p>
                      <p className="text-sm leading-relaxed text-ink-soft">
                        Add your move details next and we will review the route,
                        crew and timing before quoting. Checking a postcode does
                        not confirm a booking.
                      </p>
                      <Button
                        variant="primary"
                        size="sm"
                        asChild
                        className="group mt-1 self-start"
                      >
                        <Link href={quoteHref}>
                          Continue to quote
                          <ArrowRight
                            className="u-arrow size-4"
                            aria-hidden="true"
                          />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="mt-5 border-t border-line pt-4">
                <Button variant="link" size="sm" asChild className="group">
                  <Link href="/quote">
                    Start a quote without a postcode
                    <ArrowRight
                      className="u-arrow size-3.5"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
