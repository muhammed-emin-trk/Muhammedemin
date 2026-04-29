import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "serif"],
      },
      colors: {
        brand: {
          ivory: "#FFFAF0",
          cream: "#F8F2E8",
          sand: "#EFE3D1",
          gold: "#B89662",
          bronze: "#8B6F3E",
          copper: "#C77F4F",
          ink: "#2F2416",
          charcoal: "#3B3125",
          mist: "#6B5E4E",
          electric: "#0EA5E9",
          mint: "#10B981",
          violet: "#8B5CF6",
        },
      },
      backgroundImage: {
        "hero-mesh":
          "radial-gradient(60% 50% at 20% 30%, rgba(184,150,98,0.35), transparent 60%), radial-gradient(50% 50% at 80% 20%, rgba(199,127,79,0.28), transparent 60%), radial-gradient(60% 60% at 50% 90%, rgba(139,92,246,0.18), transparent 60%)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      boxShadow: {
        glass: "0 8px 30px rgba(89, 58, 17, 0.10)",
        glow: "0 20px 60px -10px rgba(184,150,98,0.45)",
        deep: "0 30px 80px -20px rgba(47,36,22,0.35)",
      },
      keyframes: {
        "blob": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(30px,-50px) scale(1.1)" },
          "66%": { transform: "translate(-20px,20px) scale(0.95)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "shine": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "float": {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        blob: "blob 18s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        shine: "shine 2.5s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
