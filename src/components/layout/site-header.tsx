"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Container } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import { mainNav, siteConfig } from "@/config/site";
import { serviceIcons, services } from "@/content/services";
import { cn } from "@/lib/utils";

const SERVICES_HREF = "/services";
const SERVICES_PANEL_ID = "services-panel";

function isActivePath(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

const navItemClass =
  "group relative inline-flex h-full items-center px-3 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-royal-600/50";

function NavUnderline({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute -bottom-1.5 left-0 h-px w-full origin-left bg-navy-900 transition-transform duration-150 ease-out",
        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
      )}
    />
  );
}

export function SiteHeader() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const servicesItemRef = React.useRef<HTMLLIElement>(null);
  const servicesTriggerRef = React.useRef<HTMLButtonElement>(null);
  const firstServiceRef = React.useRef<HTMLAnchorElement>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusFirstService = React.useRef(false);

  const servicesLabel =
    mainNav.find((item) => item.href === SERVICES_HREF)?.label ?? "Services";
  const servicesActive = isActivePath(pathname, SERVICES_HREF);

  /* Hairline border only once the page has scrolled. */
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close transient chrome on navigation. */
  React.useEffect(() => {
    // A route change is an external event: resetting the open panels here is
    // the correct synchronisation point (they would otherwise survive a nav).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setServicesOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  const clearCloseTimer = React.useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openServices = React.useCallback(() => {
    clearCloseTimer();
    setServicesOpen(true);
  }, [clearCloseTimer]);

  const closeServices = React.useCallback((restoreFocus = false) => {
    setServicesOpen(false);
    if (restoreFocus) {
      servicesTriggerRef.current?.focus();
    }
  }, []);

  const scheduleClose = React.useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      /* Keep the panel open while keyboard focus is inside it. */
      if (servicesItemRef.current?.contains(document.activeElement)) return;
      setServicesOpen(false);
    }, 140);
  }, [clearCloseTimer]);

  /* Focus the first service when the panel was opened with the keyboard. */
  React.useEffect(() => {
    if (servicesOpen && focusFirstService.current) {
      focusFirstService.current = false;
      firstServiceRef.current?.focus();
    }
  }, [servicesOpen]);

  /* Dismiss on outside pointer down and on Escape. */
  React.useEffect(() => {
    if (!servicesOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (
        servicesItemRef.current &&
        !servicesItemRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        closeServices(true);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen, closeServices]);

  React.useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  return (
    <header
      className={cn(
        /* The 72 → 64 px desktop shrink is a padding transition on the sticky
           shell, so the header compresses without a height jump or a reflow of
           its own contents. Mobile keeps a constant 72 px. */
        "sticky top-0 z-40 border-b bg-white transition-[padding,border-color,box-shadow] duration-200 ease-out",
        scrolled ? "border-line shadow-xs" : "border-transparent lg:py-1",
      )}
    >
      <Container className="grid h-[72px] grid-cols-[auto_1fr_auto] items-center gap-4 lg:h-16 lg:gap-6">
        <Link
          href="/"
          aria-label={`${siteConfig.name} home`}
          className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-royal-600/20"
        >
          <span
            className={cn(
              "inline-flex origin-left transition-transform duration-200 ease-out",
              scrolled ? "lg:scale-[0.94]" : "lg:scale-100",
            )}
          >
            <Logo compact className="lg:hidden" />
            <Logo className="hidden lg:inline-flex" />
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden h-full justify-self-center lg:block"
        >
          <ul className="flex h-full items-center gap-0.5">
            {mainNav.map((item) => {
              if (item.href === SERVICES_HREF) {
                return (
                  <li
                    key={item.href}
                    ref={servicesItemRef}
                    className="relative flex h-full items-center"
                    onPointerEnter={(event) => {
                      if (event.pointerType === "mouse") openServices();
                    }}
                    onPointerLeave={(event) => {
                      if (event.pointerType === "mouse") scheduleClose();
                    }}
                    onBlur={(event) => {
                      if (
                        !event.currentTarget.contains(
                          event.relatedTarget as Node | null,
                        )
                      ) {
                        closeServices();
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown" && !servicesOpen) {
                        event.preventDefault();
                        focusFirstService.current = true;
                        openServices();
                      }
                    }}
                  >
                    <button
                      ref={servicesTriggerRef}
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-controls={SERVICES_PANEL_ID}
                      onClick={() =>
                        servicesOpen ? closeServices() : openServices()
                      }
                      className={cn(
                        navItemClass,
                        "gap-1.5",
                        servicesActive || servicesOpen
                          ? "text-navy-900"
                          : "text-ink-soft hover:text-navy-900",
                      )}
                    >
                      <span className="relative">
                        {servicesLabel}
                        <NavUnderline
                          active={servicesActive || servicesOpen}
                        />
                      </span>
                      <ChevronDown
                        aria-hidden="true"
                        className={cn(
                          "size-4 text-ink-muted transition-transform duration-150 ease-out",
                          servicesOpen && "rotate-180 text-navy-900",
                        )}
                      />
                    </button>

                    <div
                      id={SERVICES_PANEL_ID}
                      className={cn(
                        /* `visibility` is in the transition list on purpose:
                           it flips to hidden only at the end of the 200 ms
                           fade, so the panel animates out instead of
                           disappearing on the first frame. */
                        "absolute left-1/2 top-full z-50 w-[600px] max-w-[calc(100vw-2.5rem)] -translate-x-1/2 pt-2 transition-[opacity,translate,visibility] duration-200 ease-out",
                        servicesOpen
                          ? "visible translate-y-0 opacity-100"
                          : "pointer-events-none invisible -translate-y-1 opacity-0",
                      )}
                    >
                      <div className="overflow-hidden rounded-xl border border-line bg-white shadow-overlay">
                        <div className="grid gap-0.5 p-2">
                          {services.map((service, index) => {
                            const Icon = serviceIcons[service.icon];
                            const href = `/services/${service.slug}`;
                            const active = pathname === href;

                            return (
                              <Link
                                key={service.slug}
                                ref={
                                  index === 0 ? firstServiceRef : undefined
                                }
                                href={href}
                                aria-current={active ? "page" : undefined}
                                onClick={() => setServicesOpen(false)}
                                className={cn(
                                  "group flex items-start gap-3 rounded-lg p-2.5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-600/40",
                                  active
                                    ? "bg-royal-50"
                                    : "hover:bg-surface-subtle",
                                )}
                              >
                                <span
                                  className={cn(
                                    "u-icon-tile mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border",
                                    active
                                      ? "border-royal-200 bg-white text-royal-700"
                                      : "border-line bg-surface-subtle text-navy-700 group-hover:border-navy-200 group-hover:bg-white group-hover:text-navy-900",
                                  )}
                                >
                                  <Icon
                                    className="size-[18px]"
                                    aria-hidden="true"
                                  />
                                </span>
                                <span className="min-w-0">
                                  <span className="flex items-center gap-2 text-sm font-medium text-ink">
                                    {service.navLabel}
                                  </span>
                                  <span className="mt-0.5 line-clamp-2 block text-[13px] leading-snug text-ink-muted">
                                    {service.summary}
                                  </span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-surface-subtle px-4 py-3">
                          <Link
                            href="/services"
                            onClick={() => setServicesOpen(false)}
                            className="group inline-flex items-center gap-1.5 rounded-sm text-[13px] font-medium text-royal-700 transition-colors duration-150 hover:text-royal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-600/40"
                          >
                            View all services
                            <ArrowRight
                              className="u-arrow size-3.5"
                              aria-hidden="true"
                            />
                          </Link>
                          <Link
                            href="/quote"
                            onClick={() => setServicesOpen(false)}
                            className="group inline-flex items-center gap-1.5 rounded-sm text-[13px] font-medium text-ink-soft transition-colors duration-150 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal-600/40"
                          >
                            Get a free quote
                            <ArrowRight
                              className="u-arrow size-3.5"
                              aria-hidden="true"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }

              const active = isActivePath(pathname, item.href);

              return (
                <li key={item.href} className="flex h-full items-center">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      navItemClass,
                      active
                        ? "text-navy-900"
                        : "text-ink-soft hover:text-navy-900",
                    )}
                  >
                    <span className="relative">
                      {item.label}
                      <NavUnderline active={active} />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-1.5 sm:gap-2">
          <Button
            asChild
            variant="accent"
            size="sm"
            className="hidden h-10 px-4 sm:inline-flex"
          >
            <Link href="/quote">Get a free quote</Link>
          </Button>

          <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
        </div>
      </Container>
    </header>
  );
}
