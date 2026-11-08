import type { PropertyType } from "@/lib/validations/quote";

export type { PropertyType };

export const DISTANCE_TIERS = [
  { value: "local", label: "Local move (under 15 miles)", extraMin: 0, extraMax: 0 },
  { value: "regional", label: "Regional (15–50 miles)", extraMin: 55, extraMax: 85 },
  { value: "long-distance", label: "Long distance (50–150 miles)", extraMin: 150, extraMax: 230 },
  { value: "nationwide", label: "Nationwide (150+ miles)", extraMin: 290, extraMax: 430 },
] as const;

export type DistanceTier = (typeof DISTANCE_TIERS)[number]["value"];

export const FLOOR_ACCESS_OPTIONS = [
  { value: "ground", label: "Ground floor / direct access", extraMin: 0, extraMax: 0 },
  { value: "lift", label: "Upper floor with lift access", extraMin: 0, extraMax: 0 },
  { value: "stairs-1-2", label: "1st or 2nd floor (stairs only)", extraMin: 25, extraMax: 40 },
  { value: "stairs-3-plus", label: "3rd floor or higher (stairs only)", extraMin: 55, extraMax: 90 },
] as const;

export type FloorAccess = (typeof FLOOR_ACCESS_OPTIONS)[number]["value"];

export type InventoryItemKey =
  | "doubleBed"
  | "singleBed"
  | "sofa"
  | "armchair"
  | "diningSet"
  | "wardrobe"
  | "drawers"
  | "appliances"
  | "boxes"
  | "desk";

export type InventoryItemDefinition = {
  key: InventoryItemKey;
  label: string;
  category: "furniture" | "appliances" | "boxes";
  cuFt: number;
};

export const INVENTORY_ITEMS: InventoryItemDefinition[] = [
  { key: "doubleBed", label: "Double / King Bed & Mattress", category: "furniture", cuFt: 45 },
  { key: "singleBed", label: "Single Bed & Mattress", category: "furniture", cuFt: 25 },
  { key: "sofa", label: "2–3 Seater Sofa", category: "furniture", cuFt: 50 },
  { key: "armchair", label: "Armchair", category: "furniture", cuFt: 20 },
  { key: "diningSet", label: "Dining Table & Chairs", category: "furniture", cuFt: 35 },
  { key: "wardrobe", label: "Large Wardrobe", category: "furniture", cuFt: 45 },
  { key: "drawers", label: "Chest of Drawers / Sideboard", category: "furniture", cuFt: 20 },
  { key: "desk", label: "Desk & Office Chair", category: "furniture", cuFt: 25 },
  { key: "appliances", label: "Major Appliance (Fridge, Washer, etc.)", category: "appliances", cuFt: 30 },
  { key: "boxes", label: "Pack of 10 Medium / Large Boxes", category: "boxes", cuFt: 50 },
];

export type InventoryCounts = Partial<Record<InventoryItemKey, number>>;

export type PricingBreakdownItem = {
  label: string;
  amount: string;
  detail?: string;
};

export type QuoteEstimate = {
  minPrice: number;
  maxPrice: number;
  priceFormatted: string;
  recommendedVehicle: string;
  recommendedCrew: string;
  estimatedHours: string;
  volumeCuFt: number;
  breakdown: PricingBreakdownItem[];
  notice: string;
};

type BasePropertyConfig = {
  minPrice: number;
  maxPrice: number;
  hours: string;
  volumeCuFt: number;
  vehicle: string;
  crew: string;
  packingAddonMin: number;
  packingAddonMax: number;
};

