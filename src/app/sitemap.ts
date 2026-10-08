import type { MetadataRoute } from "next";
import { hasDetailPage, projectHref, projects } from "@/content/projects";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/work", "/vibecoded", "/playground", "/playground/scratch", "/playground/doodle-catch", "/playground/kern-it", "/about", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const work = projects.filter(hasDetailPage).map((p) => ({
    url: `${site.url}${projectHref(p)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...pages, ...work];
}
