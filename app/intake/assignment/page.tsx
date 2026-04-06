import { redirect } from "next/navigation";
import { getAuthenticatedUser, requireAuthenticatedClientLead } from "@/lib/auth";
import { AssignmentStep } from "@/components/client/intake/AssignmentStep";
import { IntakeShell } from "@/components/client/intake/IntakeShell";
import { requireIntakeStepAccess } from "@/lib/services/intakeService";

export const dynamic = "force-dynamic";

export default async function IntakeAssignmentPage() {
  const session = await getAuthenticatedUser();
  const lead = await requireAuthenticatedClientLead();

  if (!session) {
    redirect("/login?next=/intake/assignment");
  }

  const model = await requireIntakeStepAccess({
    userId: session.user.id,
    lead,
    step: "assignment",
  });

  return (
    <IntakeShell model={model}>
      <AssignmentStep model={model} />
    </IntakeShell>
  );
}
