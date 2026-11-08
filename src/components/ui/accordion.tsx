"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-line", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 items-start justify-between gap-6 py-5 text-left",
        "text-[15px] font-medium text-ink transition-colors duration-150 ease-out hover:text-navy-800",
        "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-royal-600/15 focus-visible:ring-offset-2",
        className,
      )}
      {...props}
    >
      <span className="leading-relaxed">{children}</span>
      <span
        className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink-soft transition-[rotate,background-color,border-color,color] duration-200 ease-out group-hover:border-navy-200 group-hover:bg-navy-50 group-data-[state=open]:rotate-45 group-data-[state=open]:border-navy-900 group-data-[state=open]:bg-navy-900 group-data-[state=open]:text-white"
        aria-hidden="true"
      >
        <Plus className="size-3.5" />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="group overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div
      className={cn(
        "pb-5 pr-10 text-sm leading-relaxed text-ink-soft",
        "group-data-[state=open]:animate-[fade-in_0.22s_var(--ease-out-soft)_both]",
        className,
      )}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
