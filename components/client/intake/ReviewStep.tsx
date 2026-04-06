import { LegalAcknowledgmentControls } from "@/components/client/intake/LegalAcknowledgmentControls";
import { completeReviewStepAction } from "@/lib/services/intakeService";
import type { IntakeViewModel } from "@/types/intake";

export function ReviewStep({ model }: { model: IntakeViewModel }) {
  const action = completeReviewStepAction.bind(null, model.userId, model.lead);

  return (
    <form action={action} className="rounded-[1.7rem] border border-white/10 bg-[#111214]/94 p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.32)]">
      <p className="eyebrow">Review</p>
      <h2 className="mt-3 font-display text-4xl uppercase leading-[0.92] tracking-[0.03em] text-white">
        Final intake check.
      </h2>
      <div className="mt-6 grid gap-4">
        <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-zinc-300">
          Documents ready: {model.documentsReady ? "yes" : "no"}.
        </div>
        <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-zinc-300">
          Disclosures complete: {model.disclosuresAccepted ? "yes" : "no"}.
        </div>
        <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-zinc-300">
          Assignment accepted: {model.assignmentAccepted ? `yes (${model.assignmentPercentage}%)` : "no"}.
        </div>
        <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-zinc-300">
          Contracts reviewed: {model.contractsAccepted ? "yes" : "no"}.
        </div>
        <LegalAcknowledgmentControls
          fields={[
            {
              name: "reviewConfirmed",
              label:
                "I confirm the documents, disclosure, assignment terms, and contract review are complete and ready to return to the dashboard.",
            },
          ]}
          submitLabel="Complete Intake"
        />
      </div>
    </form>
  );
}
