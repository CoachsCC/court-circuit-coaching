import Link from "next/link";
import type { ReviewsData } from "@/lib/google-reviews";
import { routes, site } from "@/lib/site";

function GoogleStat({ data }: { data: ReviewsData }) {
  const content = (
    <>
      <span className="text-cc-orange">★ {data.rating}</span>
      <span className="opacity-50">·</span>
      <span>{data.reviewCount} avis Google</span>
    </>
  );

  // Sans Place ID configuré, pas de lien : afficher les chiffres seuls vaut
  // mieux qu'une URL construite au hasard.
  if (!data.reviewsUrl) return <span className="flex items-center gap-[9px]">{content}</span>;

  // `text-white` est indispensable : la règle globale `a { color: orange }`
  // repeindrait « 147 avis Google », alors que seules l'étoile et la note sont
  // en orange dans le design.
  return (
    <a
      href={data.reviewsUrl}
      target="_blank"
      rel="noopener"
      className="flex items-center gap-[9px] text-white underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-cc-orange"
      aria-label={`${data.rating} sur 5 d'après ${data.reviewCount} avis — voir la fiche Google du club (nouvel onglet)`}
    >
      {content}
    </a>
  );
}

export function ProofBand({ data, members }: { data: ReviewsData; members: number }) {
  return (
    <>
      <div
        data-integration="google-reviews"
        className="pad flex flex-wrap items-center justify-center gap-[9px] border-b border-white/8 bg-cc-black py-4 text-[13px] font-semibold"
      >
        {/* Note et total sont les seuls chiffres qui viennent de Google : eux
            seuls mènent à la fiche. Regroupés dans un unique lien, ils restent
            aussi sur la même ligne quand le bandeau passe à la ligne. */}
        <GoogleStat data={data} />
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
