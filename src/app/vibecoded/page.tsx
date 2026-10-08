import type { Metadata } from "next";
import { byType } from "@/content/projects";
import { Kicker, Sticker } from "@/components/doodle/Doodles";
import { FolderStack } from "@/components/work/FolderStack";
import { BuildProcess } from "@/components/home/BuildProcess";
import { Toolbox } from "@/components/home/Toolbox";
import { LetsTalk } from "@/components/layout/LetsTalk";

export const metadata: Metadata = {
  title: "Vibecoded — Built with AI",
  description: "Products and prototypes Temitope Samuel designed and built with AI-assisted development.",
  alternates: { canonical: "/vibecoded" },
};

export default function VibecodedPage() {
  const items = byType("vibecoded").filter((p) => !!p.vibecode); // built apps only, not design showcases
  return (
    <>
      <header className="ruled pt-16 pb-20 [--paper:var(--color-surface)] md:pt-24">
        <div className="wrap flex flex-col items-center text-center">
          <Kicker>designed it, then built it</Kicker>
          <div className="relative mt-12">
            <Sticker tone="blue" rotate={-8} className="absolute -top-8 -left-4 z-10 md:-left-16">
              with AI
            </Sticker>
            <h1 className="pixel text-[clamp(4.5rem,14vw,11rem)]">Vibecoded</h1>
          </div>
          <p className="mt-10 max-w-2xl text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight font-semibold tracking-[-0.03em]">
            I don&apos;t just design the idea. <span className="hand text-[1.2em] font-normal whitespace-nowrap text-blue">I build it.</span>
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Using AI-assisted development, I turn product ideas and design concepts into functional websites and working prototypes, often without waiting for a full development cycle.
          </p>
        </div>
      </header>
      <section aria-labelledby="vc-list-t" className="ruled py-20">
        <div className="wrap">
          <h2 id="vc-list-t" className="sr-only">Vibecoded projects</h2>
          <FolderStack projects={items} />
        </div>
      </section>
      <section aria-labelledby="how-t" className="ruled py-20 [--paper:var(--color-surface)] md:py-28">
        <div className="wrap">
          <div className="mb-14 text-center">
            <Kicker>how i vibecode a product</Kicker>
            <h2 id="how-t" className="pixel mt-10 text-[clamp(3.5rem,9vw,7rem)]">Idea to ship</h2>
          </div>
          <BuildProcess />
        </div>
      </section>
      <Toolbox />
      <LetsTalk />
    </>
  );
}
