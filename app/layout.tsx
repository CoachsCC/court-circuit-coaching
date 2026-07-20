import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Court-Circuit · Salle de sport à Saint-Herblain (Nantes)",
  description:
    "Cross training et cardio boxing en groupe restreint à Saint-Herblain. Deux coachs diplômés d'État, du sédentaire au confirmé. Première séance offerte.",
  openGraph: {
    title: "Court-Circuit · Coaching Sportif",
    description:
      "La salle de sport où on ne te lâche pas. Cross training et cardio boxing à Saint-Herblain depuis 2013.",
    locale: "fr_FR",
    type: "website",
    siteName: site.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}
