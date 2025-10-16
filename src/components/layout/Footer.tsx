import { Link } from 'react-router-dom';
import { IconGitHub, IconLinkedIn, IconEmail } from '../icons';

const Footer = (): JSX.Element => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/subbiah2806',
      icon: <IconGitHub style={{ fontSize: '20px' }} />,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/subbiah-c-31b339184/',
      icon: <IconLinkedIn style={{ fontSize: '20px' }} />,
    },
    {
      name: 'Email',
      url: 'mailto:subbiah2806@gmail.com',
      icon: <IconEmail style={{ fontSize: '20px' }} />,
    },
  ];

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 px-4 py-12 dark:border-neutral-700/50 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl">
        {/* Top Section */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-neutral-900 dark:text-neutral-100">
              Subbiah C.
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Lead Frontend Developer specializing in React, TypeScript, and modern web
              technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-neutral-600 transition-colors duration-300 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
              Connect
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-600 transition-colors duration-300 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-300 pt-8 dark:border-neutral-800">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-neutral-500 dark:text-neutral-500 md:text-left">
              &copy; {currentYear} Subbiah Chandramouli. All rights reserved.
            </p>
            <p className="text-center font-mono text-xs text-neutral-500 dark:text-neutral-600 md:text-right">
              Built with React + TypeScript + Vite + Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
