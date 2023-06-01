import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import mdx from "@astrojs/mdx";

import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact(), mdx(), prefetch({ throttle: 3 })],
  server: {
    headers: { "Cache-Control": "public, max-age=31536000, immutable" },
  },
});
