import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import svgr from "vite-plugin-svgr";
import dotenv from "dotenv";
import { VitePluginRadar } from "vite-plugin-radar";
import { remixDevTools } from "remix-development-tools";

dotenv.config();

export default defineConfig({
  plugins: [
    remixDevTools(),
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      jsxImportSource: "@emotion/react",
    }),
    tsconfigPaths(),
    svgr(),
    VitePluginRadar({
      // Google Analytics tag injection
      analytics: {
        id: process.env.VITE_GOOGLE_ANALYTICS,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./app"),
    },
  },
});
