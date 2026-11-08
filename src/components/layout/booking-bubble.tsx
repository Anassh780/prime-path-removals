"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight, ChevronDown, Phone, X } from "lucide-react";

import { WhatsAppIcon } from "@/components/brand/whatsapp-icon";
import { hasPhone, hasWhatsApp, siteConfig } from "@/config/site";
import { cn, formatPhoneHref, formatWhatsAppHref } from "@/lib/utils";

const PANEL_ID = "booking-options-panel";

/**
 * Floating "Book now" action.
 *
 * The phone and WhatsApp details live here rather than in the header, so the
 * navigation stays calm while booking stays one tap away on every page. It is a
 * disclosure (button + panel), not a modal: Escape and outside clicks close it
 * and focus returns to the trigger.
 */
export function BookingBubble() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const hasChannels = hasPhone || hasWhatsApp;

  /* Close on navigation. */
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  /* Close on outside pointer down and on Escape. */
  React.useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!hasChannels) return null;

  const phone = siteConfig.contact.phone;
  const whatsapp = siteConfig.contact.whatsapp;

  return (
    <div
      ref={rootRef}
      className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6"
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            key="booking-panel"
            id={PANEL_ID}
            role="dialog"
            aria-labelledby="booking-options-title"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="origin-bottom-right w-[min(21rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-line bg-white shadow-overlay"
          >
            <div className="flex items-start justify-between gap-3 bg-navy-950 px-4 py-3.5">
              <div className="min-w-0">
                <h2
                  id="booking-options-title"
                  className="text-sm font-semibold text-white"
                >
                  Book your move
                </h2>
                <p className="mt-0.5 text-[11px] leading-relaxed text-white/60">
                  Call or message — we reply personally.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                aria-label="Close booking options"
                className="-mr-1 -mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-white/60 transition-colors duration-150 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div className="p-2">
              {hasPhone ? (
                <a
                  href={formatPhoneHref(phone)}
                  className="group flex items-center gap-3 rounded-xl p-3 transition-colors duration-150 hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-600/40"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-white shadow-xs">
                    <Phone className="size-[18px]" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                      Call to book
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold text-ink">
                      {phone}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-ink-muted transition-colors group-hover:text-royal-700"
                    aria-hidden="true"
                  />
                </a>
              ) : null}

              {hasWhatsApp ? (
                <a
                  href={formatWhatsAppHref(
                    whatsapp,
                    "Hello Prime House Removals, I would like to book a move.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl p-3 transition-colors duration-150 hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-600/40"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-xs">
                    <WhatsAppIcon className="size-[18px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                      WhatsApp us
                    </span>
                    <span className="mt-0.5 block text-sm font-semibold text-ink">
                      {whatsapp}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-ink-muted transition-colors group-hover:text-royal-700"
                    aria-hidden="true"
                  />
                </a>
              ) : null}
            </div>

            <div className="border-t border-line px-4 py-3">
              <Link
                href="/quote"
                className="flex items-center justify-between gap-2 text-xs font-medium text-royal-700 transition-colors hover:text-royal-800"
              >
                Prefer a written quote? Start here
                <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        aria-label={open ? "Close booking options" : "Book now — call or WhatsApp"}
        className="group inline-flex h-14 items-center gap-3 rounded-full border border-white/10 bg-navy-950 pl-2 pr-5 text-white shadow-lift transition duration-150 hover:bg-navy-900 active:translate-y-px focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-royal-600/30 focus-visible:ring-offset-2"
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-accent-600 text-white">
          <Phone className="size-[18px]" aria-hidden="true" />
        </span>
        <span className="flex flex-col items-start leading-tight">
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/55">
            Talk to us
          </span>
          <span className="text-sm font-semibold">Book now</span>
        </span>
        <ChevronDown
          className={cn(
            "size-4 text-white/60 transition-transform duration-150 ease-out",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
