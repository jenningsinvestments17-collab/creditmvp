import type { DisputeRecord, MailingJobRecord, PaymentRecord } from "@/lib/types";
import {
  mailingProviderStatusLabels,
  mailingStatusLabels,
  paymentStatusLabels,
} from "@/lib/ui/statusLabels";

export function MailingPaymentCard({
  dispute,
  payment,
  mailingJob,
}: {
  dispute: DisputeRecord | null;
  payment: PaymentRecord | null;
  mailingJob: MailingJobRecord | null;
}) {
  if (
    !dispute ||
    !payment ||
    ![
      "payment_required",
      "authorization_expired",
      "payment_failed",
      "payment_not_collected",
      "authorized",
      "ready_to_capture",
      "captured",
    ].includes(payment.status)
  ) {
    return null;
  }

  return (
    <section className="rounded-[1.8rem] border border-white/10 bg-[#111214]/94 p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.32)]">
      <div className="space-y-3">
        <p className="eyebrow">Payment status</p>
        <h3 className="font-display text-4xl uppercase leading-[0.92] tracking-[0.03em] text-white">
          Payment release status
        </h3>
        <p className="text-sm leading-7 text-zinc-300">
          No upfront fees. Payment only happens once your file is completed and approved for release.
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-zinc-300">
          <strong className="text-white">Workflow:</strong>{" "}
          {mailingStatusLabels[dispute.workflowStatus]}
        </div>
        <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-zinc-300">
          <strong className="text-white">Amount:</strong> $405 service release
        </div>
        <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-zinc-300">
          <strong className="text-white">Payment:</strong>{" "}
          {paymentStatusLabels[payment.status]}
        </div>
        <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.04] px-4 py-4 text-sm leading-7 text-zinc-300 sm:col-span-3">
          <strong className="text-white">Mailing gate:</strong>{" "}
          {mailingJob ? mailingProviderStatusLabels[mailingJob.providerStatus] : "waiting on release"}
        </div>
      </div>

      {payment?.status === "payment_required" ||
      payment?.status === "authorization_expired" ||
      payment?.status === "payment_failed" ||
      payment?.status === "payment_not_collected" ? (
        <div className="mt-5 rounded-[1.2rem] border border-rose-400/20 bg-rose-500/10 px-4 py-4 text-sm leading-7 text-rose-100">
          Your file is waiting on final release coordination before certified mailing can continue.
        </div>
      ) : null}

      {(payment?.status === "authorized" ||
        payment?.status === "ready_to_capture" ||
        payment?.status === "captured") ? (
        <div className="mt-5 rounded-[1.2rem] border border-emerald-400/20 bg-emerald-500/10 px-4 py-4 text-sm leading-7 text-emerald-100">
          Your payment method is secured for the final service step.
          {payment.authorizationExpiresAt
            ? ` Authorization currently expires ${new Date(payment.authorizationExpiresAt).toLocaleString()}.`
            : null}
        </div>
      ) : null}

    </section>
  );
}
