import { defineStore } from "pinia";

export const useAuthStore = defineStore('authStore', () => {

    const isAuthanticated = ref(false)
    const user = ref({
        email: '',
        password: ''
    })
    const loading = ref(false)

    const login = async () => {
        loading.value = true;
        const response = await useBaseOFetch(
            "auth/login",
            {
                body: JSON.stringify({ ...user.value }),
                method: "POST",
            }
        );

        if (!response.error) {
            const token = useCookie("auth.token");
            token.value = response.token
            return true
        } else {

            console.log(response.error)
            return false
        }
    };


    return { isAuthanticated, user, login }
})