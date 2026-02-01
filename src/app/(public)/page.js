import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  let heroContent = null;

  try {
    heroContent = await prisma.sitePage.findUnique({
      where: { slug: "dkteis-home" },
      select: {
        title: true,
        content: true,
        isPublished: true,
      },
    });
  } catch (error) {
    heroContent = null;
  }

  return (
    <div>
      <section className="relative isolate overflow-hidden px-6 py-20">
        <div className="absolute inset-0 -z-10 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-white to-blue-50" />
          <div className="absolute -top-32 left-10 h-72 w-72 rounded-full bg-sky-300/40 blur-[140px]" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-200/30 blur-[180px]" />
        </div>

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300 px-5 py-2 text-xs uppercase tracking-[0.3em] text-sky-600">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-600" />
              DKTE INTERNATIONAL SCHOOL
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
                A future-ready CBSE campus with calm discipline and vibrant curiosity.
              </h1>
              <p className="text-base text-slate-600">
                Nursery to Grade VIII | Guided by D.K.T.E. Society | Structured mentorship, transparent communication,
                and purposeful spaces where every learner is seen.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm font-semibold">
              <Link href="/admissions" className="rounded-full bg-gradient-to-r from-sky-500 to-sky-600 px-7 py-3 text-white hover:from-sky-600 hover:to-sky-700">
                Book a campus walk
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-sky-300 px-7 py-3 text-sky-600 transition hover:border-sky-400 hover:bg-sky-50"
              >
                Talk to admissions
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Years", value: "40+" },
                { label: "Grades", value: "Nursery–VIII" },
                { label: "Ratio", value: "1:20" },
              ].map((stat) => (
                <div key={stat.label} className="glass-panel rounded-2xl p-4 text-center">
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-[11px] uppercase tracking-[0.4em] text-sky-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass-panel rounded-[32px] p-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-sky-600">
                <span>Admissions 2025-26</span>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-[11px] font-semibold text-sky-700">Now open</span>
              </div>
              <div className="mt-6 space-y-3 text-sm text-slate-600">
                <p>Guided campus immersion + leadership interaction</p>
                <p>Pastoral readiness briefing and documentation review</p>
                <p>Seat confirmation within 7 days of the visit</p>
              </div>
              {heroContent?.isPublished ? (
                <div className="mt-6 rounded-2xl border border-sky-200 bg-sky-50/50 p-4 text-sm text-slate-600">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-sky-600">Leadership note</p>
                  <p className="mt-2 leading-6 line-clamp-4">{heroContent.content || heroContent.title}</p>
                </div>
              ) : null}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                { title: "Portal briefs", desc: "Weekly snapshots for families." },
                { title: "Safety tier", desc: "Verified transport + CCTV." },
              ].map((item) => (
                <div key={item.title} className="glass-panel rounded-2xl p-4 text-sm text-slate-600">
                  <p className="text-xs uppercase tracking-[0.35em] text-sky-600">{item.title}</p>
                  <p className="mt-2">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Academic architecture",
              desc: "Publishing term blueprints, lesson essentials, and study labs keeps progress transparent.",
            },
            {
              title: "Human-centred culture",
              desc: "Pastoral mentors track wellbeing, attendance, and clubs so every learner feels known.",
            },
            {
              title: "Parent partnership",
              desc: "Portal digests, PTMs, and rapid support loops give families clarity at every stage.",
            },
          ].map((item) => (
            <article key={item.title} className="glass-panel rounded-3xl p-6">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-sky-600">{item.title}</p>
              <p className="mt-3 text-sm text-slate-600">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-sky-200 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="space-y-5">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-600">Academic spine</p>
              <h2 className="text-3xl font-bold text-slate-900">Structured blocks that flex for curiosity.</h2>
              <p className="text-sm text-slate-600">
                Every six-week cycle ships learning objectives, lab integration, formative checks, and enrichment prompts.
                Coordinators, mentors, and faculty collaborate through shared dashboards so transitions feel seamless.
              </p>
              <div className="rounded-3xl border border-sky-200 bg-white p-4 text-sm text-slate-600">
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-600">What families see</p>
                <p className="mt-2">Planner releases · rubrics · reading grids · intervention notes.</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                { stage: "Early years", focus: "Foundational readiness, phonics, numeracy play, sensory labs." },
                { stage: "Primary", focus: "Concept clarity, bilingual reading routes, reflective journals." },
                { stage: "Middle", focus: "STEM depth, humanities studios, leadership councils." },
                { stage: "Beyond classroom", focus: "Service clubs, robotics leagues, arts residencies." },
              ].map((item) => (
                <article key={item.stage} className="glass-panel rounded-3xl p-5 text-sm text-slate-600">
                  <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-600">{item.stage}</p>
                  <p className="mt-2">{item.focus}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-600">Campus rhythm</p>
            <h2 className="text-3xl font-bold text-slate-900">Calm mornings, electric afternoons.</h2>
            <ul className="space-y-3 text-sm text-slate-600">
              {[
                "Arrival rituals, wellbeing check-ins, and intention setting.",
                "Academic blocks with micro-labs and reading lounges built-in.",
                "Club circuits across robotics, arts, athletics, and service pods.",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-600" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-4">
            {["Mentor advisories", "Hydration + wellness bays", "Smart surveillance", "Parent digests"].map((item) => (
              <div key={item} className="glass-panel rounded-3xl p-5 text-sm text-slate-600">
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-600">{item}</p>
                <p className="mt-2">Always-on systems that keep the campus predictable and safe.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-sky-200 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-600">Admissions pathway</p>
              <h2 className="text-3xl font-bold text-slate-900">Transparent, guided, human.</h2>
              <p className="text-sm text-slate-600">
                Seats open for Nursery to Grade VIII. Age criteria follow CBSE guidelines. A dedicated counsellor keeps
                families updated from enquiry to onboarding.
              </p>
              <div className="space-y-3">
                {["Submit enquiry + student profile", "Campus walk + leadership interaction", "Documentation + seat confirmation"].map(
                  (step, index) => (
                    <div key={step} className="flex gap-4 text-sm text-slate-600">
                      <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-semibold text-sky-700">
                        {index + 1}
                      </span>
                      <p>{step}</p>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="glass-panel rounded-[32px] p-6 text-sm text-slate-600">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-sky-600">
                <span>Admissions office</span>
                <span>Mon–Sat · 10 AM – 3 PM</span>
              </div>
              <div className="mt-6 space-y-3 text-base font-semibold text-slate-900">
                <a href="tel:+918149065016">+91 81490 65016</a>
                <a href="mailto:dkteis@gmail.com" className="text-sm font-medium text-slate-600">
                  dkteis@gmail.com
                </a>
                <p className="text-sm font-medium text-slate-600">KATP Road, Tardal</p>
              </div>
              <div className="mt-6 space-y-2 text-sm text-slate-600">
                <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-600">Documents</p>
                <p>Birth certificate · previous school record · immunisation · parent ID · photographs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="glass-panel flex flex-col gap-6 rounded-[32px] p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-600">Leadership note</p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900">"Discipline and warmth are inseparable."</h2>
            <p className="text-sm text-slate-600">Hon. Kallappanna B. Awade · Chairman, DKTE International School</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-semibold">
            <Link href="/management" className="rounded-full bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-3 text-white hover:from-sky-600 hover:to-sky-700">
              Meet the leadership
            </Link>
            <Link href="/chairman" className="rounded-full border border-sky-300 px-6 py-3 text-sky-600 hover:bg-sky-50">
              Read message
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
