import { SectionHeading } from "@/components/SectionHeading";

const ICON_PROPS = {
  width: 28,
  height: 28,
  fill: "none",
  stroke: "#F07336",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": true,
} as const;

const REASONS = [
  {
    title: "Groupe restreint",
    description: "On connaît ton prénom et ton niveau.",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "L'équilibre avant la performance",
    description: "Progresser sans se casser.",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3v18M3 7h18M6 7l-3 6h6zM18 7l-3 6h6z" />
      </svg>
    ),
  },
  {
    title: "Accessible à tous",
    description: "Du sédentaire au confirmé.",
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="5" r="1.6" />
        <path d="M20 8H4M9 22l3-8 3 8M12 12v2" />
      </svg>
    ),
  },
  {
    title: "Un entraînement unique chaque jour",
    description: "Jamais deux séances identiques.",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    title: "Des exercices variés",
    description: "Le corps ne s'ennuie jamais.",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
      </svg>
    ),
  },
];

export function Reasons() {
  return (
    <section className="pad pt-11 pb-3">
      <SectionHeading eyebrow="Pourquoi ici" title="5 raisons d'adhérer" className="mb-[22px]" />
      <div className="flex flex-col">
        {REASONS.map((reason, i) => (
          <div
            key={reason.title}
            className={`row-sep flex items-center gap-4 py-[17px] ${
              i === REASONS.length - 1 ? "row-sep-last" : ""
            }`}
          >
            {reason.icon}
            <div>
              <div className="text-[16px] font-bold">{reason.title}</div>
              <div className="text-[13px] leading-[1.4] text-cc-muted">{reason.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
