import { Routes, Route } from 'react-router-dom';
import { SEO, ScrollToTop, BackgroundGradient } from '@subbiah/component';
import CustomCursor from './components/ui/CustomCursor';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import ProjectsPage from './pages/ProjectsPage';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App(): JSX.Element {
  return (
    <div className="relative min-h-screen">
      {/* SEO Meta Tags */}
      <SEO />

      {/* Background Gradient - Animated floating orbs */}
      <BackgroundGradient />

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
  );
}

export default App;
