import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
/* global.HTMLCanvasElement.prototype.getContext = () => null;
global.URL.createObjectURL = () => ""; */
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    threads: false,
  },
});
