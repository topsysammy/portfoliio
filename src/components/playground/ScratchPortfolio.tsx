"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { contact, site } from "@/content/site";
import { Portrait } from "@/components/ui/Portrait";
import { Socials } from "@/components/layout/Socials";
import { BookCall } from "@/components/ui/BookCall";
import { cn } from "@/lib/cn";

/* ───────────────────────── Scratch-off layer ───────────────────────── */

const BRUSH = 26; // radius in CSS px
const CLEARED_ENOUGH = 0.5; // share of the panel that must be scratched to win

function ScratchLayer({ onDone, done }: { onDone: () => void; done: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const started = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [touched, setTouched] = useState(false);

  // Paint the silver coating. Skipped once scratching has started so a resize doesn't refill it.
  const paint = useCallback(() => {
    const c = ref.current;
    if (!c || started.current) return;
    const { width, height } = c.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = Math.round(width * dpr);
    c.height = Math.round(height * dpr);
    const g = c.getContext("2d")!;
    g.scale(dpr, dpr);
    const grad = g.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, "#e3e5ea");
    grad.addColorStop(0.45, "#b8bcc6");
    grad.addColorStop(0.55, "#d5d8de");
    grad.addColorStop(1, "#aeb2bd");
    g.fillStyle = grad;
    g.fillRect(0, 0, width, height);
    // fine diagonal sheen
    g.strokeStyle = "rgba(255,255,255,0.22)";
    g.lineWidth = 1;
    for (let x = -height; x < width; x += 7) {
      g.beginPath();
      g.moveTo(x, height);
      g.lineTo(x + height, 0);
      g.stroke();
    }
    g.fillStyle = "rgba(20,24,40,0.16)";
    g.font = "700 13px ui-monospace, Menlo, monospace";
    for (let y = 22, row = 0; y < height + 20; y += 34, row++) {
      for (let x = row % 2 ? -60 : 0; x < width; x += 150) g.fillText("SCRATCH ✦ HERE", x + 10, y);
    }
  }, []);

  useEffect(() => {
    paint();
    const ro = new ResizeObserver(paint);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [paint]);

  const clearedShare = () => {
    const c = ref.current!;
    const data = c.getContext("2d")!.getImageData(0, 0, c.width, c.height).data;
    let clear = 0;
    let total = 0;
    for (let i = 3; i < data.length; i += 4 * 24) {
      total++;
      if (data[i] < 40) clear++;
    }
    return clear / total;
  };

  const scratch = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = ref.current!;
    const r = c.getBoundingClientRect();
    const dpr = c.width / r.width;
    const x = (e.clientX - r.left) * dpr;
    const y = (e.clientY - r.top) * dpr;
    const g = c.getContext("2d")!;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.globalCompositeOperation = "destination-out";
    g.strokeStyle = "#000"; // fully opaque, so one pass removes the coating completely
    g.lineCap = "round";
    g.lineJoin = "round";
    g.lineWidth = BRUSH * 2 * dpr;
    g.beginPath();
    const from = last.current ?? { x, y };
    g.moveTo(from.x, from.y);
    g.lineTo(x + 0.01, y + 0.01);
    g.stroke();
    last.current = { x, y };
  };

  return (
    <>
      <canvas
        ref={ref}
        aria-hidden
        onPointerDown={(e) => {
          e.preventDefault();
          e.currentTarget.setPointerCapture(e.pointerId);
          started.current = true;
          setTouched(true);
          last.current = null;
          scratch(e);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 0 && e.pointerType === "mouse") return;
          if (!started.current || last.current === null) return;
          scratch(e);
        }}
        onPointerUp={() => {
          last.current = null;
          if (clearedShare() > CLEARED_ENOUGH) onDone();
        }}
        className={cn(
          "absolute inset-0 h-full w-full cursor-grab touch-none rounded-[inherit] transition-opacity duration-700 active:cursor-grabbing",
          done && "pointer-events-none opacity-0",
        )}
      />
      <span
        aria-hidden
        className={cn(
          "pixel pointer-events-none absolute inset-0 grid place-items-center text-center text-[clamp(1.75rem,6vw,3.25rem)] text-[#2b2f3d] transition-opacity duration-300",
          (touched || done) && "opacity-0",
        )}
      >
        Scratch to reveal
      </span>
    </>
  );
}

/* ───────────────────────── Ticket ───────────────────────── */

