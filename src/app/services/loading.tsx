import { Container, Section } from "@/components/shared/section";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading state for the services index. Mirrors the real page: a subtle hero
 * band with the copy on the left and the service index card on the right,
 * followed by the divided service rows.
 */
export default function ServicesLoading() {
  return (
    <div
      role="status"
      className="animate-[fade-in_0.24s_var(--ease-out-soft)_0.2s_both]"
    >
      <span className="sr-only">Loading services</span>

      <div aria-hidden="true">
        <Section tone="subtle" className="border-b border-line">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
              <div className="max-w-xl lg:col-span-7">
                <div className="flex items-center gap-2">
                  <span className="h-px w-6 bg-royal-600/40" />
                  <Skeleton className="h-2.5 w-24" />
                </div>

                <Skeleton className="mt-6 h-10 w-4/5 max-w-md sm:h-12 lg:h-14" />

                <div className="mt-7 space-y-2.5">
                  <Skeleton className="h-3.5 w-full" />
                  <Skeleton className="h-3.5 w-full" />
                  <Skeleton className="h-3.5 w-2/3" />
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Skeleton className="h-12 w-44 rounded-lg" />
                  <Skeleton className="h-12 w-36 rounded-lg" />
                </div>

                <Skeleton className="mt-6 h-3 w-56" />
              </div>

              {/* Service index card — desktop only, as on the real page. */}
              <div className="hidden lg:col-span-5 lg:block">
                <div className="rounded-xl border border-line bg-white p-5 shadow-card">
                  <Skeleton className="h-3 w-28" />
                  <div className="mt-4 flex flex-col gap-3.5">
                    {[0, 1, 2, 3, 4, 5, 6].map((row) => (
                      <div key={row} className="flex items-center gap-3">
                        <Skeleton className="size-8 shrink-0 rounded-lg" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="py-0 md:py-0 lg:py-0">
          <Container>
            <div className="divide-y divide-line">
              {[0, 1, 2, 3, 4, 5, 6].map((row) => (
                <div key={row} className="flex items-center gap-5 py-7">
                  <Skeleton className="size-12 shrink-0 rounded-xl" />
                  <div className="min-w-0 flex-1">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="mt-2.5 h-3 w-full max-w-md" />
                  </div>
                  <Skeleton className="hidden h-9 w-24 rounded-lg sm:block" />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      </div>
    </div>
  );
}
