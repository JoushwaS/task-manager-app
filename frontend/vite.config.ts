import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { config } from "dotenv";

// Load environment variables from .env file
config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
  define: {
    "process.env": process.env,
  },
});
