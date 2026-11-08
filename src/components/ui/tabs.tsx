"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1 rounded-lg border border-line bg-surface-subtle p-1",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative isolate inline-flex items-center justify-center gap-1.5 rounded-md px-3.5 py-2 text-[13px] font-medium text-ink-soft",
      "transition-[color,scale] duration-150 ease-out hover:text-ink active:scale-[0.99]",
      "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-royal-600/15",
      /*
       * The active surface is a pseudo-element so the indicator animates on
       * transform + opacity only — no layout shift, no width animation.
       */
      "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:border before:border-line before:bg-white before:shadow-xs",
      "before:scale-[0.96] before:opacity-0 before:transition-[opacity,scale] before:duration-200 before:ease-out",
      "data-[state=active]:text-ink data-[state=active]:before:scale-100 data-[state=active]:before:opacity-100",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-royal-600/15",
      "data-[state=active]:animate-[fade-in_0.2s_var(--ease-out-soft)_both]",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
