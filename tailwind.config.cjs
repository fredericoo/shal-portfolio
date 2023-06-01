const radixColors = require("@radix-ui/colors");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      body: ["neue-montreal", "Inter", "sans-serif"],
    },
    fontSize: {
      heading: [
        "clamp(2.5rem, 2.071rem + 2.14vw, 4rem)",
        { lineHeight: "1", letterSpacing: "-0.015em" },
      ],
      body: ["1.125rem", { lineHeight: "1.5" }],
      caption: ["0.875rem", { lineHeight: "1.25", fontWeight: "500" }],
    },
    fontWeight: {
      regular: "400",
      medium: "500",
      bold: "700",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      accent: "var(--color-accent)",
    },
    extend: {
      transitionDuration: {
        600: "600ms",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "slide-in": {
          from: {
            opacity: 0,
            transform: "translateY(8rem) rotateX(-10deg)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0) rotateX(0)",
          },
        },
      },
      animation: {
        "slide-in": "slide-in 1s cubic-bezier(0.25, 1, 0.5, 1) forwards",
      },
    },
  },
  plugins: [
    require("windy-radix-palette")({
      colors: {
        gray: radixColors.gray,
        grayA: radixColors.grayA,
      },
    }),
    plugin(function ({ addBase }) {
      return addBase({
        ":root": {
          "--color-accent": "#ffb913",
        },
        "@supports (color: oklch(70% 0.175 114.35))": {
          ":root": {
            "--color-accent": "lch(80.29% 106.77 77.61)",
          },
        },
        "::selection": {
          backgroundColor: "var(--color-accent)",
        },
        ".perspective": {
          perspective: "1280px",
        },
      });
    }),
  ],
};
