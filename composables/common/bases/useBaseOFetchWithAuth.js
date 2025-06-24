import { defu } from 'defu'

let isRefreshing = false
let refreshSubscribers = []
let currentRefreshToken = null

function onRefreshed(token) {
  refreshSubscribers.map((callback) => callback(token))
  refreshSubscribers = []
  currentRefreshToken = null
}

function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback)
}

export async function useBaseOFetchWithAuth(url, options = {}) {
  const authStore = useAuthStore()
  const apiBaseUrl = useBaseUrl()
  const route = useRoute()
  const router = useRouter()

  // const toast = useToast();

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
    let response = await $fetch(apiBaseUrl + url, params)

    // Anonim kullanıcı ID'si döndüyse, bunu kaydet
    if (response.anonymous_user_id) {
      authStore.anon.id = response.anonymous_user_id
      authStore.anon.name = response.name

      // Headers güncelle ve isteği tekrar yap
      params.headers['X-Anonymous-User-ID'] = response.anonymous_user_id
      response = await $fetch(apiBaseUrl + url, params)
    }

    return response

  } catch (error) {
    console.error('API Error:', error)

    // 401 Unauthorized hatası kontrolü
    if (error.response && error.response.status === 401) {
      const errorData = error.response._data

      // Backend'den gelen hata tipine göre işlem yap
      if (errorData && errorData.requires_login) {
        console.log('Login required, error:', errorData.error)
        
        // Token expired durumu için refresh dene
        if (errorData.error === 'TOKEN_EXPIRED') {
          return await handleTokenRefresh(authStore, apiBaseUrl, route, router, url, params)
        } else if (['TOKEN_INVALID', 'TOKEN_ERROR', 'USER_NOT_FOUND'].includes(errorData.error)) {
          // Bu durumda token tamamen geçersiz, logout yap
          await handleLogout(authStore, router, route, errorData.message)
          throw error
        }
      }

      // Diğer 401 durumları için token refresh dene
      return await handleTokenRefresh(authStore, apiBaseUrl, route, router, url, params)
    }

    throw error
  }
}

async function handleTokenRefresh(authStore, apiBaseUrl, route, router, originalUrl, originalParams) {
  const currentToken = authStore.token

  // Eğer aynı token ile refresh işlemi devam ediyorsa, bekle
  if (isRefreshing && currentRefreshToken === currentToken) {
    console.log('Token refresh already in progress for current token, waiting...')
    return new Promise((resolve, reject) => {
      addRefreshSubscriber((token) => {
        if (token) {
          // Yeni token ile original isteği tekrar yap
          originalParams.headers['Authorization'] = `Bearer ${token}`
          $fetch(apiBaseUrl + originalUrl, originalParams)
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

  try {
    console.log('Attempting token refresh with token:', currentToken.substring(0, 20) + '...')
    
    const response = await $fetch(apiBaseUrl + 'auth/refresh', {
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

      console.log('Token refreshed successfully, new token:', response.token.substring(0, 20) + '...')
      onRefreshed(response.token)

      // Original isteği yeni token ile tekrar yap
      originalParams.headers['Authorization'] = `Bearer ${response.token}`
      const retryResponse = await $fetch(apiBaseUrl + originalUrl, originalParams)
      
      return retryResponse

    } else {
      throw new Error('Token refresh failed - no token returned')
    }

  } catch (error) {
    console.error('Token refresh failed:', error)
    
    // Refresh başarısız olduysa logout yap
    let errorMessage = 'Oturum süresi doldu. Lütfen tekrar giriş yapın.'
    
    if (error.response && error.response._data) {
      const errorData = error.response._data
      if (errorData.message) {
        errorMessage = errorData.message
      }
      
      // Backend'den gelen spesifik hatalar
      if (errorData.error === 'TOKEN_INVALID') {
        errorMessage = 'Token geçersiz. Lütfen tekrar giriş yapın.'
      } else if (errorData.error === 'TOKEN_EXPIRED') {
        errorMessage = 'Oturum tamamen sona erdi. Lütfen tekrar giriş yapın.'
      }
    }

    await handleLogout(authStore, router, route, errorMessage)
    onRefreshed(null) // Bekleyen isteklere null gönder
    
    throw error
  } finally {
    isRefreshing = false
    currentRefreshToken = null
  }
}

async function handleLogout(authStore, router, route, errorMessage = null) {
  try {
    console.log('Handling logout due to auth error:', errorMessage)
    
    // Store'u temizle
    authStore.token = null
    authStore.currentUser = null
    
    // Logout actions
    await authStore.actionsOnLogout()
    
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

    // Auth sayfasına yönlendir - callback ile mevcut sayfayı belirt
    const currentPath = route.fullPath
    const redirectPath = currentPath !== '/auth' ? `/auth?callback=${encodeURIComponent(currentPath)}` : '/auth'
    
    // Router'ı kullanarak yönlendir
    await router.push(redirectPath)
    
  } catch (error) {
    console.error('Error during logout handling:', error)
    
    // En son çare olarak sayfa yenile
    if (process.client) {
      window.location.href = '/auth'
    }
  }
}

// Export for use in other composables
export { handleLogout }
