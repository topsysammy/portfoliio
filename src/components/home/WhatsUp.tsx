import { Curve, Kicker, Polaroid, SketchBox, Torn, type Tone } from "@/components/doodle/Doodles";
import { Portrait } from "@/components/ui/Portrait";

const tags: { label: string; tone: Tone; emoji: string }[] = [
  { label: "Product Design", tone: "yellow", emoji: "✨" },
  { label: "Prototyping", tone: "green", emoji: "🎨" },
  { label: "UX Research", tone: "pink", emoji: "🧩" },
  { label: "AI Vibecoding", tone: "blue", emoji: "⚡" },
  { label: "Design Systems", tone: "mint", emoji: "📐" },
  { label: "Web Design", tone: "butter", emoji: "👀" },
];

/** About intro: one centred column — story, skills, then the photo. */
export function WhatsUp() {
  return (
    <section aria-labelledby="whatsup-title" className="ruled relative overflow-hidden pb-24 md:pb-32">
      <Curve />
      <div className="wrap flex flex-col items-center text-center">
        <Kicker underline={false}>about me!</Kicker>

        <h2 id="whatsup-title" className="relative mt-8 inline-block px-6 py-2 text-4xl font-medium tracking-tight md:text-5xl">
          <SketchBox color="var(--color-ink)" strokeWidth={2} />
          what&apos;s up
        </h2>

        <p data-reveal className="hand mt-10 max-w-3xl text-[1.75rem] leading-[1.45] md:text-[2.125rem]">
          I&apos;m a product designer who enjoys making complicated things feel simple. ✨ I care about how products work, how they look and,
          increasingly, how quickly I can turn an idea into something people can actually use. 🎨
        </p>
        <p data-reveal className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
          I use design tools like Figma alongside AI-assisted coding to move from idea → interface → working product.
        </p>

        <ul className="mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5" aria-label="What I'm good at">
          {tags.map((t, i) => (
            <li key={t.label} data-reveal="pop" style={{ "--d": `${i * 70}ms` } as React.CSSProperties} className="flex gap-1">
              <Torn tone={t.tone} seed={i + 11} className="px-4 py-2 text-base font-semibold tracking-tight md:text-lg">
                {t.label}
              </Torn>
              <Torn tone={t.tone} seed={i + 31} className="px-2.5 text-base" depth={4}>
                <span aria-hidden>{t.emoji}</span>
              </Torn>
            </li>
          ))}
        </ul>

        {/* Photo */}
        <div className="mt-16 md:mt-20">
          <div data-reveal className="w-60 md:w-64">
            <Polaroid caption="2026" rotate={-3}>
              <Portrait />
            </Polaroid>
          </div>
        </div>
      </div>
    </section>
  );
}
