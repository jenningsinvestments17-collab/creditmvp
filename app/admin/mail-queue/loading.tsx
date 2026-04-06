export default function LoadingAdminMailQueue() {
  return (
    <div className="page-rhythm">
      <section className="page-shell-light relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(198,169,107,0.14),transparent_24%),linear-gradient(180deg,transparent_0%,rgba(198,169,107,0.04)_100%)]" />
        <div className="relative section-stack">
          <div className="rounded-[1.8rem] border border-black/10 bg-white/78 p-6 shadow-panel md:p-7">
            <p className="eyebrow">Admin mail queue</p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-[0.92] tracking-[0.03em] text-text-dark">
              Loading queue.
            </h2>
            <div className="mt-6 grid gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-32 rounded-[1.2rem] border border-black/10 bg-surface-light-soft" />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
