import { cn } from "@/lib/utils";

/**
 * Shimmer placeholder used by every loading state.
 *
 * The sweep is a token-based gradient (`line` → `surface` → `line`) rather than
 * a pulse: the neutral base reads as a block on white cards *and* on
 * `surface-subtle` sections, and the moving highlight makes it obvious that
 * content is still arriving. Radius/height are left to the caller so a
 * placeholder can match the control, card or line it stands in for.
 *
 * Reduced motion is handled globally in `globals.css` (durations and delays are
 * zeroed) plus the `motion-reduce` fallbacks below, so the block settles into a
 * static neutral fill without any JS branching.
 */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-md bg-line",
        "bg-[linear-gradient(90deg,var(--color-line)_20%,var(--color-surface)_45%,var(--color-line)_70%)]",
        "bg-[length:200%_100%] bg-repeat",
        "motion-reduce:animate-none motion-reduce:bg-none",
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<"div"> & { orientation?: "horizontal" | "vertical" }) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-line",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton, Separator };
