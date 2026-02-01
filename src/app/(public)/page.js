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
                Excellence in CBSE Education
              </h1>
              <p className="text-lg text-slate-600">
                Nursery to Grade VIII | 40+ Years of Educational Excellence
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm font-semibold">
              <Link href="/admissions" className="rounded-full bg-gradient-to-r from-sky-500 to-sky-600 px-7 py-3 text-white hover:from-sky-600 hover:to-sky-700 shadow-lg shadow-sky-500/30">
                Apply Now
              </Link>
              <Link
                href="/contact"
                className="rounded-full border-2 border-sky-300 px-7 py-3 text-sky-600 transition hover:border-sky-400 hover:bg-sky-50"
              >
                Contact Us
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Legacy", value: "40+" },
                { label: "Students", value: "1:20" },
                { label: "Grades", value: "K-8" },
              ].map((stat) => (
                <div key={stat.label} className="card-box rounded-2xl p-5 text-center">
                  <p className="text-3xl font-bold text-sky-600">{stat.value}</p>
                  <p className="text-xs uppercase tracking-wider text-slate-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="card-box rounded-3xl p-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-wider text-sky-600 font-semibold">
                <span>Admissions Open</span>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-700">2025-26</span>
              </div>
              <div className="mt-6 space-y-2 text-sm text-slate-600">
                <p>✓ Campus tours available</p>
                <p>✓ Meet with leadership</p>
                <p>✓ Seat confirmation in 7 days</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                { title: "Portal Access", desc: "Weekly updates for families" },
                { title: "Safe Campus", desc: "CCTV & GPS tracking" },
              ].map((item) => (
                <div key={item.title} className="card-box rounded-2xl p-4 text-sm">
                  <p className="text-xs uppercase tracking-wider text-sky-600 font-semibold">{item.title}</p>
                  <p className="mt-2 text-slate-600">{item.desc}</p>
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
              title: "Academic Excellence",
              desc: "Structured curriculum with transparent progress tracking",
            },
            {
              title: "Personal Mentorship",
              desc: "Dedicated mentors for every student's growth",
            },
            {
              title: "Parent Partnership",
              desc: "Regular updates and open communication",
            },
          ].map((item) => (
            <article key={item.title} className="card-box rounded-3xl p-6 text-center">
              <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-600">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-sky-200 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900">Learning Stages</h2>
            <p className="mt-3 text-slate-600">Age-appropriate curriculum for every grade</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { stage: "Early Years", focus: "Phonics & foundational skills" },
              { stage: "Primary", focus: "Core concepts & reading" },
              { stage: "Middle School", focus: "STEM & humanities depth" },
              { stage: "Activities", focus: "Arts, sports & clubs" },
            ].map((item) => (
              <article key={item.stage} className="card-box rounded-3xl p-6 text-center">
                <h3 className="text-base font-bold text-sky-600">{item.stage}</h3>
                <p className="mt-3 text-sm text-slate-600">{item.focus}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900">Campus Life</h2>
          <p className="mt-3 text-slate-600">A safe, structured environment for learning</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {["Mentor Support", "Health & Wellness", "24/7 Security", "Parent Portal"].map((item) => (
            <div key={item} className="card-box rounded-3xl p-6 text-center">
              <p className="text-base font-bold text-slate-900">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-sky-200 bg-gradient-to-b from-sky-50/50 to-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Join Us</h2>
              <p className="text-slate-600">
                Admissions open for Nursery to Grade VIII
              </p>
              <div className="space-y-3">
                {["Submit enquiry", "Campus visit", "Seat confirmation"].map(
                  (step, index) => (
                    <div key={step} className="flex gap-4 items-center">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 text-base font-bold text-sky-700">
                        {index + 1}
                      </span>
                      <p className="text-slate-900 font-medium">{step}</p>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="card-box rounded-3xl p-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-sky-600">Contact</h3>
              <div className="mt-6 space-y-4">
                <a href="tel:+918149065016" className="block text-xl font-bold text-slate-900">+91 81490 65016</a>
                <a href="mailto:dkteis@gmail.com" className="block text-sky-600 hover:text-sky-700">
                  dkteis@gmail.com
                </a>
                <p className="text-slate-600">KATP Road, Tardal</p>
                <p className="text-sm text-slate-500">Mon–Sat: 10 AM – 3 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="card-box rounded-3xl p-8 text-center lg:p-12">
          <h2 className="text-2xl font-bold text-slate-900 lg:text-3xl">"Excellence through discipline and care"</h2>
          <p className="mt-3 text-slate-600">Hon. Kallappanna B. Awade, Chairman</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/management" className="rounded-full bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-3 text-sm font-semibold text-white hover:from-sky-600 hover:to-sky-700 shadow-lg shadow-sky-500/30">
              Our Leadership
            </Link>
            <Link href="/about" className="rounded-full border-2 border-sky-300 px-6 py-3 text-sm font-semibold text-sky-600 hover:bg-sky-50">
              About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
