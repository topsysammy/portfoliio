import Link from "next/link";
import { Kicker, Sticker } from "@/components/doodle/Doodles";
import { BuildProcess } from "./BuildProcess";

/** The differentiator: design and build are one workflow. */
export function BuiltWithAI() {
  return (
    <section id="vibecoded" aria-labelledby="ai-title" className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(to_bottom,transparent_0_33px,#fff_33px_34px)]" />
      <div className="wrap relative">
        <div className="flex flex-col items-center text-center">
          <Kicker className="text-white">and then...</Kicker>
          <h2 id="ai-title" data-reveal className="pixel mt-10 text-[clamp(4rem,12vw,9rem)] text-yellow">
            Built with AI
          </h2>
          <p data-reveal className="mt-8 max-w-2xl text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight font-semibold tracking-[-0.03em]">
            I don&apos;t just design the idea. <span className="hand text-[1.2em] font-normal whitespace-nowrap text-yellow">I build it.</span>
          </p>
          <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Using AI-assisted development, I turn product ideas and design concepts into functional websites and working prototypes. AI is part of the
            workflow, not the whole identity.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Sticker tone="blue" rotate={-4}>Claude</Sticker>
            <Sticker tone="pink" rotate={3}>ChatGPT</Sticker>
            <Sticker tone="green" rotate={-2}>Gemini</Sticker>
            <Sticker tone="yellow" rotate={4}>Figma</Sticker>
          </div>
        </div>
        <div className="mt-20 text-ink">
          <BuildProcess dark />
        </div>
        <div className="mt-16 text-center">
          <Link href="/vibecoded" className="mono inline-flex h-14 items-center border-2 border-white px-8 text-sm font-bold transition-[translate,background-color,color] hover:-translate-y-0.5 hover:bg-yellow hover:text-ink">
            See what I&apos;ve built →
          </Link>
        </div>
      </div>
    </section>
  );
}
