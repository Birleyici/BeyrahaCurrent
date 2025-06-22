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
      fetchUser: false
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
      await useBaseOFetch('auth/remind', {
        body: JSON.stringify({ email }),
        method: 'POST',
        onResponseError: (errorResponse) => {
          const errorData = errorResponse.response._data

          // Laravel validation hatalarını işle
          if (typeof errorData === 'object' && errorData !== null) {
            // Validation errors object ise
            const formattedErrors = []
            Object.keys(errorData).forEach(field => {
              if (Array.isArray(errorData[field])) {
                formattedErrors.push(...errorData[field])
              } else {
                formattedErrors.push(errorData[field])
              }
            })
            apiError.value.remind = formattedErrors
          } else if (Array.isArray(errorData)) {
            // Eğer direkt array ise
            apiError.value.remind = errorData
          } else {
            // Genel hata mesajı
            apiError.value.remind = [errorData || 'Şifre hatırlatma işlemi başarısız']
          }
        }
      }).finally(() => {
        loading.value.remind = false
      })
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

    const logout = (callback = null) => {
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
      actionsOnLogout()

      callback ? navigateTo(callback) : navigateTo('/auth')
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
      fetchUser
    }
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      pick: ['token', 'anon', 'currentUser']
    }
  }
)
