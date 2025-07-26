// API ve uygulama sabitleri
export const API_CONFIG = {
  // Environment'a göre API base URL belirleme
  BASE_URL: process.env.API_BASE_URL || 
    (process.env.NODE_ENV === 'production' 
      ? 'https://api.beyraha.com/api' 
      : 'http://localhost/api'),
  
  // Timeout ayarları
  TIMEOUT: 30000,
  
  // Retry ayarları
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000
}

