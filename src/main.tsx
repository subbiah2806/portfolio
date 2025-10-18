import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ComponentProvider, ErrorBoundary } from '@subbiah/component';
import '@subbiah/component/styles';
import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const basename = import.meta.env.VITE_BASE_PATH || '/';

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <ComponentProvider>
          <BrowserRouter basename={basename}>
            <App />
          </BrowserRouter>
        </ComponentProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
);
