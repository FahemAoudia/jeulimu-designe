import { cn } from "@/lib/cn";

export function Section({
  id,
  className,
  children,
  dark = false,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8 xl:px-12",
        dark && "bg-[#02020F]/60",
        className,
      )}
    >
      <div className="mx-auto max-w-[1280px]">{children}</div>
    </section>
  );
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 sm:mb-12",
        align === "center" && "text-center",
        className,
      )}
    >
      <h2 className="text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-[2.5rem]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 max-w-2xl text-base text-ju-soft sm:text-lg mx-auto">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
