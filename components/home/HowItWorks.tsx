import { SectionHeading } from "@/components/SectionHeading";

const STEPS = [
  { title: "Tu réserves en 30 s", description: "Prénom, téléphone, créneau. C'est tout." },
  { title: "On fait le point sur ton niveau", description: "À l'arrivée, avec un coach." },
  { title: "Tu fais la séance à ton rythme", description: "Chaque mouvement est adaptable." },
  { title: "Tu décides après, pas avant", description: "Zéro engagement, zéro vente forcée." },
];

export function HowItWorks() {
  return (
    <section className="pad pt-11 pb-3">
      <SectionHeading
        eyebrow="Ta séance d'essai"
        title="Comment ça se passe"
        className="mb-[22px]"
      />
      <div className="flex flex-col">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className={`row-sep flex gap-[18px] py-4 ${i === STEPS.length - 1 ? "row-sep-last" : ""}`}
          >
            <div className="num w-7 flex-none text-[24px] text-cc-orange">{i + 1}</div>
            <div>
              <div className="text-[16px] font-bold">{step.title}</div>
              <div className="text-[13px] text-cc-muted">{step.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