function Ticket({ onOpen }: { onOpen: () => void }) {
  const [won, setWon] = useState(false);
  return (
    <div className="flex w-full flex-col items-center">
      <p className="hand mb-4 -rotate-2 text-3xl text-[#F5C542]">Product Designer ✦</p>

      <div className="w-full max-w-[44rem] -rotate-2 rounded-[1.4rem] bg-[linear-gradient(135deg,#F8D76B,#E0A422_45%,#FBE28F_60%,#D99A1B)] p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] sm:p-3">
        <div className="rounded-[1rem] bg-[#F3EEE2] p-4 text-[#191510] select-none sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <p className="pixel text-[clamp(1.9rem,6.4vw,3.25rem)]">
              Scratch to view
              <br />
              <span className="text-[#2B57D6]">my portfolio</span>
            </p>
            <p className="mono shrink-0 text-right text-[0.625rem] leading-relaxed text-[#191510]/60">
              Ticket
              <br />
              <span className="pixel text-2xl text-[#FF4D8D]">Nº 0001</span>
              <br />
              NG · 2026
            </p>
          </div>

          {/* Prize, under the silver */}
          <div className="relative mt-4 overflow-hidden rounded-xl bg-white">
            <div className="flex items-center gap-4 p-4 sm:gap-6 sm:p-5">
              <div className="w-[34%] max-w-[11rem] shrink-0 overflow-hidden rounded-xl border-[3px] border-[#FF4D8D]">
                <Portrait sizes="176px" priority />
              </div>
              <div className="min-w-0">
                <span className="mono inline-block -rotate-2 bg-[#FF4D8D] px-2 py-1 text-[0.625rem] font-bold text-white">You won!</span>
                <p className="pixel mt-2 text-[clamp(1.75rem,6vw,3rem)]">{site.name}</p>
                <p className="mt-2 text-sm leading-snug sm:text-base">Product designer &amp; design engineer.</p>
                <p className="mt-1 text-sm leading-snug sm:text-base">
                  Prize: <span className="font-semibold text-[#2B57D6]">a product that&apos;s designed and built.</span>
                </p>
              </div>
            </div>
            <ScratchLayer done={won} onDone={() => setWon(true)} />
          </div>

          <div className="mt-4 flex items-end justify-between gap-4">
            <p className="mono text-[0.5625rem] text-[#191510]/55">1 winner per card · no purchase needed</p>
            <span aria-hidden className="h-6 w-28 bg-[repeating-linear-gradient(90deg,#191510_0_2px,transparent_2px_4px,#191510_4px_5px,transparent_5px_8px)]" />
          </div>
        </div>
      </div>

      <div className="mt-8 flex min-h-12 flex-wrap items-center justify-center gap-4">
        {won ? (
          <button
            type="button"
            onClick={onOpen}
            className="mono inline-flex h-12 items-center gap-2 rounded-full bg-[#F5C542] px-7 text-sm font-bold text-[#191510] transition-transform hover:-translate-y-0.5"
          >
            Open my portfolio →
          </button>
        ) : (
          <button type="button" onClick={() => setWon(true)} className="mono text-xs text-white/60 underline underline-offset-4 hover:text-white">
            Reveal without scratching
          </button>
        )}
      </div>
      <p className="sr-only" aria-live="polite">
        {won ? `You won: ${site.name}, product designer and design engineer.` : ""}
      </p>
    </div>
  );
}

/* ───────────────────────── Clipboard ───────────────────────── */

const designs = [
  { src: "/work/duba-cover.png", alt: "DUBA bill payment app", cls: "left-0 top-0 w-[58%] -rotate-3" },
  { src: "/work/shoppa/cover.png", alt: "Shoppa shopping list app", cls: "right-0 top-[8%] w-[50%] rotate-2" },
  { src: "/work/globepay-cover.jpg", alt: "GlobePay money transfer app", cls: "left-[4%] top-[44%] w-[50%] rotate-2" },
  { src: "/work/mealio/cover.png", alt: "Mealio food ordering app", cls: "right-[2%] top-[50%] w-[52%] -rotate-2" },
];

// Figures from the CV; "featured" is the count shown on the homepage.
const stats = [
  { value: "2+", label: "years" },
  { value: "20", label: "clients (up to)" },
  { value: "6", label: "featured projects" },
];

