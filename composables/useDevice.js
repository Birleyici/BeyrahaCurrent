export const useDevice = () => {
  // SSR-safe reactive states
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(true) // Default olarak desktop (SSR için)
  const userAgent = ref('')

  // Server-side user agent detection
  if (process.server) {
    const headers = useRequestHeaders()
    userAgent.value = headers['user-agent'] || ''
    
    // Basic mobile detection patterns
    const mobilePattern = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    const tabletPattern = /iPad|Android(?=.*Tablet)|(?=.*\bAndroid\b)(?=.*\b(?:tab|Tab)\b)/i
    
    isMobile.value = mobilePattern.test(userAgent.value) && !tabletPattern.test(userAgent.value)
    isTablet.value = tabletPattern.test(userAgent.value)
    isDesktop.value = !isMobile.value && !isTablet.value
  }

  // Client-side detection için mounted hook
  onMounted(() => {
    if (process.client) {
      const updateDevice = () => {
        const width = window.innerWidth
        isMobile.value = width < 768
        isTablet.value = width >= 768 && width < 1024
        isDesktop.value = width >= 1024
      }

      // İlk güncelleme
      updateDevice()
      
      // Resize listener
      window.addEventListener('resize', updateDevice)
      
      onUnmounted(() => {
        window.removeEventListener('resize', updateDevice)
      })
    }
  })

  return {
    isMobile: readonly(isMobile),
    isTablet: readonly(isTablet),
    isDesktop: readonly(isDesktop),
    userAgent: readonly(userAgent)
  }
} 