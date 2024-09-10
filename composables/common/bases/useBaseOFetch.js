import { defu } from "defu";
const apiBaseUrl = useBaseUrl();

export async function useBaseOFetch(url, options = {}) {

  const defaults = {
    baseURL: apiBaseUrl,
    headers:  {},
  };

  const params = defu(options, defaults);

  let response;

  try {
    response = await $fetch(apiBaseUrl + url, params);
    return response;
  } catch (error) {
      throw error;
  }


}


