import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/lib/site";

export function Gym() {
  return (
    <section id="salle" className="pad pt-11 pb-3">
      <SectionHeading eyebrow="La salle" title="Des vestiaires, propres" className="mb-[18px]" />
      <div className="grid auto-rows-[130px] grid-cols-2 gap-2">
        <div className="relative row-span-2 overflow-hidden rounded-[10px]">
          <Image src="/assets/gym-wide.jpg" alt="La salle Court-Circuit" fill sizes="270px" className="object-cover" />
        </div>
        <div className="relative overflow-hidden rounded-[10px]">
          <Image src="/assets/gym-rig.jpg" alt="Espace cross training" fill sizes="270px" className="object-cover" />
        </div>
        <div className="relative overflow-hidden rounded-[10px]">
          <Image src="/assets/gym-boxes.jpg" alt="Espace cardio boxing" fill sizes="270px" className="object-cover" />
        </div>
      </div>
      <p className="m-0 mt-4 text-[13px] leading-[1.5] text-cc-muted">
        {site.address} · Parking gratuit sur place · Vestiaires &amp; douches.
      </p>
    </section>
  );
}
