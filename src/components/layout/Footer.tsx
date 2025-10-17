import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { IconGitHub, IconLinkedIn } from '../icons';

const Footer = (): JSX.Element => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/subbiah2806',
      icon: <IconGitHub className="h-5 w-5" />,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/subbiah-c-31b339184/',
      icon: <IconLinkedIn className="h-5 w-5" />,
    },
    {
      name: 'Email',
      url: 'mailto:subbiah2806@gmail.com',
      icon: <Mail className="h-5 w-5" />,
    },
  ];

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="border-t bg-muted px-4 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Top Section */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div>
            <h3 className="mb-4 text-xl font-bold text-foreground">Subbiah C.</h3>
            <p className="text-sm text-muted-foreground">
              Lead Frontend Developer specializing in React, TypeScript, and modern web
              technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground transition-colors duration-300 hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Connect
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors duration-300 hover:text-primary"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {currentYear} Subbiah Chandramouli. All rights reserved.
            </p>
            <p className="text-center font-mono text-xs text-muted-foreground md:text-right">
              Built with React + TypeScript + Vite + Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
