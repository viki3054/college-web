export default function ChairmanMessage() {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Hon. Kallappanna B. Awade (Dada)</h2>
          <p className="text-sm text-slate-500">Founder President, D.K.T.E. Society</p>
        </div>
        <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
          DKTE
        </div>
      </div>

      <div className="mt-6 space-y-4 text-sm leading-6 text-slate-600">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p>
            D.K.T.E. Society has been serving the cause of education for more than four decades.
            We have been committed to providing quality education from KG to Ph.D. level.
          </p>
        </div>
        <p>
          Our International School at Tardal is one of our dream projects, designed to nurture
          young minds with the finest educational practices. We believe that education should
          be a joyful experience where every child discovers their unique strengths and talents.
        </p>
        <p>
          Through our CBSE curriculum and innovative teaching methodologies, we aim to develop
          well-rounded individuals who are prepared to face the challenges of tomorrow. Our
          focus is not just on academic excellence but also on character building and
          value-based education.
        </p>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="font-medium text-slate-900">
            I invite you to be a part of our educational journey where we transform young
            learners into confident, responsible, and successful individuals ready to
            contribute to society.
          </p>
        </div>
      </div>
    </div>
  );
}