export default defineNuxtPlugin(() => {
  const pwaStore = usePwaStore()

  // Tarayıcı PWA desteği kontrolü
  if (process.client && 'serviceWorker' in navigator) {
    // PWA kurulu mu kontrol et
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (isStandalone) {
      pwaStore.setInstalled(true)
    }

    // beforeinstallprompt event'ini dinle
    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault()
      pwaStore.setCanInstall(true, e)
    })

    // appinstalled event'ini dinle
    window.addEventListener('appinstalled', () => {
      pwaStore.setInstalled(true)
    })

    // Session güncellemesi
    pwaStore.updateSession()
  }
}) 