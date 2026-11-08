"use client";

import * as React from "react";

import { QuoteAside } from "@/components/quote/quote-aside";
import { QuoteForm } from "@/components/quote/quote-form";
import { calculateQuoteEstimate, type QuoteEstimate } from "@/lib/quote-pricing";

export function QuoteContainer() {
  const [estimate, setEstimate] = React.useState<QuoteEstimate>(() =>
    calculateQuoteEstimate({ propertyType: "house-1-2" }),
  );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
      <div className="lg:col-span-2">
        <QuoteForm onEstimateChange={setEstimate} />
      </div>
      <QuoteAside estimate={estimate} />
    </div>
  );
}
