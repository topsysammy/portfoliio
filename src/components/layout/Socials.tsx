import { contact } from "@/content/site";
import { IconBehance, IconFigma, IconGitHub, IconLinkedIn, IconX } from "@/components/doodle/Icons";
import { cn } from "@/lib/cn";

const look: Record<string, { bg: string; Icon: (p: { className?: string }) => React.ReactElement; track: string; vars?: React.CSSProperties }> = {
  LinkedIn: { bg: "bg-yellow text-ink", Icon: IconLinkedIn, track: "linkedin_click", vars: { "--icon-bg": "#f7c948" } as React.CSSProperties },
  Twitter: { bg: "bg-ink text-white", Icon: IconX, track: "social_click" },
  Behance: { bg: "bg-pink text-ink", Icon: IconBehance, track: "social_click" },
  GitHub: { bg: "bg-green text-ink", Icon: IconGitHub, track: "github_click" },
  Figma: { bg: "bg-peri text-ink", Icon: IconFigma, track: "social_click" },
};

/** Colourful circle buttons for social profiles. */
export function Socials({ only = ["LinkedIn", "Twitter", "Behance", "GitHub"], className, size = "md" }: { only?: string[]; className?: string; size?: "md" | "lg" }) {
  const items = contact.socials.filter((s) => only.includes(s.label));
  return (
    <ul className={cn("flex items-center gap-2.5", className)}>
      {items.map((s) => {
        const l = look[s.label];
        return (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label === "Twitter" ? "Twitter (X)" : s.label}
              data-track={l.track}
              data-track-label={s.label}
              style={l.vars}
              className={cn(
                "grid place-items-center rounded-full border-2 border-white shadow-[0_2px_0_rgba(25,21,16,0.25)] transition-transform duration-200 hover:-translate-y-0.5 hover:rotate-6",
                size === "md" ? "size-10" : "size-12",
                l.bg,
              )}
            >
              <l.Icon className={size === "md" ? "size-[18px]" : "size-5"} />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
