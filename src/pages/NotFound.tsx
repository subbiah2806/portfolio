import { Link } from 'react-router-dom';
import { IconHome, IconFolder } from '@allsetlabs/forge/icons/index';

export const NotFound = (): JSX.Element => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="mx-auto max-w-2xl text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="bg-card/50 mx-auto mb-8 flex h-64 w-64 items-center justify-center rounded-full border backdrop-blur-sm">
            <div className="text-center">
              <h1 className="text-primary mb-2 text-8xl font-bold">404</h1>
              <div className="text-muted-foreground flex items-center justify-center gap-2">
                <span className="bg-border h-px w-8"></span>
                <span className="font-mono text-sm">ERROR</span>
                <span className="bg-border h-px w-8"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-foreground mb-4 text-4xl font-bold">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 text-lg">
          Oops! The page you&rsquo;re looking for doesn&rsquo;t exist. It might have been moved or
          deleted.
        </p>

        {/* Suggested Actions */}
        <div className="mb-8 space-y-4">
          <p className="text-muted-foreground text-sm">You might want to:</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="border-primary/50 bg-primary/30 text-primary-foreground hover:border-primary hover:bg-primary/40 hover:shadow-medium inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 font-medium transition-all duration-300"
            >
              <IconHome style={{ fontSize: '20px' }} />
              Go to Home
            </Link>

            <Link
              to="/projects"
              className="bg-card text-card-foreground hover:border-border hover:bg-card/70 hover:shadow-medium inline-flex items-center justify-center gap-2 rounded-lg border px-6 py-3 font-medium transition-all duration-300"
            >
              <IconFolder style={{ fontSize: '20px' }} />
              View Projects
            </Link>
          </div>
        </div>

        {/* Additional Help */}
        <div className="bg-card rounded-lg border p-6 backdrop-blur-sm">
          <p className="text-card-foreground mb-2 text-sm font-medium">Need Help?</p>
          <p className="text-muted-foreground text-sm">
            If you believe this is an error, please{' '}
            <Link to="/contact" className="text-primary hover:text-primary/80">
              contact me
            </Link>{' '}
            and I&rsquo;ll look into it.
          </p>
        </div>

        {/* Easter Egg - ASCII Art */}
        <div className="mt-12 text-left">
          <pre className="bg-card text-muted-foreground inline-block rounded-lg border p-4 font-mono text-xs">
            {`    ¯\\_(ツ)_/¯

 The page is gone,
  but not forgotten.`}
          </pre>
        </div>
      </div>
    </div>
  );
};
