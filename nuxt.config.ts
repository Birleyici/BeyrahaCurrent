import vsharp from 'vite-plugin-vsharp';
import pwaConfig from './pwa.config';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'mask-icon', href: '/logo-for-light.png', color: '#4F46E5' }
      ],
      meta: [
        { name: 'theme-color', content: '#4F46E5' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'Beyraha' },
        { name: 'msapplication-TileColor', content: '#4F46E5' },
        { name: 'msapplication-TileImage', content: '/pwa-144x144.png' }
      ]
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
    // plugins: [vsharp()], // Geçici olarak devre dışı
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
    '@vite-pwa/nuxt'
  ],

  pwa: pwaConfig,

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
} as any)