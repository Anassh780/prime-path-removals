import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-md bg-surface-muted",
        "bg-[linear-gradient(90deg,var(--color-surface-muted)_25%,var(--color-surface-subtle)_37%,var(--color-surface-muted)_63%)] bg-[length:200%_100%] bg-repeat",
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
