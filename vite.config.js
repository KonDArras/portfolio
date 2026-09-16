import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" keeps asset paths relative so the build works from any
// S3/CloudFront path, not just the domain root.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
