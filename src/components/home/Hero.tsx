import Link from "next/link";
import { Torn } from "@/components/doodle/Doodles";
import { BookCall } from "@/components/ui/BookCall";
import { cn } from "@/lib/cn";

/* ── Hand-drawn bits used only in the hero ── */

/** Loopy pencil arrow curling down-right ("Hi, I'm" ⤵). */
function CurlArrow({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 64 48" className={cn("draw pointer-events-none", className)}>
      <path d="M2 14 C 18 2, 40 4, 46 20 C 50 30, 46 38, 44 42 M 36 34 L 44 43 L 52 35" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Thick yellow marker stroke under the name. */
function MarkerLine({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 300 20" preserveAspectRatio="none" className={cn("draw pointer-events-none", className)}>
      <path d="M4 14 C 70 6, 150 4, 230 7 S 290 10, 296 6 M 40 17 C 110 12, 190 11, 262 12" fill="none" stroke="var(--color-yellow)" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/** Quick double pencil scribble under the status line. */
function Scribble({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 140 14" className={cn("draw pointer-events-none", className)}>
      <path d="M2 10 C 40 4, 90 2, 136 4 M 30 12 C 70 8, 100 7, 128 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Mint highlighter swash behind a word. */
function Swash({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 220 90" preserveAspectRatio="none" className={cn("pointer-events-none absolute", className)}>
      <path d="M8 58 C 10 30, 40 18, 90 16 C 150 14, 205 12, 212 30 C 218 52, 200 70, 140 74 C 90 78, 30 84, 6 80 C 2 74, 4 66, 8 58 Z" fill="var(--color-mint)" />
    </svg>
  );
}

/** Long pencil arrow pointing left, back at the CTA. */
function BackArrow({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 40" className={cn("draw pointer-events-none", className)}>
      <path d="M96 22 C 70 34, 34 34, 6 18 M 6 18 L 18 10 M 6 18 L 18 26" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DoodleSmile({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 40 40" className={cn("draw pointer-events-none", className)}>
      <path d="M20 3 C 31 3, 37 11, 37 20 C 37 30, 29 37, 20 37 C 10 37, 3 30, 3 20 C 3 11, 10 4, 21 4 M 14 15 L 14 18 M 25 14 L 25 17 M 12 24 C 16 30, 25 30, 29 23" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ── Hero ── */

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="ruled relative overflow-hidden pt-12 pb-20 [--paper:var(--color-surface)] md:pt-20 md:pb-28">
      <div className="wrap flex flex-col items-center text-center">
        {/* Name block */}
        <div data-reveal-group className="relative flex w-fit flex-col items-center">
          <p className="hand relative inline-block -rotate-6 self-start text-[1.75rem] md:text-4xl">
            Hi, I&apos;m
            <CurlArrow className="absolute top-1 -right-16 w-12 md:-right-20 md:w-16" />
          </p>

          <h1 id="hero-title" className="relative mt-1 font-pixel text-[clamp(4.95rem,23.4vw,11.7rem)] leading-[0.85] font-extrabold tracking-[-0.01em] uppercase">
            <span className="sr-only">Temitope Samuel, product designer and design engineer. </span>
            <span aria-hidden>Temitope</span>
            <MarkerLine className="absolute -bottom-[0.02em] left-[8%] h-[0.1em] w-[84%]" />
          </h1>

          <div className="mt-6 flex items-center justify-center gap-x-2.5 sm:gap-x-4 md:mt-8">
            <Torn tone="yellow" seed={4} className="hand px-3.5 py-2.5 text-lg whitespace-nowrap shadow-sm sm:px-6 sm:py-3 sm:text-2xl md:text-[1.75rem]" style={{ rotate: "-3deg" }}>
              Product Designer
            </Torn>
            <span aria-hidden className="text-2xl font-light sm:text-3xl">
              ×
            </span>
            <Torn tone="mint" seed={9} className="hand px-3.5 py-2.5 text-lg whitespace-nowrap shadow-sm sm:px-6 sm:py-3 sm:text-2xl md:text-[1.75rem]" style={{ rotate: "-1.5deg" }}>
              Design Engineer
            </Torn>
          </div>

          <p className="mono relative mt-8 max-w-[20rem] text-[0.8125rem] leading-[1.7] font-bold sm:max-w-none md:text-sm">
            <i className="mr-3 inline-block size-3 rounded-full bg-blue align-[-1px]" />
            Open to product design roles &amp; freelance
            <Scribble className="absolute -bottom-3 left-1/2 w-32 -translate-x-1/2" />
          </p>
        </div>

        {/* Statement */}
        <p data-reveal className="mt-14 max-w-3xl md:mt-20 text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] font-semibold tracking-[-0.035em] text-balance">
            I design digital products and{" "}
            <span className="relative inline-block px-[0.08em]">
              <Swash className="-inset-x-[0.1em] -inset-y-[0.02em] h-[1.05em] w-[calc(100%+0.2em)] -rotate-3" />
              <span className="hand relative font-normal tracking-normal">build</span>
            </span>{" "}
            them with AI.
        </p>

        {/* CTA row */}
        <div data-reveal className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-6">
          <Link
            href="/work"
            className="mono group inline-flex h-16 items-center gap-4 rounded-full bg-ink px-9 text-base font-bold tracking-[0.02em] text-white normal-case transition-[translate,box-shadow] hover:-translate-y-0.5 hover:shadow-[4px_5px_0_var(--color-blue)]"
          >
            View My Work
            <span aria-hidden className="text-xl transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
          <BookCall where="hero" className="mono inline-flex h-16 items-center rounded-full border-2 border-ink bg-paper px-8 text-base font-bold tracking-[0.02em] normal-case transition-[translate,box-shadow] hover:-translate-y-0.5 hover:shadow-[4px_5px_0_var(--color-ink)]">
            Book a call
          </BookCall>
          <Link href="/contact" data-track="contact_click" data-track-label="hero" className="group flex items-center gap-3">
            <BackArrow className="w-20 shrink-0 md:w-24" />
            <span className="hand relative -rotate-6 text-left text-2xl leading-tight transition-colors group-hover:text-blue md:text-[1.75rem]">
              Let&apos;s build
              <br />
              &nbsp;&nbsp;something great
            </span>
            <DoodleSmile className="w-9 shrink-0 self-end md:w-10" />
          </Link>
        </div>

      </div>
    </section>
  );
}
