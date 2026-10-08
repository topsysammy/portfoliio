import type { Metadata } from "next";
import { GameShell } from "@/components/playground/GameShell";
import { KernIt } from "@/components/playground/KernIt";

export const metadata: Metadata = {
  title: "Kern It — Playground",
  description: "A mini game for designers: drag the letters until the spacing looks right, then see how close you got.",
  alternates: { canonical: "/playground/kern-it" },
};

export default function KernItPage() {
  return (
    <GameShell kicker="mini game" title="Kern it">
      <KernIt />
    </GameShell>
  );
}
