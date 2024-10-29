import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This will proxy any requests from /api to your API server
      "/api": {
        target: "http://localhost:8081", // Change to your API server's address
        changeOrigin: true, // This will change the origin of the host header to the target URL
        secure: false, // Set to true if your API is HTTPS
      },
    },
  },
});
