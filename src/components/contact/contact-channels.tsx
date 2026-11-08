import { ArrowDown, ArrowUpRight, Info } from "lucide-react";
import Link from "next/link";

import { contactChannels } from "@/components/layout/contact-channels";
import { Reveal } from "@/components/shared/reveal";
import { hasAddress, hasEmail, hasPhone, hasWhatsApp } from "@/config/site";

/**
 * Direct contact channels.
 *
 * The list comes from the shared `contactChannels` helper, which only includes
 * a channel when the business has supplied the detail (hasPhone / hasEmail /
 * hasWhatsApp / hasAddress / hasHours). With no direct channel configured we
 * show an honest note instead of inventing a number, address or email — the
 * form is the route that actually works today.
 */
export function ContactChannels() {
  const hasDirectChannel = hasPhone || hasEmail || hasWhatsApp || hasAddress;

  return (
    <Reveal>
      <section
        aria-labelledby="contact-details-heading"
        className="rounded-xl border border-line bg-white p-6 shadow-card sm:p-7"
      >
      <h2
        id="contact-details-heading"
        className="text-lg font-semibold text-ink sm:text-xl"
      >
        Contact details
      </h2>

      {!hasDirectChannel ? (
        <div className="mt-4 rounded-lg border border-line bg-surface-subtle p-4">
          <div className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-royal-700">
              <Info className="size-[18px]" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium leading-relaxed text-ink">
                Direct contact details are being finalised.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                We are confirming the phone number, email address and business
                address for Prime House Removals before they are published
                here, so nothing shown is out of date.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Until then, the contact form is the fastest route — send your
                details and we will reply by email.
              </p>
              <a
                href="#contact-form"
                className="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-royal-700 transition-colors hover:text-royal-800"
              >
                Go to the contact form
                <ArrowDown
                  className="size-3.5 transition-transform duration-150 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      ) : null}

      {contactChannels.length > 0 ? (
        <ul className={hasDirectChannel ? "mt-4" : "mt-5"}>
          {contactChannels.map((channel) => {
            const Icon = channel.icon;

            const content = (
              <>
                <span className="u-icon-tile flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-subtle text-royal-700 group-hover:border-royal-200 group-hover:bg-white group-hover:text-royal-800">
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
                    {channel.label}
                  </span>
                  <span
                    className={
                      channel.key === "hours"
                        ? "mt-0.5 block whitespace-pre-line break-words text-sm font-medium leading-relaxed text-ink group-hover:text-royal-700"
                        : "mt-0.5 block break-words text-sm font-medium leading-relaxed text-ink group-hover:text-royal-700"
                    }
                  >
                    {channel.value}
                  </span>
                </span>
                {channel.href ? (
                  <ArrowUpRight
                    className="mt-1 size-4 shrink-0 text-ink-muted transition-colors group-hover:text-royal-700"
                    aria-hidden="true"
                  />
                ) : null}
              </>
            );

            return (
              <li
                key={channel.key}
                className="border-b border-line last:border-b-0"
              >
                {channel.href ? (
                  <a
                    href={channel.href}
                    {...(channel.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group u-card -mx-2 flex items-start gap-3 rounded-lg px-2 py-3 hover:bg-surface-subtle"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="flex items-start gap-3 py-3">{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      ) : null}

      <div className="mt-6 border-t border-line pt-4">
        <p className="text-sm leading-relaxed text-ink-soft">
          Need a written price?{" "}
          <Link
            href="/quote"
            className="font-medium text-royal-700 link-underline transition-colors hover:text-royal-800"
          >
            Use the quote form
          </Link>
          .
        </p>
        </div>
      </section>
    </Reveal>
  );
}
