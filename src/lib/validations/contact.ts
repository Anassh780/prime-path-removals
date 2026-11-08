import { z } from "zod";

/**
 * Contact form contract — shared by the client form and the API route so the
 * same rules apply on both sides. British English messages throughout.
 */

export const contactSubjectValues = [
  "general",
  "quote",
  "booking",
  "complaint",
  "other",
] as const;

export type ContactSubject = (typeof contactSubjectValues)[number];

export const contactSubjects: ReadonlyArray<{
  value: ContactSubject;
  label: string;
}> = [
  { value: "general", label: "General enquiry" },
  { value: "quote", label: "Quote request" },
  { value: "booking", label: "Existing booking" },
  { value: "complaint", label: "Complaint" },
  { value: "other", label: "Other" },
];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Please keep your name under 80 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .max(30, "Please keep the phone number under 30 characters.")
    .optional(),
  subject: z.enum(contactSubjectValues, {
    error: "Please choose a subject.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Please add a little more detail, at least 20 characters.")
    .max(2000, "Please keep your message under 2,000 characters."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
