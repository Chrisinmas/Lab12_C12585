import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./setup.js"]
  }
});