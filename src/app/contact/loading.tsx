import { Container, Section } from "@/components/shared/section";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading state for the contact page: the page intro, then the form card and
 * the contact-details rail in the same 7/5 split as the real layout.
 */
export default function ContactLoading() {
  return (
    <div
      role="status"
      className="animate-[fade-in_0.24s_var(--ease-out-soft)_0.2s_both]"
    >
      <span className="sr-only">Loading contact details and form</span>

      <div aria-hidden="true">
        <Section className="pb-10 pt-14 md:pb-14 md:pt-20 lg:pb-16 lg:pt-24">
          <Container>
            <div className="max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="h-px w-6 bg-royal-600/40" />
                <Skeleton className="h-2.5 w-20" />
              </div>

              <div className="mt-6 space-y-3">
                <Skeleton className="h-9 w-full max-w-lg sm:h-12 lg:h-14" />
                <Skeleton className="h-9 w-2/3 max-w-sm sm:h-12 lg:h-14" />
              </div>

              <div className="mt-7 space-y-2.5">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-5/6" />
                <Skeleton className="h-3.5 w-2/3" />
              </div>
            </div>
          </Container>
        </Section>

        <Section tone="subtle">
          <Container>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-7">
                <div className="rounded-xl border border-line bg-white p-5 shadow-card sm:p-7">
                  <Skeleton className="h-5 w-40" />

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    {[0, 1, 2, 3, 4].map((field) => (
                      <div key={field} className="flex flex-col gap-2">
                        <Skeleton className="h-3.5 w-24" />
                        <Skeleton className="h-11 w-full rounded-lg" />
                      </div>
                    ))}
                    <div className="flex flex-col gap-2 sm:col-span-2">
                      <Skeleton className="h-3.5 w-28" />
                      <Skeleton className="h-28 w-full rounded-lg" />
                    </div>
                  </div>

                  <Skeleton className="mt-6 h-12 w-full rounded-lg sm:w-44" />
                </div>
              </div>

              <div className="flex flex-col gap-6 lg:col-span-5">
                {[0, 1].map((card) => (
                  <div
                    key={card}
                    className="rounded-xl border border-line bg-white p-5 shadow-card sm:p-6"
                  >
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="mt-3 h-3 w-full" />
                    <Skeleton className="mt-2 h-3 w-4/5" />
                    <Skeleton className="mt-2 h-3 w-3/5" />
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </div>
  );
}
