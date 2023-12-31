import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
    port: 3000,
    open: false,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/tests/setupTest.ts"],
    globals: true,
  },
})
