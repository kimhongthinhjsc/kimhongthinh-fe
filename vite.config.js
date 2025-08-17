import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "~", replacement: "/src" }],
  },
  server: {
    proxy: {
      "/api": "http://localhost:5000", // mọi request /api sẽ chuyển đến backend
    },
  },
});
