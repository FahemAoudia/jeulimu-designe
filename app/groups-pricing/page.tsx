import { PublicShell } from "@/components/v2/PublicShell";
import { GroupsPricingPageContent } from "@/components/v2/GroupsPricingPage";

export const metadata = {
  title: "Groups & Pricing | jeuLumi",
  description: "Group experiences and pricing for families, schools, teams, and events.",
};

export default function GroupsPricingPage() {
  return (
    <PublicShell>
      <GroupsPricingPageContent />
    </PublicShell>
  );
}
