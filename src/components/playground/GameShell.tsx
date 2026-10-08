import Link from "next/link";
import { Kicker } from "@/components/doodle/Doodles";

/** Shared page frame for playground games: notebook paper, back link, title. */
export function GameShell({ kicker, title, children }: { kicker: string; title: string; children: React.ReactNode }) {
  return (
    <div className="ruled min-h-[calc(100svh-3.5rem)] pt-8 pb-20 [--paper:var(--color-surface)] md:pt-10">
      <div className="wrap">
        <Link href="/playground" className="mono text-xs font-bold underline-offset-4 hover:underline">
          ← Back to playground
        </Link>
        <header className="mt-6 mb-8 text-center">
          <Kicker underline={false}>{kicker}</Kicker>
          <h1 className="pixel mt-3 text-[clamp(3rem,9vw,5.5rem)]">{title}</h1>
        </header>
        {children}
      </div>
    </div>
  );
}

export const gameButton =
  "mono inline-flex h-12 items-center justify-center border-2 border-ink bg-yellow px-6 text-sm font-bold text-ink shadow-[4px_4px_0_var(--color-ink)] transition-[translate,box-shadow] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-ink)]";

/** Best score kept in this browser only. */
export const best = {
  read(key: string) {
    try {
      return Number(localStorage.getItem(key)) || 0;
    } catch {
      return 0;
    }
  },
  write(key: string, value: number) {
    try {
      localStorage.setItem(key, String(value));
    } catch {}
  },
};
