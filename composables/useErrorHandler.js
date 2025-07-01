import { ref, reactive } from 'vue'
import { useNuxtApp, useRouter, useRoute } from '#app'

// Merkezi hata tipleri
export const ERROR_TYPES = {
  // Backend'den gelen hata kodları
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_REQUIRED: 'AUTHENTICATION_REQUIRED',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  AUTHORIZATION_FAILED: 'AUTHORIZATION_FAILED',
  RESOURCE_NOT_FOUND: 'RESOURCE_NOT_FOUND',
  ENDPOINT_NOT_FOUND: 'ENDPOINT_NOT_FOUND',
  METHOD_NOT_ALLOWED: 'METHOD_NOT_ALLOWED',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  DATABASE_ERROR: 'DATABASE_ERROR',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  FILE_UPLOAD_ERROR: 'FILE_UPLOAD_ERROR',
  BUSINESS_LOGIC_ERROR: 'BUSINESS_LOGIC_ERROR',
  
  // Frontend özel hata tipleri
  CLIENT_VALIDATION_ERROR: 'CLIENT_VALIDATION_ERROR',
  CLIENT_NETWORK_ERROR: 'CLIENT_NETWORK_ERROR',
  CLIENT_STORAGE_ERROR: 'CLIENT_STORAGE_ERROR',
  CLIENT_PERMISSION_ERROR: 'CLIENT_PERMISSION_ERROR'
}

// Hata seviyeleri
export const ERROR_SEVERITY = {
  INFO: 'info',
  WARNING: 'warning', 
  ERROR: 'error',
  CRITICAL: 'critical'
}

// Hata mesajları yapılandırması
const ERROR_MESSAGES = {
  [ERROR_TYPES.VALIDATION_ERROR]: 'Lütfen form alanlarını kontrol edin',
  [ERROR_TYPES.AUTHENTICATION_REQUIRED]: 'Oturum açmanız gerekiyor',
  [ERROR_TYPES.TOKEN_EXPIRED]: 'Oturum süreniz doldu, lütfen tekrar giriş yapın',
  [ERROR_TYPES.TOKEN_INVALID]: 'Geçersiz oturum, lütfen tekrar giriş yapın',
  [ERROR_TYPES.AUTHORIZATION_FAILED]: 'Bu işlem için yetkiniz bulunmuyor',
  [ERROR_TYPES.RESOURCE_NOT_FOUND]: 'Aradığınız kaynak bulunamadı',
  [ERROR_TYPES.ENDPOINT_NOT_FOUND]: 'Sayfa bulunamadı',
  [ERROR_TYPES.METHOD_NOT_ALLOWED]: 'Bu işlem desteklenmiyor',
  [ERROR_TYPES.RATE_LIMIT_EXCEEDED]: 'Çok fazla istek gönderildi, lütfen bekleyin',
  [ERROR_TYPES.DATABASE_ERROR]: 'Veritabanı hatası oluştu',
  [ERROR_TYPES.INTERNAL_SERVER_ERROR]: 'Sunucu hatası oluştu',
  [ERROR_TYPES.NETWORK_ERROR]: 'İnternet bağlantınızı kontrol edin',
  [ERROR_TYPES.FILE_UPLOAD_ERROR]: 'Dosya yükleme hatası',
  [ERROR_TYPES.BUSINESS_LOGIC_ERROR]: 'İşlem gerçekleştirilemedi',
  [ERROR_TYPES.CLIENT_VALIDATION_ERROR]: 'Form doğrulama hatası',
  [ERROR_TYPES.CLIENT_NETWORK_ERROR]: 'Bağlantı hatası',
  [ERROR_TYPES.CLIENT_STORAGE_ERROR]: 'Veri kaydetme hatası',
  [ERROR_TYPES.CLIENT_PERMISSION_ERROR]: 'İzin hatası'
}

// Global hata state
const globalErrorState = reactive({
  errors: [],
  isLoading: false,
  lastError: null
})

