import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

console.log("VITE_API_KEY present at build:", !!process.env.VITE_API_KEY);

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
});
