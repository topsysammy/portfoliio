import type { Metadata } from "next";
import { aboutProcess, contact, currently, experience, stack } from "@/content/site";
import { Arrow, Note, Polaroid, SketchBox, Sticker, Torn, type Tone } from "@/components/doodle/Doodles";
import { IconBolt, IconDiamond, IconGrid, IconStar } from "@/components/doodle/Icons";
import { Portrait } from "@/components/ui/Portrait";
import { LetsTalk } from "@/components/layout/LetsTalk";

export const metadata: Metadata = {
  title: "About",
  description: "Temitope Samuel is a product designer and design engineer who combines UX thinking, visual design and AI-assisted development.",
  alternates: { canonical: "/about" },
};

const tabs = [
  { id: "bio", label: "Main bio", bg: "bg-yellow text-ink", Icon: IconStar },
  { id: "story", label: "How I work", bg: "bg-pink text-ink", Icon: IconDiamond },
  { id: "tools", label: "Tools", bg: "bg-green text-ink", Icon: IconGrid },
  { id: "work", label: "Work", bg: "bg-blue text-white", Icon: IconBolt },
];

const principles: { title: string; body: string; aside: string; tone: Tone }[] = [
  { title: "Start with the problem", body: "Before I open a design tool, I want to know what we're actually solving, who has the problem and why it matters.", aside: "questions before pixels.", tone: "peri" },
  { title: "Design it properly", body: "Flows, structure, states and the details people notice. A clear interface beats a clever one.", aside: "obvious > clever.", tone: "butter" },
  { title: "Then build it", body: "With AI-assisted development I take the design all the way to something people can open, click and use.", aside: "ship it, then iterate!", tone: "mint" },
];

function Section({ id, label, tone, color, children }: { id: string; label: string; tone: Tone; color: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-t`} className="scroll-mt-24 py-12 md:py-16">
      <h2 id={`${id}-t`}>
        <Torn tone={tone} seed={id.length + 7} className="mono px-4 py-2 text-base font-bold" style={{ rotate: "-2deg" }}>
          {label}
        </Torn>
      </h2>
      <div className="relative mt-6 p-6 md:p-10">
        <SketchBox color={color} strokeWidth={1.6} />
        {children}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <div className="ruled relative pt-16 pb-16 [--paper:var(--color-surface)] md:pt-24">
        {/* Side tabs (desktop) */}
        <nav aria-label="About sections" className="fixed top-1/3 left-0 z-30 hidden flex-col gap-3 xl:flex">
          {tabs.map(({ id, label, bg, Icon }) => (
            <a key={id} href={`#${id}`} className={`mono flex w-36 items-center gap-2 rounded-r-lg border-2 border-l-0 border-ink py-2.5 pr-4 pl-4 text-[0.6875rem] font-bold shadow-[3px_3px_0_var(--color-ink)] transition-transform hover:translate-x-1 ${bg}`}>
              <Icon className="size-3" /> {label}
            </a>
          ))}
        </nav>

        <div className="wrap max-w-5xl">
          <h1 className="pixel text-[clamp(5rem,15vw,11rem)]">About</h1>

          <Section id="bio" label="Main bio" tone="yellow" color="var(--color-yellow)">
            <div className="grid gap-10 md:grid-cols-[1fr_15rem]">
              <div>
                <p className="hand text-[1.75rem] leading-[1.5] md:text-[2rem]">
                  I&apos;m a product designer who enjoys making complicated things feel simple. ✨ I care about how products work, how they look and, increasingly,
                  how quickly I can turn an idea into something people can actually use. 🎨
                </p>
                <p className="mt-6 text-lg leading-relaxed text-ink/80">
                  I design in Figma, then use AI-assisted development to take the design all the way to a working product, without losing the craft along the way.
                  Product design and building aren&apos;t two careers for me. They&apos;re one workflow: think, design, build, ship.
                </p>
              </div>
              <div className="relative mx-auto w-56 md:w-full">
                <Polaroid caption="2026" rotate={4}>
                  <Portrait priority />
                </Polaroid>
                <div className="mt-4 flex items-center gap-2 md:-ml-10">
                  <Arrow dir="up-right" className="size-8" />
                  <Sticker tone="yellow" rotate={-3}>Temitope</Sticker>
                </div>
              </div>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Note tone="butter" rotate={-1}>
                <p className="mono text-xs font-bold">Currently</p>
                <p className="mt-2 leading-relaxed">{currently}</p>
              </Note>
              <Note tone="butter" rotate={1.5} className="md:mt-10">
                <p className="mono text-xs font-bold">How I work</p>
                <p className="hand mt-2 text-2xl">{aboutProcess.join(" → ")}</p>
              </Note>
            </div>
          </Section>

          <Section id="story" label="How I work" tone="pink" color="var(--color-pink)">
            <ol className="space-y-12">
              {principles.map((pr, i) => (
                <li key={pr.title} data-reveal className="grid items-center gap-6 md:grid-cols-[minmax(0,26rem)_1fr]">
                  <Note tone={pr.tone} rotate={[-1.5, 1, -1][i]}>
                    <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{pr.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink/80">{pr.body}</p>
                  </Note>
                  <p className="hand flex items-center gap-3 text-2xl md:text-[1.75rem]">
                    <Arrow dir="right" className="size-10 shrink-0" /> {pr.aside}
                  </p>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="tools" label="Tools" tone="green" color="var(--color-green)">
            <dl className="grid gap-8 md:grid-cols-3">
              {Object.entries(stack).map(([group, tools], gi) => (
                <div key={group}>
                  <dt className="mono text-xs font-bold">{group}</dt>
                  <dd className="mt-4 flex flex-wrap gap-2">
                    {tools.map((t, i) => (
                      <Torn key={t} tone={(["mint", "butter", "peri"] as Tone[])[gi]} seed={gi * 10 + i} className="px-4 py-2 font-semibold">
                        {t}
                      </Torn>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section id="work" label="Work" tone="blue" color="var(--color-blue)">
            <p className="mb-6">
            <a href={contact.cvUrl} download data-track="cv_download" data-track-label="about" className="mono inline-flex h-12 items-center bg-ink px-5 text-sm font-bold text-white transition-[translate,box-shadow] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--color-blue)]">
              Download CV ↓
            </a>
            </p>
            <ul className="divide-y divide-ink/10">
              {experience.map((e) => (
                <li key={e.role + e.period} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-5">
                  <i className="size-3 bg-blue" aria-hidden />
                  <span className="text-lg font-semibold">{e.role}</span>
                  <span className="text-muted">{e.org}</span>
                  <span className="mono ml-auto bg-blue px-3 py-1.5 text-[0.6875rem] font-bold text-white">{e.period}</span>
                  <p className="w-full pl-7 text-[0.9375rem] text-ink/70">{e.note}</p>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
      <LetsTalk />
    </>
  );
}
