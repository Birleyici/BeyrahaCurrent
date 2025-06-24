export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()

  // Sadece client-side'da çalıştır
  if (process.client && authStore.token) {
    try {
      console.log('Initializing auth system...')
      
      // Mevcut user bilgisi yoksa fetch et
      // Backend token kontrolünü yapacak ve gerekirse 401 döndürecek
      if (!authStore.currentUser) {
        console.log('Fetching current user on app init...')
        await authStore.fetchUser()
      }

      // Token refresh timer'ını başlat (sadece token varsa)
      if (authStore.token) {
        authStore.startTokenRefreshTimer()
      }
      
      console.log('Auth system initialized successfully')
    } catch (error) {
      console.warn('Auth initialization failed:', error)
      // Hata yönetimini useBaseOFetchWithAuth'a bırakıyoruz
    }
  }
}) 