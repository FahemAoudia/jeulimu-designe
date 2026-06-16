import { NeonButton } from "@/components/NeonButton";
import { cn } from "@/lib/cn";

export function PricingCard({
  title,
  players,
  duration,
  price,
  unit,
  cta,
  href,
  featured,
}: {
  title: string;
  players: string;
  duration: string;
  price: string;
  unit: string;
  cta: string;
  href: string;
  featured?: boolean;
}) {
  return (
    <article
      className={cn(
        "relative flex flex-col rounded-2xl border p-6 backdrop-blur-md transition duration-300 sm:p-8",
        featured
          ? "border-[#FF2D95]/50 bg-gradient-to-b from-[#FF2D95]/10 to-ju-purple/10 shadow-[0_0_40px_rgba(255,45,149,0.15)]"
          : "border-white/10 bg-white/[0.04] hover:border-white/20",
      )}
    >
      {featured ? (
        <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-[#FF2D95] to-ju-purple px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          Popular
        </span>
      ) : null}
      <h3 className="text-lg font-bold uppercase tracking-wide text-white">{title}</h3>
      <p className="mt-2 text-sm text-ju-soft">{players}</p>
      <p className="text-sm text-ju-muted">{duration}</p>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-4xl font-black text-white">{price}</span>
        <span className="text-sm text-ju-muted">{unit}</span>
      </div>
      <div className="mt-6 flex-1" />
      <NeonButton
        href={href}
        variant={featured ? "gradient" : "outline-white"}
        className="w-full !py-3 text-xs"
      >
        {cta}
      </NeonButton>
    </article>
  );
}
