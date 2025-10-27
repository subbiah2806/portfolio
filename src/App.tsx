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
      <main className="relative z-10 pt-16">
        <Suspense
          fallback={
            <div className="flex h-screen items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          }
        >
          <Routes>
            <Route
              path="/"
              element={
                <ErrorBoundary isDev={import.meta.env.DEV}>
                  <Home />
                </ErrorBoundary>
              }
            />
            <Route
              path="/projects"
              element={
                <ErrorBoundary isDev={import.meta.env.DEV}>
                  <ProjectsPage />
                </ErrorBoundary>
              }
            />
            <Route
              path="/contact"
              element={
                <ErrorBoundary isDev={import.meta.env.DEV}>
                  <Contact />
                </ErrorBoundary>
              }
            />
            <Route
              path="/chat"
              element={
                <ErrorBoundary isDev={import.meta.env.DEV}>
                  <Chat />
                </ErrorBoundary>
              }
            />
            <Route
              path="*"
              element={
                <ErrorBoundary isDev={import.meta.env.DEV}>
                  <NotFound />
                </ErrorBoundary>
              }
            />
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
