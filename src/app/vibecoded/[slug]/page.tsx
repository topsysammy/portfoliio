import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { byType, getProject } from "@/content/projects";
import Image from "next/image";
import { Copy, Entry, MoreProjects, ProjectHeader, Taped } from "@/components/work/CaseStudy";
import { BuildProcess } from "@/components/home/BuildProcess";
import { Note } from "@/components/doodle/Doodles";
import { IconArrow } from "@/components/doodle/Icons";
import { LetsTalk } from "@/components/layout/LetsTalk";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return byType("vibecoded").filter((p) => !!p.vibecode).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${p.tagline}`,
    description: p.description,
    alternates: { canonical: `/vibecoded/${p.slug}` },
    openGraph: { title: `${p.title} — ${p.tagline}`, description: p.description, url: `/vibecoded/${p.slug}`, type: "article" },
  };
}

function TryIt({ url, slug, label = "Try it" }: { url?: string; slug: string; label?: string }) {
  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" data-track="live_demo_click" data-track-label={slug} className="mono group inline-flex h-14 items-center gap-4 bg-ink pr-7 pl-2 text-sm font-bold text-white">
      <span className="grid size-10 place-items-center bg-blue"><IconArrow className="size-4" /></span>
      {label}
    </a>
  ) : (
    <span className="mono inline-flex h-14 items-center border-2 border-dashed border-ink/40 px-7 text-sm font-bold text-muted">Live demo coming soon</span>
  );
}

export default async function VibecodedProjectPage({ params }: Params) {
  const p = getProject((await params).slug);
  if (!p || p.projectType !== "vibecoded" || !p.vibecode) notFound();
  const v = p.vibecode;

  return (
    <>
      <article className="ruled overflow-x-clip">
        <ProjectHeader
          project={p}
          meta={[
            ["Role", p.role],
            ["AI tools", v.aiTools.join(", ")],
            ["Technology", v.tech.join(", ")],
            ["Status", p.status],
          ]}
          actions={
            <>
              <TryIt url={p.liveUrl} slug={p.slug} />
              {p.githubUrl && (
                <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" data-track="github_click" data-track-label={p.slug} className="mono border-b-2 border-ink pb-1 text-sm font-bold">
                  GitHub ↗
                </a>
              )}
            </>
          }
        />

        <Entry id="problem" title="the problem">
          <p className="text-2xl leading-snug font-medium tracking-tight text-ink md:text-[1.75rem]">
            <Copy>{v.problem}</Copy>
          </p>
        </Entry>

        <Entry id="product" title="the product" wide>
          <div className="grid gap-6 md:grid-cols-2">
            <Note tone="peri" rotate={-1.5}>
              <p className="mono text-xs font-bold">What it is</p>
              <p className="mt-3 text-xl leading-relaxed">{v.whatItIs}</p>
            </Note>
            <Note tone="butter" rotate={1.5}>
              <p className="mono text-xs font-bold">What I built</p>
              <p className="mt-3 text-xl leading-relaxed">{v.whatIBuilt}</p>
            </Note>
          </div>
        </Entry>

        {p.gallery?.map((g) => (
          <div key={g.src} className="wrap pb-10">
            <Taped className="mx-auto max-w-5xl">
              <Image src={g.src} alt={g.alt} width={g.width} height={g.height} sizes="(min-width: 1024px) 1024px, 100vw" className="h-auto w-full" />
            </Taped>
          </div>
        ))}

        <Entry id="build" title="how i built it" wide>
          <BuildProcess steps={v.story} />
        </Entry>

        <section aria-label="Live demo" className="wrap py-16">
          <div className="mx-auto max-w-4xl rounded-[3px_3px_48px_3px/3px_3px_14px_3px] border-2 border-ink bg-yellow px-6 py-14 text-center shadow-[10px_12px_0_var(--color-ink)] md:py-20">
            <p className="hand text-3xl">don&apos;t take my word for it...</p>
            <p className="pixel mt-4 text-[clamp(3.5rem,9vw,6.5rem)]">Click around</p>
            <div className="mt-8 flex justify-center">
              <TryIt url={p.liveUrl} slug={`${p.slug}:footer`} label={`Try ${p.title}`} />
            </div>
          </div>
        </section>
      </article>
      <MoreProjects current={p.slug} />
      <LetsTalk />
    </>
  );
}
