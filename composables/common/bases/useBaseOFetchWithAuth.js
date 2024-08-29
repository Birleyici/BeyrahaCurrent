import { defu } from "defu";

export async function useBaseOFetchWithAuth(url, options = {}) {
    const authStore = useAuthStore();
    const apiBaseUrl = useBaseUrl();
    const toast = useToast();

    const headers = {};

    // Authorization başlığını ekleme
    if (authStore.token) {
        headers['Authorization'] = `Bearer ${authStore.token}`;
    }

    // Anonim kullanıcı ID'si varsa, başlığa ekle
    if (authStore.anon.id) {
        headers['X-Anonymous-User-ID'] = authStore.anon.id;
    }

    const defaults = {
        baseURL: apiBaseUrl,
        headers
    };

    const params = defu(defaults, options);

    try {
        let response = await $fetch(apiBaseUrl + url, params);

        // Anonim kullanıcı ID'si döndüyse, bunu kaydet ve isteği tekrar yap
        if (response.anonymous_user_id) {
            authStore.anon.id = response.anonymous_user_id;
            authStore.anon.name = response.name;

            // Headers güncelle
            params.headers['X-Anonymous-User-ID'] = response.anonymous_user_id;

            // İsteği tekrar yap
            response = await $fetch(apiBaseUrl + url, params);
            console.log('Retrying with anonymous user ID:', response);
        }

        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log("401 block");

            // Token'ı yenile
            const newToken = await refreshToken();
            authStore.token = newToken;
            params.headers['Authorization'] = `Bearer ${newToken}`;

            try {
                console.log("Retrying with new token:", newToken);
                const retryResponse = await $fetch(apiBaseUrl + url, params);
                console.log("Retry successful", retryResponse);
                return retryResponse;
            } catch (retryError) {
                console.error("Retry failed:", retryError);
                throw retryError;
            }
        } else {
            toast.add({
                title: 'Bir hata oluştu!',
                color: 'red',
                icon: "i-heroicons-exclamation-triangle",
            });
            console.error("Fetch error:", error);
            throw error;
        }
    }

    async function refreshToken() {
        if (!authStore.token) return;

        try {
            const response = await $fetch(apiBaseUrl + "auth/refresh", {
                method: "POST",
                headers: { Authorization: `Bearer ${authStore.token}` },
            });

            if (response && response.token) {
                authStore.token = response.token;
                return response.token;
            } else {
                throw new Error("Token refresh failed");
            }
        } catch (error) {
            console.log(error);
            if (error.response?.status === 401) {
                authStore.token = null;
            }
            console.error("Token refresh failed", error);
            throw new Error("Token refresh failed");
        }
    }
}
