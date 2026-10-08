import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Kicker, Polaroid, Torn, type Tone } from "@/components/doodle/Doodles";
import { LetsTalk } from "@/components/layout/LetsTalk";

export const metadata: Metadata = {
  title: "Playground",
  description: "Small ideas, experiments and things Temitope Samuel built because he wanted to see if he could.",
  alternates: { canonical: "/playground" },
};

type Toy = {
  title: string;
  blurb: string;
  image: { src: string; alt: string };
  label: string;
  tone: Tone;
  rotate: number;
  /** Where it opens. Leave out for pieces that are shown but not open to visitors. */
  href?: string;
};

// Add a playground piece by appending to this list.
const toys: Toy[] = [
  {
    title: "Scratch to reveal",
    blurb: "A lottery-style scratch card that reveals my portfolio, then a clipboard you flip through.",
    image: { src: "/playground/scratch-card.jpg", alt: "A gold-bordered scratch card reading Scratch to view my portfolio, on a navy background" },
    label: "scratch me!",
    tone: "butter",
    rotate: -3,
    href: "/playground/scratch",
  },
  {
    title: "Doodle Catch",
    blurb: "A mini game: slide the folder to catch falling sticky notes. Drop three and it's over.",
    image: { src: "/playground/doodle-catch.jpg", alt: "Doodle Catch game: sticky notes falling towards a blue folder on notebook paper" },
    label: "mini game",
    tone: "mint",
    rotate: 2,
    href: "/playground/doodle-catch",
  },
  {
    title: "Kern It",
    blurb: "A mini game for designers: drag the letters until the spacing looks right, then get a score.",
    image: { src: "/playground/kern-it.jpg", alt: "Kern It game: the word Type with unevenly spaced letters to drag into place" },
    label: "for type nerds",
    tone: "peri",
    rotate: -2,
    href: "/playground/kern-it",
  },
  {
    title: "The Birthday Magazine",
    blurb: "A 36-page flip-through digital magazine, made as a special edition for one person.",
    image: { src: "/playground/birthday-magazine.jpg", alt: "The cover of The Birthday Magazine, a special edition, on a dark desk" },
    label: "made for one",
    tone: "blush",
    rotate: 3,
  },
];

function Card({ toy }: { toy: Toy }) {
  const locked = !toy.href;
  const inner = (
    <>
      <div className="relative">
        <Torn tone={toy.tone} seed={toy.title.length} className="hand absolute -top-5 left-4 z-20 px-4 py-2 text-xl" style={{ rotate: `${-toy.rotate * 1.5}deg` }}>
          {toy.label}
        </Torn>
        <Polaroid rotate={toy.rotate} tapes={[]}>
          <Image src={toy.image.src} alt={toy.image.alt} width={1200} height={820} sizes="(min-width: 768px) 40vw, 90vw" className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]" />
          {locked && (
            <span className="mono absolute right-3 bottom-3 inline-flex items-center gap-2 bg-ink px-3 py-2 text-[0.6875rem] font-bold text-white">
              <svg aria-hidden viewBox="0 0 16 16" className="size-3.5">
                <path d="M4.5 7V5a3.5 3.5 0 017 0v2h.5A1.5 1.5 0 0113.5 8.5v5A1.5 1.5 0 0112 15H4a1.5 1.5 0 01-1.5-1.5v-5A1.5 1.5 0 014 7zm1.6 0h3.8V5a1.9 1.9 0 00-3.8 0z" fill="currentColor" />
              </svg>
              Available on request
            </span>
          )}
        </Polaroid>
      </div>
      <h2 className="mt-6 text-center text-2xl font-semibold tracking-tight md:text-3xl">{toy.title}</h2>
      <p className="mx-auto mt-2 max-w-sm text-center leading-relaxed text-muted">{toy.blurb}</p>
      <p className="mono mt-4 text-center text-xs font-bold">
        {locked ? <span className="text-muted">Private · available on request</span> : <span className="border-b-2 border-ink pb-0.5">Open it →</span>}
      </p>
    </>
  );
  return (
    <li data-reveal className="group">
      {toy.href ? (
        <Link href={toy.href} data-track="project_click" data-track-label={`playground:${toy.title}`} className="block">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </li>
  );
}

export default function PlaygroundPage() {
  return (
    <>
      <div className="ruled pt-14 pb-24 [--paper:var(--color-surface)] md:pt-20 md:pb-32">
        <div className="wrap">
          <header className="mb-20 text-center">
            <Kicker underline={false}>playground</Kicker>
            <h1 className="pixel mt-4 text-[clamp(3.75rem,9vw,6.5rem)]">Just for fun</h1>
            <p className="hand mx-auto mt-6 max-w-lg text-2xl">Small ideas, experiments and things I built because I wanted to see if I could. Pick one.</p>
          </header>
          <ul className="mx-auto grid max-w-5xl gap-x-12 gap-y-20 md:grid-cols-2">
            {toys.map((t) => (
              <Card key={t.title} toy={t} />
            ))}
          </ul>
        </div>
      </div>
      <LetsTalk />
    </>
  );
}
