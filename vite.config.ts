import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  base: "/mashhad-leather-bazaar/",

  tanstackStart: {
    server: {
      entry: "server",
    },
  },
});
