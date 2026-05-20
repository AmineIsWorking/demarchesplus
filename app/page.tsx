import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SituationsGrid from "@/components/SituationsGrid";
import AideStrip from "@/components/AideStrip";
import FrequentSection from "@/components/FrequentSection";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Nav />
      <Hero />
      <div className="px-4 sm:px-8 py-7 pb-32 max-w-7xl mx-auto">
        <SituationsGrid />
        <AideStrip />
        <FrequentSection />
      </div>
      <ChatBot />
    </main>
  );
}
