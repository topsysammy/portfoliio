import type { Project } from "@/content/types";
import { hasDetailPage, projectHref } from "@/content/projects";

export const typeLabel: Record<Project["projectType"], string> = {
  "case-study": "Case study",
  website: "Website",
  vibecoded: "Application",
  experiment: "Experiment",
};

/** Where a project card should go, if anywhere. */
export function linkFor(p: Project): { href: string; external: boolean } | null {
  if (hasDetailPage(p)) return { href: projectHref(p), external: false };
  if (p.liveUrl) return { href: p.liveUrl, external: true };
  return null;
}

export const ctaFor = (p: Project) =>
  p.projectType === "vibecoded" ? "View build" : p.projectType === "website" ? (p.liveUrl ? "View website" : "Link coming soon") : "View project";
