import { SkipToContent } from "@/components/SkipToContent";
import { NavbarV2 } from "@/components/v2/NavbarV2";
import { FooterV2 } from "@/components/v2/FooterV2";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="ju-v3-shell">
      <SkipToContent />
      <NavbarV2 />
      <main id="main" className="ju-public-main min-h-screen overflow-x-hidden">
        {children}
      </main>
      <FooterV2 />
    </div>
  );
}
