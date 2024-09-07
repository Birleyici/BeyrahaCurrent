import { defu } from "defu";

let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(token) {
    refreshSubscribers.map(callback => callback(token));
}

export async function useBaseOFetchWithAuth(url, options = {}) {
    const authStore = useAuthStore();
    const apiBaseUrl = useBaseUrl();
    const route = useRoute()

    // const toast = useToast();


    const headers = {};

    // Authorization başlığını ekleme
    if (authStore.token) {
        headers['Authorization'] = `Bearer ${authStore.token}`;
    }

    // Anonim kullanıcı ID'si varsa, başlığa ekle
    if (authStore.anon.id) {
        headers['X-Anonymous-User-ID'] = parseInt(authStore.anon.id, 10);
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

            // Token yenileme işlemi
            const newToken = await handleTokenRefresh(authStore, apiBaseUrl, route);

            // Yenilenen token ile tekrar isteği yap
            params.headers['Authorization'] = `Bearer ${newToken}`;

            try {
                console.log("Retrying url:", url);

                const retryResponse = await $fetch(apiBaseUrl + url, params);
                console.log("Retry successful", retryResponse);
                return retryResponse;
            } catch (retryError) {
                console.error("Retry failed:", retryError);
                throw retryError;
            }
        } else {
            // toast.add({
            //     title: 'Bir hata oluştu!',
            //     color: 'red',
            //     icon: "i-heroicons-exclamation-triangle",
            // });
            console.error("Fetch error:", error);
            console.error('Validation errors:', error.response);

            throw error;
        }
    }
}

async function handleTokenRefresh(authStore, apiBaseUrl, route) {

    if (isRefreshing) {
        return new Promise(resolve => {
            refreshSubscribers.push(token => {
                resolve(token);
            });
        });
    }

    isRefreshing = true;

    try {
        const response = await $fetch(apiBaseUrl + "auth/refresh", {
            method: "POST",
            headers: { Authorization: `Bearer ${authStore.token}` },
        });

        if (response && response.token) {
            authStore.token = response.token;
            onRefreshed(response.token);
            refreshSubscribers = [];
            return response.token;
        } else {
            throw new Error("Token refresh failed");
        }
    } catch (error) {
        if (error.response?.status === 401) {
            
            authStore.logout(route.fullPath);
        }
        console.error("Token refresh failed", error);
        throw error;
    } finally {
        isRefreshing = false;
    }
}
