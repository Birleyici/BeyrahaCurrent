import { defu } from 'defu'

export async function useBaseOFetch(url, options = {}) {
  const config = useRuntimeConfig()
  const apiBaseUrl = config.public.apiBase

  const defaults = {
    baseURL: apiBaseUrl,
    headers: {}
  }

  const params = defu(options, defaults)

  let response

  try {
    // URL birleştirme - çift slash'ı önle
    const fullUrl = apiBaseUrl.replace(/\/$/, '') + '/' + url.replace(/^\//, '')
    response = await $fetch(fullUrl, params)
    return response
  } catch (error) {
    throw error
  }
}
