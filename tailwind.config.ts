import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        regular: ["satoshi-regular", "sans-serif"],
        light: ["satoshi-light", "sans-serif"],
        medium: ["satoshi-medium", "sans-serif"],
        bold: ["satoshi-bold", "sans-serif"],
        black: ["satoshi-black", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
