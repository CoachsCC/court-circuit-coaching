import Image from "next/image";
import { googleReviews, site } from "@/lib/site";

/**
 * TODO(integration): rating, review count and the three testimonials are static
 * placeholders — connect to the Google Places API (Place Details) or a reviews
 * widget so they track the Google Business listing.
 */
export function GoogleProof() {
  const stats = [
    { value: googleReviews.rating, label: "note", accent: true },
    { value: googleReviews.reviewCount, label: "avis", accent: false },
    { value: googleReviews.members, label: "adhérents", accent: false },
    { value: site.since, label: "depuis", accent: false },
  ];

  return (
    <section data-integration="google-reviews" className="bg-cc-carbon pt-11 pb-2">
      <div className="pad">
        <div className="mb-[30px] flex justify-between gap-2 text-center">
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
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3 pb-[34px]">
          {googleReviews.testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="flex items-start gap-[13px] rounded-[10px] bg-cc-elevated p-[17px]"
            >
              <div className="h-[46px] w-[46px] flex-none overflow-hidden rounded-full bg-white/10">
                {testimonial.photo && (
                  <Image
                    src={testimonial.photo}
                    alt=""
                    width={46}
                    height={46}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div>
                <div className="mb-1 text-[12px] text-cc-orange">★★★★★</div>
                <p className="m-0 mb-1.5 text-justify text-[13px] leading-[1.5] text-[#e8e8e8]">
                  {testimonial.quote}
                </p>
                <div className="text-[11px] font-semibold text-cc-muted">{testimonial.author}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
