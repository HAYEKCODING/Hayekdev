import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import netlify from "@netlify/vite-plugin-tanstack-start";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
    }),
    nitro(),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    netlify(),
  ],

  resolve: {
    tsconfigPaths: true,
  },
});