import Link from "next/link";
import { site } from "@/content/site";
import { Curve } from "@/components/doodle/Doodles";
import { Socials } from "./Socials";

const links = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Playground", href: "/playground" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="ruled overflow-hidden [--paper:var(--color-surface)]">
      <Curve />
      <div className="wrap grid gap-10 pt-10 pb-8 md:grid-cols-2 md:items-end">
        <div>
          <p className="pixel text-[clamp(3.5rem,8vw,5.5rem)]">{site.name}</p>
          <p className="mono mt-4 flex items-center gap-3 text-[0.8125rem] font-bold">
            <i className="size-2.5 rounded-full bg-blue" /> Product Designer &amp; Design Engineer
          </p>
        </div>
        <div className="flex flex-col gap-6 md:items-end">
          <nav aria-label="Footer">
            <ul className="mono flex flex-wrap gap-x-7 gap-y-3 text-[0.8125rem] font-bold">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:underline hover:decoration-2 hover:underline-offset-4">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Socials only={["LinkedIn", "Twitter", "GitHub", "Behance"]} />
        </div>
      </div>
      <div className="wrap flex flex-wrap items-center justify-between gap-3 pb-10 text-sm text-muted">
        <p>© 2026 {site.name}</p>
        <p className="mono rounded-full bg-kraft px-4 py-2 text-[0.6875rem] font-bold text-ink">✦ Designed in Figma · Built with AI</p>
      </div>
    </footer>
  );
}
