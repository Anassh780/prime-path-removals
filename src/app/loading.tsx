import { LogoMark } from "@/components/brand/logo";
import { Container, Section } from "@/components/shared/section";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Route-level loading state for every page that does not define its own.
 *
 * The brand mark is the real logo, so the first thing a slow navigation shows
 * is recognisably Prime House rather than a generic spinner. The blocks beneath
 * sketch the shape of a page — eyebrow, headline, body, calls to action, then a
 * card grid — so the real content settles into place instead of jumping.
 *
 * The whole block stays invisible for its first 200 ms and only then fades in:
 * a prefetched navigation normally resolves inside that window, so a fast click
 * never sees a flash of skeleton. Reduced motion is handled globally in
 * `globals.css` (durations and delays are zeroed); the shimmer stops and the
 * blocks stay as neutral placeholders.
 *
 * `role="status"` carries the announcement on its own — no `aria-busy` on the
 * same region, because some screen readers defer live-region updates until that
 * flag clears, and this region is unmounted rather than cleared.
 */
export default function Loading() {
  return (
    <div
      role="status"
      className="animate-[fade-in_0.24s_var(--ease-out-soft)_0.2s_both]"
    >
      <span className="sr-only">Loading page</span>

      <div aria-hidden="true">
        <Section tone="subtle" className="border-b border-line">
          <Container>
            {/*
             * Centred brand lockup: the mark is the real logo and the lines
             * stand in for the wordmark, so a slow navigation announces the
             * brand before any page content exists. It is centred so it reads
             * as a loading indicator rather than a second copy of the header.
             */}
            <div className="flex justify-center">
              <div className="flex items-center gap-2.5">
                <LogoMark className="size-10 rounded-xl" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="h-2 w-20" />
                </div>
              </div>
            </div>

            <div className="mt-10 max-w-2xl">
              <div className="space-y-3">
                <Skeleton className="h-9 w-full max-w-lg sm:h-12 lg:h-14" />
                <Skeleton className="h-9 w-3/4 max-w-sm sm:h-12 lg:h-14" />
              </div>

              <div className="mt-7 space-y-2.5">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-2/3" />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Skeleton className="h-12 w-40 rounded-lg" />
                <Skeleton className="h-12 w-32 rounded-lg" />
              </div>
            </div>
          </Container>
        </Section>

        <Container className="py-12 md:py-16">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="rounded-xl border border-line bg-white p-5 shadow-card sm:p-6"
              >
                <Skeleton className="size-11 rounded-lg" />
                <Skeleton className="mt-5 h-4 w-3/4" />
                <Skeleton className="mt-3 h-3 w-full" />
                <Skeleton className="mt-2 h-3 w-5/6" />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
