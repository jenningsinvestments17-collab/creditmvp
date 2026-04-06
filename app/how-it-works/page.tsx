import { Button } from "@/components/ui/Button";
import { PAYMENT_RELEASE_COPY } from "@/components/home/paymentCopy";

const processSteps = [
  {
    step: "01",
    title: "Start Intake",
    copy:
      "Open your file, understand the path, and frame the credit problem clearly before anything moves.",
  },
  {
    step: "02",
    title: "Upload Documents",
    copy:
      "Upload all 3 bureau reports, your valid ID, and proof of address so the file can move on real signal.",
  },
  {
    step: "03",
    title: "File Review",
    copy:
      "Review the file for negative items, reporting issues, and the strongest points of challenge.",
  },
  {
    step: "04",
    title: "Dispute Preparation",
    copy:
      "Prepare the dispute strategy and supporting structure for each account being challenged.",
  },
  {
    step: "05",
    title: "Admin Approval",
    copy:
      "Run the file through admin review so nothing gets released without final oversight.",
  },
  {
    step: "06",
    title: "Certified Mailing",
    copy:
      "Release disputes through certified mailing once the work is completed and approved for release.",
  },
  {
    step: "07",
    title: "Response Tracking",
    copy:
      "Track bureau responses, movement, and updates so the client can see progress clearly.",
  },
  {
    step: "08",
    title: "Reassessment & Next Moves",
    copy:
      "Reassess the file after responses come back and determine the next best move toward stronger credit positioning.",
  },
];

const prepPoints = [
  "Visible from intake to reassessment",
  "Clear upload and approval checkpoints",
  "Payment tied to approved release",
];

export default function HowItWorksPage() {
  return (
    <div className="page-rhythm">
      <section className="page-shell-light relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(198,169,107,0.14),transparent_24%),linear-gradient(180deg,transparent_0%,rgba(198,169,107,0.04)_100%)]" />

        <div className="relative section-stack">
          <div className="section-intro">
            <div className="space-y-4">
              <p className="eyebrow">How it works</p>
              <h1 className="display-title-lg text-text-dark">
                Eight clear moves.
              </h1>
            </div>
            <p className="section-copy">
              The process stays visible from intake to reassessment. Every step is structured so clients know what is needed, what happens next, and when payment becomes part of release.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <section className="panel-light">
              <div className="space-y-5">
                <div className="space-y-3">
                  <p className="eyebrow">What to expect</p>
                  <h2 className="display-title text-3xl text-text-dark md:text-5xl">
                    Structured from the first move.
                  </h2>
                </div>

                <div className="grid gap-3">
                  {prepPoints.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-black/10 bg-surface-light-soft px-4 py-4 text-sm leading-7 text-zinc-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>

              <p className="text-sm leading-7 text-zinc-500">
                The structure is meant to keep the file readable, not crowded.
              </p>
              <p className="text-sm leading-7 text-zinc-500">
                {PAYMENT_RELEASE_COPY}
              </p>
            </div>
            </section>

            <section className="panel-dark-soft">
              <div className="grid gap-4 md:grid-cols-2">
                {processSteps.map((step) => (
                  <article
                    key={step.step}
                    className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5"
                  >
                    <div className="mb-4 flex items-center gap-4">
                      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent/25 bg-accent/10 font-display text-xl uppercase tracking-[0.08em] text-accent">
                        {step.step}
                      </div>
                      <span className="h-px flex-1 bg-white/10" />
                    </div>
                    <h3 className="font-display text-3xl uppercase leading-[0.92] tracking-[0.03em] text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-zinc-400">{step.copy}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div className="flex flex-col gap-4 rounded-[1.8rem] border border-black/10 bg-white/72 p-6 md:flex-row md:items-center md:justify-between md:p-7">
            <div className="space-y-2">
              <p className="eyebrow">Start the process</p>
              <p className="text-base leading-8 text-zinc-700">
                If you are ready to begin, the next step is simple: start the intake
                and open the file the right way.
              </p>
            </div>
            <Button href="/intake">Start Your Credit Review</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
