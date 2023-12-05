export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        light: {

          "primary": "#B68C5A",

          "secondary": "#FFF44F",

          "accent": "#87CEEB",

          "neutral": "#2b1d2f",

          "base-100": "#F7F7F7",

          "info": "#333333",

          "success": "#17975b",

          "warning": "#f3c672",

          "error": "#fb6f84",
        },
      },
      {
        night: {

          "primary": "#808000",

          "secondary": "#FFF44F",

          "accent": "#f471b5",

          "neutral": "#1d283a",

          "base-100": "#0f1729",

          "info": "#87CEEB",

          "success": "#17975b",

          "warning": "#f4c152",

          "error": "#fb6f84",
        },
      }
    ],
  },
  plugins: [require("daisyui")],
}
