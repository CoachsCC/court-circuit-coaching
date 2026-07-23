import type { Metadata } from "next";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyCta } from "@/components/StickyCta";
import { WhatsappFab } from "@/components/WhatsappFab";
import { Faq } from "@/components/tarifs/Faq";
import { PricingSelector } from "@/components/tarifs/PricingSelector";
import { Reassurance } from "@/components/tarifs/Reassurance";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Cross training et cardio boxing à Saint-Herblain à partir de 44€/mois. Pas de frais cachés, pas de vente forcée, première séance offerte.",
  alternates: { canonical: "/tarifs" },
  openGraph: {
    title: "Tarifs · Court-Circuit",
    description:
      "À partir de 44€/mois à Saint-Herblain. Pas de frais cachés, première séance offerte.",
    url: "/tarifs",
  },
};

export default function TarifsPage() {
  return (
    <div className="wrap">
      <Header active="tarifs" />

      <section className="pad pt-10 pb-5">
        <div className="eyb mb-2.5">Tarifs</div>
        <h1 className="h-sec mb-3.5 text-[clamp(36px,10vw,52px)]">
          Tu testes,
          <br />
          puis <span className="text-cc-orange">tu choisis.</span>
        </h1>
        <p className="m-0 mb-1.5 max-w-[440px] text-justify text-[15px] leading-[1.55] text-cc-muted">
          Pas de frais cachés. Pas de vente forcée. Des prix qui baissent quand tu t&apos;engages sur
          la durée.
        </p>
        <p className="m-0 text-[13px] text-cc-orange-400">
          Séances collectives de 45 min · Saint-Herblain
        </p>
      </section>

      <PricingSelector />
      <Reassurance />
      <Faq />

      <FinalCta
        className="mt-[34px]"
        titleSize="text-[clamp(28px,7vw,40px)]"
        title={
          <>
            Le meilleur prix,
            <br />
            <span className="text-cc-orange">c&apos;est de tester d&apos;abord.</span>
          </>
        }
      />
      <Footer />
      <WhatsappFab />
      <StickyCta />
    </div>
  );
}
