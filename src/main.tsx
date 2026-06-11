import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { InitializeForgeChunks } from '@allsetlabs/forge/initializeForgeChunks';
import './index.css';
import { App } from './App';
import { GlobalProviders } from './contexts';
import { ErrorBoundary } from '@allsetlabs/forge/components/ErrorBoundary';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const basename = import.meta.env.VITE_BASE_PATH || '/';

createRoot(rootElement).render(
  <StrictMode>
    <InitializeForgeChunks applyToBody>
      <ErrorBoundary isDev={import.meta.env.DEV}>
        <GlobalProviders>
          <BrowserRouter basename={basename}>
            <App />
          </BrowserRouter>
        </GlobalProviders>
      </ErrorBoundary>
    </InitializeForgeChunks>
  </StrictMode>
);
