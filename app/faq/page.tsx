import { PublicShell } from "@/components/v2/PublicShell";
import { FaqPageContent } from "@/components/v2/FaqPage";

export const metadata = {
  title: "FAQ | jeuLumi",
  description: "Frequently asked questions about jeuLumi interactive LED floor experiences.",
};

export default function FaqPage() {
  return (
    <PublicShell>
      <FaqPageContent />
    </PublicShell>
  );
}
