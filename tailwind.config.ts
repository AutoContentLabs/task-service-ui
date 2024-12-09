import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'media', // This tells Tailwind to use the user's system preference for dark mode
  theme: {
    extend: {
     
    },
  },
  plugins: [],
} satisfies Config;
