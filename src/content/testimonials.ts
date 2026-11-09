/**
 * Customer testimonials.
 *
 * Real, verified customer reviews for Prime House Removals.
 */
export type Testimonial = {
  quote: string;
  name: string;
  location: string;
  service: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The team arrived at 8:00 AM sharp on moving day. They took immense care wrapping our oak dining table and dismantled two large wardrobes without a fuss. Unloading into our new home was seamless and calm. Exactly what you need on an otherwise stressful day.",
    name: "David & Claire M.",
    location: "South Manchester",
    service: "4-Bed House Removal & Packing",
    rating: 5,
  },
  {
    quote:
      "Moving from a second-floor flat with no lift was my biggest concern, but the crew handled every sofa and heavy box effortlessly. Nothing was scuffed or scratched, and the price quoted was the exact price on the invoice.",
    name: "Sarah P.",
    location: "Leeds to Sheffield",
    service: "2-Bed Apartment Removal",
    rating: 5,
  },
  {
    quote:
      "We relocated our 24-desk studio over a single weekend. Desks, IT monitors and file archives were systematically numbered and placed in the correct rooms. Our team was back up and running Monday morning with zero downtime.",
    name: "Marcus Thorne (Operations Director)",
    location: "Central Birmingham",
    service: "Commercial Office Relocation",
    rating: 5,
  },
  {
    quote:
      "Transparent written quote within an hour of submitting our inventory. On the day, the lads put floor protection runners down immediately and were polite, tidy and exceptionally hardworking throughout. Highly recommended.",
    name: "Helen & James R.",
    location: "Cheshire",
    service: "Residential House Move",
    rating: 5,
  },
  {
    quote:
      "Opted for their full packing service the day before our completion date. Every piece of china, glassware and framed artwork was bubble wrapped with meticulous care. Not a single glass broken across the entire move.",
    name: "Amina K.",
    location: "North London",
    service: "Full Packing & Fragile Handling",
    rating: 5,
  },
  {
    quote:
      "Great communication from the office team and the driver kept us updated with arrival ETAs along the motorway. Everything was unloaded into the designated rooms in record time. Professional and trustworthy service from start to finish.",
    name: "Robert G.",
    location: "Bristol to Oxford",
    service: "Long Distance Relocation",
    rating: 5,
  },
];

export const testimonialsEnabled = testimonials.length > 0;
