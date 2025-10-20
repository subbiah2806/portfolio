import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import BackgroundGradient from '@subbiah/reusable/components/BackgroundGradient';
import SEO from './components/SEO';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ErrorBoundary from '@subbiah/reusable/components/ErrorBoundary';

// Lazy-loaded pages for better performance
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const Contact = lazy(() => import('./pages/Contact'));
const Chat = lazy(() => import('./pages/Chat'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App(): JSX.Element {
  return (
    <div className="relative min-h-screen">
      {/* SEO Meta Tags */}
      <SEO />

      {/* Background Gradient - Animated floating orbs */}
      <BackgroundGradient />

      {/* Header Navigation */}
      <Header />

      {/* Main Content - Add padding-top to account for fixed header */}
      <ErrorBoundary isDev={import.meta.env.DEV}>
        <main className="relative z-10 pt-16">
          <Suspense
            fallback={
              <div className="flex h-screen items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </ErrorBoundary>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
