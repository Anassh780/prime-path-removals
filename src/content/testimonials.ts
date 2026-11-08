/**
 * Customer testimonials.
 *
 * The home page renders this section only when real, verified feedback has
 * been added here. Until then it shows a designed, honest empty state that
 * invites past customers to get in touch — the site never invents reviews.
 *
 * To publish a testimonial, add an entry with the customer's permission:
 *   { quote: "...", name: "First name", location: "Town", service: "House removal", rating: 5 }
 */
export type Testimonial = {
  quote: string;
  name: string;
  location: string;
  service: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

export const testimonials: Testimonial[] = [];

export const testimonialsEnabled = testimonials.length > 0;
