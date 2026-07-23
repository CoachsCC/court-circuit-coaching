import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/site";

const NAV = [
  { key: "salle", href: routes.salle, label: "La salle" },
  { key: "cours", href: "/#cours", label: "Nos cours" },
  { key: "tarifs", href: routes.tarifs, label: "Tarifs" },
] as const;

export function Header({ active }: { active?: (typeof NAV)[number]["key"] }) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/8 bg-[rgba(13,13,13,.9)] px-[22px] py-3 backdrop-blur-xl">
      <Link href={routes.home} className="block">
        <Image
          src="/assets/logo-court-circuit-dark.png"
          alt="Court-Circuit — accueil"
          width={140}
          height={30}
          className="block h-[30px] w-auto"
        />
      </Link>
      <nav className="flex items-center gap-[22px]">
        <div className="flex gap-5" data-desktop-nav>
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.key === active && item.key === "tarifs" ? "#tarifs" : item.href}
              className="navlink"
              style={item.key === active ? { color: "var(--color-cc-orange)" } : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href={routes.essai}
          className="btn-o w-auto px-[15px] py-[13px] text-[11px] shadow-none"
        >
          Essai offert
        </Link>
      </nav>
    </header>
  );
}
