import type { Metadata } from "next";
import Image from "next/image";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SectionHeading } from "@/components/SectionHeading";
import { StickyCta } from "@/components/StickyCta";
import { WhatsappFab } from "@/components/WhatsappFab";
import { Access } from "@/components/salle/Access";
import { Gallery } from "@/components/salle/Gallery";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "La salle à Saint-Herblain",
  description:
    "22 rue du Moulin de la Rousselière, Saint-Herblain. Parking gratuit, vestiaires et douches, matériel complet. Une salle à taille humaine depuis 2013.",
  alternates: { canonical: "/la-salle" },
  openGraph: {
    title: "La salle Court-Circuit à Saint-Herblain",
    description:
      "Parking gratuit, vestiaires et douches, matériel complet. Une salle à taille humaine depuis 2013.",
    url: "/la-salle",
  },
};

const EQUIPMENT = [
  "Haltères, kettlebells, disques & trap bar",
  "Sacs de frappe, pattes d'ours & pao",
  "Skierg, assault bike, slam ball, wall ball, box, rope & sled",
  "Tapis, élastiques & accessoires de mobilité",
];

const COACHES = [
  { name: "Antoine", role: "Diplômé d'État · Cofondateur", photo: "/assets/coach-antoine.jpg" },
  { name: "Francesco", role: "Diplômé d'État · Cofondateur", photo: "/assets/coach-francesco.png" },
];

export default function LaSallePage() {
  return (
    <div className="wrap">
      <Header active="salle" />

      <section className="relative h-[520px]">
        <Image
          src="/assets/gym-wide.jpg"
          alt="La salle Court-Circuit à Saint-Herblain"
          fill
          priority
          sizes="560px"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,.35)_0%,rgba(13,13,13,.55)_50%,rgba(13,13,13,.97)_100%)]" />
        <div className="pad pointer-events-none absolute right-0 bottom-0 left-0 pt-6 pb-[26px]">
          <div className="eyb mb-3.5">La salle</div>
          <h1 className="h-sec mb-3.5 text-[clamp(36px,10vw,50px)]">
            {/* Le design force ici « pour&nbsp;PROGRESSER », qui déborde du conteneur
                560px (~531px de texte). On laisse le titre se répartir seul. */}
            Ici, un lieu sain pour{" "}
            <span className="text-cc-orange">progresser à son rythme</span>
          </h1>
          <p className="m-0 max-w-[440px] text-[15px] leading-[1.55] text-cc-orange-400">
            On transpire, on souffle, on se détend.
          </p>
        </div>
      </section>

      <Gallery />

      <section className="bg-cc-carbon pt-11 pb-3">
        <div className="pad">
          <SectionHeading
            eyebrow="Le matériel"
            title="Ce qu'il faut, rien de plus"
            className="mb-5"
          />
          <div className="flex flex-col">
            {EQUIPMENT.map((item, i) => (
              <div
                key={item}
                className={`row-sep flex items-center justify-between py-[15px] ${
                  i === EQUIPMENT.length - 1 ? "row-sep-last" : ""
                }`}
              >
                <span className="text-[14.5px] font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Access />

      <section className="bg-cc-carbon py-11">
        <div className="pad">
          <SectionHeading
            eyebrow={`Depuis ${site.since}`}
            title={`On ne lâche rien depuis ${new Date().getFullYear() - site.since} ans`}
            className="mb-[18px]"
          />
          <p className="m-0 mb-6 max-w-[440px] text-justify text-[14.5px] leading-[1.6] text-cc-muted">
            Antoine a fondé Court-Circuit en 2013, à Saint-Herblain. Francesco l&apos;a rejoint comme
            associé en juillet 2019. L&apos;idée n&apos;a pas changé depuis : un groupe restreint, un
            cadre exigeant, et deux coachs qui connaissent le prénom de chaque adhérent.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {COACHES.map((coach) => (
              <div key={coach.name}>
                <div className="relative h-[190px] overflow-hidden rounded-xl">
                  <Image
                    src={coach.photo}
                    alt={`${coach.name}, coach à Court-Circuit`}
                    fill
                    sizes="270px"
                    className="object-cover"
                  />
                </div>
                <div className="mt-[9px] text-[14px] font-bold">{coach.name}</div>
                <div className="text-[12px] text-cc-muted">{coach.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        className="mt-0"
        background="bg-cc-black"
        title={
          <>
            Viens voir
            <br />
            <span className="text-cc-orange">par toi-même.</span>
          </>
        }
      />
      <Footer />
      <WhatsappFab />
      <StickyCta />
    </div>
  );
}
