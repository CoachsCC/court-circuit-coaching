import Image from "next/image";
import Link from "next/link";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SectionHeading } from "@/components/SectionHeading";
import { StickyCta } from "@/components/StickyCta";
import { TestimonialCarousel } from "@/components/course/TestimonialCarousel";
import { WhatsappFab } from "@/components/WhatsappFab";
import type { Course } from "@/lib/courses";
import { routes } from "@/lib/site";

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="var(--color-cc-success)"
      strokeWidth={2.2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      width="20"
      height="20"
      fill="none"
      stroke="var(--color-cc-danger)"
      strokeWidth={2.2}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

/** Shared template for the two discipline pages. */
export function CoursePage({ course }: { course: Course }) {
  const { hero, session, audience } = course;

  return (
    <div className="wrap">
      <Header active="cours" />

      <section className="relative h-[520px]">
        <Image
          src={course.image}
          alt={course.imageAlt}
          fill
          priority
          sizes="560px"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(13,13,13,.35)_0%,rgba(13,13,13,.55)_50%,rgba(13,13,13,.97)_100%)]" />
        <div className="pad pointer-events-none absolute right-0 bottom-0 left-0 pt-6 pb-[26px]">
          <div className="eyb mb-3.5">Nos cours · {course.name}</div>
          <h1 className="h-sec mb-3.5 text-[clamp(36px,10vw,50px)]">
            {hero.before}
            <span className="text-cc-orange">{hero.accent}</span>
            {hero.after && (
              <>
                <br />
                {hero.after}
              </>
            )}
          </h1>
          <p className="m-0 max-w-[440px] text-justify text-[15px] leading-[1.55] text-cc-orange-400">
            {course.tagline}
          </p>
        </div>
      </section>

      <div className="pad flex flex-col gap-[11px] pt-[22px] pb-2">
        <Link href={routes.essai} className="btn-o">
          Je réserve ma séance d&apos;essai — offerte
        </Link>
      </div>

      <section className="pad pt-11 pb-3">
        <SectionHeading
          eyebrow="C'est pour toi si…"
          title={audience.title}
          className="mb-[22px]"
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5">
          <div className="rounded-xl border border-white/10 bg-cc-surface p-5">
            <div className="mb-3.5 flex items-center gap-2">
              <CheckIcon />
              <span className="text-[13px] font-bold tracking-[.06em] text-cc-success uppercase">
                C&apos;est pour toi
              </span>
            </div>
            <div className="flex flex-col gap-2.5 text-[13.5px] leading-[1.4] text-[#e8e8e8]">
              {audience.forYou.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-cc-surface p-5">
            <div className="mb-3.5 flex items-center gap-2">
              <CrossIcon />
              {/* Rouge éclairci pour le texte (cc-danger #ff0000 = 4.35:1, échec) ;
                  l'icône garde le rouge vif, elle passe le seuil 3:1. */}
              <span className="text-[13px] font-bold tracking-[.06em] text-[#ff5c5c] uppercase">
                Pas pour toi si
              </span>
            </div>
            <div className="flex flex-col gap-2.5 text-[13.5px] leading-[1.4] text-cc-muted">
              {audience.notForYou.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cc-carbon pt-11 pb-3">
        <div className="pad">
          <SectionHeading eyebrow="Une séance" title={session.title} className="mb-[22px]" />
          <div className="flex flex-col">
            <div className="row-sep flex gap-[18px] py-4">
              <div className="num w-[52px] flex-none text-[20px] text-cc-orange">10&apos;</div>
              <div>
                <div className="text-[16px] font-bold">Échauffement</div>
                <div className="text-[13px] text-cc-muted">
                  Mobilité, activation, montée en intensité progressive.
                </div>
              </div>
            </div>
            <div className="row-sep row-sep-last flex gap-[18px] py-4">
              <div className="num w-[52px] flex-none text-[20px] text-cc-orange">35&apos;</div>
              <div>
                <div className="text-[16px] font-bold">La séance du jour</div>
                <div className="text-[13px] text-cc-muted">{session.mainBlock}</div>
              </div>
            </div>
          </div>
          <div
            className={
              session.badgeLayout === "grid"
                ? "mt-[18px] grid grid-cols-3 gap-2"
                : "mt-[18px] flex flex-wrap gap-2"
            }
          >
            {session.badges.map((badge) => (
              <span
                key={badge}
                className={`rounded-[20px] bg-cc-elevated text-[12px] font-bold tracking-[.04em] uppercase ${
                  session.badgeLayout === "grid"
                    ? "px-2.5 py-2 text-center"
                    : "px-3.5 py-2"
                }`}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="pad pt-11 pb-3">
        <SectionHeading
          eyebrow="Ce que ça change"
          title="Après 1 séance, 1 mois, 6 mois, 1 an"
          className="mb-[22px]"
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5">
          {course.milestones.map((milestone) => (
            <div
              key={milestone.label}
              className="rounded-xl border border-white/10 bg-cc-surface p-5"
            >
              <div className="num mb-2.5 text-[15px] text-cc-orange uppercase">
                {milestone.label}
              </div>
              <p className="m-0 text-justify text-[13.5px] leading-[1.5] text-[#e8e8e8]">
                {milestone.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cc-carbon pt-11 pb-3">
        <div className="pad">
          <SectionHeading
            eyebrow="Planning"
            title={`Créneaux ${course.name}`}
            className="mb-5"
          />
          <div className="flex flex-col gap-2">
            {course.schedule.map((row) => (
              <div
                key={row.day}
                className="flex items-center justify-between rounded-lg bg-cc-elevated px-4 py-3.5"
              >
                <span className="text-[14px] font-bold">{row.day}</span>
                <span className="text-[13px] text-cc-muted">{row.slots}</span>
              </div>
            ))}
          </div>
          <Link
            href={routes.essai}
            className="mt-4 block text-center font-heading text-[12px] font-bold tracking-[.08em] text-cc-orange uppercase"
          >
            Voir le planning complet →
          </Link>
        </div>
      </section>

      <TestimonialCarousel testimonials={course.testimonials} />

      <FinalCta
        title={
          <>
            Ta première séance
            <br />
            <span className="text-cc-orange">est offerte</span>
          </>
        }
        subtitle="Sans engagement, à ton rythme."
      />
      <Footer />
      <WhatsappFab />
      <StickyCta />
    </div>
  );
}
