import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyCta } from "@/components/StickyCta";
import { WhatsappFab } from "@/components/WhatsappFab";
import { Coaches } from "@/components/home/Coaches";
import { Courses } from "@/components/home/Courses";
import { GoogleProof } from "@/components/home/GoogleProof";
import { Gym } from "@/components/home/Gym";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { PricingPreview } from "@/components/home/PricingPreview";
import { ProofBand } from "@/components/home/ProofBand";
import { Reasons } from "@/components/home/Reasons";
import type { ReviewsData } from "@/lib/google-reviews";
import { getGoogleReviews } from "@/lib/google-reviews";
import { getInstagramPosts } from "@/lib/instagram";
import { CLUB_MEMBERS, site } from "@/lib/site";

/**
 * Données structurées schema.org pour le référencement local. On n'expose que
 * des faits vérifiés du repo (adresse, téléphone, année). `aggregateRating`
 * n'est émis QUE si la note vient réellement de Google (`source !== "fallback"`) :
 * publier une note de secours en JSON-LD reviendrait à mentir aux moteurs.
 * Horaires et géolocalisation volontairement omis tant qu'ils ne sont pas
 * confirmés depuis la fiche Google Business — mieux vaut incomplet qu'inexact.
 */
function buildJsonLd(reviews: ReviewsData) {
  const [street] = site.address.split(",");
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "@id": `${site.url}/#gym`,
    name: site.name,
    description:
      "Salle de sport à Saint-Herblain : cross training et cardio boxing en groupe restreint, deux coachs diplômés d'État.",
    url: site.url,
    telephone: `+33${site.coaches.francesco.phone.slice(1)}`,
    email: site.email,
    foundingDate: String(site.since),
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: street.trim(),
      addressLocality: site.city,
      postalCode: "44800",
      addressCountry: "FR",
    },
    sameAs: [site.instagram.url],
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cross Training" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cardio Boxing" } },
    ],
  };

  if (reviews.source !== "fallback") {
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: reviews.rating.replace(",", "."),
      reviewCount: reviews.reviewCount,
    };
  }

  // JSON.stringify n'échappe pas `<` : un `</script>` dans une donnée casserait
  // la page. Neutralisé même si aucune donnée libre n'est actuellement injectée.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function HomePage() {
  // Deux appels indépendants : les paralléliser évite d'additionner les latences.
  const [reviews, posts] = await Promise.all([getGoogleReviews(), getInstagramPosts()]);

  return (
    <div className="wrap">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: buildJsonLd(reviews) }}
      />
      <Header />
      <Hero />
      <ProofBand data={reviews} members={CLUB_MEMBERS} />
      <Reasons />
      <GoogleProof data={reviews} members={CLUB_MEMBERS} />
      <Courses />
      <HowItWorks />
      <PricingPreview />
      <Coaches />
      <Gym />
      <InstagramFeed posts={posts} />
      <FinalCta />
      <Footer />
      <WhatsappFab />
      <StickyCta />
    </div>
  );
}
