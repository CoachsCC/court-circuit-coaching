import Link from "next/link";
import type { ReviewsData } from "@/lib/google-reviews";
import { routes, site } from "@/lib/site";

export function ProofBand({ data, members }: { data: ReviewsData; members: number }) {
  return (
    <>
      <div
        data-integration="google-reviews"
        className="pad flex flex-wrap items-center justify-center gap-[9px] border-b border-white/8 bg-cc-black py-4 text-[13px] font-semibold"
      >
        <span className="text-cc-orange">★ {data.rating}</span>
        <span className="opacity-50">·</span>
        <span>{data.reviewCount} avis Google</span>
        <span className="opacity-50">·</span>
        <span>{members} adhérents</span>
        <span className="opacity-50">·</span>
        <span>Depuis {site.since}</span>
      </div>
      <div className="pad flex flex-col gap-[11px] pt-[22px] pb-2">
        <Link href={routes.essai} className="btn-o">
          Je réserve ma séance d&apos;essai — offerte
        </Link>
        <a href="#tarifs" className="btn-w">
          Voir les tarifs
        </a>
      </div>
    </>
  );
}
