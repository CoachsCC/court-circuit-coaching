import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { TrialForm } from "@/components/essai/TrialForm";
import { TrialHeader } from "@/components/essai/TrialHeader";
import { getGoogleReviews } from "@/lib/google-reviews";
import { CLUB_MEMBERS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Séance d'essai offerte",
  description:
    "Réserve ta première séance de cross training ou cardio boxing à Saint-Herblain. Offerte, sans engagement, réponse sous 24 h.",
  alternates: { canonical: "/seance-essai" },
  openGraph: {
    title: "Séance d'essai offerte · Court-Circuit",
    description:
      "Ta première séance à Saint-Herblain, offerte et sans engagement. Réponse sous 24 h.",
    url: "/seance-essai",
  },
};

export default async function SeanceEssaiPage() {
  const reviews = await getGoogleReviews();

  return (
    <div className="wrap">
      <TrialHeader />
      <TrialForm
        rating={reviews.rating}
        reviewCount={reviews.reviewCount}
        reviewsUrl={reviews.reviewsUrl}
        members={CLUB_MEMBERS}
      />
      <Footer minimal />
    </div>
  );
}
