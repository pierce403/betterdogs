import Link from 'next/link';

const benefits = [
  {
    title: 'Personalized Training Plan',
    description: 'Get a program tailored to your dog\'s age, breed, and behavior goals in under 48 hours.',
  },
  {
    title: 'Weekly Video Feedback',
    description: 'Upload practice clips and receive practical coach feedback with clear next steps.',
  },
  {
    title: 'Progress You Can Measure',
    description: 'Track wins over time with training cases, milestones, and accountability check-ins.',
  },
];

export default function Page() {
  return (
    <div className="space-y-10 pb-12">
      <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 px-8 py-14 text-white shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">BetterDogs coaching</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          Remote dog training with a real coach
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-100 md:text-lg">
          Build calm leash walks, reliable recall, and better behavior at home with a coach that reviews your
          videos and guides every step.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            href="/signup"
          >
            Start now
          </Link>
          <Link
            className="rounded-md border border-slate-300/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            href="/pricing"
          >
            View pricing
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {benefits.map((benefit) => (
          <article key={benefit.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{benefit.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">{benefit.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
