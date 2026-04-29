import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          ink: "#3B3125",
          cream: "#F8F2E8",
          electric: "#0EA5E9",
          mint: "#10B981",
          violet: "#8B5CF6",
          gold: "#B89662",
        },
      },
    },
  },
  plugins: [],
};

export default config;
