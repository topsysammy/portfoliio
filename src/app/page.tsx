import { Hero } from "@/components/home/Hero";
import { WhatsUp } from "@/components/home/WhatsUp";
import { FeaturedWorks } from "@/components/home/FeaturedWorks";
import { BuiltWithAI } from "@/components/home/BuiltWithAI";
import { Toolbox } from "@/components/home/Toolbox";
import { LetsTalk } from "@/components/layout/LetsTalk";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatsUp />
      <FeaturedWorks />
      <BuiltWithAI />
      <Toolbox />
      <LetsTalk />
    </>
  );
}
