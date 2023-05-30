import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    devSourcemap: true,
  },
  plugins: [
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
    react(),
    svgr({ svgrOptions: { icon: true } }),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      includeAssets: [
        "assets/images/leaflet/*.png",
        "assets/images/bg/*-m-*.webp",
      ],
      injectRegister: "auto",
      manifest: {
        short_name: "Jaka pogoda ?",
        name: "Jaka pogoda ?",
        icons: [
          {
            src: "favicon.ico",
            sizes: "64x64",
            type: "image/x-icon",
          },
          {
            src: "logo16.png",
            type: "image/png",
            sizes: "16x16",
            purpose: "any maskable",
          },
          {
            src: "logo24.png",
            type: "image/png",
            sizes: "24x24",
            purpose: "any maskable",
          },
          {
            src: "logo32.png",
            type: "image/png",
            sizes: "32x32",
            purpose: "any maskable",
          },
          {
            src: "logo512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "any maskable",
          },
        ],
        display: "standalone",
        theme_color: "#0055d4",
        background_color: "#ffffff",
        lang: "pl",
      },
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,ttf,woff,woff2}"],
      },
    }),
  ],
  server: {
    host: true,
  },
});
