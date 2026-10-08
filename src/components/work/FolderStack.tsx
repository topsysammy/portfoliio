import Link from "next/link";
import type { Project } from "@/content/types";
import { ProjectCover } from "@/components/mock/ProjectCover";
import { Tape } from "@/components/doodle/Doodles";
import { IconArrow } from "@/components/doodle/Icons";
import { ctaFor, linkFor, typeLabel } from "./meta";
import { IconBehance } from "@/components/doodle/Icons";
import { cn } from "@/lib/cn";

const palette = [
  { bg: "bg-blue", text: "text-white", tape: "peri" as const },
  { bg: "bg-ink", text: "text-white", tape: "white" as const },
  { bg: "bg-yellow", text: "text-ink", tape: "butter" as const },
  { bg: "bg-pink", text: "text-ink", tape: "blush" as const },
  { bg: "bg-green", text: "text-ink", tape: "mint" as const },
];

/**
 * Coloured folders that stack on top of each other as you scroll.
 * Each tab sits further right so earlier folders stay labelled underneath.
 * On phones the folders are compacted to fit one screen so they can stack too;
 * on very short screens they fall back to a plain list.
 */
export function FolderStack({ projects }: { projects: Project[] }) {
  const n = projects.length;
  return (
    <div className="relative space-y-16 lg:space-y-24">
      {projects.map((p, i) => {
        const c = palette[i % palette.length];
        const link = linkFor(p);
        const tabW = 100 / Math.max(n, 3) + 4; // % of width
        const tabX = (100 - tabW) * (n > 1 ? i / (n - 1) : 0);
        const first = i === 0;
        const last = i === n - 1;
        return (
          <article key={p.slug} className="group sticky top-[4.5rem] lg:top-24 [@media(max-height:619px)]:max-lg:static">
            {/* Tab */}
            <div
              className={cn("relative -mb-px flex h-11 items-center justify-center gap-3 [--slant:0.9rem] md:h-[4.5rem] lg:[--slant:var(--slant-lg)]", n <= 5 ? "lg:px-10" : "", c.bg, c.text, "w-[var(--tw)] ml-[var(--tx)]", n > 5 ? "" : last ? "lg:justify-end" : first ? "lg:justify-start" : "")}
              style={
                {
                  "--slant-lg": n > 5 ? "2.25rem" : "4.5rem",
                  "--tw": `${tabW}%`,
                  "--tx": `${tabX}%`,
                  clipPath: first
                    ? "polygon(0 0, calc(100% - var(--slant)) 0, 100% 100%, 0 100%)"
                    : last
                      ? "polygon(var(--slant) 0, 100% 0, 100% 100%, 0 100%)"
                      : "polygon(var(--slant) 0, calc(100% - var(--slant)) 0, 100% 100%, 0 100%)",
                } as React.CSSProperties
              }
            >
              <span className={cn("mono font-bold whitespace-nowrap", n <= 5 ? "text-sm md:text-base" : "text-sm lg:text-xs")}>
                <span className="max-lg:hidden">{n <= 5 && "✦ "}Project </span>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Body */}
            <div className={cn("relative grid content-start gap-6 p-5 lg:content-normal max-lg:min-h-[min(calc(100svh-8rem),46rem)] md:gap-10 md:p-12 lg:min-h-[34rem] lg:grid-cols-2 lg:gap-12", c.bg, c.text)}>
              <div className="flex flex-col">
                <p className="mono flex items-center gap-3 text-xs font-bold md:text-sm">
                  <i className={cn("size-2.5 rounded-full", c.text === "text-white" ? "bg-white" : "bg-ink")} />
                  {p.year} · {typeLabel[p.projectType]}
                </p>
                <h3 className="mt-3 text-4xl font-semibold tracking-[-0.03em] md:mt-5 md:text-7xl">{p.title}</h3>
                <p className="mt-3 line-clamp-3 max-w-md leading-relaxed opacity-90 md:mt-5 md:line-clamp-none md:text-lg">{p.description}</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 md:mt-8 md:gap-x-6 md:gap-y-4">
                  {link ? (
                    /* Primary: the whole folder is clickable through this link's ::after */
                    <Link
                      href={link.href}
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      data-track={p.projectType === "case-study" ? "case_study_click" : "project_click"}
                      data-track-label={p.slug}
                      className="mono inline-flex h-11 w-fit items-center gap-2 border-2 border-ink bg-paper px-4 text-sm md:h-12 md:px-5 font-bold text-ink shadow-[4px_4px_0_var(--color-ink)] transition-[translate,box-shadow] after:absolute after:inset-0 after:content-[''] group-hover:-translate-y-0.5 group-hover:shadow-[6px_6px_0_var(--color-ink)]"
                    >
                      {ctaFor(p)} <IconArrow className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  ) : (
                    <span className="mono text-sm font-bold">{ctaFor(p)}</span>
                  )}
                  {link && !link.external && p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track="live_demo_click"
                      data-track-label={p.slug}
                      className="mono relative z-10 inline-flex items-center gap-2 border-b-2 border-current pb-1 text-sm font-bold hover:opacity-80"
                    >
                      Try it live <IconArrow className="size-3.5" />
                    </a>
                  )}
                  {p.behanceUrl && (
                    /* Secondary: sits above the folder-wide link */
                    <a
                      href={p.behanceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-track="social_click"
                      data-track-label={`behance:${p.slug}`}
                      className="mono relative z-10 inline-flex items-center gap-2 border-b-2 border-current pb-1 text-sm font-bold hover:opacity-80"
                    >
                      <IconBehance className="size-5" /> View on Behance <IconArrow className="size-3.5" />
                    </a>
                  )}
                </div>
                <ul className="mt-10 hidden flex-wrap gap-2 md:flex lg:mt-auto lg:pt-10">
                  {p.category.map((t) => (
                    <li
                      key={t}
                      className="mono bg-paper px-4 py-2.5 text-sm font-bold text-ink"
                      style={{ clipPath: "polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)" }}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative self-start">
                <Tape tone={c.tape} className="-top-2.5 -left-5" rotate={-8} />
                <Tape tone={c.tape} className="-top-2.5 -right-5" rotate={8} />
                <div className="border-4 border-paper bg-paper">
                  <ProjectCover project={p} className="aspect-[16/10] w-full md:aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.02]" sizes="(min-width: 1024px) 40vw, 100vw" />
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
