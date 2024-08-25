import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(), // Ensures React support
    svgr(), // Enables SVG transformation
  ],
  base: "/DropScan/",
});
