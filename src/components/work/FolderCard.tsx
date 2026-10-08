import Link from "next/link";
import type { Project } from "@/content/types";
import { ProjectCover } from "@/components/mock/ProjectCover";
import { linkFor, typeLabel } from "./meta";

/** Kraft-paper folder with the cover tucked inside. */
export function FolderCard({ project: p, headingLevel: H = "h3" }: { project: Project; headingLevel?: "h2" | "h3" }) {
  const link = linkFor(p);
  const inner = (
    <>
      <div className="relative flex h-14 w-[min(19rem,70%)] items-center gap-3 bg-kraft px-8 md:h-[4.5rem]" style={{ clipPath: "polygon(0 0, calc(100% - 4.5rem) 0, 100% 100%, 0 100%)" }}>
        <span className="mono flex items-center gap-3 text-sm font-bold md:text-base">
          <i className="size-2.5 rounded-full bg-ink" /> {p.year} · {typeLabel[p.projectType]}
        </span>
      </div>
      <div className="relative -mt-px bg-kraft p-4 md:p-5">
        <div className="overflow-hidden">
          <ProjectCover project={p} className="aspect-[16/10] w-full transition-transform duration-700 group-hover:scale-[1.03]" sizes="(min-width: 768px) 45vw, 100vw" />
        </div>
      </div>
      <div className="mt-6 text-center">
        <H className="text-3xl font-semibold tracking-[-0.03em] md:text-4xl">{p.title}</H>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">{p.description}</p>
        {!link && !p.showcaseOnly && <p className="mono mt-3 text-[0.6875rem] text-muted">Link coming soon</p>}
        {link && p.behanceUrl && (
          <p className="mono mt-4 inline-flex h-10 items-center border-2 border-ink bg-ink px-4 text-xs font-bold text-white">View project →</p>
        )}
      </div>
    </>
  );
  return (
    <article className="group">
      {link ? (
        <Link
          href={link.href}
          {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          data-track={p.projectType === "case-study" ? "case_study_click" : "project_click"}
          data-track-label={p.slug}
          className="block transition-transform duration-300 hover:-translate-y-1"
        >
          {inner}
        </Link>
      ) : (
        inner
      )}
      {link && !link.external && p.liveUrl && (
        <p className="mt-3 text-center">
          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" data-track="live_demo_click" data-track-label={p.slug} className="mono border-b-2 border-ink pb-0.5 text-xs font-bold hover:opacity-70">
            Try it live ↗
          </a>
        </p>
      )}
      {p.behanceUrl && (
        <p className="mt-3 text-center">
          <a
            href={p.behanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-track="social_click"
            data-track-label={`behance:${p.slug}`}
            className="mono border-b-2 border-ink pb-0.5 text-xs font-bold hover:opacity-70"
          >
            View on Behance ↗
          </a>
        </p>
      )}
    </article>
  );
}
