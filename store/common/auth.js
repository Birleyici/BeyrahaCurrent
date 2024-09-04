import { defineStore } from "pinia";

export const useAuthStore = defineStore('authStore', () => {
    const token = ref('');
    const orderState = useOrderStoreFront()
    const cartState = useCartState()

    const user = ref({
        email: '',
        password: ''
    })

    const register = ref({
        email: '',
        password: '',
        password_confirmation: ''
    })

    const apiError = ref({
        login: [],
        register: []
    })

    const anon = ref({
        id: null,
        name: null
    })


    const loginLoading = ref(false)
    const registerLoading = ref(false)

    const login = async () => {
        loginLoading.value = true;
        const response = await useBaseOFetchWithAuth(
            "auth/login",
            {
                body: JSON.stringify({ ...user.value }),
                method: "POST",
                onResponseError: (errorReponse) => {
                    apiError.value.login = [[errorReponse.response._data.error]]
                    loginLoading.value = false;

                }
            }
        ).finally(() => {
            console.log("deneme")
            loginLoading.value = false;
        });


        if (!response.error) {
            apiError.value.login = []
            token.value = response.token
            actionsOnLogin()
            return true
        } else {
            token.value = null
            console.log(response.error)
            return false
        }


    };


    const actionsOnLogin = async () => {
        await orderState.fetchAddresses()
        await cartState.cartDBToState()
    }

    const actionsOnLogout = async () => {
        await orderState.fetchAddresses()
        await cartState.cartDBToState()
    }

    const registerUser = async () => {
        registerLoading.value = true;
        const response = await useBaseOFetch(
            "auth/register",
            {
                body: JSON.stringify({ ...register.value }),
                method: "POST",
                onResponseError: (errorReponse) => {

                    apiError.value.register = errorReponse.response._data
                }
            }
        ).finally(() => {
            registerLoading.value = false;
        });

        if (!response.error) {
            apiError.value.register = null
            token.value = response.token
            return true
        } else {
            token.value = null
            return false
        }


    };


    const logout = (callback = null) => {

        token.value = null
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


    return { user, anon, register, loginLoading, registerLoading, apiError, token, login, registerUser, logout }
},
    {
        persist: {
            storage: persistedState.localStorage,
        },
    })