export const useErrorHandler = () => {
  const { $toast } = useNuxtApp()
  const router = useRouter()
  const route = useRoute()

  /**
   * Hata işleme ana fonksiyonu
   */
  const handleError = async (error, options = {}) => {
    const {
      showToast = true,
      logError = true,
      redirectOnAuth = true,
      customMessage = null,
      context = 'unknown'
    } = options

    try {
      // Hata nesnesini normalize et
      const normalizedError = normalizeError(error, context)
      
      // Global state'e ekle
      addToErrorState(normalizedError)

      // Hata logla
      if (logError) {
        logErrorToConsole(normalizedError, context)
        await logErrorToServer(normalizedError, context)
      }

      // Toast göster
      if (showToast) {
        showErrorToast(normalizedError, customMessage)
      }

      // Özel hata işlemleri
      await handleSpecialCases(normalizedError, redirectOnAuth)

      return normalizedError

    } catch (handlingError) {
      console.error('Error while handling error:', handlingError)
      // Fallback toast
      if (showToast && $toast) {
        $toast.error('Beklenmeyen bir hata oluştu')
      }
    }
  }

  /**
   * Hata nesnesini normalize et
   */
  const normalizeError = (error, context) => {
    const timestamp = new Date().toISOString()
    const errorId = generateErrorId()

    // Debug için error objesini kontrol et (development modunda)
    if (process.dev) {
      console.log('🔍 Error Debug Info:', {
        error_name: error?.name,
        hasResponse: !!error?.response,
        hasData: !!error?.response?._data,
        hasDataErrors: !!error?.response?._data?.errors,
        dataKeys: error?.response?._data ? Object.keys(error.response._data) : [],
        statusCode: error?.response?.status,
        dataContent: error?.response?._data
      })
    }

    // Backend'den gelen standardize edilmiş hata
    if (error?.response?._data?.error_code) {
      const data = error.response._data
      return {
        id: errorId,
        type: data.error_code,
        message: data.message,
        severity: data.severity || ERROR_SEVERITY.ERROR,
        statusCode: error.response.status,
        timestamp,
        context,
        details: {
          errors: data.errors || null,
          error_id: data.error_id,
          backend_timestamp: data.timestamp,
          retry_after: data.retry_after || null,
          resource_type: data.resource_type || null
        },
        raw: error
      }
    }

    // FetchError için özel işlem (Nuxt/Nitro)
    if (error?.name === 'FetchError' && error?.response) {
      const responseData = error.response._data || error.data
      const statusCode = error.response.status || error.status

      // 422 Validation hatası
      if (statusCode === 422) {
        // Laravel validation response format
        if (responseData) {
          // Gerçek validation hatası (errors anahtarı var)
          if (responseData.errors) {
            return {
              id: errorId,
              type: ERROR_TYPES.VALIDATION_ERROR,
              message: responseData.message || ERROR_MESSAGES[ERROR_TYPES.VALIDATION_ERROR],
              severity: ERROR_SEVERITY.WARNING,
              statusCode: 422,
              timestamp,
              context,
              details: {
                errors: responseData.errors,
                validation_errors: Object.values(responseData.errors).flat(),
                full_response: responseData
              },
              raw: error
            }
          }
          
          // Business logic hatası (422 dönen ama validation olmayan)
          else if (responseData.message) {
            return {
              id: errorId,
              type: ERROR_TYPES.BUSINESS_LOGIC_ERROR,
              message: responseData.message,
              severity: ERROR_SEVERITY.ERROR,
              statusCode: 422,
              timestamp,
              context,
              details: {
                business_error: true,
                full_response: responseData
              },
              raw: error
            }
          }
        }
      }

      // Diğer FetchError durumları
      return {
        id: errorId,
        type: getErrorTypeByStatusCode(statusCode),
        message: responseData?.message || getErrorMessageByStatusCode(statusCode),
        severity: getSeverityByStatusCode(statusCode),
        statusCode,
        timestamp,
        context,
        details: {
          response_data: responseData,
          full_response: responseData
        },
        raw: error
      }
    }

    // Eski format backend hataları (422 validation)
    if (error?.response?.status === 422 && error.response._data?.errors) {
      return {
        id: errorId,
        type: ERROR_TYPES.VALIDATION_ERROR,
        message: ERROR_MESSAGES[ERROR_TYPES.VALIDATION_ERROR],
        severity: ERROR_SEVERITY.WARNING,
        statusCode: 422,
        timestamp,
        context,
        details: {
          errors: error.response._data.errors,
          validation_errors: Object.values(error.response._data.errors).flat()
        },
        raw: error
      }
    }

    // Diğer HTTP hataları
    if (error?.response) {
      const statusCode = error.response.status
      let errorType = ERROR_TYPES.INTERNAL_SERVER_ERROR

      switch (statusCode) {
        case 401:
          errorType = ERROR_TYPES.AUTHENTICATION_REQUIRED
          break
        case 403:
          errorType = ERROR_TYPES.AUTHORIZATION_FAILED
          break
        case 404:
          errorType = ERROR_TYPES.RESOURCE_NOT_FOUND
          break
        case 429:
          errorType = ERROR_TYPES.RATE_LIMIT_EXCEEDED
          break
        case 500:
          errorType = ERROR_TYPES.INTERNAL_SERVER_ERROR
          break
      }

      return {
        id: errorId,
        type: errorType,
        message: error.response._data?.message || ERROR_MESSAGES[errorType],
        severity: getSeverityByStatusCode(statusCode),
        statusCode,
        timestamp,
        context,
        details: {
          response_data: error.response._data
        },
        raw: error
      }
    }

    // Network hataları
    if (error?.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        id: errorId,
        type: ERROR_TYPES.CLIENT_NETWORK_ERROR,
        message: ERROR_MESSAGES[ERROR_TYPES.CLIENT_NETWORK_ERROR],
        severity: ERROR_SEVERITY.ERROR,
        statusCode: 0,
        timestamp,
        context,
        details: {
          network_error: true
        },
        raw: error
      }
    }

    // Generic error
    return {
      id: errorId,
      type: ERROR_TYPES.INTERNAL_SERVER_ERROR,
      message: error?.message || 'Bilinmeyen bir hata oluştu',
      severity: ERROR_SEVERITY.ERROR,
      statusCode: 500,
      timestamp,
      context,
      details: {
        generic_error: true
      },
      raw: error
    }
  }

  /**
   * Global error state'e ekle
   */
  const addToErrorState = (error) => {
    globalErrorState.errors.unshift(error)
    globalErrorState.lastError = error
    
    // Maksimum 100 hata tut
    if (globalErrorState.errors.length > 100) {
      globalErrorState.errors = globalErrorState.errors.slice(0, 100)
    }
  }

  /**
   * Console'a hata logla
   */
  const logErrorToConsole = (error, context) => {
    const logData = {
      error_id: error.id,
      type: error.type,
      message: error.message,
      severity: error.severity,
      context,
      timestamp: error.timestamp,
      url: window?.location?.href,
      user_agent: navigator?.userAgent,
      details: error.details
    }

    console.group(`🚨 Error Handler - ${error.severity.toUpperCase()}`)
    console.error('Error Details:', logData)
    if (error.raw) {
      console.error('Raw Error:', error.raw)
    }
    console.groupEnd()
  }

  /**
   * Sunucuya hata logla (opsiyonel)
   */
  const logErrorToServer = async (error, context) => {
    if (process.server) return

    try {
      // Server-side error logging implementasyonu
      // Şimdilik client-side localStorage'da tut
      const errorLog = {
        id: error.id,
        type: error.type,
        message: error.message,
        severity: error.severity,
        context,
        timestamp: error.timestamp,
        url: window?.location?.href,
        user_agent: navigator?.userAgent,
        session_id: getSessionId(),
        user_id: getCurrentUserId()
      }

      const existingLogs = JSON.parse(localStorage.getItem('error_logs') || '[]')
      existingLogs.unshift(errorLog)
      
      // Son 50 log'u tut
      localStorage.setItem('error_logs', JSON.stringify(existingLogs.slice(0, 50)))
      
    } catch (logError) {
      console.warn('Failed to log error to server:', logError)
    }
  }

  /**
   * Toast bildirimi göster
   */
  const showErrorToast = (error, customMessage = null) => {
    if (!$toast) return

    let message = customMessage || error.message

    // Validation hatalarında detayları göster
    if (error.type === ERROR_TYPES.VALIDATION_ERROR && error.details?.validation_errors?.length > 0) {
      const validationErrors = error.details.validation_errors
      if (validationErrors.length === 1) {
        message = validationErrors[0]
      } else if (validationErrors.length <= 3) {
        message = validationErrors.join(', ')
      } else {
        message = `${validationErrors.slice(0, 2).join(', ')} ve ${validationErrors.length - 2} daha...`
      }
    }

    const options = {
      timeout: getToastTimeout(error.severity),
      icon: getToastIcon(error.severity)
    }

    switch (error.severity) {
      case ERROR_SEVERITY.INFO:
        $toast.info(message, options)
        break
      case ERROR_SEVERITY.WARNING:
        $toast.warning(message, options)
        break
      case ERROR_SEVERITY.ERROR:
      case ERROR_SEVERITY.CRITICAL:
        $toast.error(message, options)
        break
      default:
        $toast.error(message, options)
    }
  }

  /**
   * Özel durumları işle
   */
  const handleSpecialCases = async (error, redirectOnAuth) => {
    // Authentication hataları
    if ([ERROR_TYPES.AUTHENTICATION_REQUIRED, ERROR_TYPES.TOKEN_EXPIRED, ERROR_TYPES.TOKEN_INVALID].includes(error.type)) {
      if (redirectOnAuth && process.client) {
        const currentPath = route.fullPath
        if (currentPath !== '/auth') {
          await router.push(`/auth?callback=${encodeURIComponent(currentPath)}`)
        }
      }
    }

    // Rate limiting
    if (error.type === ERROR_TYPES.RATE_LIMIT_EXCEEDED && error.details.retry_after) {
      console.log(`Rate limited. Retry after: ${error.details.retry_after} seconds`)
    }

    // 404 hataları
    if (error.type === ERROR_TYPES.RESOURCE_NOT_FOUND && error.statusCode === 404) {
      // Otomatik 404 sayfasına yönlendirme istenirse
      // await router.push('/404')
    }
  }

  /**
   * Yardımcı fonksiyonlar
   */
  const generateErrorId = () => {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const getErrorTypeByStatusCode = (statusCode) => {
    switch (statusCode) {
      case 401: return ERROR_TYPES.AUTHENTICATION_REQUIRED
      case 403: return ERROR_TYPES.AUTHORIZATION_FAILED
      case 404: return ERROR_TYPES.RESOURCE_NOT_FOUND
      case 422: return ERROR_TYPES.VALIDATION_ERROR
      case 429: return ERROR_TYPES.RATE_LIMIT_EXCEEDED
      case 500: return ERROR_TYPES.INTERNAL_SERVER_ERROR
      default: return ERROR_TYPES.INTERNAL_SERVER_ERROR
    }
  }

  const getErrorMessageByStatusCode = (statusCode) => {
    switch (statusCode) {
      case 401: return ERROR_MESSAGES[ERROR_TYPES.AUTHENTICATION_REQUIRED]
      case 403: return ERROR_MESSAGES[ERROR_TYPES.AUTHORIZATION_FAILED]
      case 404: return ERROR_MESSAGES[ERROR_TYPES.RESOURCE_NOT_FOUND]
      case 422: return ERROR_MESSAGES[ERROR_TYPES.VALIDATION_ERROR]
      case 429: return ERROR_MESSAGES[ERROR_TYPES.RATE_LIMIT_EXCEEDED]
      case 500: return ERROR_MESSAGES[ERROR_TYPES.INTERNAL_SERVER_ERROR]
      default: return 'Bilinmeyen hata oluştu'
    }
  }

  const getSeverityByStatusCode = (statusCode) => {
    if (statusCode >= 500) return ERROR_SEVERITY.CRITICAL
    if (statusCode >= 400) return ERROR_SEVERITY.ERROR
    if (statusCode >= 300) return ERROR_SEVERITY.WARNING
    return ERROR_SEVERITY.INFO
  }

  const getToastTimeout = (severity) => {
    switch (severity) {
      case ERROR_SEVERITY.INFO: return 3000
      case ERROR_SEVERITY.WARNING: return 5000
      case ERROR_SEVERITY.ERROR: return 7000
      case ERROR_SEVERITY.CRITICAL: return 10000
      default: return 5000
    }
  }

  const getToastIcon = (severity) => {
    switch (severity) {
      case ERROR_SEVERITY.INFO: return 'i-heroicons-information-circle'
      case ERROR_SEVERITY.WARNING: return 'i-heroicons-exclamation-triangle'
      case ERROR_SEVERITY.ERROR: return 'i-heroicons-x-circle'
      case ERROR_SEVERITY.CRITICAL: return 'i-heroicons-shield-exclamation'
      default: return 'i-heroicons-x-circle'
    }
  }

  const getSessionId = () => {
    // Session ID implementasyonu
    return localStorage.getItem('session_id') || 'anonymous'
  }

  const getCurrentUserId = () => {
    // Current user ID implementasyonu
    try {
      const authStore = JSON.parse(localStorage.getItem('authStore') || '{}')
      return authStore.currentUser?.user.id || null
    } catch {
      return null
    }
  }

  /**
   * Hata state yönetimi
   */
  const clearErrors = () => {
    globalErrorState.errors = []
    globalErrorState.lastError = null
  }

  const getErrorById = (id) => {
    return globalErrorState.errors.find(error => error.id === id)
  }

  const removeError = (id) => {
    const index = globalErrorState.errors.findIndex(error => error.id === id)
    if (index > -1) {
      globalErrorState.errors.splice(index, 1)
    }
  }

  const getErrorsByType = (type) => {
    return globalErrorState.errors.filter(error => error.type === type)
  }

  const getErrorsBySeverity = (severity) => {
    return globalErrorState.errors.filter(error => error.severity === severity)
  }

  /**
   * Development yardımcıları
   */
  const getErrorLogs = () => {
    if (process.client) {
      return JSON.parse(localStorage.getItem('error_logs') || '[]')
    }
    return []
  }

  const clearErrorLogs = () => {
    if (process.client) {
      localStorage.removeItem('error_logs')
    }
  }

  const exportErrorLogs = () => {
    const logs = getErrorLogs()
    const dataStr = JSON.stringify(logs, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    
    const link = document.createElement('a')
    link.href = URL.createObjectURL(dataBlob)
    link.download = `error_logs_${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  return {
    // Ana fonksiyonlar
    handleError,
    
    // State
    errors: readonly(globalErrorState.errors),
    lastError: readonly(ref(globalErrorState.lastError)),
    isLoading: readonly(ref(globalErrorState.isLoading)),
    
    // State yönetimi
    clearErrors,
    getErrorById,
    removeError,
    getErrorsByType,
    getErrorsBySeverity,
    
    // Development
    getErrorLogs,
    clearErrorLogs,
    exportErrorLogs,
    
    // Constants
    ERROR_TYPES,
    ERROR_SEVERITY
  }
} 