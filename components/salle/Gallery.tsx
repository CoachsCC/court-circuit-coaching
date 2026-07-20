import Image from "next/image";

/**
 * Six slots. Two are intentionally unshot — the brief requires real photos of
 * the club (any group shot shows at least 3 people, varied ages and builds,
 * never a coach alone with a client). Empty slots render as a labelled dashed
 * box so it stays obvious what's still missing.
 */
const SLOTS: { src: string | null; caption: string; span?: boolean }[] = [
  { src: "/assets/gym-wide.jpg", caption: "Groupe en séance", span: true },
  { src: "/assets/gym-rig.jpg", caption: "Espace musculation / cross training" },
  { src: "/assets/gym-boxes.jpg", caption: "Espace cardio boxing" },
  { src: null, caption: "Cours collectif en action" },
  { src: null, caption: "Vestiaires" },
];

export function Gallery() {
  return (
    <section className="pad pt-[26px] pb-3">
      <div className="grid auto-rows-[150px] grid-cols-2 gap-2">
        {SLOTS.map((slot) => (
          <div
            key={slot.caption}
            className={`relative overflow-hidden rounded-[10px] ${slot.span ? "row-span-2" : ""}`}
          >
            {slot.src ? (
              <Image src={slot.src} alt={slot.caption} fill sizes="270px" className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center border border-dashed border-white/15 bg-cc-carbon p-3 text-center text-[11px] leading-[1.4] text-cc-muted">
                {slot.caption}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
