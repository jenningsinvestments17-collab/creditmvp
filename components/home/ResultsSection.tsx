import { Button } from "@/components/ui/Button";

const proofCards = [
  {
    label: "Collections removed",
    value: "7 collections removed",
    copy:
      "A cleaner file can change what lenders and landlords see first.",
  },
  {
    label: "Consumer-rights recovery",
    value: "$100,000+ recovered",
    copy:
      "Strong review and escalation can create real leverage when reporting breaks down.",
  },
  {
    label: "Vehicle opportunity",
    value: "Approved for better terms",
    copy:
      "A cleaner file can create better leverage for transportation, financing, and everyday mobility decisions.",
  },
  {
    label: "Ownership progress",
    value: "Closer to homeownership",
    valueClassName:
      "text-[1.85rem] sm:text-[2.1rem] md:text-[2rem] xl:text-[2.45rem]",
    copy:
      "Proof that better credit is not abstract. It changes what becomes reachable in real life.",
  },
];

const testimonialCards = [
  {
    quote:
      "The process finally felt visible. I was not guessing anymore, and that changed how I moved.",
    person: "Client story placeholder",
  },
  {
    quote:
      "What stood out most was how clear everything felt. The results mattered, but the structure mattered too.",
    person: "Client story placeholder",
  },
];

const trustItems = [
  "Client wins tracked with clarity",
  "Consumer-rights outcomes where appropriate",
  "Approval momentum tied to better credit positioning",
  "Built to show real movement, not vague promises",
];

export function ResultsSection() {
  return (
    <section className="section-light soft-divider relative overflow-hidden p-6 md:p-8">
      <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(198,169,107,0.14),transparent_58%)]" />

      <div className="section-stack relative">
        <div className="section-intro">
          <div className="space-y-4">
            <p className="eyebrow">Real results</p>
            <h2 className="display-title-lg">Proof in motion.</h2>
          </div>
          <p className="section-copy hidden md:block">
            Better credit should feel visible in real outcomes. This section is built
            to show movement, trust, and transformation without turning the page into
            a cheap stats wall.
          </p>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 md:hidden">
            Real proof should be easy to scan. These are the strongest signals clients look for first.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:items-start">
          <div className="grid min-w-0 auto-rows-fr gap-5 md:grid-cols-2">
            {proofCards.map((card, index) => (
              <article
                key={card.value}
                className={`flex min-w-0 flex-col rounded-[1.9rem] border p-6 shadow-panel transition-colors duration-200 md:p-7 ${
                  index < 2
                    ? "border-white/10 bg-background-soft text-white"
                    : "border-black/10 bg-white/78 text-text-dark"
                } ${index > 1 ? "hidden md:flex" : ""}`}
              >
                <p
                  className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${
                    index < 2 ? "text-accent" : "text-[#7d6434]"
                  }`}
                >
                  {card.label}
                </p>
                <h3
                  className={`mt-4 break-words font-display text-3xl uppercase leading-[0.92] tracking-[0.03em] [overflow-wrap:anywhere] md:text-5xl ${
                    card.valueClassName ?? ""
                  }`}
                >
                  {card.value}
                </h3>
                <p
                  className={`mt-4 text-sm leading-7 md:text-base md:leading-8 ${
                    index < 2 ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  {card.copy}
                </p>
              </article>
            ))}
          </div>

          <div className="grid min-w-0 gap-5 xl:auto-rows-fr">
            <article className="hidden rounded-[1.9rem] border border-black/10 bg-white/78 p-6 shadow-panel md:block md:p-7 xl:h-full">
              <p className="eyebrow">Trust signals</p>
              <div className="mt-5 grid gap-3">
                {trustItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-black/10 bg-surface-light-soft px-4 py-4 text-sm leading-7 text-zinc-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[1.9rem] border border-accent/20 bg-accent/10 p-6 shadow-panel md:p-7 xl:h-full">
              <p className="eyebrow">Ready to start</p>
              <h3 className="mt-3 font-display break-words text-4xl uppercase leading-[0.92] tracking-[0.03em] text-text-dark [overflow-wrap:anywhere]">
                Start the review before the next opportunity passes by.
              </h3>
              <p className="mt-4 text-sm leading-7 text-zinc-700 md:text-base md:leading-8">
                Start with intake, upload what is needed, and move into review without guessing.
              </p>
              <div className="mt-6">
                <Button href="/intake">Start Your Credit Review</Button>
              </div>
            </article>
          </div>
        </div>

        <div className="hidden gap-5 md:grid md:grid-cols-2">
          {testimonialCards.map((item) => (
            <article
              key={item.quote}
                className="rounded-[1.9rem] border border-black/10 bg-white/70 p-6 shadow-panel md:p-7"
            >
              <p className="text-lg leading-8 text-zinc-700">"{item.quote}"</p>
              <p className="mt-4 text-sm uppercase tracking-[0.18em] text-zinc-500">
                {item.person}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
