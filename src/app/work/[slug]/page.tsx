import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { byType, getProject, hasDetailPage } from "@/content/projects";
import { CaseStudy, MoreProjects } from "@/components/work/CaseStudy";
import { LetsTalk } from "@/components/layout/LetsTalk";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return byType("case-study").filter(hasDetailPage).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${p.tagline}`,
    description: p.description,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: `${p.title} — ${p.tagline}`, description: p.description, url: `/work/${p.slug}`, type: "article" },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const p = getProject((await params).slug);
  if (!p || p.projectType !== "case-study" || !hasDetailPage(p)) notFound();
  return (
    <>
      <CaseStudy project={p} />
      <MoreProjects current={p.slug} />
      <LetsTalk />
    </>
  );
}
