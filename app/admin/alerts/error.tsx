"use client";

export default function AdminAlertsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="page-rhythm">
      <section className="relative overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(198,169,107,0.18),transparent_22%),linear-gradient(180deg,#09090b_0%,#111216_100%)]" />
        <div className="relative mx-auto flex w-full max-w-[1500px] flex-col gap-6">
          <div className="rounded-[1.8rem] border border-rose-400/20 bg-rose-500/10 p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.36)]">
            <p className="eyebrow">Alert center</p>
            <h3 className="mt-3 font-display text-4xl uppercase leading-[0.92] tracking-[0.03em] text-white">
              Alerts could not be loaded.
            </h3>
            <p className="mt-4 text-sm leading-7 text-rose-100">
              {error.message || "An unexpected error occurred while loading alerts."}
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-[0.95rem] border border-white/15 bg-white/[0.08] px-5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/35 hover:text-accent"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
