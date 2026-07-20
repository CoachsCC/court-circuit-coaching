import Image from "next/image";
import type { InstagramPost } from "@/lib/instagram";
import { site } from "@/lib/site";

function VideoBadge() {
  return (
    <svg
      className="absolute top-1.5 right-1.5 drop-shadow"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="#fff"
      aria-hidden="true"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/**
 * Grille 3×2 des derniers posts. La section entière disparaît si l'API ne
 * répond pas : mieux vaut pas de section qu'une grille vide ou figée.
 */
export function InstagramFeed({ posts }: { posts: InstagramPost[] }) {
  if (!posts.length) return null;

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
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener"
            className="relative aspect-square overflow-hidden"
          >
            <Image
              src={post.imageUrl}
              alt={post.caption ? post.caption.slice(0, 120) : "Publication Instagram"}
              fill
              sizes="180px"
              className="object-cover"
              unoptimized
            />
            {post.isVideo && <VideoBadge />}
          </a>
        ))}
      </div>
    </section>
  );
}
