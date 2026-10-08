"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track, type TrackEvent } from "@/lib/track";

/**
 * One global observer for every `[data-reveal]` element plus delegated
 * analytics for any element carrying `data-track`. Keeps sections as
 * server components with zero per-section JS.
 */
export function ClientEffects() {
  const pathname = usePathname();

  useEffect(() => {
    // A fully clipped element never "intersects", so clip reveals are
    // triggered by observing their parent instead.
    const proxies = new Map<Element, Element[]>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const targets = proxies.get(e.target) ?? [e.target];
          targets.forEach((t) => t.classList.add("is-in"));
          proxies.delete(e.target);
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
    );
    const scan = () =>
      document.querySelectorAll("[data-reveal]:not(.is-in), [data-reveal-group]:not(.is-in), .draw:not(.is-in)").forEach((el) => {
        if ((el as HTMLElement).dataset.reveal === "clip" && el.parentElement) {
          const parent = el.parentElement;
          const list = proxies.get(parent) ?? [];
          if (!list.includes(el)) list.push(el);
          proxies.set(parent, list);
          io.observe(parent);
        } else io.observe(el);
      });
    scan();
    // Catch elements mounted later (e.g. filtered grids).
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-track]");
      if (!el) return;
      track(el.dataset.track as TrackEvent, { label: el.dataset.trackLabel ?? "", path: location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
