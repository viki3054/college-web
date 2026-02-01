import ChairmanMessage from "@/components/public/ChairmanMessage";

export default function ChairmanPage() {
  return (
    <div className="bg-[#030712] text-white">
      <section className="relative isolate overflow-hidden px-6 py-20">
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#80a8ff]/20 blur-[140px]" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#79ffe0]">
            Leadership Message
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-tight lg:text-5xl">
            Chairman's Vision
          </h1>
          <p className="mt-6 text-lg text-[#c1cbea]">
            Hon. Kallappanna B. Awade on DKTE Society's values and extending educational excellence to younger learners.
          </p>
        </div>
      </section>

      <section className="bg-[#fdfbf6] border-y border-[#e6dfcf]">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <div className="rounded-3xl border border-[#d9d4c7] bg-white p-8 text-sm text-[#4e5661]">
            <ChairmanMessage />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c0912f]">In practice</p>
          <p className="mt-3 text-sm text-[#4e5661]">
            The message guides day-to-day decisions on academics, safety, and community-building for Nursery to Grade VIII.
            Families meet leadership during campus visits and at scheduled PTMs.
          </p>
        </div>
      </section>
    </div>
  );
}

export const metadata = { title: "Chairman's Message - DKTE International School" };