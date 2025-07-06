import { defu } from 'defu'
import { useErrorHandler } from '~/composables/useErrorHandler'

let isRefreshing = false
let currentRefreshToken = null
let refreshSubscribers = []
let refreshAttempts = 0
const MAX_REFRESH_ATTEMPTS = 2
const REFRESH_COOLDOWN = 10000

function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback)
}

function onRefreshed(token) {
  refreshSubscribers.map(callback => callback(token))
  refreshSubscribers = []
}

export async function useBaseOFetchWithAuth(url, options = {}) {
  const authStore = useAuthStore()
  const apiBaseUrl = useBaseUrl()
  const route = useRoute()
  const router = useRouter()

  const headers = {}

  // Authorization başlığını ekleme
  if (authStore.token) {
    headers['Authorization'] = `Bearer ${authStore.token}`
  }

  // Anonim kullanıcı ID'si varsa, başlığa ekle
  if (authStore.anon.id) {
    headers['X-Anonymous-User-ID'] = parseInt(authStore.anon.id, 10)
  }

  const defaults = {
    baseURL: apiBaseUrl,
    headers
  }

  const params = defu(defaults, options)

  try {
    // URL birleştirme - çift slash'ı önle
    const fullUrl = apiBaseUrl.replace(/\/$/, '') + '/' + url.replace(/^\//, '')
    let response = await $fetch(fullUrl, params)

    // Anonim kullanıcı ID'si döndüyse, bunu kaydet
    if (response.anonymous_user_id) {
      authStore.anon.id = response.anonymous_user_id
      authStore.anon.name = response.name

      // Headers güncelle ve isteği tekrar yap
      params.headers['X-Anonymous-User-ID'] = response.anonymous_user_id
      response = await $fetch(fullUrl, params)
    }

    // Refresh attempt sayacını sıfırla başarılı istek sonrası
    refreshAttempts = 0
    return response

  } catch (error) {
    console.error('useBaseOFetchWithAuth error:', error)

    // 401 Unauthorized hatası kontrolü
    if (error.response && error.response.status === 401) {
      const errorData = error.response._data

      // Backend'den gelen hata tipine göre işlem yap
      if (errorData && errorData.requires_login) {
        console.log('Login required, error:', errorData.error)
        
        // TOKEN_EXPIRED için refresh dene, diğer durumlarda logout
        if (errorData.error === 'TOKEN_EXPIRED') {
          return await handleTokenRefresh(authStore, apiBaseUrl, route, router, url, params)
        } else {
          // TOKEN_INVALID, TOKEN_ERROR, USER_NOT_FOUND, TOKEN_BLACKLISTED için immediate logout
          await handleLogout(authStore, router, route, errorData.message || 'Oturum geçersiz. Lütfen tekrar giriş yapın.')
          throw error
        }
      }

      // Backend error data yoksa genel 401 için refresh dene
      // AMA SADECE refresh attempts limitini aşmadıysak
      if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
        console.log('Max refresh attempts reached, forcing logout without trying refresh')
        await handleLogout(authStore, router, route, 'Oturum yenileme başarısız. Lütfen tekrar giriş yapın.')
        throw error
      }

      return await handleTokenRefresh(authStore, apiBaseUrl, route, router, url, params)
    }

    throw error
  }
}

