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
      "Full service home moves handled by a trained crew, from the first box to the last piece of furniture.",
    description:
      "Whether you are moving a one bedroom flat or a family home, we plan the day around your property, your access and your timeline. Your crew arrives with the right vehicle, protective materials and equipment, then works room by room so nothing is rushed and nothing is left behind.",
    benefits: [
      "A written, itemised quote before you commit",
      "Protective wrapping and floor coverings as standard",
      "Room by room loading so items arrive where they belong",
      "Flexible dates, including weekends and end of month moves",
    ],
    includes: [
      "Pre move planning call and access check",
      "Dismantling and reassembling standard furniture",
      "Careful loading, transit and unloading",
      "Optional packing and unpacking service",
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
      "Planned commercial moves that keep your business running, with out of hours options to protect trading time.",
    description:
      "Office moves succeed on planning, not on the day. We map your floor plans, agree a sequence for desks, IT and storage, and work around your operating hours so teams can get back to work quickly. Everything is labelled by department and destination before it leaves the building.",
    benefits: [
      "Out of hours and weekend relocations available",
      "Department and desk level labelling",
      "Coordinated with your IT and facilities contacts",
      "Single point of contact throughout the project",
    ],
    includes: [
      "Site survey and move sequencing plan",
      "Crate hire for files, IT and personal effects",
      "Furniture dismantling and reassembly",
      "Secure transit and staged delivery",
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
      "Racking, pallets and stock moved with a clear sequence, so your warehouse is back in operation fast.",
    description:
      "Warehouse moves involve volume, access and timing. We plan pallet flow and racking dismantling around your shutdown window, provide the crew and vehicles to match the scale of the site, and keep stock labelled by bay so it can be reinstated in the right place.",
    benefits: [
      "Scaled crews and vehicles for large volume moves",
      "Palletised handling and racking dismantling",
      "Bay by bay labelling for a clean reinstatement",
      "Shutdown window scheduling to limit downtime",
    ],
    includes: [
      "Volume survey and access assessment",
      "Racking dismantling and re erection",
      "Pallet wrapping, loading and transport",
      "Site clearance of packaging and waste",
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
      "Single items or full suites moved carefully, ideal for marketplace purchases, deliveries and part loads.",
    description:
      "Not every move needs a full removal. We transport individual pieces and part loads with the same care as a complete home move: wrapped, strapped and protected in transit. Useful for buying second hand furniture, moving a piano or sofa, or shifting a few items between addresses.",
    benefits: [
      "Single item and part load pricing",
      "Blankets, straps and edge protection provided",
      "Two person handling for heavy or awkward pieces",
      "Collection and delivery windows agreed in advance",
    ],
    includes: [
      "Item assessment and access check",
      "Protective wrapping and securing in the vehicle",
      "Careful loading and placement at destination",
      "Optional reassembly on site",
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
      "Expert packing and loading that protects your belongings and makes unpacking at the other end straightforward.",
    description:
      "Good packing saves time, breakages and stress. Our team packs room by room using the right materials for each item, labels every box by destination, and loads the vehicle in the order the new home will need it. You can book packing on its own or as part of a full move.",
    benefits: [
      "Correct materials for fragile, heavy and awkward items",
      "Boxes labelled by room and contents",
      "Loading sequence planned for easy unloading",
      "Packing only or full service options",
    ],
    includes: [
      "Cartons, tape, bubble wrap and wardrobe boxes",
      "Fragile packing and protective wrapping",
      "Systematic loading and load securing",
      "Optional unpacking and packaging removal",
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
      "Household and commercial waste cleared responsibly, with recycling and disposal handled for you.",
    description:
      "Clearing waste during a move or renovation is easier when someone else takes it away. We collect household and commercial waste, load it ourselves, and sort it for recycling or responsible disposal. You get a clear price up front based on the volume involved.",
    benefits: [
      "Clear pricing based on load volume",
      "Sorting for recycling and responsible disposal",
      "Same week collections where availability allows",
      "No need to hire a skip or arrange transport",
    ],
    includes: [
      "Household and garden waste clearance",
      "Bulky item and furniture removal",
      "Renovation and packaging waste",
      "Loading, transport and disposal",
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
      "Complete property clearances for sales, lettings, probate and end of tenancy, handled with discretion.",
    description:
      "Clearing a property is often emotional as well as practical. We work methodically through each room, set aside anything that should be kept or donated, and clear the rest so the property is ready to hand over. Discretion and care are part of the service.",
    benefits: [
      "Room by room clearance to an agreed scope",
      "Items set aside for keeping or donation",
      "Discreet, respectful handling throughout",
      "Property left clean and ready to hand over",
    ],
    includes: [
      "Full or partial property clearance",
      "Furniture, white goods and general contents",
      "Loft, garage and outbuilding clearance",
      "Responsible disposal and recycling",
    ],
    metaTitle: "Property Clearance & Disposal",
    metaDescription:
      "Complete property clearances for sales, lettings, probate and end of tenancy, with discreet handling and responsible disposal.",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
