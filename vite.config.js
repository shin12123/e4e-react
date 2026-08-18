import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const [owner, repository] = process.env.GITHUB_REPOSITORY?.split("/") ?? [];
const isAccountPage = repository === `${owner}.github.io`;

export default defineConfig({
  base: repository && !isAccountPage ? `/${repository}/` : "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL("./index.html", import.meta.url)),
        about: fileURLToPath(new URL("./about.html", import.meta.url)),
        services: fileURLToPath(new URL("./services.html", import.meta.url)),
        documents: fileURLToPath(new URL("./documents.html", import.meta.url)),
        contact: fileURLToPath(new URL("./contact.html", import.meta.url))
      }
    }
  }
});
