import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

export default defineConfig({
  site: "https://www.dealdroid.net",
  base: "/",
  image: {
    domains: ["source.unsplash.com", "images.unsplash.com"],
  },
  i18n:{
    defaultLocale: 'en',
    locales:['en','th'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [tailwind(), mdx(), icon(), sitemap()],
});
