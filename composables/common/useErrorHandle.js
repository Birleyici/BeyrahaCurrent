export function useErrorHandle(value, statusCode = 404, statusMessage = 'Page Not Found') {
  if (!value) {
    // Eğer SSR (Server-Side Rendering) modundaysak createError kullan
    if (process.server) {
      throw createError({ statusCode, statusMessage });
    }
    // Client-side (browser) modunda showError kullan
    if (process.client) {
      showError({ statusCode, statusMessage });
    }
  }
}
