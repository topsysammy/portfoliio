"use client";

import { useEffect, useRef, useState } from "react";
import { best, gameButton } from "./GameShell";
import { cn } from "@/lib/cn";

const WORDS = ["Type", "DUBA", "Layout", "Wavy", "Temitope"];
const KEY = "kern-it-best";
const TOLERANCE = 0.12; // em of error that scores zero for a letter

/** Random starting offsets (in em). First and last letters stay put as anchors. */
function scramble(word: string) {
  return Array.from(word).map((_, i) => {
    if (i === 0 || i === word.length - 1) return 0;
    const size = 0.05 + Math.random() * 0.09;
    return Math.random() < 0.5 ? -size : size;
  });
}

function scoreOf(offsets: number[]) {
  const movable = offsets.slice(1, -1);
  const avg = movable.reduce((sum, o) => sum + Math.max(0, 1 - Math.abs(o) / TOLERANCE), 0) / movable.length;
  return Math.round(avg * 100);
}

const verdict = (n: number) => (n >= 90 ? "pixel-perfect eye!" : n >= 75 ? "good eye." : n >= 50 ? "getting there." : "keep practising!");

/** Drag the letters until the spacing looks right, then check against the target spacing. */
export function KernIt() {
  const [round, setRound] = useState(0);
  const [offsets, setOffsets] = useState<number[]>(() => WORDS[0].split("").map(() => 0));
  const [checked, setChecked] = useState(false);
  const [scores, setScores] = useState<number[]>([]);
  const [top, setTop] = useState(0);
  const wordRef = useRef<HTMLParagraphElement>(null);
  const drag = useRef<{ i: number; startX: number; startEm: number } | null>(null);

  const word = WORDS[round];
  const finished = scores.length === WORDS.length && checked;

  // Scramble on the client only, so server and browser render the same first frame.
  useEffect(() => {
    setOffsets(scramble(WORDS[round]));
    setChecked(false);
  }, [round]);
  useEffect(() => setTop(best.read(KEY)), []);

  const fontPx = () => parseFloat(getComputedStyle(wordRef.current!).fontSize);
  const nudge = (i: number, em: number) => setOffsets((o) => o.map((v, k) => (k === i ? Math.max(-0.3, Math.min(0.3, em)) : v)));

  const check = () => {
    const s = scoreOf(offsets);
    const all = [...scores, s];
    setScores(all);
    setChecked(true);
    if (all.length === WORDS.length) {
      const total = Math.round(all.reduce((a, b) => a + b, 0) / all.length);
      if (total > best.read(KEY)) {
        best.write(KEY, total);
        setTop(total);
      }
    }
  };

  const restart = () => {
    setScores([]);
    setChecked(false);
    if (round === 0) setOffsets(scramble(WORDS[0]));
    else setRound(0);
  };

  const total = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const current = checked ? scores[scores.length - 1] : null;

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mono mb-3 flex items-center justify-between text-sm font-bold">
        <p>
          Word <span className="pixel ml-1 align-middle text-3xl">{round + 1}</span>/{WORDS.length}
        </p>
        <p>
          Best <span className="pixel ml-1 align-middle text-3xl">{top}</span>
        </p>
      </div>

      <div className="border-[3px] border-ink bg-paper px-4 py-12 shadow-[8px_8px_0_var(--color-ink)] sm:px-8 sm:py-16">
        <p className="hand mb-8 text-center text-2xl text-muted">
          {checked ? `${current} / 100 — ${verdict(current!)}` : "drag the letters until the spacing looks even"}
        </p>

        <div className="relative flex justify-center select-none">
          {/* The target spacing, shown after checking. Built from the same letter boxes so it lines up exactly. */}
          <p aria-hidden className={cn("absolute inset-x-0 text-center text-[clamp(3.25rem,15vw,8rem)] leading-none font-bold tracking-normal text-pink transition-opacity duration-300", checked ? "opacity-45" : "opacity-0")}>
            {Array.from(word).map((ch, i) => (
              <span key={i} className="inline-block">
                {ch}
              </span>
            ))}
          </p>
          <p ref={wordRef} className="relative text-[clamp(3.25rem,15vw,8rem)] leading-none font-bold tracking-normal" aria-label={`The word ${word}`}>
            {Array.from(word).map((ch, i) => {
              const fixed = i === 0 || i === word.length - 1;
              return (
                <span
                  key={`${round}-${i}`}
                  role={fixed ? undefined : "slider"}
                  tabIndex={fixed || checked ? undefined : 0}
                  aria-label={fixed ? undefined : `Letter ${ch}`}
                  aria-valuenow={fixed ? undefined : Math.round(offsets[i] * 100)}
                  aria-valuemin={fixed ? undefined : -30}
                  aria-valuemax={fixed ? undefined : 30}
                  aria-valuetext={fixed ? undefined : `${Math.round(offsets[i] * 100)} hundredths of an em`}
                  style={{ transform: `translateX(${offsets[i] ?? 0}em)` }}
                  className={cn(
                    "inline-block touch-none",
                    fixed ? "text-ink/35" : checked ? "" : "cursor-ew-resize rounded-sm hover:text-blue focus-visible:text-blue",
                  )}
                  onPointerDown={(e) => {
                    if (fixed || checked) return;
                    e.currentTarget.setPointerCapture(e.pointerId);
                    drag.current = { i, startX: e.clientX, startEm: offsets[i] };
                  }}
                  onPointerMove={(e) => {
                    const d = drag.current;
                    if (!d || d.i !== i) return;
                    nudge(i, d.startEm + (e.clientX - d.startX) / fontPx());
                  }}
                  onPointerUp={() => (drag.current = null)}
                  onPointerCancel={() => (drag.current = null)}
                  onKeyDown={(e) => {
                    if (fixed || checked) return;
                    const step = (e.shiftKey ? 5 : 1) / fontPx();
                    if (e.key === "ArrowLeft") nudge(i, offsets[i] - step);
                    else if (e.key === "ArrowRight") nudge(i, offsets[i] + step);
                    else return;
                    e.preventDefault();
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </p>
        </div>

        <p className="mono mt-10 text-center text-[0.6875rem] text-muted">
          {checked ? "Pink shows the target spacing." : "Grey letters are fixed. Arrow keys nudge a selected letter."}
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 text-center">
        {finished ? (
          <>
            <p className="hand text-3xl">final score</p>
            <p className="pixel text-7xl">{total} / 100</p>
            <p className="mono text-xs font-bold">{total > 0 && total >= top ? "New best score" : `Best: ${top}`}</p>
            <button type="button" onClick={restart} className={gameButton}>
              Play again
            </button>
          </>
        ) : checked ? (
          <button type="button" onClick={() => setRound((r) => r + 1)} className={gameButton}>
            Next word →
          </button>
        ) : (
          <button type="button" onClick={check} className={gameButton}>
            Check my kerning
          </button>
        )}
      </div>
      <p className="sr-only" aria-live="polite">
        {checked ? `You scored ${current} out of 100.` : ""}
      </p>
    </div>
  );
}
