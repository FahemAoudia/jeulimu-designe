import type { Metadata } from "next";
import { NavbarV2 } from "@/components/v2/NavbarV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { BookingEmbed } from "@/components/BookingEmbed";
import { acuityIframeUrlForTier } from "@/lib/booking-tiers";

export const metadata: Metadata = {
  title: "Book Now | jeuLumi",
  description: "Book your jeuLumi interactive LED game floor session online.",
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams?: Promise<{ tier?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  const iframeUrl = acuityIframeUrlForTier(sp.tier);
  return (
    <div className="ju-v3-shell">
      <NavbarV2 />
      <main
        id="main"
        className="ju-public-main ju-booking-page min-h-screen overflow-x-hidden pt-[4.25rem] pb-[calc(4.5rem+env(safe-area-inset-bottom))] sm:pt-24 lg:pb-0"
      >
        <section className="px-4 pb-16 pt-8 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-[1400px] text-center">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.35em] text-ju-cyanGlow">
              Reservation
            </p>
            <h1 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
              Book Now
            </h1>
            <p className="mt-3 text-sm text-white/45">Private sessions · LaSalle, QC</p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl border border-white/10 bg-black/40 p-1 xl:max-w-4xl">
            <BookingEmbed iframeUrl={iframeUrl} className="bg-[#050A30]/80" />
          </div>
        </section>
        <FooterV2 />
      </main>
    </div>
  );
}
