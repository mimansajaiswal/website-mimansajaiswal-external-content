import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import path from "node:path";

export default defineConfig({
  output: "static",
  integrations: [mdx()],
  vite: {
    resolve: {
      alias: {
        "@custom-components": path.resolve("../custom-components"),
        "@fixtures": path.resolve("./src/fixtures"),
      },
    },
  },
});
