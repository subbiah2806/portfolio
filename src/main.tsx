import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { InitializeReusableChunks } from '@subbiah/reusable/initializeReusableChunks';
import './index.css';
import App from './App';
import { GlobalProviders } from './contexts';
import ErrorBoundary from '@subbiah/reusable/components/ErrorBoundary';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const basename = import.meta.env.VITE_BASE_PATH || '/';

createRoot(rootElement).render(
  <StrictMode>
    <InitializeReusableChunks applyToBody>
      <ErrorBoundary isDev={import.meta.env.DEV}>
        <GlobalProviders>
          <BrowserRouter basename={basename}>
            <App />
          </BrowserRouter>
        </GlobalProviders>
      </ErrorBoundary>
    </InitializeReusableChunks>
  </StrictMode>
);
