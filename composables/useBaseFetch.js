import { useMainStore } from '~/stores/main.js'

export const useBaseFetch = async (url, options = {}) => {
    const token = useCookie('auth:token', { watch: true });

    // Varsayılan headers oluşturun
    const defaultHeaders = {
        // Authorization: 'Bearer ' + token.value
    };

    // options.headers varsa, varsayılan headers ile birleştirin
    // Yoksa, sadece varsayılan headers kullanın
    options.headers = options.headers = { ...defaultHeaders, ...options.headers } 

    // options nesnesini güncelleyin
    const fetchOptions = {
        ...options,
        credentials: 'include',
        cache: options.cache || 'no-cache'
    };

    // useFetch ile isteği yapın
    const response = await useFetch(useBaseUrl() + url, fetchOptions);

    return response;
};
