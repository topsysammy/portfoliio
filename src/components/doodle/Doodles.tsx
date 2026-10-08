import { cn } from "@/lib/cn";

/* Small deterministic PRNG so torn edges are stable between renders. */
function rng(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/** clip-path polygon with ragged left/right edges (and a slightly wavy top/bottom). */
export function tornPath(seed = 1, depth = 7, steps = 9) {
  const r = rng(seed);
  const pts: string[] = [];
  for (let i = 0; i <= 6; i++) pts.push(`${(i / 6) * 100}% ${r() * 3}px`);
  for (let i = 1; i < steps; i++) pts.push(`calc(100% - ${r() * depth}px) ${(i / steps) * 100}%`);
  for (let i = 6; i >= 0; i--) pts.push(`${(i / 6) * 100}% calc(100% - ${r() * 3}px)`);
  for (let i = steps - 1; i > 0; i--) pts.push(`${r() * depth}px ${(i / steps) * 100}%`);
  return `polygon(${pts.join(", ")})`;
}

const tones = {
  yellow: "bg-yellow text-ink",
  green: "bg-green text-ink",
  pink: "bg-pink text-ink",
  blue: "bg-blue text-white",
  ink: "bg-ink text-white",
  mint: "bg-mint text-ink",
  butter: "bg-butter text-ink",
  peri: "bg-peri text-ink",
  blush: "bg-blush text-ink",
  kraft: "bg-kraft text-ink",
  white: "bg-paper text-ink",
} as const;
export type Tone = keyof typeof tones;
export const toneClass = (t: Tone) => tones[t];

/** Torn-paper label. */
export function Torn({ children, tone = "yellow", seed = 1, depth = 7, className, style, as: El = "span" }: { children: React.ReactNode; tone?: Tone; seed?: number; depth?: number; className?: string; style?: React.CSSProperties; as?: "span" | "div" }) {
  return (
    <El className={cn("inline-flex items-center", tones[tone], className)} style={{ clipPath: tornPath(seed, depth), ...style }}>
      {children}
    </El>
  );
}

/** Washi tape strip. Position it with className. */
export function Tape({ className, tone = "white", rotate = -6 }: { className?: string; tone?: "white" | "peri" | "butter" | "blush" | "mint"; rotate?: number }) {
  const bg = { white: "bg-white/60", peri: "bg-peri/70", butter: "bg-butter/80", blush: "bg-blush/80", mint: "bg-mint/70" }[tone];
  return <span aria-hidden className={cn("pointer-events-none absolute z-10 h-6 w-24 shadow-[0_1px_2px_rgba(0,0,0,0.08)] backdrop-blur-[1px]", bg, className)} style={{ rotate: `${rotate}deg` }} />;
}

/** Rounded sticker pill with a hard little shadow. */
export function Sticker({ children, tone = "mint", rotate = -6, className }: { children: React.ReactNode; tone?: Tone; rotate?: number; className?: string }) {
  return (
    <span
      className={cn(
        "mono inline-flex items-center rounded-full border-2 border-white px-4 py-2 text-[0.8125rem] font-bold shadow-[0_3px_0_rgba(25,21,16,0.18),0_8px_18px_-8px_rgba(25,21,16,0.35)] transition-[rotate,scale] duration-300 hover:scale-105",
        tones[tone],
        className,
      )}
      style={{ rotate: `${rotate}deg` }}
    >
      {children}
    </span>
  );
}

/** Sticky note. */
export function Note({ children, tone = "butter", rotate = -2, className, tape = true }: { children: React.ReactNode; tone?: Tone; rotate?: number; className?: string; tape?: boolean }) {
  return (
    <div className={cn("relative p-6 lift md:p-8", tones[tone], className)} style={{ rotate: `${rotate}deg` }}>
      {tape && <Tape className="-top-3 -left-4" rotate={-35} />}
      {children}
    </div>
  );
}

/** Wobbly hand-drawn rectangle that fills its (relative) parent. */
export function SketchBox({ color = "var(--color-orange)", className, strokeWidth = 2 }: { color?: string; className?: string; strokeWidth?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 400 200" preserveAspectRatio="none" className={cn("draw draw-lg pointer-events-none absolute inset-0 h-full w-full overflow-visible", className)}>
      <path
        d="M4 8 C 120 2, 280 4, 396 6 C 398 60, 395 140, 397 192 C 280 196, 120 198, 6 195 C 3 140, 5 60, 2 10"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Little hand-drawn arrow. `dir` is where it points. */
export function Arrow({ className, dir = "up-right" }: { className?: string; dir?: "up-right" | "up-left" | "right" | "down" }) {
  const d = {
    "up-right": "M4 36 L 34 6 M 18 5 L 35 5 L 35 21",
    "up-left": "M36 36 L 6 6 M 22 5 L 5 5 L 5 21",
    right: "M2 22 C 14 14, 26 26, 38 18 M 30 12 L 39 18 L 31 25",
    down: "M20 2 C 14 14, 26 24, 20 38 M 13 30 L 20 39 L 27 31",
  }[dir];
  return (
    <svg aria-hidden viewBox="0 0 40 40" className={cn("draw pointer-events-none", className)}>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Double hand-drawn underline. */
export function Underline({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 80 10" className={cn("draw pointer-events-none", className)}>
      <path d="M6 3 C 30 1, 52 2, 76 3 M 10 8 C 32 6, 50 7, 70 8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/** Long, gentle pencil curve used between sections. */
export function Curve({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className={cn("draw draw-lg pointer-events-none block h-16 w-full", className)}>
      <path d="M0 76 C 400 10, 1000 -10, 1440 46" fill="none" stroke="#b9ab95" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Hand-lettered section kicker: "about me!", "explore my work!" */
export function Kicker({ children, className, underline = true }: { children: React.ReactNode; className?: string; underline?: boolean }) {
  return (
    <p className={cn("hand relative inline-block text-2xl leading-none text-ink md:text-[1.75rem]", className)}>
      {children}
      {underline && <Underline className="absolute -bottom-3 left-1/2 w-16 -translate-x-1/2 text-ink" />}
    </p>
  );
}

export function Smiley({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <circle cx="50" cy="50" r="47" fill="var(--color-yellow)" stroke="var(--color-ink)" strokeWidth="3" />
      <rect x="34" y="28" width="9" height="22" rx="4.5" fill="var(--color-ink)" />
      <rect x="57" y="28" width="9" height="22" rx="4.5" fill="var(--color-ink)" />
      <circle cx="26" cy="62" r="7" fill="#f28b6b" />
      <circle cx="74" cy="62" r="7" fill="#f28b6b" />
      <path d="M29 63 C 38 78, 62 78, 71 63" fill="none" stroke="var(--color-ink)" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}

export function Target({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="18" fill="var(--color-green)" stroke="var(--color-ink)" strokeWidth="2" />
      <circle cx="20" cy="20" r="11" fill="#fff" />
      <circle cx="20" cy="20" r="5.5" fill="var(--color-green)" />
    </svg>
  );
}

export function Flower({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse key={i} cx="20" cy="9" rx="5" ry="9" fill="var(--color-pink)" transform={`rotate(${i * 45} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="4" fill="var(--color-ink)" />
    </svg>
  );
}

export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <path d="M20 2 C 22 14, 26 18, 38 20 C 26 22, 22 26, 20 38 C 18 26, 14 22, 2 20 C 14 18, 18 14, 20 2 Z" fill="var(--color-yellow)" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

/** Polaroid frame with tape and a handwritten caption. */
export function Polaroid({ children, caption, rotate = -4, className, tapes = ["peri", "butter"] }: { children: React.ReactNode; caption?: string; rotate?: number; className?: string; tapes?: ("white" | "peri" | "butter" | "blush" | "mint")[] }) {
  return (
    <figure className={cn("relative bg-white p-3 pb-2 lift", className)} style={{ rotate: `${rotate}deg` }}>
      {tapes[0] && <Tape tone={tapes[0]} className="-top-3 -left-5" rotate={-35} />}
      {tapes[1] && <Tape tone={tapes[1]} className="-top-3 -right-5" rotate={38} />}
      <div className="relative overflow-hidden">{children}</div>
      {caption && <figcaption className="hand pt-2 text-center text-lg text-ink/80">{caption}</figcaption>}
    </figure>
  );
}
