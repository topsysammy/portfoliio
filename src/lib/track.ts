import { track as vercelTrack } from "@vercel/analytics";

export type TrackEvent =
  | "contact_click"
  | "linkedin_click"
  | "github_click"
  | "social_click"
  | "case_study_click"
  | "project_click"
  | "live_demo_click"
  | "filter_change"
  | "cv_download"
  | "book_call";

/** Thin wrapper so the analytics vendor can be swapped in one place. */
export function track(event: TrackEvent, props?: Record<string, string>) {
  try {
    vercelTrack(event, props);
  } catch {
    /* analytics must never break the UI */
  }
}
