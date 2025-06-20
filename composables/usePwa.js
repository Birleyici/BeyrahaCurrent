export default function usePwa() {
  // Server-side rendering kontrolü
  if (process.server) {
    return {
      isInstalled: ref(false),
      canInstall: ref(false),
      shouldShowPrompt: ref(false),
      needRefresh: ref(false),
      offlineReady: ref(false),
      install: () => Promise.resolve(false),
      showLater: () => {},
      neverShow: () => {},
      showPrompt: () => {},
      hidePrompt: () => {},
      cancelInstall: () => {},
      updateServiceWorker: () => Promise.resolve(),
      closePrompt: () => {},
      setInstalled: () => {},
      checkInstallation: () => {},
      pwaStore: null
    }
  }

  const pwaStore = usePwaStore()
  const { $pwa } = useNuxtApp()

  // PWA instance'ını store'a set et - null kontrol ekle
  if ($pwa && !pwaStore.vitePwa) {
    try {
      pwaStore.setVitePwa($pwa)
    } catch (error) {
      console.warn('PWA instance set edilemedi:', error)
    }
  }

  // Reactive states - güvenli erişim
  const isInstalled = computed(() => {
    try {
      return pwaStore.isPwaInstalled
    } catch {
      return false
    }
  })
  
  const canInstall = computed(() => {
    try {
      return pwaStore.canInstall
    } catch {
      return false
    }
  })
  
  const shouldShowPrompt = computed(() => {
    try {
      return pwaStore.shouldShowInstallPrompt
    } catch {
      return false
    }
  })
  
  const needRefresh = computed(() => {
    try {
      return $pwa?.needRefresh?.value || false
    } catch {
      return false
    }
  })
  
  const offlineReady = computed(() => {
    try {
      return $pwa?.offlineReady?.value || false
    } catch {
      return false
    }
  })

  // Actions - hata yakalama ile
  const install = async () => {
    try {
      return await pwaStore.installPwa()
    } catch (error) {
      console.warn('PWA kurulum hatası:', error)
      return false
    }
  }

  const showLater = () => {
    try {
      pwaStore.showLater()
    } catch (error) {
      console.warn('PWA showLater hatası:', error)
    }
  }

  const neverShow = () => {
    try {
      pwaStore.neverShow()
    } catch (error) {
      console.warn('PWA neverShow hatası:', error)
    }
  }

  const showPrompt = () => {
    try {
      pwaStore.showPrompt()
    } catch (error) {
      console.warn('PWA showPrompt hatası:', error)
    }
  }

  const hidePrompt = () => {
    try {
      pwaStore.hidePrompt()
    } catch (error) {
      console.warn('PWA hidePrompt hatası:', error)
    }
  }

  const cancelInstall = () => {
    try {
      pwaStore.cancelInstall()
    } catch (error) {
      console.warn('PWA cancelInstall hatası:', error)
    }
  }

  const updateServiceWorker = async (reloadPage = true) => {
    try {
      if ($pwa?.updateServiceWorker) {
        await $pwa.updateServiceWorker(reloadPage)
      }
    } catch (error) {
      console.warn('Service worker güncelleme hatası:', error)
    }
  }

  const closePrompt = () => {
    try {
      if ($pwa?.cancelPrompt) {
        $pwa.cancelPrompt()
      }
    } catch (error) {
      console.warn('PWA closePrompt hatası:', error)
    }
  }

  const setInstalled = (installed = true) => {
    try {
      pwaStore.setInstalled(installed)
    } catch (error) {
      console.warn('PWA setInstalled hatası:', error)
    }
  }

  const checkInstallation = () => {
    try {
      pwaStore.checkInstallation()
    } catch (error) {
      console.warn('PWA checkInstallation hatası:', error)
    }
  }

  // Lifecycle hooks
  onMounted(() => {
    try {
      // PWA session güncelle
      pwaStore.updateSession()
      
      // PWA kurulum durumunu kontrol et
      checkInstallation()
      
      // beforeinstallprompt event listener ekle
      const handleBeforeInstallPrompt = (event) => {
        event.preventDefault()
        pwaStore.setInstallEvent(event)
      }
      
      // appinstalled event listener ekle
      const handleAppInstalled = () => {
        pwaStore.setInstalled(true)
      }
      
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.addEventListener('appinstalled', handleAppInstalled)
      
      // Cleanup function
      onUnmounted(() => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
        window.removeEventListener('appinstalled', handleAppInstalled)
      })
    } catch (error) {
      console.warn('PWA initialization hatası:', error)
    }
  })

  return {
    // States
    isInstalled,
    canInstall,
    shouldShowPrompt,
    needRefresh,
    offlineReady,
    
    // Actions
    install,
    showLater,
    neverShow,
    showPrompt,
    hidePrompt,
    cancelInstall,
    updateServiceWorker,
    closePrompt,
    setInstalled,
    checkInstallation,
    
    // Store reference
    pwaStore
  }
} 