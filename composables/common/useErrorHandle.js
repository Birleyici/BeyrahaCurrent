// DEPRECATED: Bu fonksiyon eskidir, useErrorHandler composable'ını kullanın
export function useErrorHandle(value, statusCode = 404, statusMessage = 'Page Not Found') {
  console.warn('useErrorHandle is deprecated, use useErrorHandler instead')
  
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
