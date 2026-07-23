"use client";

import Link from "next/link";
import { useState } from "react";
import { ENGAGEMENTS, PAY_AS_YOU_GO } from "@/lib/pricing";
import { routes } from "@/lib/site";

function PriceCard({
  name,
  price,
  featured = false,
}: {
  name: string;
  price: number;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col gap-4 rounded-[14px] bg-cc-surface p-6 ${
        featured
          ? "border-[1.5px] border-cc-orange shadow-[0_10px_40px_-14px_rgba(240,115,54,.5)]"
          : "border border-white/10"
      }`}
    >
      {featured && (
        <div className="absolute -top-[11px] left-6 rounded-[20px] bg-cc-orange px-[11px] py-1 text-[10px] font-bold tracking-[.12em] text-cc-black uppercase">
          ★ Recommandé
        </div>
      )}
      <div className="text-[17px] font-bold">{name}</div>
      <div className={`num text-[38px] ${featured ? "text-cc-orange" : ""}`}>
        {price}€<span className="text-[14px] font-normal text-cc-muted">/mois</span>
      </div>
      <Link href={routes.essai} className="btn-o mt-auto">
        Réserver ma séance d&apos;essai
      </Link>
    </div>
  );
}

export function PricingSelector() {
  const [engIndex, setEngIndex] = useState(0);
  const eng = ENGAGEMENTS[engIndex];
  const { single, pack, packSize, validity } = PAY_AS_YOU_GO;

  /** "À la carte" rides along as a 4th card only when 1×/semaine is shown. */
  const showOncePerWeek = eng.oncePerWeek !== null;

  return (
    <>
      <section className="pad pb-1.5">
        <div className="mb-2.5 text-[11px] font-bold tracking-[.14em] text-cc-muted uppercase">
          Ton engagement
        </div>
        <div className="flex gap-[5px] rounded-[9px] bg-cc-surface p-[5px]">
          {ENGAGEMENTS.map((option, i) => {
            const active = i === engIndex;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setEngIndex(i)}
                aria-pressed={active}
                className={`box-border flex-1 cursor-pointer rounded-md border-none px-1.5 py-[14px] font-heading text-[11.5px] font-bold tracking-[.04em] uppercase transition-colors duration-[180ms] ${
                  active ? "bg-cc-orange text-cc-black" : "bg-transparent text-cc-muted"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        <div className="mt-3 text-center text-[12px] font-bold text-cc-orange">{eng.saving}</div>
      </section>

      <section id="tarifs" className="pad pt-3.5 pb-3">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5">
          {eng.oncePerWeek !== null && (
            <PriceCard name="1 séance / semaine" price={eng.oncePerWeek} />
          )}
          <PriceCard name="2 séances / semaine" price={eng.twicePerWeek} featured />
          <PriceCard name="Illimité" price={eng.unlimited} />
          {showOncePerWeek && (
            <div className="flex flex-col gap-4 rounded-[14px] border border-dashed border-white/25 bg-cc-carbon p-6">
              <div className="text-[17px] font-bold">À la carte</div>
              <div className="text-[12.5px] text-cc-muted">
                Pour tester ou compléter ton entraînement.
              </div>
              <div className="flex items-baseline gap-[18px]">
                <div>
                  <span className="num text-[26px]">{single}€</span>
                  <span className="text-[11px] text-cc-muted"> /séance</span>
                </div>
                <div>
                  <span className="num text-[26px] text-cc-orange">{pack}€</span>
                  <span className="text-[11px] text-cc-muted"> /{packSize}</span>
                </div>
              </div>
              <Link href={routes.essai} className="btn-o mt-auto">
                Réserver ma séance d&apos;essai
              </Link>
            </div>
          )}
        </div>
        <p className="m-0 mt-3.5 text-[12.5px] text-cc-muted">
          Toutes les formules incluent les deux disciplines et le suivi des deux coachs.
        </p>
      </section>

      {!showOncePerWeek && (
        <section className="pad pt-2.5 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-[14px] border border-dashed border-white/18 bg-cc-carbon p-[22px]">
            <div>
              <div className="mb-1 text-[16px] font-bold">À la carte</div>
              <div className="text-[13px] text-cc-muted">
                Pour tester ou compléter ton entraînement.
              </div>
            </div>
            <div className="flex items-baseline gap-6">
              <div>
                <span className="num text-[26px]">{single}€</span>
                <span className="text-[12px] text-cc-muted"> la séance</span>
              </div>
              <div>
                <span className="num text-[26px] text-cc-orange">{pack}€</span>
                <span className="text-[12px] text-cc-muted">
                  {" "}
                  les {packSize} · {validity}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
