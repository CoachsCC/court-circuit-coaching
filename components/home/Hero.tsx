import Image from "next/image";

export function Hero() {
  return (
    <section className="relative h-[560px]">
      <Image
        src="/assets/gym-wide.jpg"
        alt="Groupe en séance à Court-Circuit"
        fill
        priority
        sizes="560px"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,.4)_0%,rgba(13,13,13,.55)_50%,rgba(13,13,13,.96)_100%)]" />
      <div className="pad pointer-events-none absolute right-0 bottom-0 left-0 pt-6 pb-[26px]">
        <div className="eyb mb-3.5">Saint-Herblain · Depuis 2013</div>
        <h1 className="h-sec mb-4 text-[clamp(38px,10vw,54px)]">
          La salle de sport où <span className="text-cc-orange">ON NE TE LÂCHE PAS</span>
        </h1>
        <p className="m-0 max-w-[440px] text-justify text-[15px] leading-[1.55] text-cc-orange-400">
          Cross training et cardio boxing en groupe restreint. Deux coachs diplômés, un entraînement
          différent chaque jour — du sédentaire au sportif confirmé.
        </p>
      </div>
    </section>
  );
}
