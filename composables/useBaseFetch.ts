import type { UseFetchOptions } from "#app";
import { defu } from "defu";

export async function useBaseFetch<T>(
  url: string,
  options: UseFetchOptions<T> = {}
) {
  
  const accessToken = useCookie("auth.token");

  const defaults: UseFetchOptions<T> = {
    baseURL: useBaseUrl(),
    key: url,
    headers: accessToken.value
      ? { Authorization: `Bearer ${accessToken.value}` }
      : {},
    onResponse: async ({ response, options }) => {

      if (response.status === 401) {
          try {
            const newToken = await refreshToken();
            accessToken.value = newToken;
            options.headers = { Authorization: `Bearer ${newToken}` };
            useFetch(url, options as UseFetchOptions<T>);
          } catch (error) {
            console.error("Token refresh failed:", error);
          }
      }
    },
    onResponseError: (error) => {
      console.log("onresponseerror", error);
    },
    onRequestError: () => {
      console.log("onrequesterror");
    }
  };

  const params = defu(options, defaults);

  return useFetch(url, params);
}

async function refreshToken() {

  const refreshToken = useCookie("auth.token");

  const { data, error } = await useFetch<{ token: string }>(
    useBaseUrl() + "auth/refresh",
    {
      method: "POST",
      headers: { Authorization: `Bearer ${refreshToken.value}` }
    }
  );

  if (!error.value) {
    return data.value?.token;
  } else {
    throw new Error("Token refresh failed");
  }
}
