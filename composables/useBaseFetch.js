export const useBaseFetch = async (url, options = {}) => {
    const token = useCookie('token', {watch: true});

    // Varsayılan headers ile options içindeki headers'ı birleştirin
    const headers = {
        Authorization: 'Bearer ' + token.value,
        ...options.headers // options içindeki mevcut headers, varsa üzerine yazılır
    };

    const response = await useFetch(
        useBaseUrl() + url,
        {
          credentials: 'include',
          headers: headers,
          ...options, // headers dışındaki diğer seçenekleri koruyun
          cache: options.cache ? options.cache : 'no-cache'
        }
    );

    return response;
};