const PROPERTY_CONFIG: Record<PropertyType, BasePropertyConfig> = {
  "studio-flat": {
    minPrice: 220,
    maxPrice: 320,
    hours: "2.5 – 3.5 hrs",
    volumeCuFt: 250,
    vehicle: "Long Wheelbase High-Roof Van",
    crew: "2-person trained crew",
    packingAddonMin: 120,
    packingAddonMax: 160,
  },
  "house-1-2": {
    minPrice: 340,
    maxPrice: 490,
    hours: "3.5 – 5 hrs",
    volumeCuFt: 500,
    vehicle: "3.5T Luton Box Van with Tail Lift",
    crew: "2-person trained crew",
    packingAddonMin: 170,
    packingAddonMax: 240,
  },
  "house-3-4": {
    minPrice: 620,
    maxPrice: 880,
    hours: "5.5 – 8 hrs",
    volumeCuFt: 950,
    vehicle: "3.5T Luton Box Van (or 2-Van Team)",
    crew: "3-person trained crew",
    packingAddonMin: 270,
    packingAddonMax: 390,
  },
  "house-5-plus": {
    minPrice: 980,
    maxPrice: 1450,
    hours: "7.5 – 11 hrs",
    volumeCuFt: 1600,
    vehicle: "7.5T Removal Truck or Multi-Van Fleet",
    crew: "3 to 4-person trained crew",
    packingAddonMin: 420,
    packingAddonMax: 620,
  },
  "office-commercial": {
    minPrice: 550,
    maxPrice: 1100,
    hours: "4 – 8 hrs",
    volumeCuFt: 800,
    vehicle: "Commercial Luton Fleet + Crates",
    crew: "Dedicated commercial moving crew",
    packingAddonMin: 280,
    packingAddonMax: 480,
  },
  "warehouse-industrial": {
    minPrice: 850,
    maxPrice: 1750,
    hours: "6 – 12 hrs",
    volumeCuFt: 1500,
    vehicle: "Heavy Commercial Vehicles + Pallet Handling",
    crew: "Specialist industrial moving crew",
    packingAddonMin: 450,
    packingAddonMax: 750,
  },
  other: {
    minPrice: 240,
    maxPrice: 380,
    hours: "2 – 4 hrs",
    volumeCuFt: 300,
    vehicle: "3.5T Luton Box Van",
    crew: "2-person trained crew",
    packingAddonMin: 140,
    packingAddonMax: 200,
  },
};

export type PricingInput = {
  propertyType?: PropertyType;
  services?: string[];
  distanceTier?: DistanceTier;
  collectionFloor?: FloorAccess;
  destinationFloor?: FloorAccess;
  inventoryCounts?: InventoryCounts;
};

