import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { routes } from "@/lib/site";

/** Preview of the 1-year commitment prices — the Tarifs page holds the full grid. */
const PLANS = [
  { name: "1× / semaine", tagline: "Pour démarrer", price: "44€", unit: "/mois" },
  {
    name: "2× / semaine",
    tagline: "Le bon rythme",
    price: "79€",
    unit: "/mois",
    featured: true,
  },
  { name: "Illimité", tagline: "À fond", price: "96€", unit: "/mois" },
  {
    name: "Carnet de séances",
    tagline: "À la carte, sans engagement",
    price: "150€",
    unit: " les 10 · 20€ l'unité",
  },
];

export function PricingPreview() {
  return (
    <section id="tarifs" className="pad pt-11 pb-3">
      <SectionHeading eyebrow="Tarifs" title="Des prix clairs, sans surprise" className="mb-5" />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col justify-between gap-3.5 rounded-xl bg-cc-surface p-5 ${
              plan.featured ? "border-[1.5px] border-cc-orange" : "border border-white/10"
            }`}
          >
            {plan.featured && (
              <div className="absolute -top-2.5 left-5 rounded-[20px] bg-cc-orange px-[9px] py-[3px] text-[9.5px] font-bold tracking-[.12em] text-white uppercase">
                ★ Recommandé
              </div>
            )}
            <div>
              <div className="text-[16px] font-bold">{plan.name}</div>
              <div className={`text-[12px] ${plan.featured ? "text-cc-orange-400" : "text-cc-muted"}`}>
                {plan.tagline}
              </div>
            </div>
            <div className={`num text-[30px] ${plan.featured ? "text-cc-orange" : ""}`}>
              {plan.price}
              <span className="text-[13px] font-normal text-cc-muted">{plan.unit}</span>
            </div>
          </div>
        ))}
      </div>
      <Link
        href={routes.tarifs}
        className="block px-1.5 pt-[18px] pb-1 text-center font-heading text-[12px] font-bold tracking-[.08em] text-cc-orange uppercase"
      >
        Voir tous les tarifs →
      </Link>
    </section>
  );
}
