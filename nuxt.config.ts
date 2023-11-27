// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  image: {
    dir: 'assets/images'
  },
  //runtime public base url tanımlayacağız
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL
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
        Urbanist:[400,500,700],
        Montserrat:[400,500],
        Raleway: {
          wght: [100, 400],
          ital: [100]
        },
      }
    }], 
    'nuxt-icon',
    'nuxt-api-party',
    '@nuxt/image',
    '@sidebase/nuxt-auth'

  ],
  auth: {
    globalAppMiddleware: false,
    
    
   },
  apiParty: {
    endpoints: {
      jsonPlaceholder: {
        url: process.env.API_BASE_URL,
        cookies: true,
        
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

  nitro: {
    '/server/*': {
       headers: {
          "Access-Control-Allow-Origin": "*"
       }
    }
 }
})
