import {
  BadgeCheck,
  ClipboardCheck,
  Clock,
  HandshakeIcon,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

/**
 * Trust content is deliberately capability-based.
 * No invented statistics, review scores, certifications or years in business.
 */
export const whyChoose = [
  {
    icon: MessageSquare,
    title: "Straight answers",
    description:
      "One point of contact who knows your move. You get clear answers on availability, pricing and timing — not a call centre script.",
  },
  {
    icon: ClipboardCheck,
    title: "Written, itemised quotes",
    description:
      "Every quote sets out what is included: crew size, vehicle, packing, dismantling and any access considerations. No vague hourly guesses.",
  },
  {
    icon: ShieldCheck,
    title: "Careful handling as standard",
    description:
      "Floor protection, blankets and straps come with the job. Fragile and high-value items are planned for before the crew arrives.",
  },
  {
    icon: Clock,
    title: "Dates we commit to",
    description:
      "We confirm availability in writing before you commit, and if something changes we tell you early and offer alternatives.",
  },
  {
    icon: Truck,
    title: "The right vehicle for the job",
    description:
      "Vehicle size is matched to your volume, so you are not paying for empty space or making unnecessary return trips.",
  },
  {
    icon: HandshakeIcon,
    title: "Respectful, discreet crews",
    description:
      "Our teams work cleanly and quietly in your home or office, including probate, end-of-tenancy and commercial clearances.",
  },
];

export const values = [
  {
    icon: BadgeCheck,
    title: "Do what we said",
    description:
      "Agreed dates, agreed scope, agreed price. If something has to change, you hear it from us first — not on move day.",
  },
  {
    icon: Sparkles,
    title: "Treat the property like our own",
    description:
      "Covered floors, protected doorways and careful handling. We leave a property the way we would want ours left.",
  },
  {
    icon: ClipboardCheck,
    title: "Plan properly",
    description:
      "Access, parking, lifts, stairs and awkward items are worked out before the crew arrives, so the day runs calmly.",
  },
  {
    icon: MessageSquare,
    title: "Communicate plainly",
    description:
      "No jargon and no hidden extras. If we cannot help with something, we will say so and point you in the right direction.",
  },
];

export const highlights = [
  {
    value: "7",
    label: "Removal services",
    description:
      "House, office, warehouse, furniture, packing, waste and property clearance — handled by one team.",
  },
  {
    value: "1",
    label: "Point of contact",
    description:
      "The same person plans your move from first enquiry to completion, so nothing gets lost between teams.",
  },
  {
    value: "48h",
    label: "Typical quote turnaround",
    description:
      "Most quotes are returned within two working days of receiving complete move details.",
  },
  {
    value: "100%",
    label: "Written quotations",
    description:
      "Every price is confirmed in writing with the scope itemised, before any booking is made.",
  },
];
