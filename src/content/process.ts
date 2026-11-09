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
      "Share your addresses, dates, and items. Takes two minutes to begin.",
  },
  {
    step: "02",
    title: "Receive your quote",
    description:
      "We assess your inventory and access, then send an itemised written quote.",
  },
  {
    step: "03",
    title: "Confirm and plan",
    description:
      "Lock in your date. We confirm parking, access, and schedule details in writing.",
  },
  {
    step: "04",
    title: "Move day",
    description:
      "Your crew arrives on time, protects property floors, and places everything in designated rooms.",
  },
];
