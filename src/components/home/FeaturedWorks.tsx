import Link from "next/link";
import { featured } from "@/content/projects";
import { FolderStack } from "@/components/work/FolderStack";
import { PageTitle } from "@/components/doodle/PageTitle";

export function FeaturedWorks() {
  // Homepage order. Featured projects not listed here follow at the end.
  const order = ["duba", "shoppa", "duba-website", "mealio", "picta", "morenikeji-collections"];
  const rank = (slug: string) => (order.indexOf(slug) === -1 ? order.length : order.indexOf(slug));
  const items = [...featured()].sort((a, b) => rank(a.slug) - rank(b.slug));
  return (
    <section id="work" aria-labelledby="featured-title" className="ruled py-24 [--paper:var(--color-surface)] md:py-32">
      <div className="wrap">
        <PageTitle kicker="explore my work!" title={<>Featured<br />works</>} size="xl" id="featured-title" />
        <p data-reveal className="mx-auto mt-10 w-fit max-w-md bg-butter px-6 py-3 text-center lift" style={{ rotate: "-2deg" }}>
          A collection of products, interfaces and experiments I&apos;ve designed and built.
        </p>
        <div className="mt-20 md:mt-24">
          <FolderStack projects={items} />
        </div>
        <div className="mt-16 text-center">
          <Link href="/work" className="mono inline-flex h-14 items-center border-2 border-ink bg-paper px-8 text-sm font-bold transition-[translate,box-shadow] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--color-ink)]">
            See all work →
          </Link>
        </div>
      </div>
    </section>
  );
}
