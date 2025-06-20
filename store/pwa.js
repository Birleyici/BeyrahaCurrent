import { defineStore } from 'pinia'

export const usePwaStore = defineStore('pwa', {
  state: () => ({
    // Install prompt ayarları
    showInstallPrompt: true,
    neverShowAgain: false,
    showLater: false,
    
    // Session tracking
    sessionId: null,
    
    // Vite PWA integration
    vitePwa: null,
    
    // PWA installation state
    isInstalled: false,
    installEvent: null
  }),

  getters: {
    // Install prompt gösterilmeli mi?
    shouldShowInstallPrompt: (state) => {
      if (process.server) return false
      try {
        const currentSessionId = Date.now().toString()
        return (
          state.vitePwa?.showInstallPrompt?.value &&
          !state.vitePwa?.isPWAInstalled?.value &&
          !state.isInstalled &&
          state.showInstallPrompt && 
          !state.neverShowAgain &&
          (!state.showLater || state.sessionId !== currentSessionId)
        )
      } catch (error) {
        console.warn('shouldShowInstallPrompt getter hatası:', error)
        return false
      }
    },

    // PWA yüklenmiş mi?
    isPwaInstalled: (state) => {
      if (process.server) return false
      try {
        return state.vitePwa?.isPWAInstalled?.value || state.isInstalled || false
      } catch (error) {
        console.warn('isPwaInstalled getter hatası:', error)
        return false
      }
    },

    // Install edilebilir mi?
    canInstall: (state) => {
      if (process.server) return false
      try {
        return (state.vitePwa?.showInstallPrompt?.value || state.installEvent) && !state.isInstalled
      } catch (error) {
        console.warn('canInstall getter hatası:', error)
        return false
      }
    }
  },

  actions: {
    // Vite PWA instance'ını set et
    setVitePwa(pwa) {
      try {
        this.vitePwa = pwa
      } catch (error) {
        console.warn('setVitePwa hatası:', error)
      }
    },

    // PWA kurulum durumunu set et
    setInstalled(installed = true) {
      try {
        this.isInstalled = installed
        if (installed) {
          this.showInstallPrompt = false
          this.installEvent = null
        }
      } catch (error) {
        console.warn('setInstalled hatası:', error)
      }
    },

    // Install event'ini set et
    setInstallEvent(event) {
      try {
        this.installEvent = event
      } catch (error) {
        console.warn('setInstallEvent hatası:', error)
      }
    },

    // Install prompt'u göster
    showPrompt() {
      try {
        this.showInstallPrompt = true
      } catch (error) {
        console.warn('showPrompt hatası:', error)
      }
    },

    // Install prompt'u gizle
    hidePrompt() {
      try {
        this.showInstallPrompt = false
      } catch (error) {
        console.warn('hidePrompt hatası:', error)
      }
    },

    // Bir daha gösterme
    neverShow() {
      try {
        this.neverShowAgain = true
        this.showInstallPrompt = false
      } catch (error) {
        console.warn('neverShow hatası:', error)
      }
    },

    // Daha sonra göster
    showLater() {
      try {
        this.showLater = true
        this.sessionId = Date.now().toString()
        this.showInstallPrompt = false
      } catch (error) {
        console.warn('showLater hatası:', error)
      }
    },

    // PWA'yı yükle
    async installPwa() {
      try {
        // Vite PWA install metodu
        if (this.vitePwa?.install) {
          await this.vitePwa.install()
          this.setInstalled(true)
          return true
        }
        
        // Manuel install event
        if (this.installEvent) {
          const result = await this.installEvent.prompt()
          if (result.outcome === 'accepted') {
            this.setInstalled(true)
            return true
          }
        }
        
        return false
      } catch (error) {
        console.warn('installPwa hatası:', error)
        return false
      }
    },

    // Install prompt'u iptal et
    cancelInstall() {
      try {
        if (this.vitePwa?.cancelInstall) {
          this.vitePwa.cancelInstall()
        }
        this.showInstallPrompt = false
        this.installEvent = null
      } catch (error) {
        console.warn('cancelInstall hatası:', error)
      }
    },

    // Session ID'yi güncelle
    updateSession() {
      try {
        this.sessionId = Date.now().toString()
      } catch (error) {
        console.warn('updateSession hatası:', error)
      }
    },

    // PWA durumunu kontrol et
    checkInstallation() {
      try {
        if (process.server) return
        
        // Standalone mode kontrolü
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                           window.navigator.standalone ||
                           document.referrer.includes('android-app://')
        
        if (isStandalone) {
          this.setInstalled(true)
        }
      } catch (error) {
        console.warn('checkInstallation hatası:', error)
      }
    }
  },

  persist: {
    pick: ['showInstallPrompt', 'neverShowAgain', 'showLater', 'sessionId', 'isInstalled']
  }
})