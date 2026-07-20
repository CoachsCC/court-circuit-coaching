import Link from "next/link";
import { routes, site } from "@/lib/site";

const DEFAULT_TITLE = (
  <>
    On ne te lâche pas.
    <br />
    <span className="text-cc-orange">À toi de commencer.</span>
  </>
);

export function FinalCta({
  title = DEFAULT_TITLE,
  subtitle = "Première séance offerte, sans engagement.",
  className = "mt-11",
  titleSize = "text-[clamp(30px,8vw,42px)]",
  /** Set transparent when the preceding section already sits on carbon. */
  background = "bg-cc-carbon",
}: {
  title?: React.ReactNode;
  subtitle?: string;
  className?: string;
  titleSize?: string;
  background?: string;
}) {
  const { francesco } = site.coaches;

  return (
    <section
      id="essai"
      className={`border-t-[3px] border-cc-orange px-[22px] py-13 text-center ${background} ${className}`}
    >
      <h2 className={`h-sec mb-3 text-white ${titleSize}`}>{title}</h2>
      <p className="mb-6 text-[15px] text-cc-muted">{subtitle}</p>
      <div className="mx-auto max-w-[360px]">
        <Link href={routes.essai} className="btn-o text-[15px]">
          Je réserve mon essai
        </Link>
        <a
          href={`tel:${francesco.phone}`}
          className="mt-4 block text-[16px] font-bold text-white hover:text-cc-orange"
        >
          Appeler le {francesco.phoneDisplay}
        </a>
      </div>
    </section>
  );
}
