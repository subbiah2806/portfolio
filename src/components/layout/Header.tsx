import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { ThemeToggle } from '@allsetlabs/forge/statefulComponents/theme/toggle';
import { CursorToggle } from '@allsetlabs/forge/statefulComponents/cursor/toggle';
import { Button } from '@allsetlabs/forge/components/ui/button';
import { AudioToggle } from '@allsetlabs/forge/statefulComponents/audio/toggle';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from '@allsetlabs/forge/components/ui/sheet';

export const Header = (): JSX.Element => {
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
    { path: '/chat', label: 'Chat', isRoute: true },
    { path: '/contact', label: 'Contact', isRoute: true },
  ];

  return (
    <header
      className={`bg-background/80 fixed left-0 right-0 top-0 z-50 h-16 border-b backdrop-blur-md transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo/Name */}
        <Link
          to="/"
          className="text-foreground hover:text-primary text-xl font-bold transition-colors duration-300"
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
                  isActive(link.path) ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="bg-primary absolute bottom-0 left-0 right-0 h-0.5"></span>
                )}
              </Link>
            ) : (
              <button
                key={link.path}
                onClick={() => handleSmoothScroll(link.path)}
                className="text-muted-foreground hover:text-primary text-sm font-medium transition-all duration-300"
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
            <AudioToggle />
            <CursorToggle />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Toggle mobile menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <div key={link.path}>
                    {link.isRoute ? (
                      <Link
                        to={link.path}
                        className={`text-lg font-medium transition-colors duration-300 ${
                          isActive(link.path)
                            ? 'text-primary'
                            : 'text-foreground hover:text-primary'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleSmoothScroll(link.path)}
                        className="text-foreground hover:text-primary text-lg font-medium transition-colors duration-300"
                      >
                        {link.label}
                      </button>
                    )}
                  </div>
                ))}

                {/* Mobile Controls */}
                <div className="border-border mt-8 flex gap-4 border-t pt-6">
                  <AudioToggle />
                  <ThemeToggle />
                  <CursorToggle />
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
