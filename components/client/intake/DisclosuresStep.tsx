import { LegalAcknowledgmentControls } from "@/components/client/intake/LegalAcknowledgmentControls";
import { saveDisclosuresStepAction } from "@/lib/services/intakeService";
import type { IntakeViewModel } from "@/types/intake";

export function DisclosuresStep({ model }: { model: IntakeViewModel }) {
  const action = saveDisclosuresStepAction.bind(null, model.userId);

  return (
    <form action={action} className="rounded-[1.7rem] border border-white/10 bg-[#111214]/94 p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.32)]">
      <p className="eyebrow">Consumer disclosure</p>
      <h2 className="mt-3 font-display text-4xl uppercase leading-[0.92] tracking-[0.03em] text-white">
        Review this before any contract or payment step.
      </h2>
      <div className="mt-6 grid gap-4">
        <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-zinc-300">
          <p className="font-semibold uppercase tracking-[0.08em] text-white">Services</p>
          <p className="mt-2">
            We assist with drafting and sending dispute letters and provide guidance throughout the process.
          </p>
        </div>
        <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-zinc-300">
          <p className="font-semibold uppercase tracking-[0.08em] text-white">Fee schedule</p>
          <p className="mt-2">Fees apply only after services are completed and approved for release.</p>
        </div>
        <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-zinc-300">
          <p className="font-semibold uppercase tracking-[0.08em] text-white">Consumer rights</p>
          <p className="mt-2">You are not required to purchase any service.</p>
        </div>
        <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-zinc-300">
          <p className="font-semibold uppercase tracking-[0.08em] text-white">Cancellation</p>
          <p className="mt-2">
            You have the right to cancel this agreement within five (5) business days without penalty.
          </p>
        </div>
        <LegalAcknowledgmentControls
          fields={[
            {
              name: "disclosureAcknowledged",
              label: "I have read and understand this disclosure.",
              defaultChecked: model.disclosuresAccepted,
            },
          ]}
          submitLabel="Accept And Continue"
        />
      </div>
    </form>
  );
}
