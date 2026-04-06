import { LegalAcknowledgmentControls } from "@/components/client/intake/LegalAcknowledgmentControls";
import { ContractStatusCard } from "@/components/contracts/ContractStatusCard";
import { saveContractsStepAction } from "@/lib/services/intakeService";
import type { IntakeViewModel } from "@/types/intake";

export function ContractsStep({ model }: { model: IntakeViewModel }) {
  const action = saveContractsStepAction.bind(null, model.userId);

  return (
    <div className="grid gap-6">
      <ContractStatusCard status={model.lead.contractPacketStatus} documents={model.contractDocuments} />
      <form action={action} className="rounded-[1.7rem] border border-white/10 bg-[#111214]/94 p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.32)]">
        <p className="eyebrow">Contract review</p>
        <h2 className="mt-3 font-display text-4xl uppercase leading-[0.92] tracking-[0.03em] text-white">
          Review the legal packet clearly.
        </h2>
        <div className="mt-6 grid gap-4">
          <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-zinc-300">
            <p className="font-semibold uppercase tracking-[0.08em] text-white">Service</p>
            <p className="mt-2">This is a consultation-based, DIY credit repair support service.</p>
          </div>
          <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-zinc-300">
            <p className="font-semibold uppercase tracking-[0.08em] text-white">Fee language</p>
            <p className="mt-2">
              The fee is for drafting and sending dispute letters and related correspondence.
            </p>
          </div>
          <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-zinc-300">
            <p className="font-semibold uppercase tracking-[0.08em] text-white">Cancellation</p>
            <p className="mt-2">
              You may cancel this agreement within five (5) business days from the date of signing without any penalty or obligation.
            </p>
          </div>
          <LegalAcknowledgmentControls
            fields={[
              {
                name: "contractAcknowledged",
                label: "I reviewed the contract language, service description, and fee language.",
                defaultChecked: model.contractsAccepted,
              },
              {
                name: "cancellationAcknowledged",
                label: "I understand the five (5) business day cancellation right before signing or payment.",
                defaultChecked: model.contractsAccepted,
              },
            ]}
            submitLabel="Continue To Final Review"
          />
        </div>
      </form>
    </div>
  );
}
