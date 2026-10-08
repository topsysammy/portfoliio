"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { best, gameButton } from "./GameShell";

type Note = { x: number; y: number; w: number; vy: number; rot: number; spin: number; color: string; gold: boolean };
type Phase = "idle" | "playing" | "over";

const COLORS = ["#F3E2AD", "#A9DFC6", "#B7C6EF", "#FFC6DA"];
const LIVES = 3;
const KEY = "doodle-catch-best";
const FOLDER_W = 96;
const FOLDER_H = 54;

/** Sticky notes fall down the page; catch them in the folder. Miss three and it's over. */
export function DoodleCatch() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [top, setTop] = useState(0);

  // Game state lives in a ref so the animation loop never re-subscribes.
  const g = useRef({ notes: [] as Note[], folderX: 0, score: 0, lives: LIVES, spawnIn: 0, elapsed: 0, keys: 0, w: 0, h: 0, running: false });

  useEffect(() => setTop(best.read(KEY)), []);

  const draw = useCallback(() => {
    const c = canvas.current;
    if (!c) return;
    const s = g.current;
    const ctx = c.getContext("2d")!;
    const dpr = c.width / s.w;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, s.w, s.h);

    for (const n of s.notes) {
      ctx.save();
      ctx.translate(n.x, n.y);
      ctx.rotate(n.rot);
      ctx.shadowColor = "rgba(25,21,16,0.25)";
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 4;
      ctx.fillStyle = n.color;
      ctx.fillRect(-n.w / 2, -n.w / 2, n.w, n.w);
      ctx.shadowColor = "transparent";
      // tape
      ctx.fillStyle = "rgba(255,255,255,0.65)";
      ctx.fillRect(-n.w * 0.22, -n.w / 2 - 5, n.w * 0.44, 10);
      // scribble lines, or a star on gold notes
      if (n.gold) {
        ctx.fillStyle = "#191510";
        ctx.font = `700 ${n.w * 0.5}px system-ui`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("★", 0, 2);
      } else {
        ctx.strokeStyle = "rgba(25,21,16,0.45)";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.moveTo(-n.w * 0.3, -n.w * 0.15 + i * n.w * 0.17);
          ctx.lineTo(n.w * (i === 2 ? 0.05 : 0.3), -n.w * 0.15 + i * n.w * 0.17);
          ctx.stroke();
        }
      }
      ctx.restore();
    }

    // folder
    const fx = s.folderX - FOLDER_W / 2;
    const fy = s.h - FOLDER_H - 8;
    ctx.fillStyle = "#2B57D6";
    ctx.beginPath();
    ctx.moveTo(fx, fy + 12);
    ctx.lineTo(fx, fy);
    ctx.lineTo(fx + FOLDER_W * 0.42, fy);
    ctx.lineTo(fx + FOLDER_W * 0.54, fy + 12);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(fx, fy + 11, FOLDER_W, FOLDER_H - 11);
    ctx.strokeStyle = "#191510";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(fx, fy + 11, FOLDER_W, FOLDER_H - 11);
    ctx.fillStyle = "#fff";
    ctx.font = "700 11px ui-monospace, Menlo, monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("IDEAS", s.folderX, fy + 11 + (FOLDER_H - 11) / 2);
  }, []);

  // Size the canvas to its box.
  useEffect(() => {
    const c = canvas.current!;
    const fit = () => {
      const r = c.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(r.width * dpr);
      c.height = Math.round(r.height * dpr);
      const s = g.current;
      s.w = r.width;
      s.h = r.height;
      if (!s.folderX) s.folderX = r.width / 2;
      s.folderX = Math.max(FOLDER_W / 2, Math.min(r.width - FOLDER_W / 2, s.folderX));
      draw();
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(c);
    return () => ro.disconnect();
  }, [draw]);

  // The loop.
  useEffect(() => {
    if (phase !== "playing") return;
    const s = g.current;
    s.running = true;
    let raf = 0;
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      s.elapsed += dt;
      const level = 1 + s.elapsed / 14; // gets faster over time

      s.folderX = Math.max(FOLDER_W / 2, Math.min(s.w - FOLDER_W / 2, s.folderX + s.keys * 520 * dt));

      s.spawnIn -= dt;
      if (s.spawnIn <= 0) {
        const w = 40 + Math.random() * 14;
        const gold = Math.random() < 0.12;
        s.notes.push({
          x: w / 2 + Math.random() * (s.w - w),
          y: -w,
          w,
          vy: (110 + Math.random() * 60) * level,
          rot: (Math.random() - 0.5) * 0.5,
          spin: (Math.random() - 0.5) * 1.2,
          color: gold ? "#F7C948" : COLORS[Math.floor(Math.random() * COLORS.length)],
          gold,
        });
        s.spawnIn = Math.max(0.35, 1.05 / level);
      }

      const catchY = s.h - FOLDER_H - 8;
      for (const n of s.notes) {
        n.y += n.vy * dt;
        n.rot += n.spin * dt;
      }
      s.notes = s.notes.filter((n) => {
        const caught = n.y + n.w / 2 >= catchY && n.y - n.w / 2 <= catchY + 26 && Math.abs(n.x - s.folderX) < FOLDER_W / 2 + n.w * 0.2;
        if (caught) {
          s.score += n.gold ? 5 : 1;
          setScore(s.score);
          return false;
        }
        if (n.y - n.w / 2 > s.h) {
          s.lives -= 1;
          setLives(s.lives);
          return false;
        }
        return true;
      });

      draw();
      if (s.lives <= 0) {
        s.running = false;
        if (s.score > best.read(KEY)) {
          best.write(KEY, s.score);
          setTop(s.score);
        }
        setPhase("over");
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, draw]);

  // Keyboard: arrows or A/D move the folder.
  useEffect(() => {
    const dir = (e: KeyboardEvent) => (e.key === "ArrowLeft" || e.key === "a" ? -1 : e.key === "ArrowRight" || e.key === "d" ? 1 : 0);
    const down = (e: KeyboardEvent) => {
      const d = dir(e);
      if (!d || !g.current.running) return;
      e.preventDefault();
      g.current.keys = d;
    };
    const up = (e: KeyboardEvent) => {
      if (dir(e) === g.current.keys) g.current.keys = 0;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  const start = () => {
    const s = g.current;
    Object.assign(s, { notes: [], score: 0, lives: LIVES, spawnIn: 0.4, elapsed: 0, keys: 0, folderX: s.w / 2 });
    setScore(0);
    setLives(LIVES);
    setPhase("playing");
  };

  const follow = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    g.current.folderX = Math.max(FOLDER_W / 2, Math.min(r.width - FOLDER_W / 2, e.clientX - r.left));
    if (!g.current.running) draw();
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mono mb-3 flex items-center justify-between text-sm font-bold">
        <p>
          Score <span className="pixel ml-1 align-middle text-3xl">{score}</span>
        </p>
        <p aria-label={`${lives} of ${LIVES} lives left`} className="text-xl tracking-widest text-pink">
          {"♥".repeat(Math.max(lives, 0))}
          <span className="text-ink/20">{"♥".repeat(LIVES - Math.max(lives, 0))}</span>
        </p>
        <p>
          Best <span className="pixel ml-1 align-middle text-3xl">{top}</span>
        </p>
      </div>

      <div className="relative overflow-hidden border-[3px] border-ink bg-paper shadow-[8px_8px_0_var(--color-ink)]">
        <canvas
          ref={canvas}
          onPointerMove={follow}
          onPointerDown={follow}
          aria-label="Game area. Move the folder left and right to catch falling sticky notes."
          role="img"
          className="ruled block h-[min(62svh,30rem)] w-full touch-none cursor-ew-resize"
        />
        {phase !== "playing" && (
          <div className="absolute inset-0 grid place-items-center bg-paper/85 p-6 text-center">
            <div>
              {phase === "over" ? (
                <>
                  <p className="hand text-3xl">that&apos;s three dropped!</p>
                  <p className="pixel mt-2 text-6xl">{score} caught</p>
                  <p className="mono mt-2 text-xs font-bold">{score > 0 && score >= top ? "New best score" : `Best: ${top}`}</p>
                </>
              ) : (
                <>
                  <p className="hand text-3xl">catch the sticky notes</p>
                  <p className="mx-auto mt-3 max-w-xs leading-relaxed text-muted">
                    Move your mouse or finger to slide the folder. Arrow keys work too. Gold ★ notes are worth 5. Drop three and it&apos;s over.
                  </p>
                </>
              )}
              <button type="button" onClick={start} className={`${gameButton} mt-6`}>
                {phase === "over" ? "Play again" : "Start"}
              </button>
            </div>
          </div>
        )}
      </div>
      <p className="sr-only" aria-live="polite">
        {phase === "over" ? `Game over. You caught ${score}.` : ""}
      </p>
    </div>
  );
}
