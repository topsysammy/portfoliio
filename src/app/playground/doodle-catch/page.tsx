import type { Metadata } from "next";
import { GameShell } from "@/components/playground/GameShell";
import { DoodleCatch } from "@/components/playground/DoodleCatch";

export const metadata: Metadata = {
  title: "Doodle Catch — Playground",
  description: "A mini game: catch the falling sticky notes in the folder. Drop three and it's over.",
  alternates: { canonical: "/playground/doodle-catch" },
};

export default function DoodleCatchPage() {
  return (
    <GameShell kicker="mini game" title="Doodle catch">
      <DoodleCatch />
    </GameShell>
  );
}
