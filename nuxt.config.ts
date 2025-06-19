import vsharp from 'vite-plugin-vsharp';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  
  sourcemap: {
    server: true,
    client: true
  },

  imports: {
    dirs: [
      'composables/**'
    ]
  },



  vite: {
    plugins: [vsharp()],
    vue: {
      script: {
          defineModel: true,
          propsDestructure: true
      }
  }
  },

  css: ['~/assets/css/main.css', '~/assets/css/admin.css'],
   image: {
   provider: 'cloudflare',
   cloudflare:{
    baseURL: 'https://cdn.beyraha.com'
   },
    domains: [
      'https://cdn.beyraha.com',
    ],
   alias:{
    cl: 'cdn-cgi/imagedelivery/st1uxlphT2vI8j_75ka47g'
   }
  },

  //runtime public base url tanımlayacağız


  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL,
      nuxtSecret: process.env.NUXT_SECRET,
      isDevelopment: process.env.NODE_ENV !== 'production' ? true : false,
      slugify: {
        extend: {
          // Your slugify extension characters here
        },
        defaults: {
          lower: true, // Example default option
        },
      },
    },
  },

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxt/image',
    '@nuxtjs/device',
    'nuxt-tiptap-editor',
    // "@sidebase/nuxt-auth"
  ],


  tiptap: {
    prefix: 'Tiptap', //prefix for Tiptap imports, composables not included
  },

  pinia: {
    storesDirs: ['./store/**'],
  },

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
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

  compatibilityDate: '2024-08-21',


  routeRules: {
    '/management/**': { ssr: false },
  }
})