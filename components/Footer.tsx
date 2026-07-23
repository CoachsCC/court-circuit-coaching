import Image from "next/image";
import Link from "next/link";
import { routes, site } from "@/lib/site";

const LINKS = [
  { href: routes.salle, label: "La salle" },
  { href: "#cours", label: "Nos cours" },
  { href: "#tarifs", label: "Tarifs" },
  { href: routes.essai, label: "Séance d'essai" },
];

/**
 * `minimal` drops the logo, nav links and email — used on the trial-booking
 * page, which is a conversion dead-end with no sticky bar to clear.
 */
export function Footer({ minimal = false }: { minimal?: boolean }) {
  const { antoine, francesco } = site.coaches;

  if (minimal) {
    return (
      <footer className="pad border-t border-white/8 pt-5 pb-10">
        <p className="mb-1.5 text-[13px] leading-[1.6] text-cc-muted">
          {site.address}
          <br />
          {antoine.name} {antoine.phoneDisplay} · {francesco.name} {francesco.phoneDisplay}
        </p>
        <p className="mt-3.5 text-[11px] text-[#8a9298]">
          © {site.since}–{new Date().getFullYear()} {site.name} ·{" "}
          <Link href={routes.mentionsLegales} className="text-[#8a9298] hover:text-cc-orange">
            Mentions légales
          </Link>
        </p>
      </footer>
    );
  }

  return (
    <footer className="pad border-t border-white/8 pt-10 pb-[120px]">
      <Image
        src="/assets/logo-court-circuit-dark.png"
        alt="Court-Circuit"
        width={158}
        height={34}
        className="mb-[18px] block h-[34px] w-auto"
      />
      <div className="mb-[22px] flex flex-wrap gap-[22px]">
        {LINKS.map((link) =>
          link.href.startsWith("#") ? (
            <a key={link.label} href={link.href} className="navlink py-2">
              {link.label}
            </a>
          ) : (
            <Link key={link.label} href={link.href} className="navlink py-2">
              {link.label}
            </Link>
          ),
        )}
      </div>
      <p className="mb-1.5 text-[13px] leading-[1.6] text-cc-muted">
        {site.address}
        <br />
        {antoine.name} {antoine.phoneDisplay} · {francesco.name} {francesco.phoneDisplay}
        <br />
        {site.email}
      </p>
      <p className="mt-3.5 text-[11px] text-[#8a9298]">
        © {site.since}–{new Date().getFullYear()} {site.name} ·{" "}
        <Link href={routes.mentionsLegales} className="text-[#8a9298] hover:text-cc-orange">
          Mentions légales
        </Link>
      </p>
    </footer>
  );
}
