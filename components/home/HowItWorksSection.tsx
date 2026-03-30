import { Button } from "@/components/ui/Button";
import { PAYMENT_RELEASE_COPY } from "@/components/home/paymentCopy";

const fullSteps = [
  {
    title: "Start Intake",
    copy: "Open your file, understand the path, and frame the credit problem clearly before anything moves.",
    step: "01",
  },
  {
    title: "Upload Documents",
    copy: "Upload all 3 bureau reports, your valid ID, and proof of address so the file can move on real signal.",
    step: "02",
  },
  {
    title: "File Review",
    copy: "Review the file for negative items, reporting issues, and the strongest points of challenge.",
    step: "03",
  },
  {
    title: "Dispute Preparation",
    copy: "Prepare the dispute strategy and supporting structure for each account being challenged.",
    step: "04",
  },
  {
    title: "Admin Approval",
    copy: "Run the file through admin review so nothing gets released without final oversight.",
    step: "05",
  },
  {
    title: "Certified Mailing",
    copy: "Release disputes through certified mailing once the work is completed and approved for release.",
    step: "06",
  },
  {
    title: "Response Tracking",
    copy: "Track bureau responses, movement, and updates so the client can see progress clearly.",
    step: "07",
  },
  {
    title: "Reassessment & Next Moves",
    copy: "Reassess the file after responses come back and determine the next best move toward stronger credit positioning.",
    step: "08",
  },
];

const mobileSteps = [
  {
    title: "Start Intake",
    copy: "Open your file and see the path clearly.",
    step: "01",
  },
  {
    title: "Upload Documents",
    copy: "Add all 3 reports, ID, and proof of address.",
    step: "02",
  },
  {
    title: "We Handle the Review",
    copy: "We review, prepare, and move the file toward release.",
    step: "03",
  },
];

export function HowItWorksSection() {
  return (
    <section className="section-light-soft soft-divider p-6 md:p-8">
      <div className="section-stack">
        <div className="section-intro">
          <div className="space-y-4">
            <p className="eyebrow">How it works</p>
            <h2 className="display-title-lg">Eight clear moves.</h2>
          </div>
          <p className="section-copy hidden md:block">
            The process stays visible from intake to reassessment. Every step is structured so clients know what is needed, what happens next, and when payment becomes part of release.
          </p>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 md:hidden">
            Three simple stages keep the file moving and the next step clear.
          </p>
        </div>

        <div className="grid gap-4 md:hidden">
          {mobileSteps.map((step) => (
            <article
              key={step.step}
              className="rounded-[1.55rem] border border-black/10 bg-white/70 p-5 shadow-panel"
            >
              <div className="mb-4 flex items-center gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent/25 bg-accent/10 font-display text-xl uppercase tracking-[0.08em] text-[#7d6434]">
                  {step.step}
                </span>
                <h3 className="font-display text-2xl uppercase leading-[0.95] tracking-[0.03em] text-text-dark">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm leading-7 text-zinc-700">{step.copy}</p>
            </article>
          ))}

          <details className="rounded-[1.55rem] border border-black/10 bg-white/70 p-5 shadow-panel">
            <summary className="cursor-pointer list-none text-sm font-semibold uppercase tracking-[0.12em] text-[#7d6434]">
              View Full 8-Step Process
            </summary>
            <div className="mt-5 grid gap-4">
              {fullSteps.map((step, index) => (
                <article
                  key={step.step}
                  className={`rounded-[1.25rem] border p-4 ${
                    index === 1 || index === 5
                      ? "border-white/10 bg-background-soft text-white"
                      : "border-black/10 bg-surface-light-soft text-text-dark"
                  }`}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/25 bg-accent/10 font-display text-lg uppercase tracking-[0.08em] text-[#7d6434]">
                      {step.step}
                    </span>
                    <h3 className="font-display text-2xl uppercase leading-[0.95] tracking-[0.03em] [overflow-wrap:anywhere]">
                      {step.title}
                    </h3>
                  </div>
                  <p className={`text-sm leading-7 ${index === 1 || index === 5 ? "text-zinc-300" : "text-zinc-700"}`}>
                    {step.copy}
                  </p>
                </article>
              ))}
            </div>
          </details>
        </div>

        <div className="hidden gap-5 md:grid md:grid-cols-2 xl:grid-cols-4">
          {fullSteps.map((step, index) => (
            <article
              key={step.step}
              className={`min-w-0 rounded-[1.8rem] border p-6 shadow-panel transition-colors duration-200 md:p-7 ${
                index === 1 || index === 5
                  ? "border-white/10 bg-background-soft text-white"
                  : "border-black/10 bg-white/68 text-text-dark"
              }`}
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent/25 bg-accent/10 font-display text-2xl uppercase tracking-[0.08em] text-[#7d6434]">
                  {step.step}
                </span>
                <span
                  className={`h-px flex-1 ${
                    index === 1 ? "bg-white/10" : "bg-black/10"
                  }`}
                />
              </div>

              <div className="space-y-3">
                <h3 className="font-display break-words text-3xl uppercase leading-[0.92] tracking-[0.03em] [overflow-wrap:anywhere] md:text-[2rem]">
                  {step.title}
                </h3>
                <p
                  className={`text-base leading-8 ${
                    index === 1 || index === 5 ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  {step.copy}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-col gap-4 rounded-[1.8rem] border border-black/10 bg-white/62 p-6 md:flex-row md:items-center md:justify-between md:p-7">
          <div className="space-y-2">
            <p className="eyebrow">Ready to start</p>
            <p className="text-sm leading-7 text-zinc-700 md:text-base md:leading-8">
              {PAYMENT_RELEASE_COPY}
            </p>
          </div>
          <Button href="/intake">Start Your Credit Review</Button>
        </div>
      </div>
    </section>
  );
}
