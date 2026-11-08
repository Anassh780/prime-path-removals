import type { ReactNode } from "react";

import { PageTransition } from "@/components/shared/page-transition";

/**
 * Route template — remounts on every navigation, so the entrance plays once
 * per page change rather than once per session.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
