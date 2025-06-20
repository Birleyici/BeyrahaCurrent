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
    vitePwa: null
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
        return state.vitePwa?.isPWAInstalled?.value || false
      } catch (error) {
        console.warn('isPwaInstalled getter hatası:', error)
        return false
      }
    },

    // Install edilebilir mi?
    canInstall: (state) => {
      if (process.server) return false
      try {
        return state.vitePwa?.showInstallPrompt?.value || false
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
        if (this.vitePwa?.install) {
          await this.vitePwa.install()
          this.showInstallPrompt = false
          return true
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
    }
  },

  persist: {
    pick: ['showInstallPrompt', 'neverShowAgain', 'showLater', 'sessionId']
  }
}) 