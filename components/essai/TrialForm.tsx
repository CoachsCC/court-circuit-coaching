"use client";

import Link from "next/link";
import { useState } from "react";
import { routes, site } from "@/lib/site";

/** Chiffres de réassurance, fournis par le serveur (avis Google + effectif). */
export type TrialStats = {
  rating: string;
  reviewCount: number;
  members: number;
  /** Fiche Google du club ; `null` si aucun Place ID n'est configuré. */
  reviewsUrl: string | null;
};

const SLOTS = [
  { value: "Matin", label: "Matin" },
  { value: "Midi", label: "Midi" },
  { value: "Soir", label: "Soir" },
  { value: "Peu importe", label: "Peu importe, dites-moi" },
];

const LEVELS = [
  { value: "Sédentaire", label: "Sédentaire, je débute" },
  { value: "Occasionnel", label: "Je bouge de temps en temps" },
  { value: "Régulier", label: "Sportif régulier" },
  { value: "Confirmé", label: "Sportif confirmé" },
];

const ICON = {
  width: 20,
  height: 20,
  fill: "none",
  stroke: "#F07336",
  strokeWidth: 1.8,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
} as const;

function Reassurance({ rating, reviewCount, members, reviewsUrl }: TrialStats) {
  const items = [
    {
      href: null,
      text: `${members} adhérents`,
      icon: (
        <svg {...ICON}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      href: reviewsUrl,
      text: `${rating} · ${reviewCount} avis Google`,
      icon: (
        <svg {...ICON}>
          <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
        </svg>
      ),
    },
    {
      href: null,
      text: "Aucun engagement",
      icon: (
        <svg {...ICON}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ),
    },
    {
      href: null,
      text: "Réponse sous 24 h",
      icon: (
        <svg {...ICON}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      ),
    },
  ];

  return (
    <section className="pad pt-5 pb-2">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
        {items.map((item) => (
          <div key={item.text} className="reassure">
            {item.icon}
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener"
                className="text-[13px] text-[#e8e8e8] underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-cc-orange"
                aria-label={`${rating} sur 5 d'après ${reviewCount} avis — voir la fiche Google du club (nouvel onglet)`}
              >
                {item.text}
              </a>
            ) : (
              <span className="text-[13px] text-[#e8e8e8]">{item.text}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function TrialForm(stats: TrialStats) {
  const [form, setForm] = useState({
    firstName: "",
    phone: "",
    email: "",
    slot: "",
    level: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ready = Boolean(form.firstName.trim() && form.phone.trim() && form.slot && form.level);

  function update(field: keyof typeof form) {
    return (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready || sending) return;

    setSending(true);
    setError(null);

    try {
      const response = await fetch("/api/trial-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        // Never confirm a booking nobody received — send them to the phone instead.
        setError(body?.error ?? "L'envoi a échoué.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Connexion impossible. Vérifie ton réseau ou appelle-nous.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <section className="pad flex min-h-[70vh] flex-col items-center justify-center pt-25 pb-20 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-cc-orange">
          <svg
            width="32"
            height="32"
            fill="none"
            stroke="#fff"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="h-sec mb-3.5 text-[clamp(28px,8vw,38px)]">
          C&apos;est noté, {form.firstName.trim() || "toi"}.
        </h1>
        <p className="m-0 mb-1.5 max-w-[400px] text-justify text-[15px] leading-[1.6] text-cc-muted">
          On te recontacte par SMS ou WhatsApp sous 24 h pour caler ton créneau. En attendant,
          prépare juste une tenue et une bouteille d&apos;eau.
        </p>
        <Link
          href={routes.home}
          className="mt-7 block font-heading text-[12px] font-bold tracking-[.08em] text-cc-orange uppercase"
        >
          ← Retour à l&apos;accueil
        </Link>
      </section>
    );
  }

  return (
    <>
      <section className="pad pt-10 pb-2">
        <div className="eyb mb-2.5">Séance d&apos;essai</div>
        <h1 className="h-sec mb-3.5 text-[clamp(34px,9vw,46px)]">
          On te garde
          <br />
          <span className="text-cc-orange">un créneau</span>
        </h1>
        <p className="m-0 max-w-[440px] text-[15px] leading-[1.55] text-cc-muted">
          30 secondes, aucun engagement. On te répond sous 24 h.
        </p>
      </section>

      <Reassurance {...stats} />

      <section className="pad pt-7 pb-15">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="fld">
            <label htmlFor="firstName">Prénom</label>
            <input
              id="firstName"
              type="text"
              placeholder="Ton prénom"
              value={form.firstName}
              onChange={update("firstName")}
              required
            />
          </div>
          <div className="fld">
            <label htmlFor="phone">Téléphone</label>
            <input
              id="phone"
              type="tel"
              placeholder="06 12 34 56 78"
              value={form.phone}
              onChange={update("phone")}
              required
            />
          </div>
          <div className="fld">
            <label htmlFor="email">
              Email{" "}
              <span className="font-normal text-[#8a9298] normal-case">(optionnel)</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="ton@email.fr"
              value={form.email}
              onChange={update("email")}
            />
          </div>
          <div className="fld">
            <label htmlFor="slot">Créneau souhaité</label>
            <select id="slot" value={form.slot} onChange={update("slot")} required>
              <option value="">Choisis un moment</option>
              {SLOTS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="fld">
            <label htmlFor="level">Ton niveau</label>
            <select id="level" value={form.level} onChange={update("level")} required>
              <option value="">Sélectionne</option>
              {LEVELS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="fld">
            <label htmlFor="note">
              Un mot pour nous{" "}
              <span className="font-normal text-[#8a9298] normal-case">(optionnel)</span>
            </label>
            <textarea
              id="note"
              rows={3}
              placeholder="Une blessure, un objectif, une question…"
              value={form.note}
              onChange={update("note")}
            />
          </div>
          {error && (
            <div
              role="alert"
              className="rounded-lg border border-cc-danger/40 bg-cc-danger/10 px-4 py-3.5 text-[13px] leading-[1.5] text-[#ffb3b3]"
            >
              {error} Tu peux nous joindre directement au{" "}
              <a href={`tel:${site.coaches.francesco.phone}`} className="font-bold">
                {site.coaches.francesco.phoneDisplay}
              </a>
              .
            </div>
          )}
          <button type="submit" className="btn-o" disabled={!ready || sending}>
            {sending ? "Envoi en cours…" : "Je réserve ma séance offerte"}
          </button>
          <p className="m-0 text-center text-[12px] text-[#8a9298]">
            On te recontacte rapidement pour fixer ensemble un créneau.
          </p>
        </form>
      </section>
    </>
  );
}
