"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="page-rhythm">
      <section className="relative overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(198,169,107,0.18),transparent_22%),linear-gradient(180deg,#09090b_0%,#0f1014_42%,#111216_100%)]" />
        <div className="relative mx-auto flex w-full max-w-[900px] flex-col gap-5 rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.32)]">
          <p className="eyebrow">Admin dashboard error</p>
          <h1 className="font-display text-4xl uppercase leading-[0.92] tracking-[0.03em] text-white">
            The admin page could not finish loading.
          </h1>
          <p className="text-sm leading-7 text-zinc-300">
            A server-side error interrupted the dashboard load. Try again, and if it continues, use the digest below in your deployment logs.
          </p>
          {error.digest ? (
            <div className="rounded-[1rem] border border-white/10 bg-black/20 px-4 py-4 text-sm leading-7 text-zinc-300">
              Digest: {error.digest}
            </div>
          ) : null}
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-12 w-fit items-center justify-center rounded-[0.95rem] border border-accent/60 bg-accent px-5 text-sm font-semibold uppercase tracking-[0.08em] text-black transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-soft hover:bg-accent-soft"
          >
            Retry Admin Load
          </button>
        </div>
      </section>
    </div>
  );
}
