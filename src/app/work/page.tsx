import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { Kicker } from "@/components/doodle/Doodles";
import { WorkFilter } from "@/components/work/WorkFilter";
import { LetsTalk } from "@/components/layout/LetsTalk";

export const metadata: Metadata = {
  title: "Work",
  description: "Product design case studies, websites, vibecoded products and experiments by Temitope Samuel.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <div className="ruled pt-16 pb-24 [--paper:var(--color-surface)] md:pt-24 md:pb-32">
        <div className="wrap">
          <Kicker underline={false}>explore my work!</Kicker>
          <h1 className="pixel mt-6 mb-12 text-[clamp(4.5rem,13vw,10rem)]">All works</h1>
          <WorkFilter projects={projects} />
        </div>
      </div>
      <LetsTalk />
    </>
  );
}