export function calculateQuoteEstimate(input: PricingInput): QuoteEstimate {
  const propertyKey = input.propertyType ?? "house-1-2";
  const base = PROPERTY_CONFIG[propertyKey] ?? PROPERTY_CONFIG["house-1-2"];
  const services = new Set(input.services ?? ["house-removals"]);

  let min = base.minPrice;
  let max = base.maxPrice;
  let volume = base.volumeCuFt;
  let vehicle = base.vehicle;
  let crew = base.crew;

  const breakdown: PricingBreakdownItem[] = [];

  // Property label lookup
  const propertyLabelMap: Record<PropertyType, string> = {
    "studio-flat": "Studio or flat move",
    "house-1-2": "1–2 bedroom house move",
    "house-3-4": "3–4 bedroom house move",
    "house-5-plus": "5+ bedroom house move",
    "office-commercial": "Office / commercial premises",
    "warehouse-industrial": "Warehouse / industrial unit",
    other: "Standard removal base",
  };

  breakdown.push({
    label: propertyLabelMap[propertyKey] ?? "Standard removal base",
    amount: `£${base.minPrice} – £${base.maxPrice}`,
    detail: `${base.hours} • ${base.vehicle}`,
  });

  // Calculate inventory volume if any item is selected
  let customInventoryCuFt = 0;
  let hasInventoryItems = false;
  if (input.inventoryCounts) {
    for (const [key, count] of Object.entries(input.inventoryCounts)) {
      if (typeof count === "number" && count > 0) {
        const item = INVENTORY_ITEMS.find((i) => i.key === key);
        if (item) {
          customInventoryCuFt += item.cuFt * count;
          hasInventoryItems = true;
        }
      }
    }
  }

  if (hasInventoryItems && customInventoryCuFt > 0) {
    volume = customInventoryCuFt;
    if (customInventoryCuFt > 1200) {
      vehicle = "7.5T Removal Truck or Multi-Van Fleet";
      crew = "3 to 4-person trained crew";
      min = Math.max(min, 950);
      max = Math.max(max, 1400);
    } else if (customInventoryCuFt > 700) {
      vehicle = "3.5T Luton Box Van (or 2-Van Team)";
      crew = "3-person trained crew";
      min = Math.max(min, 600);
      max = Math.max(max, 850);
    } else if (customInventoryCuFt < 200 && propertyKey === "studio-flat") {
      vehicle = "Medium Wheelbase Transit Van";
      crew = "2-person trained crew";
      min = Math.min(min, 200);
      max = Math.min(max, 280);
    }

    breakdown.push({
      label: "Inventory volume adjustment",
      amount: "Included",
      detail: `Approx. ${customInventoryCuFt} cu ft calculated from your item list`,
    });
  }

  // Distance tier
  if (input.distanceTier && input.distanceTier !== "local") {
    const tier = DISTANCE_TIERS.find((t) => t.value === input.distanceTier);
    if (tier && tier.extraMin > 0) {
      min += tier.extraMin;
      max += tier.extraMax;
      breakdown.push({
        label: tier.label,
        amount: `+£${tier.extraMin} – £${tier.extraMax}`,
        detail: "Transit time and fuel allowance",
      });
    }
  }

  // Access & floor levels
  if (input.collectionFloor && input.collectionFloor !== "ground" && input.collectionFloor !== "lift") {
    const opt = FLOOR_ACCESS_OPTIONS.find((f) => f.value === input.collectionFloor);
    if (opt && opt.extraMin > 0) {
      min += opt.extraMin;
      max += opt.extraMax;
      breakdown.push({
        label: `Collection: ${opt.label}`,
        amount: `+£${opt.extraMin} – £${opt.extraMax}`,
        detail: "Stair carrying and additional handling time",
      });
    }
  }

  if (input.destinationFloor && input.destinationFloor !== "ground" && input.destinationFloor !== "lift") {
    const opt = FLOOR_ACCESS_OPTIONS.find((f) => f.value === input.destinationFloor);
    if (opt && opt.extraMin > 0) {
      min += opt.extraMin;
      max += opt.extraMax;
      breakdown.push({
        label: `Destination: ${opt.label}`,
        amount: `+£${opt.extraMin} – £${opt.extraMax}`,
        detail: "Stair carrying and placement time",
      });
    }
  }

  // Add-on services
  if (services.has("packing-and-loading")) {
    min += base.packingAddonMin;
    max += base.packingAddonMax;
    breakdown.push({
      label: "Professional packing & protective materials",
      amount: `+£${base.packingAddonMin} – £${base.packingAddonMax}`,
      detail: "Double-walled cartons, bubble wrap, wardrobe boxes & packing crew",
    });
  }

  if (services.has("furniture-moving") && !services.has("house-removals")) {
    // If booked purely as furniture transport
    breakdown.push({
      label: "Furniture handling & strapping",
      amount: "Included",
      detail: "Blankets, straps and two-person heavy item handling",
    });
  } else if (services.has("furniture-moving") && services.has("house-removals")) {
    min += 45;
    max += 85;
    breakdown.push({
      label: "Furniture dismantling & reassembly",
      amount: "+£45 – £85",
      detail: "Beds, large wardrobes and dining tables taken down and re-erected",
    });
  }

  if (services.has("property-clearance") || services.has("waste-removal")) {
    min += 95;
    max += 180;
    breakdown.push({
      label: "Disposal, clearance & recycling sorting",
      amount: "+£95 – £180",
      detail: "Licensed commercial disposal and green recycling transfer",
    });
  }

  return {
    minPrice: min,
    maxPrice: max,
    priceFormatted: `£${min} – £${max}`,
    recommendedVehicle: vehicle,
    recommendedCrew: crew,
    estimatedHours: base.hours,
    volumeCuFt: volume,
    breakdown,
    notice:
      "Indicative price guide based on typical moves of this specification. A guaranteed fixed price is confirmed in your written quote after reviewing your route and access.",
  };
}
