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
    console.log("Request successful");
    return response;
  } catch (error) {
   
      console.error("Request failed:", error);
      throw error;
  }


}


