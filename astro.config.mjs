import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://deal-droid.github.io",
  base: "/",
  image: {
    domains: ["source.unsplash.com", "images.unsplash.com"],
  },
  i18n:{
    locales:['en','th'],
    defaultLocale: 'en',
  },
  integrations: [tailwind(), mdx(), icon(), sitemap()],
});
