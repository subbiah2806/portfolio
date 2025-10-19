import baseConfig from '@subbiah/reusable/tailwind.config';

/** @type {import('tailwindcss').Config} */
export default {
  ...baseConfig,
  content: [
    ...baseConfig.content,
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@subbiah/reusable/src/**/*.{js,ts,jsx,tsx}',
  ],
};
