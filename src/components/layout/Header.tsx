import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';
import CursorToggle from '../ui/CursorToggle';
import AudioPlayer from '../ui/AudioPlayer';

const Header = (): JSX.Element => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Smooth scroll to section
  const handleSmoothScroll = (sectionId: string) => {
    // If we're not on home page, navigate there first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string): boolean => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home', isRoute: true },
    { path: '/projects', label: 'Projects', isRoute: true },
    { path: 'experience', label: 'Experience', isRoute: false },
    { path: 'skills', label: 'Skills', isRoute: false },
    { path: '/contact', label: 'Contact', isRoute: true },
  ];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 h-16 border-b border-neutral-200 bg-white/80 backdrop-blur-md transition-all duration-300 dark:border-neutral-700/50 dark:bg-neutral-900/80 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo/Name */}
        <Link
          to="/"
          className="text-xl font-bold text-neutral-900 transition-colors duration-300 hover:text-primary-600 dark:text-neutral-100 dark:hover:text-primary-400"
        >
          Subbiah C.
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.isRoute ? (
              <Link
                key={link.path}
                to={link.path}
                className={`relative pb-1 text-sm font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400"></span>
                )}
              </Link>
            ) : (
              <button
                key={link.path}
                onClick={() => handleSmoothScroll(link.path)}
                className="text-sm font-medium text-neutral-600 transition-all duration-300 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
              >
                {link.label}
              </button>
            )
          )}
        </nav>

        {/* Right Side - Control Buttons, Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Control Buttons */}
          <div className="hidden items-center gap-2 sm:flex">
            <AudioPlayer variant="inline" />
            <CursorToggle variant="inline" />
            <ThemeToggle variant="inline" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col items-center justify-center gap-1.5 p-2 md:hidden"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`h-0.5 w-6 bg-neutral-900 transition-all duration-300 dark:bg-neutral-100 ${
                isMobileMenuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            ></span>
            <span
              className={`h-0.5 w-6 bg-neutral-900 transition-all duration-300 dark:bg-neutral-100 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            ></span>
            <span
              className={`h-0.5 w-6 bg-neutral-900 transition-all duration-300 dark:bg-neutral-100 ${
                isMobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-16 z-40 bg-white/95 backdrop-blur-md transition-all duration-300 dark:bg-neutral-900/95 md:hidden ${
          isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-8 px-8">
          {navLinks.map((link, index) => (
            <div
              key={link.path}
              className={`transition-all duration-300 ${
                isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {link.isRoute ? (
                <Link
                  to={link.path}
                  className={`text-2xl font-medium transition-colors duration-300 ${
                    isActive(link.path)
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-neutral-700 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400'
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  onClick={() => handleSmoothScroll(link.path)}
                  className="text-2xl font-medium text-neutral-700 transition-colors duration-300 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                >
                  {link.label}
                </button>
              )}
            </div>
          ))}

          {/* Mobile Audio, Theme and Cursor Toggles */}
          <div className="mt-8 flex gap-4">
            <AudioPlayer variant="fixed" />
            <ThemeToggle variant="fixed" />
            <CursorToggle variant="fixed" />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
