import { Kicker } from "./Doodles";
import { cn } from "@/lib/cn";

/** Hand-lettered kicker above a big pixel headline. */
export function PageTitle({ kicker, title, as: H = "h2", align = "center", className, size = "lg", id }: { kicker: string; title: React.ReactNode; as?: "h1" | "h2"; align?: "center" | "left"; className?: string; size?: "lg" | "xl"; id?: string }) {
  return (
    <header className={cn("flex flex-col", align === "center" ? "items-center text-center" : "items-start", className)}>
      <Kicker>{kicker}</Kicker>
      <H id={id} data-reveal className={cn("pixel mt-10", size === "xl" ? "text-[clamp(4.5rem,13vw,10rem)]" : "text-[clamp(3.75rem,10vw,8rem)]")}>
        {title}
      </H>
    </header>
  );
}
