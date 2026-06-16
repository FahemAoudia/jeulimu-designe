import { PublicShell } from "@/components/v2/PublicShell";
import { BirthdaysPageContent } from "@/components/v2/BirthdaysPage";

export const metadata = {
  title: "Birthday Parties | jeuLumi",
  description: "Birthday parties that get kids moving — private interactive LED floor in LaSalle.",
};

export default function BirthdaysPage() {
  return (
    <PublicShell>
      <BirthdaysPageContent />
    </PublicShell>
  );
}
