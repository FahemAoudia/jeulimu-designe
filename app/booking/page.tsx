import type { Metadata } from "next";
import { NavbarV2 } from "@/components/v2/NavbarV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { BookingEmbed } from "@/components/BookingEmbed";
import { acuityIframeUrlForTier } from "@/lib/booking-tiers";

export const metadata: Metadata = {
  title: "Book Now | jeuLumi",
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
      <NavbarV2 />
      <main
        id="main"
        className="ju-public-main ju-booking-page min-h-screen overflow-x-hidden pt-[5rem] sm:pt-24"
      >
        <section className="relative px-4 pb-12 sm:px-6 lg:px-8 xl:px-12">
          <div className="mx-auto max-w-[1280px]">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
                Book Now
              </h1>
              <p className="mt-3 text-sm text-ju-soft sm:text-base">
                Pick a time for your private session. Confirmation sent after checkout.
              </p>
            </div>

            <div className="mx-auto mt-8 max-w-3xl lg:mt-10 xl:max-w-4xl">
              <div className="relative overflow-x-clip rounded-2xl bg-gradient-to-r from-ju-electric/40 via-[#A259FF]/35 to-[#FF2D95]/40 p-px shadow-[0_0_70px_rgba(0,245,255,0.08)]">
                <BookingEmbed
                  iframeUrl={iframeUrl}
                  className="rounded-[15px] bg-[#050A30]/70"
                />
              </div>
            </div>
          </div>
        </section>
        <FooterV2 />
      </main>
    </>
  );
}
