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
    'nuxt-icon',
    '@nuxt/image',
    '@nuxt/ui',
    // "@sidebase/nuxt-auth"
  ],

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

  // auth: {
  //   baseURL: 'http://localhost/laravel-api/public/api/auth',
  //   provider: {
  //     type: 'local',
  //     endpoints: {
  //       signIn: { path: '/login', method: 'post' },
  //       signOut: { path: '/logout', method: 'post' },
  //       signUp: { path: '/register', method: 'post' },
  //       getSession: false

  //     },
  //     token: {
  //       signInResponseTokenPointer: '/token',
  //     },

  //   },


  // }

})