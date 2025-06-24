export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()

  // Sadece client-side'da çalıştır
  if (process.client && authStore.token) {
    try {
      console.log('Initializing auth system...')
      
      // Mevcut user bilgisi yoksa fetch et
      if (!authStore.currentUser) {
        console.log('Fetching current user on app init...')
        await authStore.fetchUser()
      }

      // Token refresh timer'ını başlat
      authStore.startTokenRefreshTimer()
      
      console.log('Auth system initialized successfully')
    } catch (error) {
      console.warn('Auth initialization failed:', error)
      
      // Eğer auth init başarısız olursa token'ı temizle
      authStore.token = null
      authStore.currentUser = null
    }
  }
}) 