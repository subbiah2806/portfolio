import { resumeData } from '../../data/resume';
import { IconLocation, IconEmail, IconPhone } from '../icons';

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
            <IconLocation style={{ fontSize: '20px' }} />
            {resumeData.location}
          </div>
          <div className="flex items-center gap-2">
            <IconEmail style={{ fontSize: '20px' }} />
            {resumeData.email}
          </div>
          <div className="flex items-center gap-2">
            <IconPhone style={{ fontSize: '20px' }} />
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
