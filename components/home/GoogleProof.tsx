import Image from "next/image";
import type { ReviewsData } from "@/lib/google-reviews";
import { site } from "@/lib/site";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="mb-1 text-[12px] text-cc-orange" aria-label={`${rating} sur 5`}>
      {"★".repeat(Math.round(rating))}
    </div>
  );
}

export function GoogleProof({ data, members }: { data: ReviewsData; members: number }) {
  const stats = [
    { value: data.rating, label: "note", accent: true },
    { value: data.reviewCount, label: "avis", accent: false },
    { value: members, label: "adhérents", accent: false },
    { value: site.since, label: "depuis", accent: false },
  ];

  // Aucun témoignage tant que Google n'en renvoie pas de vrais : la section se
  // réduit alors aux quatre chiffres, qui eux sont authentiques.
  const hasReviews = data.reviews.length > 0;

  return (
    <section data-integration="google-reviews" className="bg-cc-carbon pt-11 pb-2">
      <div className="pad">
        <div
          className={`flex justify-between gap-2 text-center ${hasReviews ? "mb-[30px]" : "mb-0 pb-[34px]"}`}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex-1">
              <div
                className={`num text-[clamp(28px,8vw,38px)] ${stat.accent ? "text-cc-orange" : ""}`}
              >
                {stat.value}
              </div>
              <div className="mt-[3px] text-[10px] tracking-[.12em] text-cc-muted uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        {hasReviews && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3">
            {data.reviews.slice(0, 3).map((review, i) => (
            <div
              key={`${review.author}-${i}`}
              className="flex items-start gap-[13px] rounded-[10px] bg-cc-elevated p-[17px]"
            >
              <div className="h-[46px] w-[46px] flex-none overflow-hidden rounded-full bg-white/10">
                {review.photo && (
                  <Image
                    src={review.photo}
                    alt=""
                    width={46}
                    height={46}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                )}
              </div>
              <div className="min-w-0">
                <Stars rating={review.rating} />
                <p className="m-0 mb-1.5 text-justify text-[13px] leading-[1.5] text-[#e8e8e8]">
                  {review.quote}
                </p>
                <div className="text-[11px] font-semibold text-cc-muted">
                  {/* Google exige de créditer l'auteur et de lier vers son avis. */}
                  {review.authorUrl ? (
                    <a
                      href={review.authorUrl}
                      target="_blank"
                      rel="noopener nofollow"
                      className="text-cc-muted hover:text-cc-orange"
                    >
                      {review.author}
                    </a>
                  ) : (
                    review.author
                  )}
                  {review.publishedAgo && ` — ${review.publishedAgo}`}
                </div>
              </div>
              </div>
            ))}
          </div>
        )}
        {/* Attribution obligatoire dès lors qu'on affiche des avis Google. */}
        {hasReviews && (
          <p className="m-0 pt-4 pb-[34px] text-[11px] text-cc-muted">Avis publiés sur Google</p>
        )}
      </div>
    </section>
  );
}
