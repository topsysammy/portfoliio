import Image from "next/image";
import type { Project } from "@/content/types";
import { nextProject, projects, hasDetailPage } from "@/content/projects";
import { ProjectCover } from "@/components/mock/ProjectCover";
import { PhoneFrame } from "@/components/mock/Frames";
import { PaymentsScreen, SavingsScreen, ShoppingScreen } from "@/components/mock/Screens";
import { Arrow, Kicker, Note, Tape, Torn, type Tone } from "@/components/doodle/Doodles";
import { FolderCard } from "./FolderCard";
import { typeLabel } from "./meta";
import { IconArrow, IconBehance } from "@/components/doodle/Icons";
import { cn } from "@/lib/cn";

/* ───────────────────────────── Shared pieces ───────────────────────────── */

/** Optional copy: renders nothing when the text is missing. */
export function Copy({ children }: { children?: string }) {
  if (!children) return null;
  return <>{children}</>;
}

/** Image taped onto the page with an ink border. */
export function Taped({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <Tape className="-top-3 -left-5 w-28" rotate={-6} />
      <Tape className="-top-3 -right-5 w-28" rotate={6} />
      <div className="overflow-hidden border-[3px] border-ink bg-paper">{children}</div>
    </div>
  );
}

/** Narrow reading column with a handwritten heading, like a notebook entry. */
export function Entry({ title, id, children, wide }: { title: string; id: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <section id={id} aria-labelledby={`${id}-t`} className="wrap py-14 md:py-20">
      <div className={cn("mx-auto", wide ? "max-w-5xl" : "max-w-3xl")}>
        <h2 id={`${id}-t`} data-reveal>
          <Kicker underline={false} className="text-3xl md:text-4xl">
            {title}
          </Kicker>
        </h2>
        <div className="mt-8 text-lg leading-[1.75] text-ink/85">{children}</div>
      </div>
    </section>
  );
}

const metaTones: Tone[] = ["peri", "butter", "mint", "blush", "peri", "butter"];

/** Header shared by case studies and vibecoded builds. */
export function ProjectHeader({ project: p, meta, actions }: { project: Project; meta: [string, string | undefined][]; actions?: React.ReactNode }) {
  return (
    <>
      <header className="ruled pt-16 pb-14 [--paper:var(--color-surface)] md:pt-24">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_minmax(0,32rem)] lg:items-start">
          <div>
            <p className="mono flex flex-wrap items-center gap-3 text-sm font-bold">
              <i className="size-2.5 rounded-full bg-ink" /> {p.year} · {typeLabel[p.projectType]}
            </p>
            <h1 className="pixel mt-6 text-[clamp(4.5rem,12vw,9rem)]">{p.title}</h1>
            <p className="mt-6 max-w-lg text-xl leading-relaxed text-ink/80">{p.description}</p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {p.category.map((c) => (
                <li key={c} className="mono bg-kraft px-5 py-3 text-sm font-bold" style={{ clipPath: "polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 12px)" }}>
                  {c}
                </li>
              ))}
            </ul>
            {actions && <div className="mt-8 flex flex-wrap items-center gap-4">{actions}</div>}
          </div>
          <dl className="grid grid-cols-2 gap-4">
            {meta.filter(([, v]) => !!v).map(([k, v], i) => (
              <Torn as="div" key={k} tone={metaTones[i]} seed={i + 90} depth={9} className="!block px-6 py-5" style={{ rotate: `${i % 2 ? 1.2 : -1.2}deg` }}>
                <dt className="mono text-xs font-bold">{k}</dt>
                <dd className="mt-1.5 leading-snug text-ink/85">
                  <Copy>{v}</Copy>
                </dd>
              </Torn>
            ))}
          </dl>
        </div>
      </header>
      <div className="ruled pb-6">
        <div className="wrap">
          <Taped className="-mt-2">
            {p.coverImage ? (
              /* Real covers are shown whole, at their own proportions */
              <Image src={p.coverImage.src} alt={p.coverImage.alt} width={p.coverImage.width} height={p.coverImage.height} priority sizes="(min-width: 1280px) 1200px, 100vw" className="h-auto w-full" />
            ) : (
              <ProjectCover project={p} priority className="aspect-[4/3] w-full md:aspect-[21/10]" sizes="100vw" />
            )}
          </Taped>
        </div>
      </div>
    </>
  );
}

