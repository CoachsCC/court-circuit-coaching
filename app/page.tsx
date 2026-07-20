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
import { getGoogleReviews } from "@/lib/google-reviews";
import { CLUB_MEMBERS } from "@/lib/site";

export default async function HomePage() {
  const reviews = await getGoogleReviews();

  return (
    <div className="wrap">
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
      <InstagramFeed />
      <FinalCta />
      <Footer />
      <WhatsappFab />
      <StickyCta />
    </div>
  );
}
