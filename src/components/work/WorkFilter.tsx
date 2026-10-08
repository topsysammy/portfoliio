"use client";

import { useEffect, useState } from "react";
import type { Project, ProjectType } from "@/content/types";
import { typeLabels } from "@/content/projects";
import { tornPath } from "@/components/doodle/Doodles";
import { FolderCard } from "./FolderCard";
import { track } from "@/lib/track";
import { cn } from "@/lib/cn";

type Filter = "all" | ProjectType;
const filters: { id: Filter; tone: string }[] = [
  { id: "all", tone: "bg-ink text-white" },
  { id: "vibecoded", tone: "bg-blue text-white" },
  { id: "website", tone: "bg-green text-ink" },
  { id: "case-study", tone: "bg-yellow text-ink" },
  { id: "experiment", tone: "bg-pink text-ink" },
];

/** Torn-label filter. No reload; the URL keeps ?type= so it can be shared. */
export function WorkFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>("all");

  useEffect(() => {
    const t = new URLSearchParams(location.search).get("type") as Filter | null;
    if (t && filters.some((f) => f.id === t)) setActive(t);
  }, []);

  const choose = (f: Filter) => {
    setActive(f);
    const url = new URL(location.href);
    if (f === "all") url.searchParams.delete("type");
    else url.searchParams.set("type", f);
    history.replaceState(null, "", url);
    track("filter_change", { filter: f });
  };

  // "Applications" lists the case studies first (they are apps too), then the built apps.
  const inFilter = (f: Filter): Project[] =>
    f === "all"
      ? projects
      : f === "vibecoded"
        ? [...projects.filter((p) => p.projectType === "case-study"), ...projects.filter((p) => p.projectType === "vibecoded")]
        : projects.filter((p) => p.projectType === f);
  const visible = inFilter(active);
  const count = (f: Filter) => inFilter(f).length;

  return (
    <>
      <div role="toolbar" aria-label="Filter work" className="flex flex-wrap gap-3">
        {filters.filter((f) => count(f.id) > 0).map((f, i) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={active === f.id}
            onClick={() => choose(f.id)}
            style={{ clipPath: tornPath(i + 3, 6), rotate: `${i % 2 ? 1.5 : -1.5}deg` }}
            className={cn(
              "px-6 py-3 text-lg font-semibold tracking-tight transition-[opacity,scale] duration-200 md:text-xl",
              f.tone,
              active === f.id ? "scale-105" : "opacity-45 hover:opacity-80",
            )}
          >
            {f.id === "all" ? "All" : typeLabels[f.id]} <span className="mono text-xs">{count(f.id)}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>
      <ul className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-2">
        {visible.map((p) => (
          <li key={p.slug} data-reveal>
            <FolderCard project={p} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </>
  );
}
