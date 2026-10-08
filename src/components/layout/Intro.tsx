import { IntroSkip } from "./IntroSkip";

const lines = ["Hi there!", "Let's build something."];
const START = [0.15, 0.95]; // seconds each bubble starts typing
const STEP = 0.045; // seconds between letters

/**
 * Intro scene: a speech bubble types a greeting, swaps to a second line,
 * then the paper overlay fades away (about 2.7s, CSS only).
 *
 * Shown once per visit. An inline script in <head> adds `no-intro` to <html>
 * on later page views and for reduced-motion users, so it never flashes.
 */
export function Intro() {
  return (
    <div id="intro" aria-hidden className="intro ruled fixed inset-0 z-[80] grid place-items-center [--paper:var(--color-surface)]">
      {lines.map((text, b) => {
        const words = text.split(" ");
        return (
          <span
            key={text}
            className={`intro-b${b + 1} col-start-1 row-start-1 mx-4 rounded-2xl rounded-tl-none border-2 border-ink bg-yellow px-5 py-3 text-2xl leading-[1.1] font-medium shadow-[4px_4px_0_var(--color-ink)] sm:text-3xl md:text-[2.5rem]`}
          >
            {words.map((word, w) => {
              const offset = words.slice(0, w).join(" ").length + (w ? 1 : 0); // letters typed before this word
              return (
                <span key={w} className="whitespace-nowrap">
                  {Array.from(word).map((ch, i) => (
                    <span key={i} className="intro-char inline-block" style={{ animationDelay: `${(START[b] + (offset + i) * STEP).toFixed(3)}s` }}>
                      {ch}
                    </span>
                  ))}
                  {w < words.length - 1 && " "}
                </span>
              );
            })}
          </span>
        );
      })}
      <IntroSkip />
    </div>
  );
}

/** Runs before first paint: decide whether the intro plays, and let any key or tap skip it. */
export const introScript = `try{var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches||sessionStorage.getItem('intro-seen')){d.classList.add('no-intro')}else{sessionStorage.setItem('intro-seen','1');var s=function(){var i=document.getElementById('intro');if(i)i.classList.add('intro-skip')};addEventListener('keydown',s,{once:true});addEventListener('pointerdown',s,{once:true})}}catch(e){}`;
