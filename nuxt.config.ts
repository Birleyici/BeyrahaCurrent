// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
 
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
        Urbanist:[400,500,700],
        Montserrat:[400,500],
        Raleway: {
          wght: [100, 400],
          ital: [100]
        },
      }
    }],
    'nuxt-icon',
    'nuxt-api-party'

  ],
  apiParty: {
    endpoints: {
      jsonPlaceholder: {
        url: process.env.API_BASE_URL,
        cookies: true,

        // // Global headers sent with each request
        // headers: {
        //   Authorization: `Bearer ${process.env.JSON_PLACEHOLDER_API_TOKEN}`
        // }
      }
    }
  },
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },


})
