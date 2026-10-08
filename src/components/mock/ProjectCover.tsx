import Image from "next/image";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";
import { BrowserFrame, PhoneFrame } from "./Frames";
import { CareSite, CommerceSite, EstateSite, ExperimentArt, PaymentsScreen, SavingsScreen, ShoppingScreen } from "./Screens";

const appScreens = { savings: SavingsScreen, payments: PaymentsScreen, shopping: ShoppingScreen } as const;
const siteScreens = { care: CareSite, estate: EstateSite, commerce: CommerceSite } as const;

const toasts: Record<string, string> = {
  savings: "✓ Contribution logged · Family Ajo",
  payments: "✓ ₦5,500 sent to Tunde",
  shopping: "✦ Sorted by market section",
};

type Props = {
  project: Project;
  className?: string;
  /** "card" crops devices at the bottom edge; "tall" centres them fully. */
  layout?: "card" | "tall";
  priority?: boolean;
  sizes?: string;
};

/**
 * Project cover. Uses `project.coverImage` when present, otherwise renders
 * the code-drawn mock described by `project.mock`.
 */
export function ProjectCover({ project, className, layout = "card", priority, sizes = "(min-width: 1024px) 60vw, 100vw" }: Props) {
  const { mock } = project;

  if (project.coverImage) {
    return (
      <div className={cn("relative overflow-hidden", className)} style={{ background: mock.tint }}>
        <Image src={project.coverImage.src} alt={project.coverImage.alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
    );
  }

  const label = `${project.title}: ${project.tagline} interface mockup`;

  if (mock.kind in appScreens) {
    const Screen = appScreens[mock.kind as keyof typeof appScreens];
    return (
      <div role="img" aria-label={label} className={cn("relative overflow-hidden [container-type:size]", className)} style={{ background: mock.tint }}>
        <Grain />
        <div
          className={cn(
            "absolute left-1/2 w-[min(34cqw,40cqh)] -translate-x-1/2 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-[3%]",
            layout === "card" ? "top-[11%]" : "top-1/2 -translate-y-1/2 group-hover:-translate-y-[52%]",
          )}
        >
          <PhoneFrame>
            <Screen brand={mock.brand} />
          </PhoneFrame>
        </div>
        <div
          className="absolute top-[24%] right-[7%] max-w-[34%] rotate-3 rounded-2xl bg-paper text-ink px-[min(1.4cqw,2.6cqh)] py-[min(1.1cqw,2cqh)] text-[max(min(1.5cqw,2.8cqh),10px)] font-medium shadow-[0_18px_40px_-18px_rgba(17,17,17,0.4)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-[-4%] group-hover:rotate-0"
          aria-hidden
        >
          {toasts[mock.kind]}
        </div>
        <span aria-hidden className="absolute bottom-[14%] left-[7%] size-[min(7cqw,12cqh)] rounded-full opacity-90" style={{ background: mock.brand }} />
      </div>
    );
  }

  if (mock.kind in siteScreens) {
    const Site = siteScreens[mock.kind as keyof typeof siteScreens];
    return (
      <div role="img" aria-label={label} className={cn("@container relative overflow-hidden", className)} style={{ background: mock.tint }}>
        <Grain />
        <div className="absolute top-[9%] left-1/2 w-[86%] -translate-x-1/2 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-[2%]">
          <BrowserFrame url={`${project.slug.replace(/-website|-storefront/, "")}.com`}>
            <Site brand={mock.brand} />
          </BrowserFrame>
        </div>
      </div>
    );
  }

  const variant = ["micro-interactions", "prompt-to-ui", "token-playground"].indexOf(project.slug);
  const dark = mock.tint === "#111111";
  return (
    <div
      role="img"
      aria-label={label}
      className={cn("@container relative overflow-hidden", dark ? "text-white" : "text-ink", className)}
      style={{ background: mock.tint }}
    >
      <div className="absolute inset-0 text-[4cqw]">
        <ExperimentArt brand={mock.brand} variant={Math.max(variant, 0)} />
      </div>
    </div>
  );
}

function Grain() {
  return (
    <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.35] mix-blend-multiply">
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.09 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}
