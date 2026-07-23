import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { routes } from "@/lib/site";

const COURSES = [
  {
    href: routes.crossTraining,
    title: "Cross Training",
    tagline: "Force, cardio, mobilité — 45 min chrono. Voir le cours →",
    image: "/assets/gym-rig.jpg",
  },
  {
    href: routes.cardioBoxing,
    title: "Cardio Boxing",
    tagline: "Défoule-toi, transpire, repars vidé. Voir le cours →",
    image: "/assets/gym-boxes.jpg",
  },
];

export function Courses() {
  return (
    <section id="cours" className="pad pt-11 pb-3">
      <SectionHeading
        eyebrow="Nos cours"
        title="Deux disciplines, un état d'esprit"
        className="mb-5"
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
        {COURSES.map((course) => (
          <Link
            key={course.title}
            href={course.href}
            className="relative block h-[220px] overflow-hidden rounded-xl"
          >
            {/* Décorative : le titre du cours est déjà en <h3> dans la carte. */}
            <Image src={course.image} alt="" fill sizes="280px" className="object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(13,13,13,.92))]" />
            <div className="pointer-events-none absolute right-0 bottom-0 left-0 p-4">
              <h3 className="h-sec mb-1 text-[23px]">{course.title}</h3>
              <div className="text-[12px] text-cc-orange-400">{course.tagline}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
