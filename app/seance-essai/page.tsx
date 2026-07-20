import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { TrialForm } from "@/components/essai/TrialForm";
import { TrialHeader } from "@/components/essai/TrialHeader";

export const metadata: Metadata = {
  title: "Séance d'essai offerte · Court-Circuit",
  description:
    "Réserve ta première séance de cross training ou cardio boxing à Saint-Herblain. Offerte, sans engagement, réponse sous 24 h.",
};

export default function SeanceEssaiPage() {
  return (
    <div className="wrap">
      <TrialHeader />
      <TrialForm />
      <Footer minimal />
    </div>
  );
}
