import type { Metadata } from "next";
import { ScratchPortfolio } from "@/components/playground/ScratchPortfolio";

export const metadata: Metadata = {
  title: "Scratch to reveal — Playground",
  description: "Scratch the card to reveal Temitope Samuel's portfolio, then flip through it on a clipboard.",
  alternates: { canonical: "/playground/scratch" },
};

export default function ScratchPage() {
  return <ScratchPortfolio />;
}
