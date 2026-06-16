import { SkipToContent } from "@/components/SkipToContent";
import { NavbarV2 } from "@/components/v2/NavbarV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { MobileBookBar } from "@/components/v2/MobileBookBar";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="ju-v3-shell">
      <SkipToContent />
      <NavbarV2 />
      <main
        id="main"
        className="ju-public-main min-h-screen overflow-x-hidden pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0"
      >
        {children}
      </main>
      <FooterV2 />
      <MobileBookBar />
    </div>
  );
}
