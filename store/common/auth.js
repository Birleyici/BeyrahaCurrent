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
        return null
      } finally {
        loading.value.fetchUser = false
      }
    }

    const login = async () => {
      loading.value.login = true
      const response = await useBaseOFetchWithAuth('auth/login', {
        body: JSON.stringify({ ...user.value }),
        method: 'POST',
        onResponseError: (errorResponse) => {
          const errorData = errorResponse.response._data
          
          // Eğer error field'ı varsa onu kullan, yoksa genel mesaj
          if (errorData.error) {
            apiError.value.login = [errorData.error]
          } else {
            apiError.value.login = ['Giriş işlemi başarısız']
          }
          loading.value.login = false
        }
      }).finally(() => {
        loading.value.login = false
      })

      console.log(user.value)
      if (!response.error) {
        apiError.value.login = []
        token.value = response.token
        await actionsOnLogin()
        return true
      } else {
        token.value = null
        console.log(user.value)

        return false
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

    const logout = async (callback = null, showMessage = true) => {
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

        // Yönlendirme
        if (callback) {
          await navigateTo(callback)
        } else {
          await navigateTo('/auth')
        }

      } catch (error) {
        console.error('Error during logout:', error)
        
        // Hata durumunda da state'i temizle
        token.value = null
        currentUser.value = null
        
        // En son çare olarak auth sayfasına yönlendir
        if (process.client) {
          window.location.href = '/auth'
        }
      } finally {
        loading.value.logout = false
      }
    }

    // Token geçerliliğini kontrol eden helper fonksiyon
    const isTokenValid = () => {
      if (!token.value) return false
      
      try {
        // Token'ın formatını basit kontrol et
        const parts = token.value.split('.')
        if (parts.length !== 3) return false
        
        // JWT payload'ını decode et (basit kontrol için)
        const payload = JSON.parse(atob(parts[1]))
        const now = Math.floor(Date.now() / 1000)
        
        // Exp kontrolü
        if (payload.exp && payload.exp < now) {
          console.log('Token expired locally')
          return false
        }
        
        return true
      } catch (error) {
        console.warn('Token validation error:', error)
        return false
      }
    }

    // Otomatik token yenileme için periodic check
    const startTokenRefreshTimer = () => {
      if (process.client && token.value) {
        // Her 5 dakikada bir token kontrolü yap
        setInterval(async () => {
          if (token.value && !isTokenValid()) {
            console.log('Token expired, attempting refresh...')
            try {
              const response = await useBaseOFetchWithAuth('auth/refresh', {
                method: 'POST'
              })
              if (response && response.token) {
                token.value = response.token
                if (response.user) {
                  currentUser.value = response.user
                }
                console.log('Token auto-refreshed')
              }
            } catch (error) {
              console.warn('Auto token refresh failed:', error)
              // Sessiz bir şekilde logout yap
              await logout(null, false)
            }
          }
        }, 5 * 60 * 1000) // 5 dakika
      }
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
      startTokenRefreshTimer
    }
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      pick: ['token', 'anon', 'currentUser']
    }
  }
)
