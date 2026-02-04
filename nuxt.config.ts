// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxt/ui", "@vueuse/nuxt", "@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
      title: "MacOS Portfolio",
      link: [
        {
          rel: 'preload',
          as: 'image',
          href: '/images/bg-lg.webp',
          media: '(min-width: 1024px)'
        },
        {
          rel: 'preload',
          as: 'image',
          href: '/images/bg-sm.webp',
          media: '(max-width: 1023px)'
        },
        {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: 'https://fonts.googleapis.com/css2?family=Georama:ital,wght@0,100..900;1,100..900&display=swap',
          crossorigin: 'anonymous'
        }
      ]
    },
  },
  icon: {
    customCollections: [
      {
        prefix: "custom",
        dir: "./app/assets/icons",
      },
    ],
  },
  ssr: true,
  nitro: {
    preset: "static",
  },
});
