import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#0ea5e9",
          green: "#10b981",
          indigo: "#6366f1",
          purple: "#8b5cf6",
        },
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at 20% 20%, rgba(14, 165, 233, 0.22), transparent 30%), radial-gradient(circle at 80% 10%, rgba(139, 92, 246, 0.2), transparent 30%), radial-gradient(circle at 50% 85%, rgba(16, 185, 129, 0.22), transparent 35%)",
      },
      boxShadow: {
        glass: "0 8px 30px rgba(15, 23, 42, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
