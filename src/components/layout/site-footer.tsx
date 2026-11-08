import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import {
  contactChannels,
  hasContactChannels,
} from "@/components/layout/contact-channels";
import { Container } from "@/components/shared/section";
import { Stagger, StaggerItem } from "@/components/shared/reveal";
import { footerNav, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const footerLinkClass =
  "inline-flex rounded-sm text-sm text-white/65 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950";

const columnHeadingClass =
  "text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-white">
      <Container>
        <Stagger
          stagger={0.06}
          amount={0.08}
          className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.25fr] lg:gap-8 lg:py-16"
        >
          <StaggerItem className="max-w-sm sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label={`${siteConfig.name} home`}
              className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 focus-visible:ring-offset-4 focus-visible:ring-offset-navy-950"
            >
              <Logo tone="inverse" />
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              {siteConfig.description}
            </p>
            <p className="mt-4 text-[13px] leading-relaxed text-white/55">
              Coverage, crew size and timing are confirmed in writing before you
              commit.
            </p>
          </StaggerItem>

          <StaggerItem>
            <h2 className={columnHeadingClass}>Company</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerNav.company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h2 className={columnHeadingClass}>Services</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerNav.services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-white underline-offset-4 transition-colors duration-150 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
                >
                  All services
                  <ArrowRight className="u-arrow size-3.5" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h2 className={columnHeadingClass}>Contact</h2>

            {hasContactChannels ? (
              <>
                <ul className="mt-4 flex flex-col gap-3">
                  {contactChannels.map((channel) => {
                    const Icon = channel.icon;
                    const content = (
                      <>
                        <Icon
                          className="mt-0.5 size-4 shrink-0 text-white/40"
                          aria-hidden="true"
                        />
                        <span className="min-w-0 break-words">
                          <span className="sr-only">{channel.label}: </span>
                          {channel.value}
                        </span>
                      </>
                    );

                    return (
                      <li key={channel.key} className="text-sm text-white/65">
                        {channel.href ? (
                          <a
                            href={channel.href}
                            {...(channel.external
                              ? { target: "_blank", rel: "noreferrer" }
                              : {})}
                            className={cn(
                              footerLinkClass,
                              "items-start gap-2.5",
                            )}
                          >
                            {content}
                            {channel.external ? (
                              <span className="sr-only">
                                {" "}
                                (opens in a new tab)
                              </span>
                            ) : null}
                          </a>
                        ) : (
                          <span className="flex items-start gap-2.5">
                            {content}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href="/contact"
                  className="group mt-4 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-white underline-offset-4 transition-colors duration-150 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
                >
                  Send an enquiry
                  <ArrowRight className="u-arrow size-3.5" aria-hidden="true" />
                </Link>
              </>
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Direct contact details are being finalised. The contact form is
                the fastest way to reach us:{" "}
                <Link
                  href="/contact"
                  className="font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors duration-150 hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
                >
                  send an enquiry
                </Link>
                .
              </p>
            )}
          </StaggerItem>
        </Stagger>

        {/* Extra bottom padding on small screens keeps the fixed booking action
            from covering the last footer link. */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 pb-28 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between sm:pb-6">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>
            Privacy policy available on request.{" "}
            <Link
              href="/contact"
              className="rounded-sm font-medium text-white/70 underline-offset-4 transition-colors duration-150 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
            >
              Contact us
            </Link>
            .
          </p>
        </div>
      </Container>
    </footer>
  );
}
