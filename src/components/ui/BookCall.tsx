"use client";

import { contact } from "@/content/site";
import { track } from "@/lib/track";

const NS = "booking";
const SCRIPT = "https://app.cal.com/embed/embed.js";

type CalApi = ((...args: unknown[]) => void) & { q?: unknown[]; ns?: Record<string, CalApi>; loaded?: boolean };
declare global {
  interface Window {
    Cal?: CalApi;
  }
}

let ready: Promise<boolean> | null = null;

/** Loads Cal.com's pop-up script the first time it's needed. Resolves false if it can't load. */
function loadCal(): Promise<boolean> {
  if (ready) return ready;
  ready = new Promise<boolean>((resolve) => {
    const w = window;
    // Cal.com's standard queueing stub: calls made before the script arrives are replayed by it.
    const cal: CalApi =
      w.Cal ??
      function (...args: unknown[]) {
        const c = w.Cal!;
        if (args[0] === "init") {
          const api: CalApi = (...a: unknown[]) => void api.q!.push(a);
          api.q = [];
          const name = args[1];
          if (typeof name === "string") {
            c.ns![name] = c.ns![name] ?? api;
            c.ns![name].q!.push(args);
            c.q!.push(["initNamespace", name]);
          } else c.q!.push(args);
          return;
        }
        c.q!.push(args);
      };
    cal.ns = cal.ns ?? {};
    cal.q = cal.q ?? [];
    w.Cal = cal;

    const s = document.createElement("script");
    s.src = SCRIPT;
    s.async = true;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.head.appendChild(s);
    setTimeout(() => resolve(false), 4000);

    cal("init", NS, { origin: "https://app.cal.com" });
    cal.ns[NS]("ui", { hideEventTypeDetails: false, layout: "month_view" });
  });
  return ready;
}

/** cal.com/name/event → name/event */
const calPath = () => new URL(contact.calUrl).pathname.replace(/^\//, "");

/**
 * "Book a call". Opens the Cal.com calendar in a pop-up over the page.
 * It is a real link, so it still works with JavaScript off or if the pop-up can't load.
 */
export function BookCall({ className, where, children = "Book a call" }: { className?: string; where: string; children?: React.ReactNode }) {
  return (
    <a
      href={contact.calUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onPointerEnter={() => void loadCal()}
      onFocus={() => void loadCal()}
      onTouchStart={() => void loadCal()}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return; // let people open a new tab on purpose
        e.preventDefault();
        track("book_call", { where });
        loadCal().then((ok) => {
          if (ok && window.Cal?.ns?.[NS]) window.Cal.ns[NS]("modal", { calLink: calPath(), config: { layout: "month_view" } });
          else window.location.assign(contact.calUrl);
        });
      }}
    >
      {children}
    </a>
  );
}
