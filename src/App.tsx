import { Routes, Route } from 'react-router-dom';
import { GlobalProviders } from './contexts';
import CustomCursor from './components/ui/CustomCursor';
import SEO from './components/ui/SEO';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';

// Pages
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App(): JSX.Element {
  return (
    <GlobalProviders>
      <div className="relative min-h-screen">
        {/* SEO Meta Tags */}
        <SEO />

        {/* Background Gradient - Animated floating orbs */}
        <div className="fixed inset-0 -z-10 h-screen w-screen bg-neutral-50 dark:bg-black">
          <div className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-40">
            <div className="animate-float-1 absolute bottom-0 left-0 h-96 w-96 rounded-full bg-primary-400 blur-3xl dark:bg-primary-900"></div>
            <div className="animate-float-2 absolute right-0 top-0 h-96 w-96 rounded-full bg-primary-400 blur-3xl dark:bg-primary-900"></div>
          </div>
        </div>

        {/* Custom Cursor */}
        <CustomCursor />

        {/* Scroll to Top on Route Change */}
        <ScrollToTop />

        {/* Header Navigation */}
        <Header />

        {/* Main Content - Add padding-top to account for fixed header */}
        <main className="relative z-10 pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </GlobalProviders>
  );
}

export default App;
