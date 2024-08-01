import { defu } from "defu";

export async function useBaseOFetchWithAuth(url, options = {}) {
   
    const apiBaseUrl = useBaseUrl()
    const token = useCookie("auth.token", { watch: true })
    const defaults = {
        baseURL: apiBaseUrl,
        headers: token.value ? { Authorization: `Bearer ${token.value}` } : {},
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

            try {
                const newToken = await refreshToken(token);
                token.value = newToken;
                params.headers.Authorization = `Bearer ${newToken}`;
                response = await $fetch(apiBaseUrl + url, params);
                console.log("Retry successful");
                return response;
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                throw refreshError;
            }

        } else {
            console.error("Request failed:", error);
            throw error;
        }
    }

    async function refreshToken(token) {

        try {
            const response = await $fetch(apiBaseUrl + "auth/refresh", {
                method: "POST",
                headers: { Authorization: `Bearer ${token.value}` },
            });

            if (response && response.token) {
                token.value = response.token;
                return response.token
            } else {
                throw new Error("Token refresh failed");
            }
        } catch (error) {
            console.error("Token refresh failed", error);
            throw new Error("Token refresh failed");
        }
    }

}


