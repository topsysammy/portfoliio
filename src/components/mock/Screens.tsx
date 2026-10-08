/**
 * Mocked product UIs drawn in code. Values shown here are illustrative
 * interface content (like Lorem Ipsum), not project results.
 * All sizes are in `em` so they scale with the surrounding frame.
 */

const bar = (w: string, c = "currentColor", o = 0.12) => (
  <i className="block h-[0.55em] rounded-full" style={{ width: w, background: c, opacity: o }} />
);

/* ───────────── AjoTrack: savings across Ajo groups ───────────── */
export function SavingsScreen({ brand }: { brand: string }) {
  const groups = [
    { n: "Family Ajo", p: 0.75, d: "Payout in 12 days" },
    { n: "Office circle", p: 0.4, d: "Next: Friday" },
    { n: "Market women", p: 0.9, d: "Your turn next" },
  ];
  return (
    <div className="flex h-full flex-col bg-[#FBFAF6] px-[1.1em] pt-[3.4em] pb-[1em]">
      <p className="text-[0.7em] text-muted">Good evening,</p>
      <p className="text-[1.15em] font-semibold tracking-tight">Your Ajo groups</p>
      <div className="mt-[0.9em] rounded-[1em] p-[1em] text-white" style={{ background: brand }}>
        <p className="text-[0.62em] opacity-70">Contributed this cycle</p>
        <p className="mt-[0.2em] text-[1.6em] font-semibold tracking-tight">₦86,000</p>
        <div className="mt-[0.7em] flex gap-[0.35em]">
          {Array.from({ length: 10 }).map((_, i) => (
            <i key={i} className="h-[0.35em] flex-1 rounded-full bg-white" style={{ opacity: i < 7 ? 0.95 : 0.25 }} />
          ))}
        </div>
      </div>
      <div className="mt-[1em] flex-1 space-y-[0.6em]">
        {groups.map((g) => (
          <div key={g.n} className="rounded-[0.8em] border border-ink/8 bg-white p-[0.75em]">
            <div className="flex items-center justify-between">
              <p className="text-[0.75em] font-medium">{g.n}</p>
              <p className="text-[0.58em] text-muted">{g.d}</p>
            </div>
            <div className="mt-[0.55em] h-[0.4em] rounded-full bg-ink/6">
              <div className="h-full rounded-full" style={{ width: `${g.p * 100}%`, background: brand }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[0.8em] rounded-full py-[0.7em] text-center text-[0.72em] font-medium text-white" style={{ background: "#111" }}>
        + Log contribution
      </div>
    </div>
  );
}

/* ───────────── SwiftPay: send / receive / bills ───────────── */
export function PaymentsScreen({ brand }: { brand: string }) {
  return (
    <div className="flex h-full flex-col bg-white px-[1.1em] pt-[3.4em] pb-[1em]">
      <div className="flex items-center justify-between">
        <span className="size-[1.8em] rounded-full bg-ink/8" />
        <span className="text-[0.62em] text-muted">● ● ●</span>
      </div>
      <p className="mt-[1em] text-[0.65em] text-muted">Available balance</p>
      <p className="text-[1.9em] font-semibold tracking-tight">₦124,500</p>
      <div className="mt-[1em] grid grid-cols-3 gap-[0.5em]">
        {["Send", "Receive", "Bills"].map((a, i) => (
          <div key={a} className="flex flex-col items-center gap-[0.35em] rounded-[0.8em] py-[0.7em]" style={{ background: i === 0 ? brand : "#F2F3F7", color: i === 0 ? "#fff" : "#111" }}>
            <span className="text-[0.95em]">{["↑", "↓", "⚡"][i]}</span>
            <span className="text-[0.6em] font-medium">{a}</span>
          </div>
        ))}
      </div>
      <p className="mt-[1.2em] mb-[0.5em] text-[0.7em] font-medium">Recent</p>
      <div className="flex-1 space-y-[0.7em]">
        {[
          ["Electricity", "−₦8,000"],
          ["From Ada", "+₦15,000"],
          ["Airtime", "−₦1,000"],
          ["To Tunde", "−₦5,500"],
        ].map(([n, v]) => (
          <div key={n} className="flex items-center gap-[0.6em]">
            <span className="size-[1.7em] rounded-full bg-[#F2F3F7]" />
            <div className="flex-1 space-y-[0.3em]">
              <p className="text-[0.66em] font-medium">{n}</p>
              {bar("45%", "#111", 0.08)}
            </div>
            <span className="text-[0.66em] font-medium" style={{ color: v.startsWith("+") ? brand : "#111" }}>
              {v}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────── MarketList: AI shopping assistant ───────────── */
export function ShoppingScreen({ brand }: { brand: string }) {
  const items = [
    ["Tomatoes", "1 basket", true],
    ["Rice", "5kg bag", true],
    ["Palm oil", "2 litres", false],
    ["Onions", "½ bag", false],
  ] as const;
  return (
    <div className="flex h-full flex-col bg-[#FFFBF5] px-[1.1em] pt-[3.4em] pb-[1em]">
      <p className="text-[0.65em] text-muted">Saturday market</p>
      <p className="text-[1.2em] font-semibold tracking-tight">This week&apos;s list</p>
      <div className="mt-[0.9em] space-y-[0.5em]">
        {items.map(([n, q, done]) => (
          <div key={n} className="flex items-center gap-[0.6em] rounded-[0.7em] bg-white px-[0.7em] py-[0.6em] shadow-[0_1px_0_rgba(0,0,0,0.04)]">
            <span
              className="grid size-[1.1em] place-items-center rounded-[0.3em] border text-[0.7em] text-white"
              style={{ borderColor: done ? brand : "#ddd", background: done ? brand : "transparent" }}
            >
              {done ? "✓" : ""}
            </span>
            <span className={`flex-1 text-[0.7em] font-medium ${done ? "text-muted line-through" : ""}`}>{n}</span>
            <span className="text-[0.58em] text-muted">{q}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-[0.9em] bg-ink p-[0.85em] text-white">
        <p className="flex items-center gap-[0.4em] text-[0.58em] text-white/60">
          <span style={{ color: brand }}>✦</span> Suggestion
        </p>
        <p className="mt-[0.3em] text-[0.7em] leading-snug">You usually add pepper with tomatoes. Add it?</p>
        <div className="mt-[0.6em] flex gap-[0.4em]">
          <span className="rounded-full px-[0.8em] py-[0.35em] text-[0.58em] font-medium text-ink" style={{ background: brand }}>
            Add
          </span>
          <span className="rounded-full border border-white/20 px-[0.8em] py-[0.35em] text-[0.58em]">Not now</span>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Websites ───────────── */
export function CareSite({ brand }: { brand: string }) {
  return (
    <div className="bg-[#F8F6F1] text-ink">
      <div className="flex items-center justify-between px-[3em] py-[1.4em] text-[0.8em]">
        <span className="font-semibold" style={{ color: brand }}>
          Living Plus Care
        </span>
        <span className="hidden gap-[2em] text-muted @md:flex">
          <span>Services</span>
          <span>About</span>
          <span>Careers</span>
        </span>
        <span className="rounded-full px-[1.2em] py-[0.5em] text-white" style={{ background: brand }}>
          Get in touch
        </span>
      </div>
      <div className="grid grid-cols-5 gap-[2em] px-[3em] pt-[1.5em] pb-[3em]">
        <div className="col-span-3 self-center">
          <p className="font-serif text-[3.6em] leading-[0.95] tracking-tight">
            Care that feels <em style={{ color: brand }}>like home.</em>
          </p>
          <div className="mt-[1.2em] max-w-[80%] space-y-[0.5em]">
            {bar("100%", "#111", 0.1)}
            {bar("80%", "#111", 0.1)}
          </div>
          <div className="mt-[1.6em] flex gap-[0.8em] text-[0.85em]">
            <span className="rounded-full px-[1.4em] py-[0.7em] text-white" style={{ background: brand }}>
              Book a visit
            </span>
            <span className="rounded-full border border-ink/15 px-[1.4em] py-[0.7em]">Our services</span>
          </div>
        </div>
        <div className="col-span-2 flex aspect-[4/5] items-end rounded-[1.4em]" style={{ background: `linear-gradient(160deg, ${brand}33, ${brand}aa)` }}>
          <div className="m-[1em] inline-block rounded-[0.8em] bg-white/90 px-[0.9em] py-[0.6em] text-[0.7em]">♥ Home care · Support</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[1em] border-t border-ink/8 px-[3em] py-[2em]">
        {["Home care", "Supported living", "Respite"].map((s) => (
          <div key={s} className="space-y-[0.5em]">
            <p className="text-[0.85em] font-medium">{s}</p>
            {bar("90%", "#111", 0.08)}
            {bar("60%", "#111", 0.08)}
          </div>
        ))}
      </div>
    </div>
  );
}

export function EstateSite({ brand }: { brand: string }) {
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between px-[3em] py-[1.4em] text-[0.8em]">
        <span className="font-semibold tracking-tight">ESTATE—CO</span>
        <span className="rounded-full border border-ink/15 px-[1.2em] py-[0.5em]">Book a viewing</span>
      </div>
      <div className="px-[3em] pb-[1.2em]">
        <p className="text-[3.2em] leading-[0.95] font-semibold tracking-tight">Find a place worth staying.</p>
        <div className="mt-[1.2em] flex w-[70%] items-center gap-[1em] rounded-full border border-ink/10 px-[1.4em] py-[0.8em] text-[0.8em] text-muted">
          <span>Location</span>·<span>Type</span>·<span>Budget</span>
          <span className="ml-auto rounded-full px-[1em] py-[0.4em] text-white" style={{ background: brand }}>
            Search
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[1.2em] px-[3em] pb-[3em]">
        {[0.25, 0.45, 0.65].map((o, i) => (
          <div key={i} className="space-y-[0.6em]">
            <div className="aspect-[4/3] rounded-[0.8em]" style={{ background: brand, opacity: o }} />
            {bar("70%", "#111", 0.12)}
            {bar("40%", "#111", 0.08)}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CommerceSite({ brand }: { brand: string }) {
  return (
    <div className="bg-[#FBFAFD]">
      <div className="flex items-center justify-between px-[3em] py-[1.4em] text-[0.8em]">
        <span className="font-semibold">shop/</span>
        <span className="text-muted">New · Women · Men · Sale</span>
        <span>Bag (2)</span>
      </div>
      <div className="mx-[3em] flex items-end justify-between rounded-[1.2em] px-[2em] py-[2.2em] text-white" style={{ background: brand }}>
        <p className="text-[2.8em] leading-[0.95] font-semibold tracking-tight">
          The new
          <br />
          season edit
        </p>
        <span className="rounded-full bg-white px-[1.2em] py-[0.6em] text-[0.8em] text-ink">Shop now</span>
      </div>
      <div className="grid grid-cols-4 gap-[1em] px-[3em] py-[2em]">
        {[0.15, 0.3, 0.2, 0.4].map((o, i) => (
          <div key={i} className="space-y-[0.5em]">
            <div className="aspect-[3/4] rounded-[0.6em]" style={{ background: brand, opacity: o }} />
            {bar("80%", "#111", 0.12)}
            {bar("35%", "#111", 0.08)}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────── Experiments: abstract interaction tiles ───────────── */
export function ExperimentArt({ brand, variant }: { brand: string; variant: number }) {
  if (variant === 0)
    return (
      <div className="flex h-full flex-col items-center justify-center gap-[1.2em]">
        {[true, false, true].map((on, i) => (
          <span key={i} className="flex h-[2.2em] w-[4em] items-center rounded-full p-[0.25em]" style={{ background: on ? brand : "#333" }}>
            <i className="size-[1.7em] rounded-full bg-white" style={{ marginLeft: on ? "auto" : 0 }} />
          </span>
        ))}
      </div>
    );
  if (variant === 1)
    return (
      <div className="flex h-full flex-col justify-center gap-[0.7em] p-[2em] font-mono text-[0.8em]">
        <p className="rounded-[0.8em] bg-white px-[1em] py-[0.7em] shadow-sm">&gt; a calm checkout with one primary action</p>
        <p className="self-end text-[0.8em] opacity-60">↓ generating</p>
        <div className="space-y-[0.5em] rounded-[0.8em] border border-dashed p-[1em]" style={{ borderColor: brand }}>
          {bar("80%", brand, 0.3)}
          {bar("55%", brand, 0.2)}
          <span className="mt-[0.4em] block w-[45%] rounded-full py-[0.5em] text-center text-[0.8em] text-white" style={{ background: brand }}>
            Pay
          </span>
        </div>
      </div>
    );
  return (
    <div className="grid h-full grid-cols-4 content-center gap-[0.6em] p-[2em]">
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} className="aspect-square rounded-[0.5em]" style={{ background: brand, opacity: 0.15 + (i % 4) * 0.22 }} />
      ))}
    </div>
  );
}
