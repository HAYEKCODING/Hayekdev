import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  // crawlLinks: false — le site n'a qu'une seule route ("/") et le crawler abîmait
  // les fichiers statiques liés depuis la page (ex. le PDF du CV) en les explorant.
  plugins: [tanstackStart({ prerender: { enabled: true, crawlLinks: false } }), react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    tsconfigPaths: true,
  },
});
