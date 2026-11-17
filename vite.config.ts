import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  base: "/mashhad-leather-bazaar/",

  tanstackStart: {
    server: {
      entry: "server",
    },
    // GitHub Pages only serves static files, so the build must emit real HTML.
    prerender: {
      enabled: true,
      crawlLinks: true,
      autoStaticPathsDiscovery: true,
      failOnError: false,
    },
  },
});
