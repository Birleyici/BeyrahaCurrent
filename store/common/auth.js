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
        onResponseError: (errorReponse) => {
          apiError.value.login = [[errorReponse.response._data.error]]
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
        onResponseError: (errorReponse) => {
          apiError.value.register = errorReponse.response._data
        }
      }).finally(() => {
        loading.value.register = false
      })

      if (!response.error) {
        apiError.value.register = null
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
          const data = errorResponse.response._data

          // Eğer veri bir array ise apiError.value.remind'e ata
          if (Array.isArray(data)) {
            apiError.value.remind = data
          } else {
            // Array değilse, hata mesajını işleyebilir ya da görmezden gelebilirsiniz
            console.log('Hata mesajı array formatında değil:', data)
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
