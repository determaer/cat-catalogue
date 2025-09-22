// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr:false,
  devtools: { enabled: true },
  css: ['~/assets/index.css'],
  app:{
    baseURL: '/cat-catalogue/',
  },
  nitro: {
    preset: 'github_pages'
  }
})
