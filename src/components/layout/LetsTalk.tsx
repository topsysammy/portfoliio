import { contact, currently, site } from "@/content/site";
import { Kicker, Smiley, Tape } from "@/components/doodle/Doodles";
import { IconArrow, IconBolt } from "@/components/doodle/Icons";
import { Portrait } from "@/components/ui/Portrait";
import { Socials } from "./Socials";
import { BookCall } from "@/components/ui/BookCall";

/** Closing contact block used at the end of every page. */
export function LetsTalk({ headingLevel: H = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="contact" aria-labelledby="talk-title" className="ruled overflow-hidden pt-24 pb-28 [--paper:var(--color-surface)] md:pt-32 md:pb-36">
      <div className="wrap flex flex-col items-center text-center">
        <div data-reveal="pop">
          <Smiley className="size-36 animate-bob md:size-56" />
        </div>
        <H id="talk-title" data-reveal className="pixel mt-8 text-[clamp(4.5rem,13vw,9.5rem)]">
          Let&apos;s talk
        </H>
        <p data-reveal className="hand mt-6 max-w-xl text-2xl leading-snug md:text-[1.75rem]">
          Whether you need a product designed, a website built, or just want to talk about an interesting idea — I&apos;d love to hear from you.
        </p>

        <div className="relative mt-16 w-full max-w-4xl md:mt-20">
          {/* Profile note */}
          <div
            data-reveal
            className="relative z-20 mx-auto mb-8 w-full max-w-xs bg-peri p-5 text-left lift md:absolute md:-top-16 md:-left-24 md:mb-0 md:max-w-[18rem]"
            style={{ rotate: "-2deg" }}
          >
            <Tape tone="butter" className="-top-3 -left-4" rotate={-38} />
            <Tape tone="blush" className="-top-3 -right-4" rotate={40} />
            <div className="flex gap-3">
              <Portrait variant="avatar" className="size-10 shrink-0 rounded-full" />
              <div>
                <p className="font-semibold">{site.name}</p>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink/80">{currently}</p>
                <span className="mono mt-3 inline-flex items-center gap-1 border border-blue px-2 py-1 text-[0.6875rem] text-blue">
                  <IconBolt className="size-3" /> Open to work
                </span>
              </div>
            </div>
          </div>

          {/* Big yellow card */}
          <div
            data-reveal
            className="relative rounded-[3px_3px_48px_3px/3px_3px_14px_3px] border-2 border-ink bg-yellow px-6 py-16 shadow-[10px_12px_0_var(--color-ink)] md:px-16 md:py-24"
          >
            <Tape className="-top-3 right-6 w-28" rotate={4} />
            <Kicker underline={false} className="text-[1.75rem] md:text-3xl">
              let&apos;s make something together
            </Kicker>
            <a
              href={`mailto:${contact.email}`}
              data-track="contact_click"
              data-track-label="contact-card"
              className="pixel mt-6 block text-[clamp(4rem,12vw,8.5rem)] transition-transform duration-300 hover:-rotate-2 hover:scale-[1.03]"
            >
              Contact
            </a>
            <a
              href={`mailto:${contact.email}`}
              data-track="contact_click"
              data-track-label="drop-a-line"
              className="mono mt-8 inline-flex items-center gap-2 border-b-2 border-ink pb-1 text-sm font-bold"
            >
              Drop a line <IconArrow className="size-3.5" />
            </a>
            <p className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[0.9375rem] text-ink/80">
              {contact.email}
            </p>
            <p className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <BookCall where="contact-card" className="mono inline-flex h-12 items-center gap-2 border-2 border-ink bg-ink px-5 text-sm font-bold text-white transition-[translate,box-shadow] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--color-blue)]">
              Book a call →
            </BookCall>
            <a href={contact.cvUrl} download data-track="cv_download" data-track-label="contact-card" className="mono inline-flex h-12 items-center border-2 border-ink bg-paper px-5 text-sm font-bold transition-[translate,box-shadow] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--color-ink)]">
              Download CV ↓
            </a>
            </p>
            <Socials className="mt-6 justify-center" only={["LinkedIn", "Twitter", "Behance", "GitHub"]} />
          </div>
        </div>
      </div>
    </section>
  );
}
