"use client";

import Image from "next/image";
import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import type { Testimonial } from "@/lib/courses";

const ARROW = {
  width: 18,
  height: 18,
  fill: "none",
  stroke: "#fff",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
} as const;

/** Any number of testimonials — the index wraps in both directions. */
export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [idx, setIdx] = useState(0);
  const n = testimonials.length;
  const i = ((idx % n) + n) % n;
  const current = testimonials[i];

  return (
    <section className="pad pt-11 pb-3">
      <SectionHeading eyebrow="Ils en parlent" title="Retours d'adhérents" className="mb-5" />
      <div className="relative">
        <div className="flex min-h-[180px] flex-col gap-4 rounded-[14px] bg-cc-surface p-[26px]">
          <div className="h-[50px] w-[50px] overflow-hidden rounded-full bg-white/10">
            {current.photo && (
              <Image
                src={current.photo}
                alt=""
                width={50}
                height={50}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <p className="m-0 text-justify text-[15px] leading-[1.6] text-[#e8e8e8]">
            {current.quote}
          </p>
          <div className="text-[12px] font-bold text-cc-orange">{current.author}</div>
        </div>
        <button
          type="button"
          onClick={() => setIdx(idx - 1)}
          aria-label="Témoignage précédent"
          className="absolute top-1/2 -left-3.5 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-cc-elevated text-white"
        >
          <svg {...ARROW}>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setIdx(idx + 1)}
          aria-label="Témoignage suivant"
          className="absolute top-1/2 -right-3.5 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-cc-elevated text-white"
        >
          <svg {...ARROW}>
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
      <div className="mt-3.5 flex justify-center gap-1.5">
        {testimonials.map((testimonial, di) => (
          <button
            key={testimonial.author}
            type="button"
            onClick={() => setIdx(di)}
            aria-label={`Témoignage ${di + 1} sur ${n}`}
            aria-current={di === i}
            className={`h-[7px] cursor-pointer rounded-[4px] border-none p-0 transition-all duration-200 ${
              di === i ? "w-5 bg-cc-orange" : "w-[7px] bg-white/25"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
