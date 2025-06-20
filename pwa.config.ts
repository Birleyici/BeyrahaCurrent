export default {
  registerType: 'autoUpdate',
  client: {
    installPrompt: true,
    registerPlugin: true
  },
  devOptions: {
    enabled: true,
    suppressWarnings: true,
    type: 'module',
    navigateFallback: 'index.html'
  },
  manifest: {
    name: 'Beyraha - Zarif Tesettür Koleksiyonu',
    short_name: 'Beyraha',
    description: 'Kaliteli kumaşlar ve özenli işçilikle hazırlanmış çarşaf, ferace, peçe ve sufle modellerimizle tarzınızı ve konforunuzu bir arada yaşayın',
    theme_color: '#4F46E5',
    background_color: '#ffffff',
    display: 'standalone',
    orientation: 'portrait',
    scope: '/',
    start_url: '/?pwa=true',
    lang: 'tr',
    categories: ['shopping', 'lifestyle', 'fashion'],
    icons: [
      {
        src: 'pwa-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'pwa-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'pwa-128x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'pwa-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'pwa-256x256.png',
        sizes: '256x256',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'pwa-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ],
    screenshots: [
      {
        src: 'screenshot-mobile.png',
        sizes: '390x844',
        type: 'image/png',
        form_factor: 'narrow'
      },
      {
        src: 'screenshot-desktop.png',
        sizes: '1920x1080',
        type: 'image/png',
        form_factor: 'wide'
      }
    ]
  },
  workbox: {
    navigateFallback: '/',
    globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2,woff}'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/cdn\.beyraha\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 7 // 1 week
          }
        }
      },
      {
        urlPattern: /^https:\/\/api\.beyraha\.com\/api\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 // 1 day
          }
        }
      }
    ]
  }
} 