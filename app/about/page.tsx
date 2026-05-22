import Link from 'next/link';

const services = [
  {
    title: '1:1 Remote Coaching',
    description:
      'Each family gets a dedicated trainer who reviews your goals, builds a week-by-week plan, and adapts it as your dog improves.'
  },
  {
    title: 'Behavior Case Tracking',
    description:
      'Every dog has a case timeline with notes, milestones, and outcomes so progress is visible to both trainer and owner.'
  },
  {
    title: 'Video Review Feedback',
    description:
      'Upload training clips and receive practical feedback, corrections, and homework focused on your next best step.'
  },
  {
    title: 'Program Templates',
    description:
      'Use trainer-guided plans for recall, leash manners, impulse control, crate training, and household behavior foundations.'
  }
];

const workflow = [
  {
    step: '1. Start with your goals',
    detail:
      'Create an account, add your dog, and describe your top priorities (for example: pulling, barking, recall, or reactivity).'
  },
  {
    step: '2. Build a tailored plan',
    detail:
      'Your trainer creates a personalized training case with clear milestones, daily exercises, and realistic expectations.'
  },
  {
    step: '3. Practice and upload',
    detail:
      'You run short training sessions at home and share progress videos so your trainer can assess technique and timing.'
  },
  {
    step: '4. Get feedback and iterate',
    detail:
      'Your trainer provides coaching notes, adjusts drills, and updates the case timeline to keep progress consistent.'
  },
  {
    step: '5. Graduate with confidence',
    detail:
      'As goals are achieved, you receive maintenance guidance to make good behavior reliable in real-world situations.'
  }
];

export default function AboutPage() {
  return (
    <div className='space-y-12 pb-12'>
      <section className='rounded-2xl bg-slate-900 px-8 py-12 text-white'>
        <p className='text-sm font-semibold uppercase tracking-[0.2em] text-sky-300'>About BetterDogs</p>
        <h1 className='mt-3 text-4xl font-bold leading-tight md:text-5xl'>How BetterDogs works</h1>
        <p className='mt-5 max-w-3xl text-base leading-7 text-slate-100 md:text-lg'>
          BetterDogs is a remote dog training platform that combines expert coaching with a structured progress system.
          We help owners turn training goals into repeatable habits through clear plans, video feedback, and measurable
          milestones.
        </p>
      </section>

      <section className='space-y-4'>
        <h2 className='text-2xl font-bold text-slate-900'>Services we offer</h2>
        <p className='max-w-3xl text-slate-700'>
          Our coaching model is designed for busy owners who want expert support without in-person scheduling limits.
        </p>
        <div className='grid gap-4 md:grid-cols-2'>
          {services.map((service) => (
            <article key={service.title} className='rounded-xl border border-slate-200 bg-white p-5 shadow-sm'>
              <h3 className='text-lg font-semibold text-slate-900'>{service.title}</h3>
              <p className='mt-2 text-sm leading-6 text-slate-700'>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className='space-y-4'>
        <h2 className='text-2xl font-bold text-slate-900'>Step-by-step training flow</h2>
        <ol className='space-y-3'>
          {workflow.map((item) => (
            <li key={item.step} className='rounded-xl border border-slate-200 bg-white p-5 shadow-sm'>
              <h3 className='text-base font-semibold text-slate-900'>{item.step}</h3>
              <p className='mt-1 text-sm leading-6 text-slate-700'>{item.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className='rounded-2xl border border-sky-100 bg-sky-50 px-6 py-8'>
        <h2 className='text-2xl font-bold text-slate-900'>Who BetterDogs is for</h2>
        <p className='mt-3 max-w-3xl text-sm leading-7 text-slate-700 md:text-base'>
          BetterDogs is built for first-time dog owners, rescue dog adopters, and experienced handlers who want
          structure, accountability, and expert input. Whether your goal is easier walks, calmer home behavior, or
          advanced reliability, our platform keeps everyone aligned on what to do next.
        </p>
        <div className='mt-6 flex flex-wrap gap-3'>
          <Link href='/signup' className='rounded-md bg-slate-900 px-5 py-3 text-sm font-semibold text-white'>
            Create your account
          </Link>
          <Link href='/pricing' className='rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900'>
            Explore pricing
          </Link>
        </div>
      </section>
    </div>
  );
}
