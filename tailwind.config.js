/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Scan all files in the `app` directory
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Scan all files in the `pages` directory
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Scan all files in the `components` directory
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Scan all files in the `src` directory
    './public/**/*.{html}', // Optionally, scan all HTML files in the `public` directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