/** Secondary link out to the Behance version of a case study. */
export function BehanceLink({ project: p, where }: { project: Project; where: string }) {
  if (!p.behanceUrl) return null;
  return (
    <a
      href={p.behanceUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-track="social_click"
      data-track-label={`behance:${p.slug}:${where}`}
      className="mono inline-flex h-12 items-center gap-2 border-2 border-ink bg-paper px-5 text-sm font-bold transition-[translate,box-shadow] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--color-ink)]"
    >
      <IconBehance className="size-5" /> View on Behance <IconArrow className="size-3.5" />
    </a>
  );
}

/** "more projects": the next two projects as kraft folders. */
export function MoreProjects({ current }: { current: string }) {
  const first = nextProject(current);
  const pool = projects.filter((p) => hasDetailPage(p) && p.slug !== current && p.slug !== first.slug);
  const items = [first, pool[0]].filter(Boolean).filter((p) => p.slug !== current);
  if (!items.length) return null;
  return (
    <section aria-labelledby="more-t" className="ruled py-20 [--paper:var(--color-surface)] md:py-24">
      <div className="wrap">
        <h2 id="more-t">
          <Kicker underline={false} className="text-3xl">
            more projects
          </Kicker>
        </h2>
        <div className="mt-10 grid gap-x-10 gap-y-16 md:grid-cols-2">
          {items.map((p) => (
            <FolderCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Bullets({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="space-y-3">
      {items.map((t, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden className="mt-0.5 text-lg">✦</span>
          <span>
            <Copy>{t}</Copy>
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ───────────────────────────── Case study ───────────────────────────── */

export function CaseStudy({ project: p }: { project: Project }) {
  const cs = p.caseStudy ?? {};
  const Screen = { savings: SavingsScreen, payments: PaymentsScreen, shopping: ShoppingScreen }[p.mock.kind as "savings"];

  return (
    <article className="ruled overflow-x-clip">
      <ProjectHeader
        project={p}
        meta={[
          ["Role", p.role],
          ["Timeline", cs.overview?.timeline],
          ["Team", cs.overview?.team],
          ["Platform", cs.overview?.platform],
          ["Year", p.year],
          ["Tools", p.tools.join(", ")],
          ["Status", p.status],
        ]}
        actions={p.behanceUrl ? <BehanceLink project={p} where="header" /> : undefined}
      />

      {cs.overview?.summary && (
        <Entry id="overview" title="the idea">
          <p className="text-2xl leading-snug font-medium tracking-tight text-ink md:text-[1.75rem]">{cs.overview.summary}</p>
        </Entry>
      )}

      {cs.problem && (
        <Entry id="challenge" title="the challenge">
          <p className="text-2xl leading-snug font-medium tracking-tight text-ink md:text-[1.75rem]">
            <Copy>{cs.problem.statement}</Copy>
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {cs.problem.who && (
              <Note tone="peri" rotate={-1.5}>
                <p className="mono text-xs font-bold">Who has this problem</p>
                <p className="mt-3 leading-relaxed">
                  <Copy>{cs.problem.who}</Copy>
                </p>
              </Note>
            )}
            {cs.problem.why && (
              <Note tone="butter" rotate={1.5}>
                <p className="mono text-xs font-bold">Why it matters</p>
                <p className="mt-3 leading-relaxed">
                  <Copy>{cs.problem.why}</Copy>
                </p>
              </Note>
            )}
          </div>
        </Entry>
      )}

      {cs.problem?.points && (
        <section aria-label="Frustrations" className="wrap pb-6">
          <ul className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {cs.problem.points.map((pt, i) => (
              <li key={pt.title}>
                <Note tone={(["blush", "butter", "mint"] as Tone[])[i % 3]} rotate={[-1.5, 1, -1][i % 3]} className="h-full">
                  <p className="pixel text-4xl">0{i + 1}</p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight">{pt.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/80">{pt.body}</p>
                </Note>
              </li>
            ))}
          </ul>
          {cs.problem.quote && (
            <figure className="mx-auto mt-12 max-w-3xl">
              <blockquote className="hand flex items-start gap-3 text-3xl leading-snug">
                <Arrow dir="right" className="mt-1 size-10 shrink-0" />
                <span>“{cs.problem.quote.text}”</span>
              </blockquote>
              <figcaption className="mono mt-4 pl-14 text-xs font-bold">{cs.problem.quote.by}</figcaption>
            </figure>
          )}
        </section>
      )}

      {cs.process && (
        <Entry id="process" title="how it went" wide>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {cs.process.map((step) => (
              <li key={step.title} className="border-t-[3px] border-ink pt-4">
                <p className="mono text-[0.6875rem] font-bold">{step.when}</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed">{step.body}</p>
              </li>
            ))}
          </ol>
        </Entry>
      )}

      {cs.research && (
        <Entry id="research" title="what i found out">
          {cs.research.methods && (
            <ul className="flex flex-wrap gap-2">
              {cs.research.methods.map((m, i) => (
                <li key={i} className="mono bg-kraft px-4 py-2 text-xs font-bold">
                  <Copy>{m}</Copy>
                </li>
              ))}
            </ul>
          )}
          {cs.research.findings && (
            <ol className="mt-8 space-y-4">
              {cs.research.findings.map((f, i) => (
                <li key={i} className="flex gap-4">
                  <span className="pixel text-4xl leading-none">{i + 1}</span>
                  <span>
                    <Copy>{f}</Copy>
                  </span>
                </li>
              ))}
            </ol>
          )}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Note tone="blush" rotate={-1}>
              <p className="mono mb-4 text-xs font-bold">Pain points</p>
              <Bullets items={cs.research.painPoints} />
            </Note>
            <Note tone="mint" rotate={1.2}>
              <p className="mono mb-4 text-xs font-bold">User needs</p>
              <Bullets items={cs.research.userNeeds} />
            </Note>
          </div>
          {cs.research.insights?.map((ins, i) => (
            <p key={i} className="hand mt-10 flex items-start gap-3 text-3xl leading-snug text-ink">
              <Arrow dir="right" className="mt-1 size-10 shrink-0" />
              <span>
                <Copy>{ins}</Copy>
              </span>
            </p>
          ))}
        </Entry>
      )}

      {cs.strategy && (
        <Entry id="approach" title="my approach" wide>
          {cs.strategy.goals && (
            <div className="max-w-3xl">
              <p className="mono mb-4 text-xs font-bold">Product goals</p>
              <Bullets items={cs.strategy.goals} />
            </div>
          )}
          {cs.strategy.principles && (
            <ul className={cn("mt-12 grid gap-6", cs.strategy.principles.length === 4 ? "md:grid-cols-2" : "md:grid-cols-3")}>
              {cs.strategy.principles.map((pr, i) => (
                <li key={pr.title}>
                  <Note tone={(["peri", "butter", "mint", "blush"] as Tone[])[i % 4]} rotate={[-2, 1, -1, 1.5][i % 4]} className="h-full">
                    <h3 className="text-2xl font-semibold tracking-tight">{pr.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink/80">
                      <Copy>{pr.body}</Copy>
                    </p>
                  </Note>
                </li>
              ))}
            </ul>
          )}
          {cs.strategy.informationArchitecture && (
            <div className="mt-14">
              <p className="mono mb-4 text-xs font-bold">Information architecture</p>
              <div className="border-2 border-ink bg-paper p-6 shadow-[6px_6px_0_var(--color-ink)]">
                <p className="pixel mx-auto w-fit bg-yellow px-5 py-2 text-3xl">{p.title}</p>
                <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                  {cs.strategy.informationArchitecture.map((n) => (
                    <li key={n} className="border-2 border-dashed border-ink/40 px-3 py-3 text-center text-[0.9375rem]">
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          {cs.strategy.userFlow && (
            <div className="mt-14">
              <p className="mono mb-4 text-xs font-bold">Core user flow</p>
              <ol className="flex flex-col gap-3 md:flex-row md:items-center">
                {cs.strategy.userFlow.map((s, i, a) => (
                  <li key={s} className="flex items-center gap-3 md:flex-1">
                    <span className="flex-1 bg-kraft px-4 py-4 leading-tight">
                      <span className="mono mb-1 block text-[0.6875rem] font-bold">0{i + 1}</span>
                      {s}
                    </span>
                    {i < a.length - 1 && <Arrow dir="right" className="hidden size-7 shrink-0 md:block" />}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </Entry>
      )}

      {cs.showcase?.map((sec, i) => (
        <Entry key={sec.title} id={`show-${i}`} title={sec.heading} wide>
          <div className="max-w-3xl">
            <h3 className="mono text-xs font-bold">{sec.title}</h3>
            <p className="mt-3">{sec.body}</p>
          </div>
          {sec.points && (
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {sec.points.map((pt, k) => (
                <li key={pt.title} className="bg-kraft px-5 py-4">
                  <p className="mono text-[0.6875rem] font-bold">0{k + 1}</p>
                  <p className="mt-1 font-semibold">{pt.title}</p>
                  <p className="mt-1 text-base leading-relaxed text-ink/80">{pt.body}</p>
                </li>
              ))}
            </ul>
          )}
          <Taped className={cn("mt-10", sec.image.height > sec.image.width && "mx-auto max-w-xl")}>
            <Image src={sec.image.src} alt={sec.image.alt} width={sec.image.width} height={sec.image.height} sizes="(min-width: 1024px) 1024px, 100vw" className="h-auto w-full" />
          </Taped>
        </Entry>
      ))}

      {p.behanceUrl && (
        <div className="wrap flex flex-col items-center gap-4 pt-6 pb-20 text-center">
          <p className="hand text-2xl">the full case study is on Behance too</p>
          <BehanceLink project={p} where="footer" />
        </div>
      )}

      {cs.exploration?.stages && (
        <Entry id="exploration" title="sketching it out" wide>
          <ul className="grid gap-10 md:grid-cols-3 md:gap-6">
            {cs.exploration.stages.map((s, i) => (
              <li key={s.title}>
                <Taped>
                  <div className="flex aspect-[3/4] flex-col gap-3 bg-paper p-5" aria-hidden>
                    <i className="block h-3 w-1/2 rounded-full bg-ink/15" />
                    <div className={cn("flex-1", i === 0 ? "rotate-[-1.5deg] border-2 border-dashed border-ink/30" : "bg-ink/[0.07]")} />
                    <i className="block h-2 w-full rounded-full bg-ink/10" />
                    <i className="block h-2 w-3/4 rounded-full bg-ink/10" />
                    <div className="flex gap-2">
                      <i className="h-8 flex-1 rounded-full bg-ink/10" />
                      {i === 2 && <i className="h-8 flex-1 rounded-full bg-orange/70" />}
                    </div>
                  </div>
                </Taped>
                <p className="mono mt-5 text-xs font-bold">
                  0{i + 1} · {s.title}
                </p>
                <p className="mt-2 text-base leading-relaxed">
                  <Copy>{s.body}</Copy>
                </p>
              </li>
            ))}
          </ul>
        </Entry>
      )}

      {cs.visual && (
        <Entry id="interface" title="the interface" wide>
          <p className="max-w-3xl">
            <Copy>{cs.visual.notes}</Copy>
          </p>
          <Taped className="mt-10">
            <div className="no-scrollbar flex snap-x gap-6 overflow-x-auto px-6 py-12 md:justify-center md:gap-10 md:py-16" style={{ background: p.mock.tint }}>
              {(cs.visual.screens ?? []).map((name, i) => (
                <figure key={name} className={cn("w-[58vw] max-w-[15rem] shrink-0 snap-center", i === 1 && "md:-translate-y-6")}>
                  <PhoneFrame>
                    {i === 0 && Screen ? (
                      <Screen brand={p.mock.brand} />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-[0.6em] p-[1.5em] text-center">
                        <span className="text-[1.6em]" aria-hidden>◇</span>
                        <span className="text-[0.8em] font-medium">{name}</span>
                        <span className="text-[0.6em] text-muted">Add final screen</span>
                      </div>
                    )}
                  </PhoneFrame>
                  <figcaption className="hand mt-4 text-center text-xl">{name}</figcaption>
                </figure>
              ))}
            </div>
          </Taped>
        </Entry>
      )}

      {cs.prototype && (
        <Entry id="prototype" title="click through it" wide>
          {cs.prototype.embedUrl ? (
            <Taped>
              <iframe title={`${p.title} interactive prototype`} src={cs.prototype.embedUrl} loading="lazy" allowFullScreen className="aspect-[4/3] w-full md:aspect-video" />
            </Taped>
          ) : (
            <Taped>
              <div className="grid aspect-video place-items-center bg-paper p-6 text-center">
                <div>
                  <span aria-hidden className="mx-auto grid size-16 place-items-center rounded-full bg-yellow text-2xl">▶</span>
                  <p className="mt-4 text-muted">
                    <Copy>{cs.prototype.notes}</Copy>
                  </p>
                </div>
              </div>
            </Taped>
          )}
        </Entry>
      )}

      {cs.outcome && (
        <Entry id="results" title="the results" wide>
          <ul className="grid gap-5 md:grid-cols-3">
            {(
              [
                ["What was achieved", cs.outcome.achieved, "peri"],
                ["What I learned", cs.outcome.learned, "butter"],
                ["What I'd improve", cs.outcome.improve, "mint"],
              ] as [string, string[] | undefined, Tone][]
            ).map(([k, items, tone], i) => (
              <li key={k}>
                <Torn as="div" tone={tone} seed={i + 120} depth={10} className="!block h-full px-7 py-7">
                  <p className="mono mb-4 text-xs font-bold">{k}</p>
                  <Bullets items={items} />
                </Torn>
              </li>
            ))}
          </ul>
        </Entry>
      )}
    </article>
  );
}
