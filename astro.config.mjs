import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import mdx from "@astrojs/mdx";
import image from "@astrojs/image";
import prefetch from "@astrojs/prefetch";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact(), mdx(), prefetch({
    throttle: 3
  }), image({
    serviceEntryPoint: "@astrojs/image/sharp"
  })],
  output: "server",
  adapter: vercel()
});