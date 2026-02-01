import Link from "next/link";

import { prisma } from "@/lib/prisma";

function contentClasses() {
  return [
    "text-zinc-700",
    "leading-7",
    "text-sm",
    "[&_h2]:mt-8",
    "[&_h2]:text-xl",
    "[&_h2]:font-semibold",
    "[&_h2]:text-zinc-900",
    "[&_p]:mt-3",
    "[&_a]:text-zinc-900",
    "[&_a]:underline",
    "[&_hr]:my-6",
    "[&_hr]:border-zinc-200",
  ].join(" ");
}

export default async function Home() {
  let dkteis = null;
  try {
    if (prisma?.sitePage?.findUnique) {
      dkteis = await prisma.sitePage.findUnique({
        where: { slug: "dkteis-home" },
        select: { title: true, contentHtml: true, content: true, isPublished: true },
      });
    }
  } catch {
    dkteis = null;
  }

  if (dkteis?.isPublished) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">{dkteis.title}</h1>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white hover:bg-zinc-800"
            >
              Portal Login
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-900 hover:bg-zinc-50"
            >
              Contact
            </Link>
          </div>

          <div className="mt-6">
            {dkteis.contentHtml ? (
              <div className={contentClasses()} dangerouslySetInnerHTML={{ __html: dkteis.contentHtml }} />
            ) : (
              <div className="whitespace-pre-wrap text-sm leading-7 text-zinc-700">{dkteis.content}</div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-slate-50">
      <section className="relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-slate-700/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-slate-700/30 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-300">DKTE International School</p>
              <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
                A professional CBSE school built on four decades of academic excellence.
              </h1>
              <p className="mt-4 text-base leading-7 text-slate-200">
                We provide a structured learning environment with strong values, modern pedagogy,
                and a culture of excellence that prepares students for the future.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/login"
                  className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
                >
                  Portal Login
                </a>
                <a
                  href="/admissions"
                  className="rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
                >
                  Admissions
                </a>
                <a
                  href="/contact"
                  className="rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10"
                >
                  Contact Us
                </a>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/80">
                  <span className="font-semibold text-white">Admissions Open</span> for the current academic year.
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/80">
                  <span className="font-semibold text-white">CBSE Curriculum</span> with modern pedagogy.
                </div>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold">At a Glance</h2>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs">CBSE</span>
                </div>
                <div className="mt-6 grid gap-4 text-sm text-slate-200">
                  {[
                    { label: "Experience", value: "40+ Years" },
                    { label: "Approach", value: "Student-Centric" },
                    { label: "Location", value: "Tardal" },
                    { label: "Focus", value: "Holistic Growth" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                      <span>{item.label}</span>
                      <span className="font-semibold text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Why DKTE International School</h2>
              <p className="mt-2 text-sm text-slate-600">A professional learning ecosystem built for outcomes.</p>
            </div>
            <div className="hidden sm:flex h-px w-32 bg-slate-200" />
          </div>
          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
            <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Structured Curriculum", desc: "CBSE-aligned, rigorously planned, and delivered with modern pedagogy." },
              { title: "Student-Centered Mentoring", desc: "Focused guidance, disciplined routine, and supportive faculty." },
              { title: "Safe Campus", desc: "Secure environment with infrastructure that supports learning and growth." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
                <div className="h-1 w-10 rounded-full bg-slate-900" />
                <h3 className="mt-4 text-sm font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Academic Promise</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                A balanced curriculum, supportive mentorship, and modern facilities that enable
                students to build strong foundations and excel in every domain.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {["Learning Environment", "Student Development"].map((item) => (
                  <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="text-xs font-semibold text-slate-900">{item}</div>
                    <p className="mt-2 text-xs text-slate-600">
                      Structured routines, strong values, and co-curricular excellence.
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">Vision & Mission</h3>
              <div className="mt-4 space-y-4 text-sm text-slate-600">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <span className="text-xs font-semibold text-slate-900">Vision</span>
                  <p className="mt-2">
                    Education should be joyful; we nurture creativity so students discover their niche.
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <span className="text-xs font-semibold text-slate-900">Mission</span>
                  <p className="mt-2">
                    Provide a stimulating learning experience that supports social, emotional,
                    physical, and cognitive development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Campus Gallery</h2>
              <p className="mt-2 text-sm text-slate-600">A glimpse into our learning spaces and facilities.</p>
            </div>
            <div className="hidden sm:flex h-px w-32 bg-slate-200" />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { src: "/images/campus-1.svg", label: "Campus View" },
              { src: "/images/campus-2.svg", label: "Library" },
              { src: "/images/campus-3.svg", label: "Science Labs" },
              { src: "/images/campus-4.svg", label: "Classrooms" },
              { src: "/images/campus-5.svg", label: "Sports Ground" },
              { src: "/images/campus-6.svg", label: "Activities" },
            ].map((item) => (
              <div key={item.label} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
                <img src={item.src} alt={item.label} className="h-48 w-full object-cover" />
                <div className="border-t border-slate-200 bg-white px-4 py-3">
                  <div className="text-sm font-semibold text-slate-900">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
