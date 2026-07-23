import type { Metadata } from "next";
import { CoursePage } from "@/components/course/CoursePage";
import { CROSS_TRAINING } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Cross Training à Saint-Herblain",
  description:
    "Force, cardio et mobilité en 45 min, en groupe restreint à Saint-Herblain. Un circuit différent chaque jour, du sédentaire au confirmé. Première séance offerte.",
  alternates: { canonical: "/cross-training" },
  openGraph: {
    title: "Cross Training à Saint-Herblain · Court-Circuit",
    description:
      "Force, cardio et mobilité en 45 min, en groupe restreint à Saint-Herblain.",
    url: "/cross-training",
  },
};

export default function CrossTrainingPage() {
  return <CoursePage course={CROSS_TRAINING} />;
}
