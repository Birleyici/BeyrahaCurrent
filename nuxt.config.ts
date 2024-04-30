import vsharp from 'vite-plugin-vsharp';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  nitro: {
    vercel: {
      regions: ['fra1'],
    },

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
    baseURL: process.env.API_BASE_URL + 'auth',

    provider: {
      type: 'refresh',
      endpoints: {
        signIn: { path: '/login', method: 'post' },
        signOut: { path: '/logout', method: 'post' },
        signUp: { path: '/register', method: 'post' },
        getSession: { path: '/me', method: 'get' },
        refresh: { path: '/refresh', method: 'post' }
      },

      pages: {
        login: '/deneme',
      },

      token: {
        signInResponseTokenPointer: '/accessToken',
        type: 'Bearer',
        cookieName: 'token',
        headerName: 'Authorization',
        maxAgeInSeconds: 1800,
        sameSiteAttribute: 'lax',
        cookieDomain: ''
      },
      refreshToken: {
        signInResponseRefreshTokenPointer: '/refreshToken',
        refreshRequestTokenPointer: '/refreshToken',
        cookieName: 'baken',
        maxAgeInSeconds: 1800,
        cookieDomain: ''
      },

    },



  },

  devtools: { enabled: true },
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
