import { cn } from "@/lib/cn";

/**
 * Device frames. Everything inside a frame is sized in `em`, and the frame
 * sets its font-size from its own width (container query units), so mocked
 * UIs scale crisply at any size without images.
 */

export function PhoneFrame({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={cn("@container relative aspect-[9/19]", className)} style={style}>
      <div className="h-full w-full rounded-[13cqw] bg-ink p-[2.6cqw] shadow-[0_30px_60px_-20px_rgba(17,17,17,0.45)]">
        <div className="relative h-full w-full overflow-hidden rounded-[10.5cqw] bg-paper text-[4.6cqw] text-ink">
          <div aria-hidden className="absolute top-[2.2%] left-1/2 z-10 h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-ink" />
          {children}
        </div>
      </div>
    </div>
  );
}

export function BrowserFrame({ children, url, className, dark }: { children: React.ReactNode; url?: string; className?: string; dark?: boolean }) {
  return (
    <div className={cn("@container", className)}>
    <div
      className={cn(
        "overflow-hidden rounded-[1.2cqw] border shadow-[0_30px_70px_-30px_rgba(17,17,17,0.35)]",
        dark ? "border-white/10 bg-ink-2" : "border-ink/10 bg-paper",
      )}
    >
      <div className={cn("flex items-center gap-[1cqw] border-b px-[1.6cqw] py-[1.1cqw]", dark ? "border-white/10" : "border-ink/8 bg-[#FAFAF8]")}>
        <span className="flex gap-[0.6cqw]" aria-hidden>
          <i className="size-[1cqw] min-h-1.5 min-w-1.5 rounded-full bg-[#FF5F57]" />
          <i className="size-[1cqw] min-h-1.5 min-w-1.5 rounded-full bg-[#FEBC2E]" />
          <i className="size-[1cqw] min-h-1.5 min-w-1.5 rounded-full bg-[#28C840]" />
        </span>
        {url && (
          <span
            className={cn(
              "mx-auto truncate rounded-full px-[2.5cqw] py-[0.35cqw] font-mono text-[max(1.15cqw,8px)]",
              dark ? "bg-white/8 text-white/60" : "bg-ink/5 text-muted",
            )}
          >
            {url}
          </span>
        )}
        <span className="w-[4cqw]" />
      </div>
      <div className="relative text-[1.6cqw]">{children}</div>
    </div>
    </div>
  );
}

/** A Figma-like canvas: layers rail, a selected frame with handles. */
export function FigmaFrame({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("@container", className)}>
    <div className="overflow-hidden rounded-xl border border-ink/10 bg-[#2C2C2C] text-[3.4cqw] text-white/80 shadow-[0_24px_60px_-24px_rgba(17,17,17,0.5)]">
      <div className="flex items-center gap-[1.5em] border-b border-white/10 px-[1em] py-[0.7em] font-mono text-[0.75em]">
        <span className="text-accent">◆</span>
        <span>Frame</span>
        <span className="text-white/40">Design</span>
        <span className="ml-auto text-white/40">100%</span>
      </div>
      <div className="flex">
        <div className="w-[28%] space-y-[0.55em] border-r border-white/10 p-[0.8em] font-mono text-[0.7em] text-white/55">
          <p className="text-white/85">▾ Home</p>
          <p className="pl-[1em]">▸ Header</p>
          <p className="rounded bg-[#0C8CE9]/30 pl-[1em] text-white">▸ Card</p>
          <p className="pl-[1em]">▸ List</p>
          <p className="pl-[1em]">▸ Nav</p>
        </div>
        <div className="relative flex-1 bg-[#1E1E1E] p-[1.4em]">{children}</div>
      </div>
    </div>
    </div>
  );
}

/** Selection box with corner handles, Figma style. */
export function Selection({ children, label, className }: { children: React.ReactNode; label?: string; className?: string }) {
  return (
    <div className={cn("relative outline outline-[1.5px] outline-[#0C8CE9]", className)}>
      {label && (
        <span className="absolute -top-[1.6em] left-0 rounded-sm bg-[#0C8CE9] px-[0.4em] py-[0.1em] font-mono text-[0.6em] text-white">{label}</span>
      )}
      {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((p) => (
        <i key={p} aria-hidden className={cn("absolute size-2 border border-[#0C8CE9] bg-white", p)} />
      ))}
      {children}
    </div>
  );
}

export function CodeFragment({ className }: { className?: string }) {
  return (
    <div className={cn("@container", className)}>
    <div className="overflow-hidden rounded-xl bg-ink text-[3.6cqw] shadow-[0_24px_60px_-24px_rgba(17,17,17,0.6)]">
      <div className="flex items-center justify-between border-b border-white/10 px-[1em] py-[0.6em] font-mono text-[0.72em] text-white/45">
        <span>MarketList.tsx</span>
        <span className="text-accent">● building</span>
      </div>
      <pre className="overflow-hidden p-[1em] font-mono text-[0.78em] leading-[1.65] text-white/70">
        <code>
          <span className="text-white/35">{"// from the Figma frame →"}</span>
          {"\n"}
          <span className="text-[#FF9E7A]">export function</span> <span className="text-white">List</span>() {"{"}
          {"\n  "}
          <span className="text-[#FF9E7A]">return</span> (
          {"\n    "}&lt;<span className="text-[#9ED8C3]">Card</span> tone=<span className="text-[#F5D78E]">&quot;warm&quot;</span>&gt;
          {"\n      "}&lt;<span className="text-[#9ED8C3]">Items</span> /&gt;
          {"\n    "}&lt;/<span className="text-[#9ED8C3]">Card</span>&gt;
          {"\n  "});
          {"\n"}
          {"}"}
        </code>
      </pre>
    </div>
    </div>
  );
}

export function StickyNote({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      style={style}
      className={cn(
        "rotate-[var(--r,-4deg)] bg-butter px-4 py-3 font-serif text-xl leading-tight text-ink shadow-[0_14px_30px_-14px_rgba(17,17,17,0.45)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
