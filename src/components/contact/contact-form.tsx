"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, Check, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldHint,
  FieldLabel,
  OptionalTag,
} from "@/components/ui/field";
import { Input, Textarea } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { hasDirectContact, hasEmail, siteConfig } from "@/config/site";
import {
  contactSchema,
  contactSubjects,
  type ContactFormValues,
} from "@/lib/validations/contact";

type SuccessState = {
  reference: string;
  name: string;
  email: string;
};

type ContactApiResponse = {
  reference?: unknown;
  error?: unknown;
};

const DEFAULT_ERROR =
  "We could not send your message just now. Please try again in a moment.";

/** House curve — shared with the motion primitives. */
const EASE = [0.22, 1, 0.36, 1] as const;

/** Field wrapper is the group; its label reacts when the control takes focus. */
const FIELD_GROUP = "group";
const LABEL_FOCUS =
  "transition-colors duration-150 group-focus-within:text-royal-700";

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

export function ContactForm() {
  const [success, setSuccess] = useState<SuccessState | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const formHeadingRef = useRef<HTMLHeadingElement>(null);
  const hadSuccess = useRef(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const messageLength = (watch("message") ?? "").length;

  useEffect(() => {
    if (success) {
      hadSuccess.current = true;
      successHeadingRef.current?.focus();
      return;
    }

    if (hadSuccess.current) {
      hadSuccess.current = false;
      formHeadingRef.current?.focus();
    }
  }, [success]);

  async function onSubmit(values: ContactFormValues) {
    setServerError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await response
        .json()
        .catch(() => null)) as ContactApiResponse | null;

      if (!response.ok) {
        const message =
          typeof payload?.error === "string" && payload.error.trim()
            ? payload.error
            : DEFAULT_ERROR;
        setServerError(message);
        toast.error("Message not sent", { description: message });
        return;
      }

      const reference =
        typeof payload?.reference === "string" ? payload.reference : "";

      if (!reference) {
        const message =
          "The server did not confirm your message. Please try again, or use the quote form if the problem continues.";
        setServerError(message);
        toast.error("Message not sent", { description: message });
        return;
      }

      setSuccess({
        reference,
        name: values.name,
        email: values.email,
      });
      reset();
      toast.success("Message sent", { description: `Reference ${reference}` });
    } catch {
      const message =
        "We could not reach the server. Check your connection and try again.";
      setServerError(message);
      toast.error("Message not sent", { description: message });
    }
  }

  function handleSendAnother() {
    setSuccess(null);
    setServerError(null);
    reset();
  }

  return (
    <section
      id="contact-form"
      aria-labelledby="contact-form-heading"
      className="scroll-mt-24 rounded-xl border border-line border-t-4 border-t-accent-600 bg-white p-6 shadow-card sm:p-8"
    >
      {success ? (
        <div className="flex animate-fade-up flex-col gap-5">
          <div
            role="status"
            aria-live="polite"
            className="flex flex-col gap-5"
          >
            <span className="flex size-12 animate-pop-in items-center justify-center rounded-full border border-accent-200 bg-accent-50 text-accent-600">
              <Check
                className="size-6 animate-check-in [stroke-dasharray:24]"
                strokeWidth={2.5}
                aria-hidden="true"
              />
            </span>

            <div>
              <h2
                id="contact-form-heading"
                ref={successHeadingRef}
                tabIndex={-1}
                className="text-2xl font-semibold tracking-[-0.01em] text-ink sm:text-3xl"
              >
                Message received
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Thank you, {firstName(success.name)}. Your message is with the
                Prime House team.
              </p>
            </div>

            <dl className="rounded-lg border border-accent-200 bg-accent-50 p-4 text-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <dt className="text-ink-muted">Reference</dt>
                <dd className="font-mono text-sm font-medium tracking-wide text-ink">
                  {success.reference}
                </dd>
              </div>
              <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2 border-t border-accent-200/70 pt-2">
                <dt className="text-ink-muted">Reply to</dt>
                <dd className="break-all text-ink">{success.email}</dd>
              </div>
            </dl>

            <p className="text-sm leading-relaxed text-ink-soft">
              Keep the reference if you need to follow up. We will reply to the
              email address you gave us.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              type="button"
              variant="secondary"
              onClick={handleSendAnother}
            >
              Send another message
            </Button>
            <Button type="button" variant="link" asChild>
              <Link href="/quote" className="group">
                Request a quote instead
                <ArrowRight className="u-arrow size-3.5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <h2
              id="contact-form-heading"
              ref={formHeadingRef}
              tabIndex={-1}
              className="text-2xl font-semibold tracking-[-0.01em] text-ink sm:text-3xl"
            >
              Send us a message
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Tell us what you need and how to reach you. Fields marked with an
              asterisk are required.
            </p>
          </div>

          <AnimatePresence initial={false}>
            {serverError ? (
              <motion.div
                key="contact-submit-error"
                role="alert"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="mt-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4"
              >
                <AlertCircle
                  className="mt-0.5 size-4 shrink-0 text-red-600"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-red-700">
                    Your message was not sent
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-red-700">
                    {serverError}
                  </p>
                  {hasEmail ? (
                    <p className="mt-2 text-sm leading-relaxed text-red-700">
                      You can also email{" "}
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="break-all font-medium underline underline-offset-2"
                      >
                        {siteConfig.contact.email}
                      </a>
                      .
                    </p>
                  ) : null}
                  {!hasDirectContact ? (
                    <p className="mt-2 text-sm leading-relaxed text-red-700">
                      Direct contact details are still being finalised, so there
                      is no phone number or email to fall back on yet.
                    </p>
                  ) : null}
                  <p className="mt-2 text-sm leading-relaxed text-red-700">
                    You can adjust your message and try again below.
                  </p>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col gap-5"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field className={FIELD_GROUP}>
                <FieldLabel
                  htmlFor="contact-name"
                  required
                  className={LABEL_FOCUS}
                >
                  Full name
                </FieldLabel>
                <Input
                  id="contact-name"
                  autoComplete="name"
                  placeholder="Alex Morgan"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={
                    errors.name ? "contact-name-error" : undefined
                  }
                  {...register("name")}
                />
                <FieldError id="contact-name-error" className="animate-nudge-in">
                  {errors.name?.message}
                </FieldError>
              </Field>

              <Field className={FIELD_GROUP}>
                <FieldLabel
                  htmlFor="contact-email"
                  required
                  className={LABEL_FOCUS}
                >
                  Email address
                </FieldLabel>
                <Input
                  id="contact-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="alex@example.com"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={
                    errors.email
                      ? "contact-email-hint contact-email-error"
                      : "contact-email-hint"
                  }
                  {...register("email")}
                />
                <FieldHint id="contact-email-hint">
                  We will reply to this address.
                </FieldHint>
                <FieldError
                  id="contact-email-error"
                  className="animate-nudge-in"
                >
                  {errors.email?.message}
                </FieldError>
              </Field>

              <Field className={FIELD_GROUP}>
                <FieldLabel htmlFor="contact-phone" className={LABEL_FOCUS}>
                  Phone number <OptionalTag />
                </FieldLabel>
                <Input
                  id="contact-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="07700 900123"
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={
                    errors.phone
                      ? "contact-phone-hint contact-phone-error"
                      : "contact-phone-hint"
                  }
                  {...register("phone")}
                />
                <FieldHint id="contact-phone-hint">
                  Only if you would rather be called.
                </FieldHint>
                <FieldError
                  id="contact-phone-error"
                  className="animate-nudge-in"
                >
                  {errors.phone?.message}
                </FieldError>
              </Field>

              <Controller
                control={control}
                name="subject"
                render={({ field, fieldState }) => (
                  <Field className={FIELD_GROUP}>
                    <FieldLabel
                      htmlFor="contact-subject"
                      required
                      className={LABEL_FOCUS}
                    >
                      Subject
                    </FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      onOpenChange={(open) => {
                        if (!open) field.onBlur();
                      }}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger
                        id="contact-subject"
                        aria-invalid={Boolean(fieldState.error)}
                        aria-describedby={
                          fieldState.error
                            ? "contact-subject-hint contact-subject-error"
                            : "contact-subject-hint"
                        }
                      >
                        <SelectValue placeholder="Choose a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {contactSubjects.map((subject) => (
                          <SelectItem
                            key={subject.value}
                            value={subject.value}
                          >
                            {subject.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldHint id="contact-subject-hint">
                      Choose the closest match so your message reaches the right
                      place.
                    </FieldHint>
                    <FieldError
                      id="contact-subject-error"
                      className="animate-nudge-in"
                    >
                      {fieldState.error?.message}
                    </FieldError>
                  </Field>
                )}
              />
            </div>

            <Field className={FIELD_GROUP}>
              <FieldLabel
                htmlFor="contact-message"
                required
                className={LABEL_FOCUS}
              >
                Message
              </FieldLabel>
              <Textarea
                id="contact-message"
                rows={5}
                maxLength={2000}
                placeholder="Tell us about the move, the dates involved and anything that needs special handling."
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={
                  errors.message
                    ? "contact-message-hint contact-message-error"
                    : "contact-message-hint"
                }
                {...register("message")}
              />
              <div className="flex items-start justify-between gap-4">
                <FieldHint id="contact-message-hint">
                  Include postcodes, dates and anything that needs special
                  handling.
                </FieldHint>
                <FieldHint
                  className="shrink-0 tabular-nums"
                  aria-hidden="true"
                >
                  {messageLength}/2000
                </FieldHint>
              </div>
              <FieldError id="contact-message-error" className="animate-nudge-in">
                {errors.message?.message}
              </FieldError>
            </Field>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                type="submit"
                variant="accent"
                size="lg"
                loading={isSubmitting}
                loadingText="Sending…"
                className="w-full sm:w-auto"
              >
                Send message
                <Send className="size-4" aria-hidden="true" />
              </Button>
              <p className="text-sm leading-relaxed text-ink-muted sm:max-w-xs">
                Your details are used to reply to this enquiry.
              </p>
            </div>
          </form>
        </>
      )}
    </section>
  );
}
