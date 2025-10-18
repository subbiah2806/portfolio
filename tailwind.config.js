import baseConfig from '@subbiah/component/tailwind.config';

/** @type {import('tailwindcss').Config} */
export default {
  ...baseConfig,
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../component/src/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [...(baseConfig.plugins || []), require('@tailwindcss/typography')],
};
