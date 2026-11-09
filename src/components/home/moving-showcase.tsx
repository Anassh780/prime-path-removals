import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Boxes, ShieldCheck, Truck, Wrench } from "lucide-react";

import { Reveal, Stagger, StaggerItem } from "@/components/shared/reveal";
import { Container, Section, SectionHeading } from "@/components/shared/section";

const showcaseItems = [
  {
    step: "01",
    service: "Packing & Protection",
    title: "Room by Room Fragile Packing",
    description:
      "China, glassware, artwork and delicate furniture wrapped in quilted blankets, bubble wrap and double-walled cartons before they move an inch.",
    image: "/images/service-packing.jpg",
    alt: "Professional Prime House movers packing fragile porcelain dishes with bubble wrap and sealing boxes",
    icon: Boxes,
    href: "/services/packing-and-loading",
    features: ["Quilted blankets", "Bubble wrap", "Room labelling"],
  },
  {
    step: "02",
    service: "Loading & Transport",
    title: "Hydraulic Tail-Lift Transport",
    description:
      "Dedicated Luton vans sized to your property volume with load-securing straps, hydraulic tail-lifts and protective floor runners so nothing shifts.",
    image: "/images/service-loading.jpg",
    alt: "Prime House Removals team loading boxes into liveried Luton van with hydraulic tail-lift",
    icon: Truck,
    href: "/services/house-removals",
    features: ["Luton van with lift", "Transit load straps", "Floor protection"],
  },
  {
    step: "03",
    service: "Furniture Assembly",
    title: "Beds, Wardrobes & Large Items Rebuilt",
    description:
      "Awkward furniture dismantled calmly, fixings bagged and tagged, and reassembled in your designated rooms before our crew departs.",
    image: "/images/service-assembly.jpg",
    alt: "Prime House Removals mover assembling wooden bed frame and wardrobe with tools",
    icon: Wrench,
    href: "/services/furniture-moving",
    features: ["Hardware bagged & tagged", "Power tools on hand", "Room placement"],
  },
];

export function MovingShowcase() {
  return (
    <Section id="moving-standards" tone="default" className="overflow-hidden">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Moving standards"
            title="Careful by design. Planned before moving day."
            description="From protective packing to hydraulic tail-lift transport and complete furniture reassembly, our trained crews handle every stage with precision."
          />
        </Reveal>

        <Stagger stagger={0.08} className="mt-12 lg:mt-16">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {showcaseItems.map((item) => {
              const Icon = item.icon;

              return (
                <StaggerItem
                  key={item.step}
                  className="group relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-2xl border border-line bg-navy-950 p-6 shadow-card transition-all duration-300 hover:border-accent-500/50 hover:shadow-lift sm:min-h-[500px] sm:p-7"
                >
                  {/* Background Photograph with subtle zoom on card hover */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="size-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      priority={item.step === "01"}
                    />
                    {/* Layered Cinematic Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/25 transition-opacity duration-300 group-hover:opacity-95" />
                    <div className="absolute inset-0 bg-navy-950/20" />
                  </div>

                  {/* Top Floating Badge Bar */}
                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-navy-950/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                      <span className="size-1.5 rounded-full bg-accent-400" />
                      <span>{item.step}</span>
                      <span className="text-white/40">·</span>
                      <span className="text-accent-300">{item.service}</span>
                    </div>

                    <span className="flex size-9 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors duration-200 group-hover:border-accent-400/40 group-hover:bg-accent-600/30">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                  </div>

                  {/* Bottom Text Layer */}
                  <div className="relative z-10 flex flex-col gap-4 pt-20">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-display text-xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-accent-200 sm:text-2xl">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-navy-100/90 sm:text-[14.5px]">
                        {item.description}
                      </p>
                    </div>

                    {/* Micro Feature Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.features.map((feat) => (
                        <span
                          key={feat}
                          className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-navy-950/60 px-2.5 py-1 text-[11.5px] font-medium text-white/95 backdrop-blur-md"
                        >
                          <ShieldCheck className="size-3 text-accent-300" aria-hidden="true" />
                          {feat}
                        </span>
                      ))}
                    </div>

                    {/* Link Action */}
                    <div className="border-t border-white/15 pt-4">
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent-300 transition-colors duration-150 group-hover:text-white after:absolute after:inset-0 after:z-20"
                      >
                        <span>Explore service details</span>
                        <ArrowRight className="u-arrow size-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </div>
        </Stagger>
      </Container>
    </Section>
  );
}
