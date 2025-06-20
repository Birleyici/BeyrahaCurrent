/**
 * Native Back Button Handler Composable
 * 
 * Modal, slideover, arama gibi UI elementlerinin açık olduğu durumda
 * geri tuşuna basıldığında bunları kapatır (native app davranışı)
 */

// Global state - tüm component'ler arasında paylaşılır
const globalBackHandlerStack = ref([])
const navigationInProgress = ref(false) // Navigation durumu
let isEventListenerAdded = false

export const useNativeBackHandler = () => {
  /**
   * Navigation başladığını işaretle (buton click'leri için)
   */
  const markNavigationStart = () => {
    navigationInProgress.value = true
    // 500ms sonra otomatik olarak sıfırla
    setTimeout(() => {
      navigationInProgress.value = false
    }, 500)
  }

  /**
   * UI elementi açıldığında back handler stack'ine ekler
   * @param {string} id - UI elementinin benzersiz ID'si
   * @param {Function} closeHandler - UI elementini kapatacak fonksiyon
   * @param {number} priority - Öncelik (yüksek sayı = yüksek öncelik)
   */
  const pushBackHandler = (id, closeHandler, priority = 0) => {
    // Aynı ID'ye sahip handler varsa güncelle
    const existingIndex = globalBackHandlerStack.value.findIndex(handler => handler.id === id)
    
    const newHandler = {
      id,
      closeHandler,
      priority,
      timestamp: Date.now()
    }
    
    if (existingIndex !== -1) {
      globalBackHandlerStack.value[existingIndex] = newHandler
    } else {
      globalBackHandlerStack.value.push(newHandler)
    }
    
    // Öncelik ve zamana göre sırala (yüksek öncelik ve yeni olanlar önce)
    globalBackHandlerStack.value.sort((a, b) => {
      if (a.priority !== b.priority) {
        return b.priority - a.priority // Yüksek öncelik önce
      }
      return b.timestamp - a.timestamp // Yeni olanlar önce
    })
    
    // History state'i güncelle
    updateHistoryState()
  }
  
  /**
   * UI elementi kapandığında back handler stack'inden kaldırır
   * @param {string} id - UI elementinin benzersiz ID'si
   */
  const removeBackHandler = (id) => {
    const initialLength = globalBackHandlerStack.value.length
    globalBackHandlerStack.value = globalBackHandlerStack.value.filter(handler => handler.id !== id)
    
    // Eğer stack boşaldıysa history state'i temizle
    if (initialLength > 0 && globalBackHandlerStack.value.length === 0) {
      clearHistoryState()
    }
  }
  
  /**
   * History state'i günceller - phantom entry ekler
   */
  const updateHistoryState = () => {
    if (process.client && globalBackHandlerStack.value.length > 0) {
      // Phantom entry ekle - sadece ilk handler eklendiğinde
      if (globalBackHandlerStack.value.length === 1) {
        window.history.pushState({ isBackHandlerActive: true }, '', window.location.href)
      }
    }
  }
  
  /**
   * History state'i temizler
   */
  const clearHistoryState = () => {
    if (process.client && globalBackHandlerStack.value.length === 0) {
      // Tüm handler'lar kaldırıldığında phantom entry'yi temizle
      if (window.history.state?.isBackHandlerActive) {
        window.history.back()
      }
    }
  }
  
  /**
   * Popstate event listener'ı
   */
  const handlePopState = (event) => {
    // Eğer navigation devam ediyorsa back handler'ı çalıştırma
    if (navigationInProgress.value) {
      return
    }

    // Eğer mevcut durumda aktif handler'lar varsa, onları çalıştır
    if (globalBackHandlerStack.value.length > 0) {
      event.preventDefault() // Default davranışı engelle
      
      // En üstteki handler'ı çalıştır
      const topHandler = globalBackHandlerStack.value[0]
      
      // Handler'ı çalıştır
      topHandler.closeHandler()
      
      return
    }
  }
  
  // Browser'da popstate event'ini dinle (sadece bir kez)
  if (process.client && !isEventListenerAdded) {
    window.addEventListener('popstate', handlePopState)
    isEventListenerAdded = true
    
    // Cleanup function - sayfa değiştiğinde temizle
    if (process.client) {
      window.addEventListener('beforeunload', () => {
        window.removeEventListener('popstate', handlePopState)
        isEventListenerAdded = false
        globalBackHandlerStack.value = []
      })
    }
  }
  
  return {
    pushBackHandler,
    removeBackHandler,
    markNavigationStart,
    backHandlerStack: readonly(globalBackHandlerStack)
  }
}

