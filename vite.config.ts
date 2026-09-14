import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  // Only enable visualizer when ANALYZE=true
  const shouldAnalyze = process.env.ANALYZE === 'true' || env.ANALYZE === 'true';

  return {
    plugins: [
      react(),
      // Conditionally add visualizer plugin
      ...(shouldAnalyze
        ? [
            visualizer({
              filename: './dist/stats.html',
              open: false,
              gzipSize: true,
              brotliSize: true,
            }),
          ]
        : []),
    ],
    base: env.VITE_BASE_PATH || '/',
    resolve: {
      // @allsetlabs/forge resolves through its own package.json "exports" map
      // (it's an installed git dependency, not a monorepo-local file: link) —
      // no alias needed here.
      // CRITICAL: Prevents React duplication in monorepo - DO NOT REMOVE
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  };
});
