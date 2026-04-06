import { LegalAcknowledgmentControls } from "@/components/client/intake/LegalAcknowledgmentControls";
import { saveAssignmentStepAction } from "@/lib/services/intakeService";
import type { IntakeViewModel } from "@/types/intake";

export function AssignmentStep({ model }: { model: IntakeViewModel }) {
  const action = saveAssignmentStepAction.bind(null, model.userId);

  return (
    <form action={action} className="rounded-[1.7rem] border border-white/10 bg-[#111214]/94 p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.32)]">
      <p className="eyebrow">Assignment of claims fee agreement</p>
      <h2 className="mt-3 font-display text-4xl uppercase leading-[0.92] tracking-[0.03em] text-white">
        Assignment terms before contract review.
      </h2>
      <div className="mt-6 grid gap-4">
        <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-zinc-300">
          <p className="font-semibold uppercase tracking-[0.08em] text-white">Agreement</p>
          <p className="mt-2">
            Client agrees to assign fifty percent (50%) of any proceeds recovered from applicable claims to the company.
          </p>
        </div>
        <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-zinc-300">
          <p className="font-semibold uppercase tracking-[0.08em] text-white">Service clarification</p>
          <p className="mt-2">This is a consultation-based, DIY credit repair support service.</p>
          <p className="mt-2">
            The fee is for drafting and sending dispute letters and related correspondence.
          </p>
        </div>
        <LegalAcknowledgmentControls
          fields={[
            {
              name: "assignmentAcknowledged",
              label: `I understand and accept the assignment of claims fee agreement at ${model.assignmentPercentage}%.`,
              defaultChecked: model.assignmentAccepted,
            },
          ]}
          submitLabel="Continue To Contract Review"
        />
      </div>
    </form>
  );
}
