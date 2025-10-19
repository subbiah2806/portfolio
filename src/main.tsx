import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ComponentProvider } from '@subbiah/component/providers/ComponentProvider';
import ErrorBoundary from '@subbiah/component/components/ErrorBoundary';
import '@subbiah/component/styles';
import './index.css';
import App from './App';
import { GlobalProviders } from './contexts';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const basename = import.meta.env.VITE_BASE_PATH || '/';

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <ComponentProvider>
          <GlobalProviders>
            <BrowserRouter basename={basename}>
              <App />
            </BrowserRouter>
          </GlobalProviders>
        </ComponentProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
);
