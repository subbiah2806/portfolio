import { Link } from 'react-router-dom';
import { IconHome, IconFolder } from '../components/icons';

const NotFound = (): JSX.Element => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="mx-auto max-w-2xl text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="mx-auto mb-8 flex h-64 w-64 items-center justify-center rounded-full border border-neutral-700/50 bg-neutral-800/50 backdrop-blur-sm">
            <div className="text-center">
              <h1 className="mb-2 text-8xl font-bold text-primary-400">404</h1>
              <div className="flex items-center justify-center gap-2 text-neutral-500">
                <span className="h-px w-8 bg-neutral-600"></span>
                <span className="font-mono text-sm">ERROR</span>
                <span className="h-px w-8 bg-neutral-600"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h2 className="mb-4 text-4xl font-bold text-neutral-100">Page Not Found</h2>
        <p className="mb-8 text-lg text-neutral-400">
          Oops! The page you&rsquo;re looking for doesn&rsquo;t exist. It might have been moved or
          deleted.
        </p>

        {/* Suggested Actions */}
        <div className="mb-8 space-y-4">
          <p className="text-sm text-neutral-500">You might want to:</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary-600/50 bg-primary-900/30 px-6 py-3 font-medium text-primary-300 transition-all duration-300 hover:border-primary-500 hover:bg-primary-800/40 hover:shadow-medium"
            >
              <IconHome style={{ fontSize: '20px' }} />
              Go to Home
            </Link>

            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-700/50 bg-neutral-800/50 px-6 py-3 font-medium text-neutral-300 transition-all duration-300 hover:border-neutral-600/50 hover:bg-neutral-800/70 hover:shadow-medium"
            >
              <IconFolder style={{ fontSize: '20px' }} />
              View Projects
            </Link>
          </div>
        </div>

        {/* Additional Help */}
        <div className="rounded-lg border border-neutral-700/50 bg-neutral-800/50 p-6 backdrop-blur-sm">
          <p className="mb-2 text-sm font-medium text-neutral-300">Need Help?</p>
          <p className="text-sm text-neutral-500">
            If you believe this is an error, please{' '}
            <Link to="/contact" className="text-primary-400 hover:text-primary-300">
              contact me
            </Link>{' '}
            and I&rsquo;ll look into it.
          </p>
        </div>

        {/* Easter Egg - ASCII Art */}
        <div className="mt-12 text-left">
          <pre className="inline-block rounded-lg border border-neutral-700/50 bg-neutral-800/50 p-4 font-mono text-xs text-neutral-500">
            {`    ¯\\_(ツ)_/¯

 The page is gone,
  but not forgotten.`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
