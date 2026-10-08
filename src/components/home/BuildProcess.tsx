import type { VibecodeStoryStep } from "@/content/types";
import { Arrow, type Tone, toneClass, Tape } from "@/components/doodle/Doodles";
import { cn } from "@/lib/cn";

export const defaultSteps: VibecodeStoryStep[] = [
  { step: "Idea", body: "What problem is worth solving, and for whom?" },
  { step: "Design", body: "Structure the experience in Figma: flows, screens, states." },
  { step: "Prompt", body: "Turn the design and requirements into clear instructions for AI." },
  { step: "Build", body: "Generate, read and shape the code. AI types; I make the calls." },
  { step: "Iterate", body: "Test it like a user, then fix the details that matter." },
  { step: "Ship", body: "Put something real online that people can open and use." },
];

const tones: Tone[] = ["peri", "butter", "mint", "blush", "peri", "yellow"];
const rot = [-2.5, 1.5, -1, 2, -1.5, 2.5];

/** Idea → Ship as a trail of sticky notes. */
export function BuildProcess({ steps = defaultSteps, dark }: { steps?: VibecodeStoryStep[]; dark?: boolean }) {
  return (
    <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.step} data-reveal style={{ "--d": `${i * 80}ms` } as React.CSSProperties} className="relative">
          <div className={cn("relative h-full p-6 lift", toneClass(tones[i]))} style={{ rotate: `${rot[i]}deg` }}>
            <Tape className="-top-3 left-1/2 -translate-x-1/2" rotate={i % 2 ? 4 : -4} />
            <p className="mono text-xs font-bold opacity-60">Step {String(i + 1).padStart(2, "0")}</p>
            <p className="pixel mt-3 text-5xl">{s.step}</p>
            <p className="mt-3 leading-relaxed text-ink/80">{s.body}</p>
          </div>
          {i < steps.length - 1 && (i + 1) % 3 !== 0 && <Arrow dir="right" className={cn("absolute top-1/2 -right-7 z-10 hidden size-8 lg:block", dark ? "text-yellow" : "text-ink")} />}
        </li>
      ))}
    </ol>
  );
}
