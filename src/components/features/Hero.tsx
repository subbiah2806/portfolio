import { resumeData } from '../../data/resume';

export default function Hero(): JSX.Element {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="z-10 max-w-4xl animate-fade-in text-center">
        <div className="mb-8 inline-block animate-slide-up">
          <span className="rounded-full border border-primary-300/50 bg-primary-100/50 px-4 py-2 font-mono text-sm text-primary-700 dark:border-primary-700/50 dark:bg-primary-900/30 dark:text-primary-300">
            Open to opportunities
          </span>
        </div>

        <h1 className="mb-6 animate-slide-up text-5xl font-bold text-neutral-900 dark:text-neutral-100 md:text-7xl">
          {resumeData.name}
        </h1>

        <p className="mb-4 animate-slide-up text-xl font-semibold text-neutral-700 dark:text-neutral-300 md:text-2xl">
          Lead Frontend Developer
        </p>

        <p className="mx-auto mb-8 max-w-3xl animate-slide-up text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          {resumeData.summary}
        </p>

        <div className="mb-8 flex animate-slide-up flex-wrap justify-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {resumeData.location}
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {resumeData.email}
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {resumeData.phone}
          </div>
        </div>

        <div className="flex animate-slide-up flex-wrap justify-center gap-4">
          <a
            href={`mailto:${resumeData.email}`}
            className="clickable rounded-full bg-primary-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-primary-700"
          >
            Get in Touch
          </a>
          <a
            href="#experience"
            className="clickable rounded-full border border-neutral-300 bg-white/80 px-8 py-3 font-semibold text-neutral-700 backdrop-blur-sm transition-all duration-300 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800/50 dark:text-neutral-200 dark:hover:bg-neutral-700/50"
          >
            View Experience
          </a>
        </div>
      </div>
    </div>
  );
}
