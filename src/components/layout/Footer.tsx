import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { IconGitHub, IconLinkedIn } from '@allsetlabs/forge/icons/index';

export const Footer = (): JSX.Element => {
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
    <footer className="bg-muted border-t px-4 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Top Section */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div>
            <h3 className="text-foreground mb-4 text-xl font-bold">Subbiah C.</h3>
            <p className="text-muted-foreground text-sm">
              Lead Software Developer specializing in React, TypeScript, and modern web
              technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground mb-4 text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-foreground mb-4 text-sm font-semibold uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300"
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
            <p className="text-muted-foreground text-center text-sm md:text-left">
              &copy; {currentYear} Subbiah Chandramouli. All rights reserved.
            </p>
            <p className="text-muted-foreground text-center font-mono text-xs md:text-right">
              Built with React + TypeScript + Vite + Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
