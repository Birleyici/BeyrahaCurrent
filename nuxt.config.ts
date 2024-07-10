import vsharp from 'vite-plugin-vsharp';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  imports: {
    dirs: [
      'composables/**'
    ]
  },

  routeRules: {
    // Render these routes with SPA
    '/management/**': { ssr: false },
  },
  vite: {
    plugins: [vsharp()],
  },
  css: ['~/assets/css/main.css'],
  image: {
    dir: '/images',
    domains: [
      'https://beyraha.s3.eu-central-1.amazonaws.com'
    ],
    alias: {
      aws: 'https://beyraha.s3.eu-central-1.amazonaws.com/images'
    }

  },
  //runtime public base url tanımlayacağız
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL,
      nuxtSecret: process.env.NUXT_SECRET,
      isDevelopment: process.env.NODE_ENV !== 'production' ? true : false,

    }
  },
  modules: [
    'nuxt-swiper',
    '@pinia/nuxt',
    'nuxt-icon',
    '@nuxt/image',
    // "@sidebase/nuxt-auth"
    '@nuxt/ui',
    '@nuxtjs/tailwindcss'
  ],

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
  },

  devtools: { enabled: false },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      cssnano:
        process.env.NODE_ENV === 'production'
          ? { preset: ['default', { discardComments: { removeAll: true } }] }
          : false, // disable cssnano when not in production
    },
  },



})