import { stack } from "@/content/site";
import { Kicker, tornPath } from "@/components/doodle/Doodles";

const tapes = ["bg-butter", "bg-mint", "bg-peri", "bg-blush"];

/** The tools I actually use, on strips of washi tape. */
export function Toolbox() {
  const tools = [...stack.Design, ...stack.AI, ...stack.Build];
  return (
    <section aria-labelledby="toolbox-title" className="ruled py-20 [--paper:var(--color-surface)] md:py-24">
      <div className="wrap text-center">
        <h2 id="toolbox-title">
          <Kicker underline={false}>my toolbox</Kicker>
        </h2>
        <ul className="mt-10 flex flex-wrap justify-center gap-4">
          {tools.map((t, i) => (
            <li
              key={t}
              data-reveal="pop"
              style={{ "--d": `${i * 50}ms`, clipPath: tornPath(i + 70, 8, 4), rotate: `${(i % 3) - 1}deg` } as React.CSSProperties}
              className={`${tapes[i % tapes.length]} min-w-36 px-8 py-4 text-xl font-bold tracking-tight opacity-90`}
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
