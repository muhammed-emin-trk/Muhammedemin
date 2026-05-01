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
          "radial-gradient(65% 55% at 15% 25%, rgba(184,150,98,0.42), transparent 60%), radial-gradient(55% 55% at 82% 18%, rgba(199,127,79,0.35), transparent 60%), radial-gradient(65% 65% at 50% 92%, rgba(139,92,246,0.22), transparent 60%), radial-gradient(40% 40% at 65% 45%, rgba(16,185,129,0.12), transparent 55%)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      boxShadow: {
        glass: "0 8px 30px rgba(89, 58, 17, 0.10), inset 0 1px 0 rgba(255,255,255,0.4)",
        glow: "0 20px 60px -10px rgba(184,150,98,0.50)",
        "glow-sm": "0 8px 25px -5px rgba(184,150,98,0.40)",
        deep: "0 30px 80px -20px rgba(47,36,22,0.38)",
        "inner-gold": "inset 0 1px 0 rgba(184,150,98,0.3)",
      },
      keyframes: {
        "blob": {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(30px,-50px) scale(1.12)" },
          "66%": { transform: "translate(-20px,20px) scale(0.94)" },
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
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "float-slow": {
          "0%,100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(2deg)" },
        },
        "pulse-glow": {
          "0%,100%": { boxShadow: "0 0 20px rgba(184,150,98,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(184,150,98,0.6), 0 0 70px rgba(184,150,98,0.2)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        blob: "blob 18s ease-in-out infinite",
        marquee: "marquee 25s linear infinite",
        shine: "shine 2.5s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "fade-up": "fade-up 0.5s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
