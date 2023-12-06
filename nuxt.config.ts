// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    ['@nuxtjs/google-fonts', {
      families: {
        Roboto: true,
        Inter: [400, 700],
        'Josefin+Sans': true,
        Lato: [100, 300],
        'Bebas+Neue': [100, 400, 700],
        Urbanist: [400, 500, 700],
        Montserrat: [400, 500],
        Raleway: {
          wght: [100, 400],
          ital: [100]
        },
      }
    }],
    'nuxt-icon',
    '@nuxt/image',
    '@sidebase/nuxt-auth',


  ],
  auth: {
    globalAppMiddleware: false,


  },

  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },


  nitro: {
    preset: 'vercel-edge',
  },

})
