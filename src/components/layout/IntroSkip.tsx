"use client";

import { useEffect } from "react";

/**
 * Hides the intro once it has faded (skipping is wired in the head script).
 * The node is React-owned, so it must stay in the DOM: removing it breaks
 * React's reconciliation on the next client-side navigation.
 */
export function IntroSkip() {
  useEffect(() => {
    const el = document.getElementById("intro");
    if (!el) return;
    const done = (e: AnimationEvent) => e.target === el && el.classList.add("intro-done");
    el.addEventListener("animationend", done);
    return () => el.removeEventListener("animationend", done);
  }, []);
  return <span className="sr-only">Press any key to skip</span>;
}
