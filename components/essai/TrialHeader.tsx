import Image from "next/image";
import Link from "next/link";
import { routes, site } from "@/lib/site";

/** Reduced header: no nav — this page is the end of the funnel. */
export function TrialHeader() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/8 bg-[rgba(13,13,13,.9)] px-[22px] py-3 backdrop-blur-xl">
      <Link href={routes.home} className="block">
        <Image
          src="/assets/logo-court-circuit-dark.png"
          alt="Court-Circuit"
          width={140}
          height={30}
          priority
          className="block h-[30px] w-auto"
        />
      </Link>
      <a href={`tel:${site.coaches.francesco.phone}`} className="navlink">
        {site.coaches.francesco.phoneDisplay}
      </a>
    </header>
  );
}
