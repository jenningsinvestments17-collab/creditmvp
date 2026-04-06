import { completeDocumentsStepAction, markDocumentsStepVisited } from "@/lib/services/intakeService";
import { getParsedReportRecord } from "@/lib/reports/parsedReportState";
import { SecureUploadCenter } from "@/components/intake/SecureUploadCenter";
import type { IntakeViewModel } from "@/types/intake";
import type { RequiredDocumentKey } from "@/lib/types";

export async function DocumentsStep({ model }: { model: IntakeViewModel }) {
  await markDocumentsStepVisited(model.userId);
  const continueAction = completeDocumentsStepAction.bind(null, model.userId, model.lead);

  function getParsedReportForDocumentKey(documentKey: RequiredDocumentKey) {
    if (
      documentKey !== "experian_report" &&
      documentKey !== "equifax_report" &&
      documentKey !== "transunion_report"
    ) {
      return null;
    }

    return getParsedReportRecord(model.lead.id, documentKey);
  }

  return (
    <div className="grid gap-6">
      <SecureUploadCenter
        lead={model.lead}
        documents={model.documents}
        uploadGateCopy={model.uploadGateCopy}
        returnTo="/intake/documents"
        parsedReports={{
          valid_id: null,
          proof_of_address: null,
          experian_report: getParsedReportForDocumentKey("experian_report"),
          equifax_report: getParsedReportForDocumentKey("equifax_report"),
          transunion_report: getParsedReportForDocumentKey("transunion_report"),
        }}
      />

      <form action={continueAction} className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5 text-white">
        <div className="space-y-3">
          <p className="eyebrow">Next step</p>
          <h3 className="font-display text-3xl uppercase leading-[0.92] tracking-[0.03em] text-white">
            Move into disclosure review.
          </h3>
          <p className="text-sm leading-7 text-zinc-300">
            Once all three bureau reports, valid ID, and proof of address are uploaded, continue to the consumer disclosure.
          </p>
        </div>
        <button
          type="submit"
          disabled={!model.documentsReady}
          className="mt-5 inline-flex min-h-12 items-center justify-center rounded-[0.95rem] border border-accent/60 bg-accent px-5 text-sm font-semibold uppercase tracking-[0.08em] text-black transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-soft hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-45"
        >
          Continue To Consumer Disclosure
        </button>
      </form>
    </div>
  );
}
