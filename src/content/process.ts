export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Tell us about the move",
    description:
      "Share the addresses, your date, the property type and any services you need. Two minutes is usually enough to start.",
  },
  {
    step: "02",
    title: "Receive your written quote",
    description:
      "We review the details, ask anything that is unclear, then send an itemised quotation with the crew and vehicle plan.",
  },
  {
    step: "03",
    title: "Confirm and plan",
    description:
      "Once you are happy, we lock in the date and agree access, parking, packing and any special handling requirements.",
  },
  {
    step: "04",
    title: "Move day",
    description:
      "The crew arrives on time, protects your property, loads room by room and places everything where it belongs at the other end.",
  },
];
