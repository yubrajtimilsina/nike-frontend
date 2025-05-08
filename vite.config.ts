import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      theme: {
        extends: {
          colors: {
            bittersweet: "#ff6b6b",
            salmon: "#ff8f8f",
            "rich-black": "#0a0a12",
            "smoky-black": "#070601",
            onyx: "#444444",
            gainsboro: "#e0e0e0",
            cultured: "#f5f5f5",
          },
          fontFamily: {
            josefin: ["Josefin Sans", "sans-serif"],
            roboto: ["Roboto", "sans-serif"],
          },
          spacing: {
            "4.5": "1.125rem",
          },
          transitionProperty: {
            height: "height",
            spacing: "margin, padding",
          },
        },
      },
    }),
  ],
});