async function handleTokenRefresh(authStore, apiBaseUrl, route, router, originalUrl, originalParams) {
  const currentToken = authStore.token

  // Early exit: Max attempts kontrolü
  if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
    console.log('Max refresh attempts reached, forcing logout')
    await handleLogout(authStore, router, route, 'Çok fazla refresh denemesi. Lütfen tekrar giriş yapın.')
    throw new Error('Max refresh attempts reached')
  }

  // Eğer aynı token ile refresh işlemi devam ediyorsa, bekle
  if (isRefreshing && currentRefreshToken === currentToken) {
    console.log('Token refresh already in progress for current token, waiting...')
    return new Promise((resolve, reject) => {
      addRefreshSubscriber((token) => {
        if (token) {
          // Yeni token ile original isteği tekrar yap
          originalParams.headers['Authorization'] = `Bearer ${token}`
          const retryUrl = apiBaseUrl.replace(/\/$/, '') + '/' + originalUrl.replace(/^\//, '')
          $fetch(retryUrl, originalParams)
            .then(resolve)
            .catch(reject)
        } else {
          reject(new Error('Token refresh failed'))
        }
      })
    })
  }

  // Eğer farklı bir token ile refresh devam ediyorsa, iptal et
  if (isRefreshing && currentRefreshToken !== currentToken) {
    console.log('Different token refresh in progress, cancelling current request')
    throw new Error('Token changed during refresh')
  }

  isRefreshing = true
  currentRefreshToken = currentToken
  refreshAttempts++

  try {
    console.log(`Attempting token refresh (attempt ${refreshAttempts}/${MAX_REFRESH_ATTEMPTS})...`)
    
    const refreshUrl = apiBaseUrl.replace(/\/$/, '') + '/auth/refresh'
    const response = await $fetch(refreshUrl, {
      method: 'POST',
      headers: { Authorization: `Bearer ${currentToken}` }
    })

    if (response && response.token) {
      // Token başarıyla yenilendi
      authStore.token = response.token
      
      // User bilgisi de geldiyse güncelle
      if (response.user) {
        authStore.currentUser = response.user
      }

      console.log('Token refreshed successfully')
      refreshAttempts = 0 // Başarılı refresh sonrası sayacı sıfırla
      onRefreshed(response.token)

      // Original isteği yeni token ile tekrar yap
      originalParams.headers['Authorization'] = `Bearer ${response.token}`
      const retryUrl = apiBaseUrl.replace(/\/$/, '') + '/' + originalUrl.replace(/^\//, '')
      const retryResponse = await $fetch(retryUrl, originalParams)
      
      return retryResponse

    } else {
      throw new Error('Token refresh failed - no token returned')
    }

  } catch (error) {
    console.error(`Token refresh failed (attempt ${refreshAttempts}/${MAX_REFRESH_ATTEMPTS}):`, error)
    
    // Backend'den "cannot be refreshed" hatası gelirse immediate logout
    if (error.response && error.response._data) {
      const errorData = error.response._data
      if (errorData.message && errorData.message.includes('cannot be refreshed')) {
        console.log('Token cannot be refreshed, forcing immediate logout')
        await handleLogout(authStore, router, route, 'Oturum süresi doldu. Lütfen tekrar giriş yapın.')
        onRefreshed(null)
        throw error
      }
    }
    
    // Max deneme sayısına ulaştıysak logout yap
    if (refreshAttempts >= MAX_REFRESH_ATTEMPTS) {
      console.log('Max refresh attempts reached after error, forcing logout')
      let errorMessage = 'Oturum yenileme başarısız. Lütfen tekrar giriş yapın.'
      
      if (error.response && error.response._data) {
        const errorData = error.response._data
        if (errorData.message) {
          errorMessage = errorData.message
        }
      }

      await handleLogout(authStore, router, route, errorMessage)
      onRefreshed(null) // Bekleyen isteklere null gönder
    }
    
    throw error
  } finally {
    isRefreshing = false
    currentRefreshToken = null
  }
}

async function handleLogout(authStore, router, route, errorMessage = null) {
  try {
    console.log('🚨 HANDLE LOGOUT CALLED 🚨')
    console.log('Error message:', errorMessage)
    console.log('Current route:', route?.fullPath)
    console.log('Router available:', !!router)
    
    // Timer'ları durdur
    if (authStore.clearTokenRefreshTimer) {
      authStore.clearTokenRefreshTimer()
    }
    
    // Store'u temizle
    authStore.token = null
    authStore.currentUser = null
    
    // MANUEL LOCALSTORAGE TEMİZLEME - Pinia persist otomatik yapmıyor
    if (process.client) {
      try {
        localStorage.removeItem('authStore')
        // Tüm auth ile ilgili localStorage items'ları temizle
        Object.keys(localStorage).forEach(key => {
          if (key.includes('auth') || key.includes('token') || key.includes('user')) {
            localStorage.removeItem(key)
          }
        })
        console.log('🧹 localStorage authStore cleared manually in handleLogout')
      } catch (e) {
        console.warn('Failed to clear localStorage in handleLogout:', e)
      }
    }
    
    // Logout actions
    if (authStore.actionsOnLogout) {
      await authStore.actionsOnLogout()
    }
    
    // Error message varsa toast göster (eğer toast sistemi varsa)
    if (errorMessage && process.client) {
      // Toast sistemini kontrol et
      try {
        const { $toast } = useNuxtApp()
        if ($toast) {
          $toast.error(errorMessage)
        }
      } catch (e) {
        console.warn('Toast system not available:', e)
      }
    }

    // Yönlendirme mantığı - Management vs Normal area
    const currentPath = route.fullPath
    console.log('🔍 Determining redirect path for:', currentPath)
    
    // Management alanında ise callback ile current path'i ekleyerek management/login'e yönlendir
    if (currentPath.startsWith('/management')) {
      const redirectPath = `/management/login?callback=${encodeURIComponent(currentPath)}`
      console.log('🚀 Management area - redirecting to:', redirectPath)
      await router.push(redirectPath)
    } else {
      // Normal alanda ise - sadece protected route'larda yönlendir
      const protectedRoutes = ['/hesap']
      const isOnProtectedRoute = protectedRoutes.some(route => currentPath.startsWith(route))
      
      if (isOnProtectedRoute) {
        const redirectPath = `/auth?callback=${encodeURIComponent(currentPath)}`
        console.log('🚀 Protected route - redirecting to:', redirectPath)
        await router.push(redirectPath)
      } else {
        console.log('🏠 Non-protected route - staying on current page')
        // Protected olmayan sayfalarda yönlendirme yapmıyoruz
      }
    }
    
    console.log('✅ Redirect completed successfully')
    
  } catch (error) {
    console.error('❌ Error during logout handling:', error)
    
    // En son çare olarak sayfa yenile
    if (process.client) {
      console.log('🔄 Fallback: redirecting via window.location')
      // LocalStorage'ı da temizle
      try {
        localStorage.removeItem('authStore')
        // Tüm auth ile ilgili localStorage items'ları temizle
        Object.keys(localStorage).forEach(key => {
          if (key.includes('auth') || key.includes('token') || key.includes('user')) {
            localStorage.removeItem(key)
          }
        })
      } catch (e) {
        console.warn('Failed to clear localStorage in fallback:', e)
      }
      
      // Current path'e göre fallback redirect
      const currentPath = route.fullPath
      if (currentPath.startsWith('/management')) {
        window.location.href = '/management/login'
      } else {
        const protectedRoutes = ['/hesap']
        const isOnProtectedRoute = protectedRoutes.some(route => currentPath.startsWith(route))
        
        if (isOnProtectedRoute) {
          window.location.href = '/auth'
        }
        // Non-protected route'larda sayfa yenileme yapmıyoruz
      }
    }
  }
}

// Export for use in other composables
export { handleLogout }
