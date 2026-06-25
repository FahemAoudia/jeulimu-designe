import { PublicShell } from "@/components/v2/PublicShell";
import { GroupsPricingPageContent } from "@/components/v2/GroupsPricingPage";

export const metadata = {
  title: "Groups & Events | jeuLumi",
  description:
    "Group experiences for families, schools, sports teams, camps, corporate teams, and community organizations.",
};

export default function GroupsEventsPage() {
  return (
    <PublicShell>
      <GroupsPricingPageContent />
    </PublicShell>
  );
}
