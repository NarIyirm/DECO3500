import { defineNuxtConfig } from 'nuxt/config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  build: {
    transpile: ['vue3-leaflet'],
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/leaflet',
  ],
  ui: {
    icons: 'heroicons', // 默认设置图标库，可以调整为合适的图标库
  },
  leaflet: {
    /*
      这里可以配置 leaflet 的相关设置，比如 API key、默认坐标、图层设置等。
      如果你没有特殊需求可以留空，Nuxt Leaflet 会采用默认配置。
    */
  },
})
