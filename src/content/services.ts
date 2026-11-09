import type { LucideIcon } from "lucide-react";
import {
  Armchair,
  Boxes,
  Building2,
  Home,
  Package,
  Trash2,
  Warehouse,
} from "lucide-react";

export type ServiceIconKey =
  | "home"
  | "building"
  | "warehouse"
  | "armchair"
  | "packages"
  | "trash"
  | "box";

export const serviceIcons: Record<ServiceIconKey, LucideIcon> = {
  home: Home,
  building: Building2,
  warehouse: Warehouse,
  armchair: Armchair,
  packages: Boxes,
  trash: Trash2,
  box: Package,
};

export type Service = {
  slug: string;
  title: string;
  navLabel: string;
  icon: ServiceIconKey;
  summary: string;
  description: string;
  benefits: string[];
  includes: string[];
  metaTitle: string;
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "house-removals",
    title: "House & Residential Removals",
    navLabel: "House removals",
    icon: "home",
    summary:
      "Full-service residential moves with trained crews and dedicated vehicles.",
    description:
      "Whether moving a flat or a family home, we plan vehicle sizing, access, and timelines so your move runs smoothly room by room.",
    benefits: [
      "Written itemised quote before you commit",
      "Floor protection and blankets as standard",
      "Room-by-room loading sequence",
      "Flexible weekend and month-end dates",
    ],
    includes: [
      "Pre-move planning and access check",
      "Standard furniture dismantling and rebuilding",
      "Secure vehicle transit and unloading",
      "Optional full packing service",
    ],
    metaTitle: "House & Residential Removals",
    metaDescription:
      "Full service house removals with a trained crew, protective materials and an itemised written quote. Plan your residential move with Prime House Removals.",
  },
  {
    slug: "office-relocations",
    title: "Office & Commercial Relocations",
    navLabel: "Office relocations",
    icon: "building",
    summary:
      "Planned commercial moves with minimal downtime and weekend options.",
    description:
      "We map your floor plans, label IT and storage by department, and coordinate out-of-hours relocations to keep business disruption to a minimum.",
    benefits: [
      "Weekend and evening relocations available",
      "Department and desk-level labelling",
      "Coordinated with IT and facilities staff",
      "Single project coordinator throughout",
    ],
    includes: [
      "Site survey and sequencing plan",
      "Crate hire for IT and documents",
      "Office furniture dismantling and assembly",
      "Phased delivery to your new floor plan",
    ],
    metaTitle: "Office & Commercial Relocations",
    metaDescription:
      "Planned office and commercial relocations with out of hours options, department labelling and a dedicated move coordinator. Request a commercial moving quote.",
  },
  {
    slug: "warehouse-moving",
    title: "Warehouse Moving & Clearance",
    navLabel: "Warehouse moves",
    icon: "warehouse",
    summary:
      "Sequenced warehouse moves and racking clearance with minimal downtime.",
    description:
      "We schedule pallet flow, equipment dismantling, and bay-by-bay labelling around your shutdown windows for fast reinstatement.",
    benefits: [
      "Scaled vehicles for heavy volume moves",
      "Palletised transit and racking dismantling",
      "Bay-by-bay stock labelling",
      "Planned during scheduled shutdowns",
    ],
    includes: [
      "Volume survey and access review",
      "Racking dismantling and re-erection",
      "Pallet wrapping, loading and transport",
      "Site clearance of packaging materials",
    ],
    metaTitle: "Warehouse Moving & Clearance",
    metaDescription:
      "Warehouse relocations and clearances with palletised handling, racking dismantling and bay level labelling. Plan a low downtime warehouse move.",
  },
  {
    slug: "furniture-moving",
    title: "Furniture Moving & Transportation",
    navLabel: "Furniture moving",
    icon: "armchair",
    summary:
      "Single items and suites transported safely with two-person handling.",
    description:
      "Professional transport for individual pieces and part loads: wrapped in quilted blankets, strapped securely, and placed in your new room.",
    benefits: [
      "Single item and part-load pricing",
      "Quilted blankets and transit straps included",
      "Two-person crew for heavy pieces",
      "Confirmed collection and delivery windows",
    ],
    includes: [
      "Access check at both properties",
      "Protective blanket wrapping and strapping",
      "Placement in your designated room",
      "Optional on-site assembly",
    ],
    metaTitle: "Furniture Moving & Transportation",
    metaDescription:
      "Careful furniture moving and transport for single items, suites and part loads. Wrapped, strapped and handled by a two person crew.",
  },
  {
    slug: "packing-and-loading",
    title: "Professional Packing & Loading",
    navLabel: "Packing & loading",
    icon: "packages",
    summary:
      "Professional packing and loading that protects belongings and simplifies unpacking.",
    description:
      "Our team packs room by room using double-walled cartons and protective bubble wrap, labelling every box for easy destination placement.",
    benefits: [
      "Specialist materials for fragile china & glass",
      "Boxes labelled by room and contents",
      "Organised loading sequence",
      "Packing-only or full-move options",
    ],
    includes: [
      "Cartons, bubble wrap, and wardrobe boxes",
      "Fragile item wrapping and protection",
      "Systematic vehicle loading and securing",
      "Optional unpacking and carton removal",
    ],
    metaTitle: "Professional Packing & Loading",
    metaDescription:
      "Professional packing and loading services with the right materials, room by room labelling and a planned loading sequence.",
  },
  {
    slug: "waste-removal",
    title: "Waste & Rubbish Removal",
    navLabel: "Waste removal",
    icon: "trash",
    summary:
      "Responsible household and commercial waste clearance with upfront pricing.",
    description:
      "We collect, load, and sort unwanted items for recycling or licensed disposal. Fast clearances without the hassle of skip hire.",
    benefits: [
      "Clear upfront pricing by volume",
      "Sorted for recycling and responsible disposal",
      "Fast collection turnaround",
      "No skip permits or driveway damage",
    ],
    includes: [
      "Household, garden, and garage clearance",
      "Bulky furniture and appliance removal",
      "Packaging and renovation waste",
      "Complete loading and sweep-through",
    ],
    metaTitle: "Waste & Rubbish Removal",
    metaDescription:
      "Household and commercial waste removal with responsible sorting and disposal. Clear pricing based on load volume.",
  },
  {
    slug: "property-clearance",
    title: "Property Clearance & Disposal",
    navLabel: "Property clearance",
    icon: "box",
    summary:
      "Complete, discreet property clearances for sales, lettings, and probate.",
    description:
      "We clear properties methodically room by room, setting aside items for donation and leaving rooms clean and ready to hand over.",
    benefits: [
      "Room-by-room clearance to agreed scope",
      "Donation and recycling prioritized",
      "Discreet and respectful service",
      "Premises left swept and ready for handover",
    ],
    includes: [
      "Full or partial property clearance",
      "Furniture, appliances, and contents",
      "Loft, shed, and outbuilding clearing",
      "Licensed commercial recycling and disposal",
    ],
    metaTitle: "Property Clearance & Disposal",
    metaDescription:
      "Complete property clearances for sales, lettings, probate and end of tenancy, with discreet handling and responsible disposal.",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
