"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ArrowRight, Menu } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNav, siteConfig } from "@/config/site";
import { serviceIcons, services } from "@/content/services";
import { cn } from "@/lib/utils";

/** House curve — matches docs/motion-system.md. */
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Items enter with a short stagger (~0.04 s) once the sheet is on screen.
 * The panel itself slides in from Radix/sheet.tsx; these are the contents
 * settling inside it, so the two never read as the same animation twice.
 */
function itemEnter(delay: number, distance = 8) {
  return {
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay, ease: EASE },
  } as const;
}

function isActivePath(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

type MobileNavProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

/**
 * Mobile navigation sheet. Every internal link is wrapped in SheetClose so the
 * panel dismisses as soon as the route changes; Radix handles the scroll lock
 * and focus trap.
 */
export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex size-10 items-center justify-center rounded-lg border border-line bg-white text-ink transition-[color,background-color,border-color,translate] duration-150 hover:border-line-strong hover:bg-surface-subtle active:translate-y-px focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-royal-600/20 lg:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" title="Site menu" className="p-0">
        <div className="flex h-full flex-col">
          <div className="flex h-[72px] shrink-0 items-center border-b border-line px-5 pr-14">
            <SheetClose asChild>
              <Link
                href="/"
                aria-label={`${siteConfig.name} — home`}
                className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-royal-600/20"
              >
                <Logo compact />
              </Link>
            </SheetClose>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
            <nav aria-label="Mobile primary">
              <ul className="flex flex-col gap-0.5">
                {mainNav.map((item, index) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <motion.li
                      key={item.href}
                      {...itemEnter(0.06 + index * 0.04)}
                    >
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center justify-between rounded-lg px-3 py-3 text-[15px] font-medium transition-colors duration-150",
                            active
                              ? "bg-surface-subtle text-navy-900"
                              : "text-ink-soft hover:bg-surface-subtle hover:text-navy-900",
                          )}
                        >
                          {item.label}
                          {active ? (
                            <span
                              className="size-1.5 rounded-full bg-accent-500"
                              aria-hidden="true"
                            />
                          ) : null}
                        </Link>
                      </SheetClose>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="mt-6">
              <p className="eyebrow px-3">Services</p>
              <ul className="mt-2 flex flex-col gap-0.5">
                {services.map((service, index) => {
                  const Icon = serviceIcons[service.icon];
                  const href = `/services/${service.slug}`;
                  const active = pathname === href;
                  return (
                    <motion.li
                      key={service.slug}
                      {...itemEnter(0.14 + Math.min(index * 0.02, 0.1), 6)}
                    >
                      <SheetClose asChild>
                        <Link
                          href={href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-150",
                            active
                              ? "bg-royal-50 text-navy-900"
                              : "text-ink-soft hover:bg-surface-subtle hover:text-navy-900",
                          )}
                        >
                          <span
                            className={cn(
                              "flex size-8 shrink-0 items-center justify-center rounded-md border",
                              active
                                ? "border-royal-200 bg-white text-royal-700"
                                : "border-line bg-surface-subtle text-navy-700",
                            )}
                          >
                            <Icon className="size-4" aria-hidden="true" />
                          </span>
                          {service.navLabel}
                        </Link>
                      </SheetClose>
                    </motion.li>
                  );
                })}
              </ul>
              <motion.div {...itemEnter(0.22, 6)}>
                <SheetClose asChild>
                  <Link
                    href="/services"
                    className="link-underline mt-2 ml-3 text-sm font-medium text-royal-700"
                  >
                    View all services
                  </Link>
                </SheetClose>
              </motion.div>
            </div>

            <motion.div
              {...itemEnter(0.24)}
              className="mt-6 border-t border-line px-3 pt-5"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
                Booking
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Tap <span className="font-medium text-ink">Book now</span> at the
                bottom of the screen to call or message us directly, or send a
                written quote request below.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.32, delay: 0.28, ease: EASE }}
            className="shrink-0 border-t border-line bg-surface-subtle p-4"
          >
            <SheetClose asChild>
              <Link
                href="/quote"
                className={cn(
                  buttonVariants({ variant: "accent", size: "md" }),
                  "w-full",
                )}
              >
                Get a free quote
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </SheetClose>
            <p className="mt-3 text-center text-[11px] leading-relaxed text-ink-muted">
              Written, itemised quotes — no obligation.
            </p>
          </motion.div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
