"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { Smiley } from "@/components/doodle/Doodles";
import { IconDiamond, IconGrid, IconHeart, IconPerson, IconStar } from "@/components/doodle/Icons";
import { Socials } from "./Socials";
import { cn } from "@/lib/cn";

const items = [
  { label: "Home", href: "/", Icon: IconStar },
  { label: "About", href: "/about", Icon: IconPerson },
  { label: "Work", href: "/work", Icon: IconGrid },
  { label: "Playground", href: "/playground", Icon: IconDiamond },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const active = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

  return (
    <>
      <a href="#main" className="mono sr-only z-[60] bg-ink px-4 py-3 text-xs text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
        Skip to content
      </a>
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur-sm">
        <nav aria-label="Primary" className="flex h-14 items-center pl-3 md:pl-5">
          <Link href="/" aria-label={`${site.name}, home`} className="mr-3 shrink-0 transition-transform hover:rotate-12 md:mr-4">
            <Smiley className="size-7" />
          </Link>

          <ul className="hidden h-full items-stretch lg:flex">
            {items.map(({ label, href, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active(href) ? "page" : undefined}
                  className={cn("mono flex h-full items-center gap-2 px-5 text-[0.8125rem] font-bold tracking-[0.12em] transition-colors", active(href) ? "bg-yellow" : "hover:bg-butter/60")}
                >
                  <Icon className="size-4" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center gap-3 pr-3">
            <Socials className="hidden sm:flex" />
            <Link
              href="/contact"
              data-track="contact_click"
              data-track-label="nav"
              className="mono hidden h-10 items-center gap-2 border-2 border-ink bg-paper px-5 text-[0.8125rem] font-bold tracking-[0.12em] transition-[background-color,translate,box-shadow] hover:-translate-y-0.5 hover:bg-yellow hover:shadow-[3px_3px_0_var(--color-ink)] lg:inline-flex"
            >
              <IconHeart className="size-4" /> Contact
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid size-10 place-items-center border-2 border-ink bg-paper lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden className="relative block h-3 w-4">
                <i className={cn("absolute left-0 h-[2px] w-full bg-ink transition-transform", open ? "top-1/2 rotate-45" : "top-0")} />
                <i className={cn("absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-ink transition-opacity", open && "opacity-0")} />
                <i className={cn("absolute left-0 h-[2px] w-full bg-ink transition-transform", open ? "top-1/2 -rotate-45" : "bottom-0")} />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div id="mobile-menu" hidden={!open} className="ruled fixed inset-x-0 top-14 bottom-0 z-40 flex flex-col px-5 pt-6 pb-8 [--paper:var(--color-surface)] lg:hidden">
        <ul className="space-y-3">
          {[...items, { label: "Contact", href: "/contact", Icon: IconHeart }].map(({ label, href, Icon }, i) => (
            <li key={href} style={{ rotate: `${i % 2 ? 1.5 : -1.5}deg` }}>
              <Link href={href} className={cn("flex items-center justify-between border-2 border-ink px-5 py-4 shadow-[4px_4px_0_var(--color-ink)]", active(href) ? "bg-yellow" : "bg-paper")}>
                <span className="pixel text-4xl">{label}</span>
                <Icon className="size-5" />
              </Link>
            </li>
          ))}
        </ul>
        <Socials className="mt-auto justify-center" size="lg" only={["LinkedIn", "Twitter", "Behance", "GitHub"]} />
      </div>
    </>
  );
}
