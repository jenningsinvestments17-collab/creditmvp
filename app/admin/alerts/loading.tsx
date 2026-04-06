export default function LoadingAdminAlerts() {
  return (
    <div className="page-rhythm">
      <section className="relative overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(198,169,107,0.18),transparent_22%),linear-gradient(180deg,#09090b_0%,#111216_100%)]" />
        <div className="relative mx-auto flex w-full max-w-[1500px] flex-col gap-6">
          <div className="rounded-[1.8rem] border border-white/10 bg-[#121215]/92 p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.36)]">
            <p className="eyebrow">Alert center</p>
            <h3 className="mt-3 font-display text-4xl uppercase leading-[0.92] tracking-[0.03em] text-white">
              Loading alerts.
            </h3>
            <div className="mt-6 grid gap-4 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="rounded-[1.25rem] border border-white/10 bg-white/[0.04] p-4">
                  <div className="h-4 w-28 rounded bg-white/10" />
                  <div className="mt-4 grid gap-3">
                    <div className="h-16 rounded bg-white/10" />
                    <div className="h-16 rounded bg-white/10" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
