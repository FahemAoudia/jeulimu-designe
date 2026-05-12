import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { ReservationBar } from "@/components/ReservationBar";
import { Footer } from "@/components/Footer";
import { BookingEmbed } from "@/components/BookingEmbed";
import { acuityIframeUrlForTier } from "@/lib/booking-tiers";

export const metadata: Metadata = {
  title: "Book a session | jeuLumi",
  description:
    "Book your jeuLumi interactive LED game floor session online. Reservation-only — pick your time and secure your spot.",
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams?: Promise<{ tier?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const iframeUrl = acuityIframeUrlForTier(sp.tier);
  return (
    <>
      <Navbar />
      <ReservationBar />
      <main
        id="main"
        className="ju-public-main ju-booking-page min-h-screen overflow-x-hidden pt-[6.5rem] sm:pt-[7.5rem]"
      >
        <section className="relative px-4 pb-12 sm:px-6 lg:px-8 xl:px-12">
          <div
            className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-ju-electric/10 blur-[110px]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-24 top-24 h-64 w-64 rounded-full bg-[#FF2D95]/10 blur-[110px]"
            aria-hidden
          />

          <div className="relative mx-auto max-w-[1440px]">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Book your{" "}
                <span className="text-gradient-game text-gradient-headline-glow">
                  jeuLumi
                </span>{" "}
                experience
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-ju-soft sm:text-base">
                Pick a time that works for your group. You’ll receive a
                confirmation right after checkout.
              </p>
            </div>

            <div className="mx-auto mt-8 max-w-3xl lg:mt-10 xl:max-w-4xl">
              <div className="relative overflow-x-clip overflow-y-visible rounded-2xl bg-gradient-to-r from-ju-electric/40 via-[#A259FF]/35 to-[#FF2D95]/40 p-px shadow-[0_0_70px_rgba(0,245,255,0.08)]">
                <BookingEmbed
                  iframeUrl={iframeUrl}
                  className="rounded-[15px] bg-[#050A30]/70"
                />
              </div>

              <div className="mt-5 grid gap-3 text-center text-xs text-white/70 sm:grid-cols-3 sm:text-left">
                <div className="ju-surface-tip rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-shadow duration-200 hover:shadow-md">
                  <p className="font-bold uppercase tracking-wider text-white/85">
                    Smooth check-in
                  </p>
                  <p className="mt-1">Arrive a few minutes early and we’ll guide you.</p>
                </div>
                <div className="ju-surface-tip rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-shadow duration-200 hover:shadow-md">
                  <p className="font-bold uppercase tracking-wider text-white/85">
                    For all ages
                  </p>
                  <p className="mt-1">Great for kids, teens, adults—everyone plays.</p>
                </div>
                <div className="ju-surface-tip rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-shadow duration-200 hover:shadow-md">
                  <p className="font-bold uppercase tracking-wider text-white/85">
                    Private groups
                  </p>
                  <p className="mt-1">Birthdays, team building, celebrations.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}

