import {
  ArrowRightCircle,
  Cpu,
  HeartHandshake,
  PartyPopper,
  ShieldCheck,
} from "lucide-react";

const items = [
  {
    icon: Cpu,
    title: "Exclusive LED Game Floor",
    body: "Dynamic. Immersive. Interactive.",
  },
  {
    icon: HeartHandshake,
    title: "For All Ages",
    body: "Kids, teens, adults, everyone!",
  },
  {
    icon: PartyPopper,
    title: "Private Events",
    body: "Birthdays, corporate, parties",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Guided",
    body: "Staff on site to guide your experience.",
  },
];

export function FeatureStrip() {
  return (
    <section className="relative z-10 px-4 pb-20 sm:px-6 lg:px-8 xl:px-12">
      <div className="ju-public-promo mx-auto max-w-[1440px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_0_60px_rgba(0,255,255,0.06)] backdrop-blur-xl">
        <div className="grid gap-6 p-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10 lg:p-8 xl:p-10">
          <div className="ju-public-promo-icons grid gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
            {items.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan shadow-[0_0_24px_rgba(0,255,255,0.25)]">
                  <Icon className="size-6" aria-hidden />
                </span>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-white">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-white/65">{body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-neon-cyan via-sky-400 to-neon-magenta p-px shadow-[0_0_60px_rgba(0,255,255,0.35)]">
            <div className="ju-on-dark flex flex-col items-start gap-5 rounded-[15px] bg-gradient-to-br from-cyan-500/95 via-fuchsia-600/90 to-neon-magenta px-8 py-8 sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-stretch xl:flex-row xl:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/90 drop-shadow-md">
                  Ready to play?
                </p>
                <p className="mt-2 max-w-[240px] text-lg font-bold leading-snug text-white drop-shadow-md">
                  Book your session now!
                </p>
              </div>
              <button
                type="button"
                className="flex size-14 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white text-void shadow-[0_0_40px_rgba(255,255,255,0.45)] transition hover:scale-105"
                aria-label="Book session"
              >
                <ArrowRightCircle className="size-8 text-void" strokeWidth={1.25} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
