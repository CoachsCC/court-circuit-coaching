import Link from "next/link";
import { routes, site } from "@/lib/site";

export function StickyCta() {
  return (
    <div
      className="fixed bottom-0 left-1/2 z-44 box-border flex w-full max-w-[560px] -translate-x-1/2 gap-[9px] border-t border-white/10 bg-[rgba(13,13,13,.94)] px-4 py-3 backdrop-blur-xl"
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      <Link href={routes.essai} className="btn-o flex-1 px-3 py-[14px] text-[13px]">
        Essai offert
      </Link>
      <a
        href={`tel:${site.coaches.francesco.phone}`}
        className="box-border flex flex-1 items-center justify-center gap-[.45em] rounded-md border-[1.5px] border-white/40 bg-transparent font-heading text-[13px] font-bold tracking-[.06em] text-white uppercase"
      >
        Appeler
      </a>
    </div>
  );
}
