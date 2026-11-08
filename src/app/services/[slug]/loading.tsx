import { Container, Section } from "@/components/shared/section";
import { Skeleton } from "@/components/ui/skeleton";

/** Placeholder for the white text blocks inside the navy-950 hero band. */
const ON_NAVY = "bg-white/10 bg-linear-to-r from-white/5 via-white/20 to-white/5";

/**
 * Loading state for a service detail page. The hero band is navy-950 on the
 * real page, so the placeholders there use translucent white instead of the
 * neutral shimmer used on light surfaces.
 */
export default function ServiceLoading() {
  return (
    <div
      role="status"
      className="animate-[fade-in_0.24s_var(--ease-out-soft)_0.2s_both]"
    >
      <span className="sr-only">Loading service details</span>

      <div aria-hidden="true">
        <section className="relative overflow-hidden border-b border-navy-800 bg-navy-950">
          <div className="pointer-events-none absolute inset-0 bg-grid-inverse opacity-60" />

          <Container className="relative py-8 md:py-10 lg:py-12">
            <div className="flex items-center gap-2">
              <Skeleton className="h-2.5 w-10" />
              <Skeleton className="h-2.5 w-14" />
              <Skeleton className="h-2.5 w-24" />
            </div>

            <div className="mt-10 lg:mt-14">
              <div className="flex items-center gap-4">
                <Skeleton className={`size-12 rounded-xl sm:size-14 ${ON_NAVY}`} />
                <div className="flex items-center gap-2">
                  <span className="h-px w-6 bg-accent-300/60" />
                  <Skeleton className={`h-2.5 w-28 ${ON_NAVY}`} />
                </div>
              </div>

              <div className="mt-6 max-w-3xl space-y-3">
                <Skeleton className={`h-10 w-full max-w-lg sm:h-12 lg:h-14 ${ON_NAVY}`} />
              </div>

              <div className="mt-6 max-w-2xl space-y-2.5">
                <Skeleton className={`h-4 w-full ${ON_NAVY}`} />
                <Skeleton className={`h-4 w-2/3 ${ON_NAVY}`} />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Skeleton className="h-12 w-40 rounded-lg bg-white/15 bg-linear-to-r from-white/5 via-white/25 to-white/5" />
                <Skeleton
                  className={`h-12 w-44 rounded-lg border border-white/25 bg-white/5 bg-linear-to-r from-white/5 via-white/15 to-white/5`}
                />
              </div>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-8">
                <div className="max-w-2xl space-y-3">
                  <Skeleton className="h-2.5 w-24" />
                  <Skeleton className="h-8 w-full max-w-md" />
                  <Skeleton className="h-3.5 w-full" />
                  <Skeleton className="h-3.5 w-5/6" />
                </div>

                <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:gap-12">
                  {[0, 1].map((column) => (
                    <div key={column}>
                      <Skeleton className="h-5 w-40" />
                      <div className="mt-5 divide-y divide-line border-t border-line">
                        {[0, 1, 2, 3].map((row) => (
                          <div key={row} className="flex gap-3 py-3.5">
                            <Skeleton className="mt-0.5 size-4 shrink-0 rounded-full" />
                            <Skeleton className="h-3 w-full" />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 rounded-xl border border-line bg-surface-subtle p-5 sm:p-6">
                  <Skeleton className="h-3.5 w-full max-w-md" />
                </div>
              </div>

              <aside className="lg:col-span-4">
                <div className="rounded-xl border border-line bg-white p-5 shadow-card sm:p-6">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="mt-3 h-3 w-full" />
                  <Skeleton className="mt-2 h-3 w-4/5" />
                  <Skeleton className="mt-5 h-11 w-full rounded-lg" />
                  <Skeleton className="mt-2.5 h-11 w-full rounded-lg" />
                </div>
              </aside>
            </div>
          </Container>
        </Section>
      </div>
    </div>
  );
}
