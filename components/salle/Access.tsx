import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/lib/site";

const ICON = {
  width: 22,
  height: 22,
  fill: "none",
  stroke: "#F07336",
  strokeWidth: 1.8,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
  className: "flex-none",
} as const;

export function Access() {
  const items = [
    {
      title: "Adresse",
      text: site.address,
      icon: (
        <svg {...ICON}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      title: "Parking",
      text: "Gratuit, sur place",
      icon: (
        <svg {...ICON}>
          <rect x="1" y="6" width="15" height="12" rx="2" />
          <path d="M16 10h3l3 3v5h-6" />
          <circle cx="5.5" cy="18.5" r="1.5" />
          <circle cx="17.5" cy="18.5" r="1.5" />
        </svg>
      ),
    },
    {
      title: "Vestiaires & douches",
      text: "Sur place, femmes et hommes séparés",
      icon: (
        <svg {...ICON}>
          <path d="M4 4v16M4 4h10a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4H4" />
        </svg>
      ),
    },
    {
      title: "Horaires",
      text: "Salle ouverte du lundi au samedi, aux heures des cours",
      icon: (
        <svg {...ICON}>
          <rect x="4" y="3" width="16" height="16" rx="2" />
          <path d="M4 11h16M8 3v4M16 3v4" />
          <path d="M8 15h.01M12 15h.01M16 15h.01" />
        </svg>
      ),
    },
  ];

  return (
    <section className="pad pt-11 pb-3">
      <SectionHeading
        eyebrow="Accès"
        title="Facile à trouver, facile à rejoindre"
        className="mb-5"
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex items-start gap-3.5 rounded-xl border border-white/10 bg-cc-surface p-[18px]"
          >
            {item.icon}
            <div>
              <div className="mb-[3px] text-[14px] font-bold">{item.title}</div>
              <div className="text-justify text-[13px] text-cc-muted">{item.text}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
