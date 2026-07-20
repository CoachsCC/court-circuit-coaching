import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales · Court-Circuit",
  description: "Mentions légales du site Court-Circuit · Coaching Sportif, Saint-Herblain.",
  robots: { index: false, follow: true },
};

/**
 * Identité de l'éditeur reprise du répertoire SIRENE (SIREN 791 145 428).
 *
 * Les trois mentions restantes marquées [À COMPLÉTER] sont déduites, pas
 * fournies : le greffe du RCS (Nantes, par ressort géographique), le numéro de
 * TVA (clé calculée depuis le SIREN, mais assujettissement non vérifié) et
 * l'adresse de Vercel. À confirmer sur le Kbis et la page legal de Vercel.
 *
 * Base légale : article 6-III de la LCEN.
 */
const TODO = <span className="text-cc-orange">[À COMPLÉTER]</span>;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="row-sep py-6">
      <h2 className="h-sec mb-3 text-[18px]">{title}</h2>
      <div className="flex flex-col gap-2 text-[14px] leading-[1.65] text-cc-muted">{children}</div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="text-white">{label} : </span>
      {children}
    </div>
  );
}

export default function MentionsLegalesPage() {
  const { antoine, francesco } = site.coaches;

  return (
    <div className="wrap">
      <Header />

      <section className="pad pt-10 pb-2">
        <div className="eyb mb-2.5">Informations légales</div>
        <h1 className="h-sec mb-3.5 text-[clamp(30px,8vw,42px)]">Mentions légales</h1>
        <p className="m-0 text-[14px] leading-[1.6] text-cc-muted">
          Informations publiées en application de l&apos;article 6-III de la loi n° 2004-575 du
          21 juin 2004 pour la confiance dans l&apos;économie numérique.
        </p>
      </section>

      <div className="pad pb-16">
        <Section title="Éditeur du site">
          <Row label="Dénomination sociale">COURT-CIRCUIT</Row>
          <Row label="Forme juridique">Société à responsabilité limitée (SARL)</Row>
          <Row label="Capital social">7 000 €</Row>
          <Row label="Siège social">{site.address}</Row>
          <Row label="SIREN">791 145 428</Row>
          <Row label="SIRET (siège)">791 145 428 00029</Row>
          <Row label="RCS">Nantes 791 145 428 {TODO} (greffe à confirmer)</Row>
          <Row label="N° TVA intracommunautaire">FR41 791 145 428 {TODO} (à confirmer)</Row>
          <Row label="Code APE">85.51Z — Enseignement de disciplines sportives</Row>
          <Row label="Cogérants">Antoine Martin · Francesco Gervasi</Row>
          <Row label="Directeur de la publication">Francesco Gervasi</Row>
          <Row label="Téléphone">
            {antoine.phoneDisplay} · {francesco.phoneDisplay}
          </Row>
          <Row label="Email">{site.email}</Row>
        </Section>

        <Section title="Hébergeur">
          <Row label="Société">Vercel Inc.</Row>
          <Row label="Adresse">
            340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis {TODO} (à vérifier)
          </Row>
          <Row label="Site">vercel.com</Row>
        </Section>

        <Section title="Propriété intellectuelle">
          <p className="m-0">
            L&apos;ensemble du contenu de ce site — textes, photographies, logo et éléments
            graphiques — est protégé par le droit d&apos;auteur. Toute reproduction ou
            représentation, totale ou partielle, sans autorisation écrite préalable est interdite.
          </p>
        </Section>

        <Section title="Données personnelles">
          <p className="m-0">
            Le formulaire de réservation de séance d&apos;essai collecte un prénom, un numéro de
            téléphone et, facultativement, une adresse email et un message. Ces données servent
            uniquement à recontacter la personne pour organiser sa séance et ne font l&apos;objet
            d&apos;aucune cession à des tiers.
          </p>
          <p className="m-0">
            Elles sont transmises par email via le service Resend et conservées 3 ans à compter du
            dernier contact. Conformément au RGPD, chacun dispose d&apos;un droit
            d&apos;accès, de rectification, d&apos;effacement et d&apos;opposition, exerçable par
            email à {site.email}.
          </p>
          <p className="m-0">
            Responsable du traitement : la société Court-Circuit. Réclamation possible auprès de la CNIL
            (www.cnil.fr).
          </p>
        </Section>

        <Section title="Cookies">
          <p className="m-0">
            Ce site ne dépose aucun cookie de mesure d&apos;audience ni de publicité. Cette section
            sera à réviser si un outil de statistiques ou le feed Instagram est ajouté
            ultérieurement.
          </p>
        </Section>
      </div>

      <Footer />
    </div>
  );
}
