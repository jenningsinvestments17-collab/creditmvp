"use client";

export default function AdminMailQueueError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="page-rhythm">
      <section className="page-shell-light relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(198,169,107,0.14),transparent_24%),linear-gradient(180deg,transparent_0%,rgba(198,169,107,0.04)_100%)]" />
        <div className="relative section-stack">
          <div className="rounded-[1.8rem] border border-rose-400/20 bg-rose-500/10 p-6 text-rose-900 shadow-panel md:p-7">
            <p className="eyebrow">Admin mail queue</p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-[0.92] tracking-[0.03em] text-text-dark">
              Queue could not be loaded.
            </h2>
            <p className="mt-4 text-sm leading-7">
              {error.message || "An unexpected error occurred while loading the mail queue."}
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-[0.95rem] border border-black/10 bg-white px-5 text-sm font-semibold uppercase tracking-[0.08em] text-text-dark transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/45 hover:text-[#7d6434]"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
