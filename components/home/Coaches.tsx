import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";

const COACHES = [
  { name: "Antoine", role: "Diplômé d'État", photo: "/assets/coach-antoine.jpg" },
  { name: "Francesco", role: "Diplômé d'État", photo: "/assets/coach-francesco.png" },
];

export function Coaches() {
  return (
    <section id="coachs" className="pad pt-11 pb-3">
      <SectionHeading eyebrow="Tes coachs" title="Antoine & Francesco" className="mb-2" />
      <p className="m-0 mb-5 max-w-[440px] text-justify text-[14px] leading-[1.55] text-cc-muted">
        Deux coachs diplômés d&apos;État. On ne fait pas de la performance de vitrine — on te fait
        progresser, en sécurité, dans la durée.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {COACHES.map((coach) => (
          <div key={coach.name}>
            <div className="relative aspect-3/4 overflow-hidden rounded-xl">
              <Image
                src={coach.photo}
                alt={`${coach.name}, coach à Court-Circuit`}
                fill
                sizes="270px"
                className="object-cover"
              />
            </div>
            <div className="mt-[9px] text-[15px] font-bold">{coach.name}</div>
            <div className="text-[12px] text-cc-muted">{coach.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
