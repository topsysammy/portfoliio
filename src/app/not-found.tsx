import Link from "next/link";
import { Kicker, Smiley } from "@/components/doodle/Doodles";

export default function NotFound() {
  return (
    <div className="ruled flex min-h-[75vh] flex-col items-center justify-center px-4 py-24 text-center [--paper:var(--color-surface)]">
      <Smiley className="size-28 -rotate-12" />
      <Kicker underline={false} className="mt-8">oops, wrong page</Kicker>
      <h1 className="pixel mt-4 text-[clamp(5rem,15vw,10rem)]">404</h1>
      <Link href="/" className="mono mt-8 inline-flex h-14 items-center border-2 border-ink bg-paper px-8 text-sm font-bold hover:bg-yellow">
        Back home →
      </Link>
    </div>
  );
}
