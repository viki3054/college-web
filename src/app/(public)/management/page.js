export const metadata = { title: "Management - DKTE International School" };

export default function ManagementPage() {
  return (
    <div className="bg-slate-50">
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Management</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Management</h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              Leadership grounded in values, academic excellence, and a commitment to student well-being.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="h-16 w-16 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-semibold">
              Hon.
            </div>
            <h2 className="mt-4 text-lg font-semibold text-slate-900">Hon. Kallappanna B. Awade</h2>
            <p className="text-sm text-slate-500">Chairman</p>
            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
              D.K.T.E. Society Founder President
            </div>
          </div>
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="h-1 w-10 rounded-full bg-slate-900" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">Chairman’s Message</h3>
            <div className="mt-4 space-y-4 text-sm leading-6 text-slate-600">
              <p>
                Dear Students, Parents, and Faculty, I am honored to address you as the Chairman of our esteemed
                institution and share with you the general vision that guides our school.
              </p>
              <p>
                At DKTE International School, we believe education is the key to unlocking the full potential of
                every individual. Our vision is to create a nurturing learning environment that empowers students
                to become confident, responsible, and compassionate global citizens.
              </p>
              <p>
                We are committed to academic excellence through a rigorous and well-rounded curriculum that
                fosters critical thinking, creativity, and problem-solving skills.
              </p>
              <p>
                Our dedicated educators continuously strive for excellence to provide a supportive and inspiring
                educational experience for each student.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {["Academic Excellence", "Student Well-being", "Parent Partnership"].map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
              <div className="text-sm font-semibold text-slate-900">{item}</div>
              <p className="mt-2 text-sm text-slate-600">
                A focused, ethical, and collaborative approach to school leadership.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { src: "/images/campus-1.svg", label: "Campus" },
            { src: "/images/campus-4.svg", label: "Classrooms" },
            { src: "/images/campus-2.svg", label: "Library" },
          ].map((item) => (
            <div key={item.label} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
              <img src={item.src} alt={item.label} className="h-36 w-full object-cover" />
              <div className="border-t border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}