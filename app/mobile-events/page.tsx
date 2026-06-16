import { PublicShell } from "@/components/v2/PublicShell";
import { MobileEventsPageContent } from "@/components/v2/MobileEventsPage";

export const metadata = {
  title: "Mobile Events | jeuLumi",
  description: "jeuLumi on wheels — bringing interactive play to schools, camps, and events.",
};

export default function MobileEventsPage() {
  return (
    <PublicShell>
      <MobileEventsPageContent />
    </PublicShell>
  );
}
