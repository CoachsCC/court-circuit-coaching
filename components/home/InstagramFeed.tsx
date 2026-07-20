import Image from "next/image";
import { instagramFeed, site } from "@/lib/site";

/**
 * TODO(integration): the six thumbnails are static placeholders — feed them from
 * the Instagram Basic Display API (or a light self-hosted widget). Never an
 * embed iframe.
 */
export function InstagramFeed() {
  return (
    <section
      className="pad pt-11 pb-3"
      data-integration="instagram-feed"
      data-account={site.instagram.handle}
    >
      {/* wrap + min-w-0 : sous ~400px le handle et « Suivre » ne tiennent pas
          côte à côte et poussaient le lien hors de l'écran. */}
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1.5">
        <div className="min-w-0">
          <div className="eyb mb-1.5">La communauté</div>
          {/* 5.5vw au lieu de 6vw : le handle tient sur une ligne dès 360px
              sans se couper, et retrouve les 30px du design dès 546px. */}
          <h2 className="h-sec text-[clamp(18px,5.5vw,30px)]">{site.instagram.handle}</h2>
        </div>
        <a
          href={site.instagram.url}
          target="_blank"
          rel="noopener"
          className="font-heading text-[11px] font-bold tracking-[.08em] whitespace-nowrap uppercase"
        >
          Suivre →
        </a>
      </div>
      <div className="grid auto-rows-fr grid-cols-3 gap-1.5">
        {instagramFeed.map((src, i) => (
          <div key={i} className="relative aspect-square overflow-hidden">
            <Image src={src} alt="" fill sizes="180px" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
