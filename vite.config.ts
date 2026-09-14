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
      // pdfmake ships CJS with no real ESM default export (forge's resume
      // generator imports it). It's normally discovered by Vite's dep
      // scanner and pre-bundled with CJS->ESM interop — but that scanner
      // doesn't crawl inside an excluded package's source (see forge
      // below), so it must be listed explicitly or imports of it break
      // with "does not provide an export named 'default'".
      include: ['react', 'react-dom', 'pdfmake/build/pdfmake.js', 'pdfmake/build/vfs_fonts.js'],
      // @allsetlabs/forge maps every path as its own subpath export
      // ("./*": "./src/*"), so Vite's dep pre-bundler treats each deep
      // import (e.g. an entry reached only through a lazy-loaded route)
      // as a separate optimize entry and can emit more than one copy of
      // a shared module — including its ThemeContext, breaking
      // useThemeContext with "must be used within a ThemeProvider".
      // Excluding it makes Vite serve it as source instead, so every
      // import resolves to the same module instance (as it did when this
      // was a monorepo file: link, never pre-bundled since it lived
      // outside node_modules).
      exclude: ['@allsetlabs/forge'],
    },
  };
});
