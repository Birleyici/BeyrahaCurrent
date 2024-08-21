import { defu } from "defu";
import { useAuthStore } from "~/store/common/auth"

export async function useBaseOFetchWithAuth(url, options = {}) {
    const authStore = useAuthStore()
    const apiBaseUrl = useBaseUrl()
    const defaults = {
        baseURL: apiBaseUrl,
        headers: authStore.token ? { Authorization: `Bearer ${authStore.token}` } : {},
    };
    const params = defu(options, defaults);

    let response;

    try {
        response = await $fetch(apiBaseUrl + url, params);
        console.log("Request successful");
        return response;
    } catch (error) {
       
        if (error.response && error.response.status === 401) {
            console.log("401 block");

            const newToken = await refreshToken();
            authStore.token = newToken;
            params.headers.Authorization = `Bearer ${newToken}`;

            try {
            console.log("new token:", newToken);

                response = await $fetch(apiBaseUrl + url, params);
                console.log("Retry successful");
                return response;
            } catch (refreshError) {
                console.error("Retry failed:", refreshError);
                throw refreshError;
            }

        } else {
            console.error("Request failed:", error);
            throw error;
        }
    }

    async function refreshToken() {

        if(!authStore.token)
            return 

        try {
            const response = await $fetch(apiBaseUrl + "auth/refresh", {
                method: "POST",
                headers: { Authorization: `Bearer ${authStore.token}` },
            });

            if (response && response.token) {
                
                authStore.token = response.token;
                return response.token

            } else {
                throw new Error("Token refresh failed");
            }
        } catch (error) {
            console.log(error)
            if (error.response?.status === 401) {
                authStore.token = null

            }
            console.error("Token refresh failed", error);
            throw new Error("Token refresh failed");
        }
    }

}


