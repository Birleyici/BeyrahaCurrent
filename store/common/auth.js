import { defineStore } from 'pinia'

export const useAuthStore = defineStore(
  'authStore',
  () => {
    const token = ref('')
    const orderState = useOrderStoreFront()
    const cartState = useCartState()

    const user = ref({
      email: '',
      password: ''
    })

    const currentUser = ref(null)

    const register = ref({
      email: '',
      password: '',
      password_confirmation: ''
    })

    const apiError = ref({
      login: [],
      register: [],
      remind: []
    })

    const anon = ref({
      id: null,
      name: null
    })

    const loading = ref({
      login: false,
      register: false,
      remind: false,
      fetchUser: false,
      logout: false
    })

    const fetchUser = async () => {
      if (!token.value) return null

      loading.value.fetchUser = true
      try {
        const response = await useBaseOFetchWithAuth('auth/me')
        currentUser.value = response
        return response
      } catch (error) {
        console.error('User fetch error:', error)
        currentUser.value = null
        
        // Token geçersizse veya 401 hatası varsa logout yap
        if (error.response && error.response.status === 401) {
          console.log('🚨 fetchUser failed with 401, forcing logout')
          // Timer'ı durdur
          clearTokenRefreshTimer()
          // Store'u temizle
          token.value = null
          currentUser.value = null
          // LocalStorage'ı temizle
          if (process.client) {
            try {
              localStorage.removeItem('authStore')
              // Tüm auth ile ilgili localStorage items'ları temizle
              Object.keys(localStorage).forEach(key => {
                if (key.includes('auth') || key.includes('token') || key.includes('user')) {
                  localStorage.removeItem(key)
                }
              })
            } catch (e) {
              console.warn('Failed to clear localStorage in fetchUser error:', e)
            }
          }
        }
        
        return null
      } finally {
        loading.value.fetchUser = false
      }
    }

    const login = async (loginType = 'user') => {
      loading.value.login = true
      apiError.value.login = [] // Hataları temizle
      
      try {
        const response = await useBaseOFetchWithAuth('auth/login', {
          body: JSON.stringify({ 
            ...user.value,
            login_type: loginType 
          }),
          method: 'POST'
        })

        if (response && response.token) {
          token.value = response.token
          await actionsOnLogin()
          return { success: true }
        } else if (response && response.error === 'WRONG_LOGIN_PANEL') {
          return {
            success: false,
            wrongPanel: true,
            redirectTo: response.redirect_to,
            message: response.message,
            userRole: response.user_role
          }
        } else {
          apiError.value.login = [response?.error || 'Giriş işlemi başarısız']
          return { success: false }
        }
      } catch (error) {
        console.error('Login error:', error)
        
        // Hata response'unu kontrol et
        if (error.data) {
          if (error.data.error === 'WRONG_LOGIN_PANEL') {
            return {
              success: false,
              wrongPanel: true,
              redirectTo: error.data.redirect_to,
              message: error.data.message,
              userRole: error.data.user_role
            }
          } else {
            apiError.value.login = [error.data.error || error.data.message || 'Giriş işlemi başarısız']
          }
        } else {
          apiError.value.login = ['Sunucu hatası. Lütfen tekrar deneyin.']
        }
        
        return { success: false }
      } finally {
        loading.value.login = false
      }
    }

    const actionsOnLogin = async () => {
      await fetchUser()
      await orderState.fetchAddresses()
      await cartState.cartDBToState()
    }

    const actionsOnLogout = async () => {
      currentUser.value = null
      await orderState.fetchAddresses()
      await cartState.cartDBToState()
    }

    const registerUser = async () => {
      loading.value.register = true
      const response = await useBaseOFetchWithAuth('auth/register', {
        body: JSON.stringify({ ...register.value }),
        method: 'POST',
        onResponseError: (errorResponse) => {
          // Laravel validation hatalarını doğru şekilde işle
          const errorData = errorResponse.response._data
          
          // Eğer hata verisi bir object ise (Laravel validation errors)
          if (typeof errorData === 'object' && errorData !== null) {
            // Her field için hata mesajlarını array olarak düzenle
            const formattedErrors = []
            Object.keys(errorData).forEach(field => {
              if (Array.isArray(errorData[field])) {
                formattedErrors.push(...errorData[field])
              } else {
                formattedErrors.push(errorData[field])
              }
            })
            apiError.value.register = formattedErrors
          } else {
            // Genel hata mesajı
            apiError.value.register = [errorData || 'Kayıt işlemi başarısız']
          }
        }
      }).finally(() => {
        loading.value.register = false
      })

      if (!response.error) {
        apiError.value.register = []
        token.value = response.token
        await actionsOnLogin()
        return true
      } else {
        token.value = null
        return false
      }
    }

    const remind = async (email) => {
      loading.value.remind = true
      
      try {
        const response = await useBaseOFetch('auth/remind', {
          body: JSON.stringify({ email }),
          method: 'POST'
        })
        
        // Backend her zaman success döndürecek (güvenlik için)
        apiError.value.remind = []
        return response
        
      } catch (error) {
        // Sadece gerçek network hataları veya server hataları
        if (error.data) {
          // Laravel validation hatalarını işle
          const errorData = error.data
          if (typeof errorData === 'object' && errorData !== null) {
            const formattedErrors = []
            Object.keys(errorData).forEach(field => {
              if (Array.isArray(errorData[field])) {
                formattedErrors.push(...errorData[field])
              } else {
                formattedErrors.push(errorData[field])
              }
            })
            apiError.value.remind = formattedErrors
          } else {
            apiError.value.remind = [errorData || 'Şifre hatırlatma işlemi başarısız']
          }
        } else {
          apiError.value.remind = [error.message || 'Şifre hatırlatma işlemi başarısız']
        }
        throw error
      } finally {
        loading.value.remind = false
      }
    }

    const changePassword = async (form) => {
      loading.value.remind = true
      try {
        const response = await useBaseOFetch('auth/reset-password', {
          body: JSON.stringify(form),
          method: 'POST'
        })
        return response // Başarılı yanıtı döndürüyoruz
      } catch (error) {
        console.error('Error in changePassword', error)
        throw error // Hata fırlatıyoruz, böylece `onChange` fonksiyonunda yakalanabilir
      } finally {
        loading.value.remind = false
      }
    }

    const logout = async (callback = null, showMessage = true, forceRedirect = false) => {
      try {
        // Loading state
        loading.value.logout = true

        // API'ye logout isteği gönder (eğer token varsa)
        if (token.value) {
          try {
            await useBaseOFetch('auth/logout', {
              method: 'POST',
              headers: { Authorization: `Bearer ${token.value}` }
            })
          } catch (error) {
            console.warn('Logout API call failed, continuing with local logout:', error)
          }
        }

        // Local state'i temizle
        token.value = null
        currentUser.value = null
        user.value = {
          email: '',
          password: ''
        }
        register.value = {
          email: '',
          password: '',
          password_confirmation: ''
        }

        // API hatalarını temizle
        apiError.value = {
          login: [],
          register: [],
          remind: []
        }

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
            console.log('localStorage authStore cleared manually')
          } catch (e) {
            console.warn('Failed to clear localStorage:', e)
          }
        }

        // Actions on logout
        await actionsOnLogout()

        // Toast mesajı göster (eğer sistemi varsa)
        if (showMessage && process.client) {
          try {
            const { $toast } = useNuxtApp()
            if ($toast) {
              $toast.success('Çıkış yapıldı')
            }
          } catch (e) {
            console.warn('Toast system not available:', e)
          }
        }

        // Yönlendirme mantığı - sadece gerektiğinde yönlendir
        if (process.client && (forceRedirect || callback)) {
          const currentPath = useRoute().fullPath
          
          // Protected route kontrolü
          const protectedRoutes = ['/hesap', '/management']
          const isOnProtectedRoute = protectedRoutes.some(route => currentPath.startsWith(route))
          
          if (callback) {
            // Explicit callback varsa oraya yönlendir
            await navigateTo(callback)
          } else if (isOnProtectedRoute) {
            // Protected route'ta ise uygun giriş sayfasına yönlendir
            if (currentPath.startsWith('/management')) {
              await navigateTo('/management/login')
            } else {
              await navigateTo('/auth')
            }
          }
          // Normal sayfalarda yönlendirme yapmıyoruz - kullanıcı olduğu yerde kalır
        }

      } catch (error) {
        console.error('Error during logout:', error)
        
        // Hata durumunda da state'i temizle
        token.value = null
        currentUser.value = null
        
        // LocalStorage'ı da temizle
        if (process.client) {
          try {
            localStorage.removeItem('authStore')
            // Tüm auth ile ilgili localStorage items'ları temizle
            Object.keys(localStorage).forEach(key => {
              if (key.includes('auth') || key.includes('token') || key.includes('user')) {
                localStorage.removeItem(key)
              }
            })
          } catch (e) {
            console.warn('Failed to clear localStorage in error handling:', e)
          }
        }
        
        // Hata durumunda sadece protected route'larda yönlendir
        if (process.client) {
          const currentPath = useRoute().fullPath
          const protectedRoutes = ['/hesap', '/management']
          const isOnProtectedRoute = protectedRoutes.some(route => currentPath.startsWith(route))
          
          if (isOnProtectedRoute) {
            if (currentPath.startsWith('/management')) {
              window.location.href = '/management/login'
            } else {
              window.location.href = '/auth'
            }
          }
        }
      } finally {
        loading.value.logout = false
      }
    }

    // Token geçerliliğini kontrol eden helper fonksiyon (iyileştirilmiş)
    const isTokenValid = () => {
      if (!token.value) return false
      
      try {
        // Token'ın formatını basit kontrol et
        const parts = token.value.split('.')
        if (parts.length !== 3) return false
        
        // JWT payload'ını decode et (basit kontrol için)
        const payload = JSON.parse(atob(parts[1]))
        const now = Math.floor(Date.now() / 1000)
        
        // Exp kontrolü - 5 dakika tolerans ekle (clock skew için)
        if (payload.exp && payload.exp < (now + 300)) {
          console.log('Token expired or expiring soon locally')
          return false
        }
        
        return true
      } catch (error) {
        console.warn('Token validation error:', error)
        return false
      }
    }

    // Global timer referansı
    let refreshTimer = null

    // Otomatik token yenileme için periodic check (optimize edilmiş)
    const startTokenRefreshTimer = () => {
      // Mevcut timer'ı temizle
      if (refreshTimer) {
        clearInterval(refreshTimer)
        refreshTimer = null
      }

      if (process.client && token.value) {
        // Her 15 dakikada bir token kontrolü yap (daha az agresif)
        refreshTimer = setInterval(async () => {
          if (token.value && !isTokenValid()) {
            console.log('Token expired or expiring soon, attempting refresh...')
            try {
              const response = await useBaseOFetchWithAuth('auth/refresh', {
                method: 'POST'
              })
              if (response && response.token) {
                token.value = response.token
                if (response.user) {
                  currentUser.value = response.user
                }
                console.log('Token auto-refreshed successfully')
              }
            } catch (error) {
              console.warn('Auto token refresh failed:', error)
              // Timer'ı durdur ve sessiz bir şekilde logout yap
              if (refreshTimer) {
                clearInterval(refreshTimer)
                refreshTimer = null
              }
              await logout(null, false)
            }
          }
        }, 15 * 60 * 1000) // 15 dakika
      }
    }

    // Timer'ı temizleme fonksiyonu
    const clearTokenRefreshTimer = () => {
      if (refreshTimer) {
        clearInterval(refreshTimer)
        refreshTimer = null
      }
    }

    // Setter metodları (review token için gerekli)
    const setToken = (newToken) => {
      token.value = newToken
    }

    const setCurrentUser = (user) => {
      currentUser.value = user
    }

    return {
      user,
      currentUser,
      anon,
      register,
      loading,
      apiError,
      token,
      login,
      registerUser,
      remind,
      logout,
      changePassword,
      fetchUser,
      isTokenValid,
      startTokenRefreshTimer,
      clearTokenRefreshTimer,
      setToken,
      setCurrentUser
    }
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      pick: ['token', 'anon', 'currentUser']
    }
  }
)
