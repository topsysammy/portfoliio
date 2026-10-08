import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Temitope's photo. `card` is a head-to-waist 4:5 crop for polaroids;
 * `avatar` is a square face crop for small round uses.
 * Source files live in /public (portrait-card.jpg, portrait-avatar.jpg).
 */
export function Portrait({ variant = "card", className, sizes, priority }: { variant?: "card" | "avatar"; className?: string; sizes?: string; priority?: boolean }) {
  const avatar = variant === "avatar";
  return (
    <div className={cn("relative overflow-hidden bg-kraft", avatar ? "aspect-square" : "aspect-[4/5]", className)}>
      <Image
        src={avatar ? "/portrait-avatar.jpg" : "/portrait-card.jpg"}
        alt={avatar ? "" : `${site.name}, smiling, in a white t-shirt`}
        fill
        sizes={sizes ?? (avatar ? "48px" : "(min-width: 768px) 16rem, 15rem")}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
