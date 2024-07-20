import { defu } from "defu";
const apiBaseUrl = useBaseUrl()

export async function useBaseFetch(url, options = {}) {
  
  const accessToken = useCookie("auth.token");

  const defaults = {
    baseURL: apiBaseUrl,
    key: url,
    watch:false,
    mode: 'no-cors',
    headers: accessToken.value
      ? { Authorization: `Bearer ${accessToken.value}` }
      : {},
    onResponse: async ({ response, options }) => {
      if (response.status === 401) {
        try {
          const newToken = await refreshToken();
          accessToken.value = newToken;
          options.headers = { Authorization: `Bearer ${newToken}` };
          return useFetch(url, options);
        } catch (error) {
          console.error("Token refresh failed:", error);
        }
      }
    }
  };

  const params = defu(options, defaults);

  return useFetch(url, params);
}

async function refreshToken() {

  const refreshToken = useCookie("auth.token");

  try {
    
    const response = await $fetch(
      apiBaseUrl + "auth/refresh",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${refreshToken.value}` }
      }
    );

    return response.token

  } catch (error) {
    
    throw new Error("Token refresh failed");
  }

}
