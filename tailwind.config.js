import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // or 'media' if you prefer the OS-level setting
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#f3f4f6",

          secondary: "#dc2626",

          accent: "#f3f4f6",

          neutral: "#dc2626",

          "base-100": "#111827",

          info: "#f3f4f6",

          success: "#f3f4f6",

          warning: "#dc2626",

          error: "#dc2626",
        },
      },
    ],
  },
  plugins: [daisyui,],
};