/**
 * UI Component'ler için kolay kullanım composable'ı
 * @param {string} id - Component'in benzersiz ID'si
 * @param {Ref} isOpen - Component'in açık/kapalı durumunu gösteren ref
 * @param {number} priority - Öncelik seviyesi (modal=100, slideover=50, search=25)
 */
export const useBackButtonClose = (id, isOpen, priority = 0) => {
  const { pushBackHandler, removeBackHandler } = useNativeBackHandler()
  
  const closeHandler = () => {
    isOpen.value = false
  }
  
  // isOpen değiştiğinde back handler'ı ekle/kaldır
  watch(isOpen, (newValue) => {
    if (newValue) {
      pushBackHandler(id, closeHandler, priority)
    } else {
      removeBackHandler(id)
    }
  }, { immediate: true })
  
  // Component unmount olduğunda temizle
  onUnmounted(() => {
    removeBackHandler(id)
  })
  
  return {
    closeHandler
  }
}

/**
 * Öncelik seviyeleri
 */
export const BACK_HANDLER_PRIORITIES = {
  MODAL: 100,
  SLIDEOVER: 50,
  SEARCH: 25,
  DROPDOWN: 10
}

/**
 * Otomatik Back Handler - Tek satırda modal/slideover'a back handler ekler
 * @param {Ref} isOpen - Modal/slideover'ın açık/kapalı durumu
 * @param {Object} options - Yapılandırma seçenekleri
 * @param {string} options.id - Handler ID (otomatik oluşturulur)
 * @param {number} options.priority - Öncelik seviyesi
 * @param {Function} options.onClose - Custom close handler
 * @returns {Object} - Close handler fonksiyonu
 */
export const useAutoBackHandler = (isOpen, options = {}) => {
  const {
    id = `auto-handler-${Math.random().toString(36).substr(2, 9)}`,
    priority = BACK_HANDLER_PRIORITIES.SLIDEOVER,
    onClose
  } = options

  const { pushBackHandler, removeBackHandler } = useNativeBackHandler()

  const closeHandler = () => {
    try {
      if (onClose) {
        onClose()
      } else {
        // Güvenli değer atama - reactive kontrolü
        if (isOpen && typeof isOpen === 'object' && 'value' in isOpen) {
          // Computed değer kontrolü
          if (isOpen.effect && isOpen.effect.fn) {
            console.warn('useBackHandler: Computed değer kullanılamaz, toRef() kullanın')
            return
          }
          isOpen.value = false
        } else if (typeof isOpen === 'function') {
          // Fonksiyon ise çağır
          isOpen(false)
        } else {
          console.warn('useBackHandler: Geçersiz isOpen tipi:', typeof isOpen)
        }
      }
    } catch (error) {
      console.error('useBackHandler closeHandler hatası:', error)
      // Fallback: custom handler varsa onu çağır
      if (onClose) {
        try {
          onClose()
        } catch (fallbackError) {
          console.error('useBackHandler fallback hatası:', fallbackError)
        }
      }
    }
  }

  // Watch ile reactive izleme - güvenli kontrol
  const watchEffect = watch(isOpen, (open) => {
    try {
      if (open) {
        pushBackHandler(id, closeHandler, priority)
      } else {
        removeBackHandler(id)
      }
    } catch (error) {
      console.error('useBackHandler watch hatası:', error)
    }
  }, { immediate: true })

  onUnmounted(() => {
    try {
      removeBackHandler(id)
      // Watch'i durdur
      if (watchEffect && typeof watchEffect === 'function') {
        watchEffect()
      }
    } catch (error) {
      console.error('useBackHandler unmount hatası:', error)
    }
  })

  return { closeHandler }
}

/**
 * Macro-style Back Handler - Çok daha basit kullanım
 * @param {Ref} isOpen - Modal/slideover'ın açık/kapalı durumu
 * @param {number} priority - Öncelik seviyesi (opsiyonel)
 * @param {Function} onClose - Custom close handler (opsiyonel)
 */
export const useBackHandler = (isOpen, priority, onClose) => {
  if (process.server) return

  // Parametre validasyonu
  if (!isOpen) {
    console.warn('useBackHandler: isOpen parametresi gerekli')
    return
  }

  const options = {}
  
  // Flexible parameter handling
  if (typeof priority === 'number') {
    options.priority = priority
  } else if (typeof priority === 'function') {
    options.onClose = priority
  }
  
  if (typeof onClose === 'function') {
    options.onClose = onClose
  }

  // Computed değer kontrolü
  if (isOpen && typeof isOpen === 'object' && isOpen.effect && isOpen.effect.fn) {
    console.error('useBackHandler: Computed değer kullanılamaz! toRef(store, "propertyName") kullanın.')
    return
  }

  try {
    return useAutoBackHandler(isOpen, options)
  } catch (error) {
    console.error('useBackHandler başlatma hatası:', error)
    return
  }
} 