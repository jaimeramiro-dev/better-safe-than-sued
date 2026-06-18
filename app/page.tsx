import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { FrameworksStrip } from "@/components/site/frameworks-strip";
import { FounderStory } from "@/components/site/founder-story";
import { HowItWorks } from "@/components/site/how-it-works";
import { ResponsibleAI } from "@/components/site/responsible-ai";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <FrameworksStrip />
        <FounderStory />
        <HowItWorks />
        <ResponsibleAI />
      </main>
      <Footer />
    </>
  );
}
