import { defu } from "defu";
const apiBaseUrl = useBaseUrl();

export async function useBaseOFetch(url, options = {}) {
  
const token = useCookie("auth.token", { watch: true });


  console.log("Fetching with $fetch", url);

  const defaults = {
    baseURL: apiBaseUrl,
    headers: token.value ? { Authorization: `Bearer ${token.value}` } : {},
  };

  const params = defu(options, defaults);

  try {
    const response = await $fetch(apiBaseUrl + url, params);
    console.log("Request successful", response);
    return response;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("401 bloğunda");
      try {
        const newToken = await refreshToken(token);
        token.value = newToken;
        params.headers.Authorization = `Bearer ${newToken}`;

        console.log("buraya geldi");
        const retryResponse = await $fetch(apiBaseUrl + url, params);
        console.log("Retry successful", retryResponse);
        return retryResponse;
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        throw refreshError;
      }
    } else {
      console.log("Request failed", error);
      throw error;
    }
  }
}

async function refreshToken(token) {



  const response = await $fetch(apiBaseUrl + "auth/refresh", {
    method: "POST",
    headers: { Authorization: `Bearer ${token.value}` },
  });

  if (response && response.token) {
    return response.token;
  } else {
    throw new Error("Token refresh failed");
  }
}