function Heading({ small, big }: { small: string; big: string }) {
  return (
    <header>
      <p className="hand text-3xl leading-none">{small}</p>
      <p className="pixel text-[clamp(2.5rem,11vw,3.5rem)]">{big}</p>
    </header>
  );
}

const pages: { name: string; body: React.ReactNode }[] = [
  {
    name: "Welcome",
    body: (
      <div className="flex h-full flex-col items-center text-center">
        <p className="hand text-4xl leading-none">Welcome</p>
        <p className="mono mt-1 text-[0.5625rem]">to my</p>
        <p className="pixel text-[clamp(3rem,13vw,4.25rem)]">Portfolio</p>
        <div className="relative mt-4 w-[44%] rotate-1 bg-white p-2 pb-1 shadow-md sm:w-[56%]">
          <span aria-hidden className="absolute -top-2 left-1/2 h-4 w-16 -translate-x-1/2 -rotate-2 bg-[#F5C542]/80" />
          <Portrait sizes="220px" />
          <p className="hand pt-1 text-lg leading-tight whitespace-nowrap">{site.name}</p>
        </div>
      </div>
    ),
  },
  {
    name: "Meet the designer",
    body: (
      <div className="flex h-full flex-col">
        <Heading small="Meet" big="The designer" />
        <div className="mt-5 flex items-start gap-4">
          <div className="w-[38%] shrink-0 -rotate-2 bg-white p-1.5 shadow-md">
            <Portrait sizes="150px" />
          </div>
          <p className="text-[0.9375rem] leading-relaxed">
            I&apos;m Temitope, a product designer and design engineer in Lagos, Nigeria. I design apps and websites, then build them with AI.
          </p>
        </div>
        <dl className="mt-auto grid grid-cols-3 gap-2 pt-5 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <dd className="pixel text-4xl text-[#FF4D8D]">{s.value}</dd>
              <dt className="mono mt-1 text-[0.5625rem] leading-tight text-[#191510]/60">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    ),
  },
  {
    name: "See designs",
    body: (
      <div className="flex h-full flex-col">
        <Heading small="See" big="Designs" />
        <div className="relative mt-4 flex-1">
          {designs.map((d) => (
            <div key={d.src} className={cn("absolute bg-white p-1 shadow-md", d.cls)}>
              <Image src={d.src} alt={d.alt} width={320} height={230} sizes="220px" className="aspect-[7/5] h-auto w-full object-cover object-top" />
            </div>
          ))}
        </div>
        <Link href="/work" className="mono mt-3 self-start border-b-2 border-[#191510] pb-0.5 text-xs font-bold">
          See all work →
        </Link>
      </div>
    ),
  },
  {
    name: "Let's talk",
    body: (
      <div className="flex h-full flex-col">
        <Heading small="Let's" big="Talk" />
        <p className="mt-4 text-[0.9375rem] leading-relaxed">Have a product to design, a website to build, or an idea to talk through? I&apos;d love to hear from you.</p>
        <a href={`mailto:${contact.email}`} data-track="contact_click" data-track-label="playground" className="mt-4 text-[0.9375rem] font-semibold break-all underline underline-offset-4">
          {contact.email}
        </a>
        <Socials className="mt-5" />
        <div className="mt-5 flex flex-wrap gap-2">
          <BookCall where="playground" className="mono inline-flex h-11 items-center border-2 border-[#191510] bg-[#191510] px-4 text-xs font-bold text-white">
            Book a call →
          </BookCall>
          <a href={contact.cvUrl} download data-track="cv_download" data-track-label="playground" className="mono inline-flex h-11 items-center border-2 border-[#191510] bg-white px-4 text-xs font-bold">
            Download CV ↓
          </a>
        </div>
      </div>
    ),
  },
];

function Clipboard({ onRestart }: { onRestart: () => void }) {
  const [i, setI] = useState(0);
  const lastPage = i === pages.length - 1;
  const go = (n: number) => setI(Math.max(0, Math.min(pages.length - 1, n)));

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative w-full max-w-[25rem] -rotate-1 rounded-[1.25rem] bg-[linear-gradient(160deg,#D9AE7B,#C4925C)] p-4 pt-9 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] sm:p-5 sm:pt-10">
        {/* clip */}
        <span aria-hidden className="absolute -top-3 left-1/2 h-10 w-24 -translate-x-1/2 rounded-md bg-[linear-gradient(#2d2f36,#16171b)] shadow-md" />
        <span aria-hidden className="absolute top-3 left-1/2 h-3 w-32 -translate-x-1/2 rounded-sm bg-[#3a3c44]" />

        <section
          key={i}
          aria-label={`Page ${i + 1} of ${pages.length}: ${pages[i].name}`}
          className="sheet-in relative flex aspect-[3/4] flex-col bg-[#F7F4EC] p-5 text-[#191510] shadow-[0_2px_0_rgba(0,0,0,0.08)] [background-image:repeating-linear-gradient(135deg,transparent_0_5px,rgba(25,21,16,0.025)_5px_6px)] sm:p-6"
        >
          <p className="mono absolute top-3 right-4 text-[0.5625rem] text-[#191510]/45">
            0{i + 1} / 0{pages.length}
          </p>
          <div className="min-h-0 flex-1">{pages[i].body}</div>
          <button
            type="button"
            onClick={() => (lastPage ? onRestart() : go(i + 1))}
            className="mono mt-4 inline-flex h-11 items-center justify-center self-center rounded-md bg-[#191510] px-5 text-xs font-bold text-white transition-transform hover:-translate-y-0.5"
          >
            {lastPage ? "Scratch again ↺" : "Click to see next page →"}
          </button>
        </section>
      </div>

      <nav aria-label="Portfolio pages" className="mt-7 flex items-center gap-4">
        <button type="button" aria-label="Previous page" disabled={i === 0} onClick={() => go(i - 1)} className="grid size-10 place-items-center rounded-full border border-white/30 text-white disabled:opacity-30">
          ←
        </button>
        <ul className="flex items-center gap-2">
          {pages.map((p, k) => (
            <li key={p.name}>
              <button
                type="button"
                aria-label={`Go to page ${k + 1}: ${p.name}`}
                aria-current={k === i ? "page" : undefined}
                onClick={() => go(k)}
                className={cn("block h-2 rounded-full transition-[width,background-color] duration-300", k === i ? "w-6 bg-[#F5C542]" : "w-2 bg-white/35")}
              />
            </li>
          ))}
        </ul>
        <button type="button" aria-label="Next page" disabled={lastPage} onClick={() => go(i + 1)} className="grid size-10 place-items-center rounded-full border border-white/30 text-white disabled:opacity-30">
          →
        </button>
      </nav>
    </div>
  );
}

/* ───────────────────────── Stage ───────────────────────── */

const stars = [
  [6, 14, 10], [18, 72, 7], [31, 30, 5], [44, 88, 8], [58, 10, 6], [69, 64, 9], [82, 24, 7], [91, 80, 6], [12, 44, 5], [76, 46, 5], [50, 52, 4], [95, 12, 8],
];

export function ScratchPortfolio() {
  const [stage, setStage] = useState<"ticket" | "clipboard">("ticket");
  const [round, setRound] = useState(0);

  return (
    <section
      aria-labelledby="scratch-title"
      className="relative flex min-h-[calc(100svh-3.5rem)] items-center overflow-hidden bg-[radial-gradient(900px_700px_at_50%_40%,#16327a_0%,#0c1f52_45%,#07122f_100%)] px-4 py-14 text-white"
    >
      <h1 id="scratch-title" className="sr-only">
        Playground: scratch to reveal my portfolio
      </h1>
      {stars.map(([x, y, s], k) => (
        <svg key={k} aria-hidden viewBox="0 0 24 24" className="pointer-events-none absolute animate-pulse" style={{ left: `${x}%`, top: `${y}%`, width: s * 1.6, animationDelay: `${k * 0.37}s`, animationDuration: "3.2s" }}>
          <path d="M12 0c1 7 4 10 12 12-8 2-11 5-12 12-1-7-4-10-12-12 8-2 11-5 12-12z" fill="#F5C542" />
        </svg>
      ))}
      <Link href="/playground" className="mono absolute top-5 left-5 z-10 text-xs text-white/70 underline-offset-4 hover:text-white hover:underline">
        ← Back to playground
      </Link>
      <div className="relative mx-auto w-full max-w-3xl">
        {stage === "ticket" ? (
          <div key={`t${round}`} className="sheet-in">
            <Ticket onOpen={() => setStage("clipboard")} />
          </div>
        ) : (
          <Clipboard
            onRestart={() => {
              setRound((r) => r + 1);
              setStage("ticket");
            }}
          />
        )}
      </div>
    </section>
  );
}
