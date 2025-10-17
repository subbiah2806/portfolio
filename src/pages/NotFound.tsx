import { Link } from 'react-router-dom';
import { IconHome, IconFolder } from '../components/icons';

const NotFound = (): JSX.Element => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="mx-auto max-w-2xl text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="mx-auto mb-8 flex h-64 w-64 items-center justify-center rounded-full border bg-card/50 backdrop-blur-sm">
            <div className="text-center">
              <h1 className="mb-2 text-8xl font-bold text-primary">404</h1>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <span className="h-px w-8 bg-border"></span>
                <span className="font-mono text-sm">ERROR</span>
                <span className="h-px w-8 bg-border"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h2 className="mb-4 text-4xl font-bold text-foreground">Page Not Found</h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Oops! The page you&rsquo;re looking for doesn&rsquo;t exist. It might have been moved or
          deleted.
        </p>

        {/* Suggested Actions */}
        <div className="mb-8 space-y-4">
          <p className="text-sm text-muted-foreground">You might want to:</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/50 bg-primary/30 px-6 py-3 font-medium text-primary-foreground transition-all duration-300 hover:border-primary hover:bg-primary/40 hover:shadow-medium"
            >
              <IconHome style={{ fontSize: '20px' }} />
              Go to Home
            </Link>

            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-lg border bg-card px-6 py-3 font-medium text-card-foreground transition-all duration-300 hover:border-border hover:bg-card/70 hover:shadow-medium"
            >
              <IconFolder style={{ fontSize: '20px' }} />
              View Projects
            </Link>
          </div>
        </div>

        {/* Additional Help */}
        <div className="rounded-lg border bg-card p-6 backdrop-blur-sm">
          <p className="mb-2 text-sm font-medium text-card-foreground">Need Help?</p>
          <p className="text-sm text-muted-foreground">
            If you believe this is an error, please{' '}
            <Link to="/contact" className="text-primary hover:text-primary/80">
              contact me
            </Link>{' '}
            and I&rsquo;ll look into it.
          </p>
        </div>

        {/* Easter Egg - ASCII Art */}
        <div className="mt-12 text-left">
          <pre className="inline-block rounded-lg border bg-card p-4 font-mono text-xs text-muted-foreground">
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
