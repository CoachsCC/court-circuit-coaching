import type { Metadata } from "next";
import { CoursePage } from "@/components/course/CoursePage";
import { CARDIO_BOXING } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Cardio Boxing à Saint-Herblain · Court-Circuit",
  description:
    "Frappe, cardio et défoulement en 45 min à Saint-Herblain. Encadré, jamais de combat. Première séance offerte, sans engagement.",
};

export default function CardioBoxingPage() {
  return <CoursePage course={CARDIO_BOXING} />;
}
