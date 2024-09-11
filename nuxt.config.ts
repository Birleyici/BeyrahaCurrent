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

  css: ['~/assets/css/main.css'],

  image: {
    provider: 'ipx',
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
    'nuxt-icon',
    '@nuxt/image',
    // "@sidebase/nuxt-auth"
    '@nuxt/ui',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/device',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    'nuxt-tiptap-editor',
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

  compatibilityDate: '2024-08-21',

 
  routeRules: {
      // Renk belirtilmeyen ürünler için siyah varyantlarına yönlendirme
      '/urun/sultanbas-carsaf-takimi': { redirect: '/urun/sultanbas-carsaf-takimi--siyah-22', statusCode: 301 },
      '/urun/kendinden-peceli-afgan-carsaf-takimi-ozel-dikim': { redirect: '/urun/kendinden-peceli-afgan-carsaf-takimi-ozel-dikim--siyah-37', statusCode: 301 },
      '/urun/bassiz-afgan-takimi-ozel-dikim': { redirect: '/urun/bassiz-afgan-takimi-ozel-dikim--siyah-71', statusCode: 301 },
      '/urun/tek-katli-pece': { redirect: '/urun/tek-katli-pece--siyah-79', statusCode: 301 },
      '/urun/ic-pece': { redirect: '/urun/ic-pece--siyah-88', statusCode: 301 },
      '/urun/buyuk-boy-kolsuz-meryem-suflesi': { redirect: '/urun/buyuk-boy-kolsuz-meryem-suflesi--siyah-114', statusCode: 301 },
      '/urun/orta-boy-tek-katli-khimar-sufle': { redirect: '/urun/orta-boy-tek-katli-khimar-sufle--siyah-111', statusCode: 301 },
  
      // Diğer yönlendirmeler
      '/urun/tam-klos-ferace': { redirect: '/urun/sultanbas-carsaf-takimi--7', statusCode: 301 },
      '/urun/carsaf-eldiveni': { redirect: '/urun/carsaf-eldiveni--45', statusCode: 301 },
      '/urun/uc-katli-peceli-khimar-sufle': { redirect: '/urun/uc-katli-peceli-khimar-sufle--34', statusCode: 301 },
      '/urun/uc-katli-arabia-pece': { redirect: '/urun/uc-katli-kelebek-model-arabia-pece--29', statusCode: 301 },
      '/urun/kendinden-peceli-afgan-carsaf-takimi-kahverengi': { redirect: '/urun/kendinden-peceli-afgan-carsaf-takimi-ozel-dikim--kahverengi-59', statusCode: 301 },
      '/urun/ic-pece-lacivert': { redirect: '/urun/ic-pece--lacivert-89', statusCode: 301 },
      '/urun/buyuk-boy-kolsuz-meryem-suflesi-lacivert': { redirect: '/urun/buyuk-boy-kolsuz-meryem-suflesi--lacivert-115', statusCode: 301 },
      '/urun/bassiz-afgan-takimi-tunik-etek-takimi': { redirect: '/urun/bassiz-afgan-takimi-ozel-dikim--28', statusCode: 301 },
      '/urun/mansetli-robali-ferace-murdum': { redirect: '/urun/kat-kat-robali-soft-krep-ferace--43', statusCode: 301 },
      '/urun/bonebas-yarasakol-ferace-lacivert': { redirect: '/urun/bonebas-yarasakol-ferace-ozel-dikim--42', statusCode: 301 },
      '/urun/yarasa-kol-ferace': { redirect: '/urun/yarasa-kol-ferace-ozel-dikim--41', statusCode: 301 },
      '/urun/iki-katli-tam-boy-pece': { redirect: '/urun/iki-katli-pece--32', statusCode: 301 },
      '/urun/tek-katli-pece-kahverengi': { redirect: '/urun/tek-katli-pece--kahverengi-81', statusCode: 301 },
      '/urun/tek-katli-pece-lacivert': { redirect: '/urun/tek-katli-pece--lacivert-80', statusCode: 301 },
      '/urun/buyuk-boy-ucgen-model-fransiz-bas-kolsuz-sufle': { redirect: '/urun/buyuk-boy-kolsuz-meryem-suflesi--38', statusCode: 301 },
      '/urun/tekli-tek-katli-pece-yesil': { redirect: '/urun/tek-katli-pece--yesil-82', statusCode: 301 },
      '/urun/orta-boy-sultanbas-oval-kesim-kolsuz-sufle': { redirect: '/urun/orta-boy-sultanbas-kolsuz-sufle--35', statusCode: 301 },
      '/urun/kisa-boy-sultanbas-oval-kesim-kolsuz-sufle': { redirect: '/urun/kucuk-boy-sultanbas-kolsuz-sufle--36', statusCode: 301 },
      '/urun/klos-carsaf-etegi': { redirect: '/urun/klos-carsaf-etegi-ozel-dikim--47', statusCode: 301 },
      '/urun/sultanbas-afgan-carsaf-takimi': { redirect: '/urun/sultanbas-afgan-carsaf-takimi-ozel-dikim--26', statusCode: 301 },
      '/urun/kol-gecirmeli-malika-suflesi': { redirect: '/urun/orta-boy-tek-katli-khimar-sufle--39', statusCode: 301 },
      '/urun/iki-parca-igneli-carsafi-serif': { redirect: '/urun/tek-parca-igneli-carsafi-serif-ozel-dikim--40', statusCode: 301 },
      '/urun/orta-boy-ucgen-model-kolsuz-sufle': { redirect: '/urun/orta-boy-tek-katli-khimar-sufle--39', statusCode: 301 },
      '/urun/ic-pece-kahverengi': { redirect: '/urun/ic-pece--kahverengi-90', statusCode: 301 },
      '/urun/buyuk-boy-oval-kesim-sultanbas-kolsuz-sufle-lacivert': { redirect: '/urun/buyuk-boy-sultanbas-kolsuz-sufle--37', statusCode: 301 },
      '/urun/ic-pece-yesil': { redirect: '/urun/ic-pece--yesil-91', statusCode: 301 },
      '/urun/kat-kat-robali-soft-krep-ferace': { redirect: '/urun/kat-kat-robali-soft-krep-ferace--43', statusCode: 301 },
      '/urun/keten-elbise-ferace': { redirect: '/urun/pileli-ipek-elbise-ferace--44', statusCode: 301 },
      '/urun/pileli-ipek-elbise-ferace': { redirect: '/urun/pileli-ipek-elbise-ferace--44', statusCode: 301 },
      '/urun/pileli-soft-krep-ferace-sutlu-kahve': { redirect: '/urun/pileli-ipek-elbise-ferace--44', statusCode: 301 },
      '/urun/keten-elbise-ferace-2': { redirect: '/urun/pileli-ipek-elbise-ferace--44', statusCode: 301 },
      '/urun/robali-ferace-siyah': { redirect: '/urun/yarasa-kol-ferace-ozel-dikim--41', statusCode: 301 },
      '/urun/bassiz-afgan-takimi-tunik-etek-takimi-kahverengi': { redirect: '/urun/bassiz-afgan-takimi-ozel-dikim--kahverengi-59', statusCode: 301 },
      '/urun/bassiz-afgan-takimi-tunik-etek-takimi-yesil': { redirect: '/urun/bassiz-afgan-takimi-ozel-dikim--27', statusCode: 301 },
      '/urun/kat-kat-medine-ipegi-ferace': { redirect: '/urun/kat-kat-robali-soft-krep-ferace--43', statusCode: 301 },
      '/urun/igneli-butun-tek-parca-pileli-carsaf-takimi': { redirect: '/urun/tek-parca-igneli-carsafi-serif-ozel-dikim--40', statusCode: 301 },
      '/urun/uc-katli-multi-sifon-meryem-hamra-pecesi': { redirect: '/urun/uc-katli-pece--33', statusCode: 301 },
      '/urun/sultanbas-salvarli-carsaf-takimi': { redirect: '/urun/sultanbas-afgan-carsaf-takimi-ozel-dikim--26', statusCode: 301 },
      '/urun/salvarli-afgan-carsaf-takimi-kahverengi': { redirect: '/urun/kendinden-peceli-afgan-carsaf-takimi-ozel-dikim--kahverengi-59', statusCode: 301 },
      '/urun/uc-3-katli-firfirli-arap-tulu-arabia-pece': { redirect: '/urun/uc-katli-kelebek-model-arabia-pece--29', statusCode: 301 },
      '/urun/pratik-esarp': { redirect: '/urun/kare-esarp--46', statusCode: 301 },
      '/urun/pratik-tek-parca-sandy-namaz-elbisesi-siyah': { redirect: '/urun/yarasa-kol-ferace-ozel-dikim--41', statusCode: 301 }
  }
})