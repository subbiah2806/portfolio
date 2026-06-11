import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

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
      alias: {
        '@allsetlabs/forge': path.resolve(__dirname, '../component/src'),
      },
      // CRITICAL: Prevents React duplication in monorepo - DO NOT REMOVE
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  };
});
