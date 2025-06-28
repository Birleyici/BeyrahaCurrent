<template>
    <div class="container mx-auto px-4 py-8" v-if="isDevelopment">
        <div class="max-w-4xl mx-auto">
            <h1 class="text-3xl font-bold mb-8 text-center">Error System Test</h1>

            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                <div class="flex">
                    <Icon name="i-heroicons-exclamation-triangle" class="h-5 w-5 text-yellow-400 mt-0.5 mr-2" />
                    <div>
                        <h3 class="text-sm font-medium text-yellow-800">Development Only</h3>
                        <div class="text-sm text-yellow-700 mt-1">
                            Bu sayfa sadece development modunda görüntülenir ve hata sistemi test etmek içindir.
                        </div>
                    </div>
                </div>
            </div>

            <!-- Frontend Error Tests -->
            <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 class="text-xl font-semibold mb-4">Frontend Error Tests</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button @click="testClientValidationError"
                        class="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
                        Client Validation Error
                    </button>

                    <button @click="testNetworkError"
                        class="p-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition">
                        Network Error
                    </button>

                    <button @click="testStorageError"
                        class="p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition">
                        Storage Error
                    </button>

                    <button @click="testJavaScriptError"
                        class="p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition">
                        JavaScript Error
                    </button>

                    <button @click="testAsyncError"
                        class="p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition">
                        Async Error
                    </button>

                    <button @click="testCustomError"
                        class="p-4 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition">
                        Custom Error
                    </button>
                </div>
            </div>

            <!-- Backend Error Tests -->
            <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 class="text-xl font-semibold mb-4">Backend Error Tests</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button @click="testValidationError"
                        class="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
                        Validation Error (422)
                    </button>

                    <button @click="testAuthError"
                        class="p-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition">
                        Auth Error (401)
                    </button>

                    <button @click="testAuthorizationError"
                        class="p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition">
                        Authorization Error (403)
                    </button>

                    <button @click="testNotFoundError"
                        class="p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition">
                        Not Found Error (404)
                    </button>

                    <button @click="testServerError"
                        class="p-4 bg-red-700 hover:bg-red-800 text-white rounded-lg transition">
                        Server Error (500)
                    </button>

                    <button @click="testRateLimitError"
                        class="p-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition">
                        Rate Limit Error (429)
                    </button>
                </div>
            </div>

            <!-- Error Statistics -->
            <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h2 class="text-xl font-semibold mb-4">Error Statistics</h2>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div class="text-center p-4 bg-gray-50 rounded-lg">
                        <div class="text-2xl font-bold text-gray-900">{{ errors.length }}</div>
                        <div class="text-sm text-gray-600">Total Errors</div>
                    </div>

                    <div class="text-center p-4 bg-red-50 rounded-lg">
                        <div class="text-2xl font-bold text-red-600">{{ getErrorsBySeverity('error').length }}</div>
                        <div class="text-sm text-gray-600">Error Severity</div>
                    </div>

                    <div class="text-center p-4 bg-yellow-50 rounded-lg">
                        <div class="text-2xl font-bold text-yellow-600">{{ getErrorsBySeverity('warning').length }}
                        </div>
                        <div class="text-sm text-gray-600">Warning Severity</div>
                    </div>

                    <div class="text-center p-4 bg-purple-50 rounded-lg">
                        <div class="text-2xl font-bold text-purple-600">{{ getErrorsBySeverity('critical').length }}
                        </div>
                        <div class="text-sm text-gray-600">Critical Severity</div>
                    </div>
                </div>
            </div>

            <!-- Actions -->
            <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-xl font-semibold mb-4">Actions</h2>

                <div class="flex gap-4">
                    <button @click="clearErrors"
                        class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition">
                        Clear All Errors
                    </button>

                    <button @click="exportErrorLogs"
                        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
                        Export Error Logs
                    </button>

                    <button @click="clearErrorLogs"
                        class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition">
                        Clear Error Logs
                    </button>
                </div>
            </div>

            <!-- Recent Errors -->
            <div class="bg-white rounded-lg shadow-lg p-6 mt-8" v-if="errors.length > 0">
                <h2 class="text-xl font-semibold mb-4">Recent Errors</h2>

                <div class="space-y-3">
                    <div v-for="error in errors.slice(0, 5)" :key="error.id"
                        class="p-3 border border-gray-200 rounded-lg">
                        <div class="flex items-center justify-between mb-2">
                            <span class="px-2 py-1 text-xs font-medium rounded" :class="{
                                'bg-blue-100 text-blue-800': error.severity === 'info',
                                'bg-yellow-100 text-yellow-800': error.severity === 'warning',
                                'bg-red-100 text-red-800': error.severity === 'error',
                                'bg-purple-100 text-purple-800': error.severity === 'critical'
                            }">
                                {{ error.type.replace('_', ' ') }}
                            </span>
                            <span class="text-xs text-gray-500">
                                {{ new Date(error.timestamp).toLocaleTimeString() }}
                            </span>
                        </div>
                        <div class="text-sm text-gray-700">{{ error.message }}</div>
                        <div class="text-xs text-gray-500 mt-1">Context: {{ error.context }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="container mx-auto px-4 py-8">
        <div class="text-center">
            <h1 class="text-2xl font-bold text-gray-900 mb-4">404 - Sayfa Bulunamadı</h1>
            <p class="text-gray-600">Bu sayfa sadece development modunda erişilebilir.</p>
        </div>
    </div>
</template>

<script setup>
import { useErrorHandler } from '~/composables/useErrorHandler'

// Development mode check
const isDevelopment = process.dev || process.env.NODE_ENV === 'development'

// Meta
useHead({
    title: 'Error System Test',
    meta: [
        { name: 'robots', content: 'noindex, nofollow' }
    ]
})

// Error handler
const {
    handleError,
    errors,
    clearErrors,
    exportErrorLogs,
    clearErrorLogs,
    getErrorsBySeverity
} = useErrorHandler()

// Frontend Error Tests
const testClientValidationError = async () => {
    const error = new Error('Form validation failed: Email field is required')
    await handleError(error, {
        context: 'frontend-validation-test',
        customMessage: 'Test client validation error'
    })
}

const testNetworkError = async () => {
    try {
        // Geçersiz URL'e fetch isteği
        await fetch('https://nonexistent-api.example.com/test')
    } catch (error) {
        await handleError(error, {
            context: 'network-error-test',
            customMessage: 'Test network connectivity error'
        })
    }
}

const testStorageError = async () => {
    const error = new Error('LocalStorage quota exceeded')
    error.name = 'QuotaExceededError'
    await handleError(error, {
        context: 'storage-error-test',
        customMessage: 'Test storage quota error'
    })
}

const testJavaScriptError = async () => {
    try {
        // Kasıtlı JavaScript hatası
        const obj = null
        obj.someProperty.doesNotExist()
    } catch (error) {
        await handleError(error, {
            context: 'javascript-error-test',
            customMessage: 'Test JavaScript runtime error'
        })
    }
}

const testAsyncError = async () => {
    try {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('Async operation failed after timeout'))
            }, 100)
        })
    } catch (error) {
        await handleError(error, {
            context: 'async-error-test',
            customMessage: 'Test asynchronous operation error'
        })
    }
}

const testCustomError = async () => {
    const error = {
        type: 'CUSTOM_BUSINESS_ERROR',
        message: 'Business rule violation: Cannot process order',
        severity: 'warning',
        statusCode: 400,
        details: {
            rule: 'STOCK_INSUFFICIENT',
            required: 10,
            available: 5
        }
    }

    await handleError(error, {
        context: 'custom-business-error-test',
        customMessage: 'Test custom business logic error'
    })
}

// Backend Error Tests
const testValidationError = async () => {
    try {
        // Test validation error endpoint
        await $fetch('/api/test/validation-error', {
            method: 'POST',
            body: {
                // Geçersiz veri gönder
                email: 'invalid-email',
                password: '123' // çok kısa
            }
        })
    } catch (error) {
        await handleError(error, {
            context: 'backend-validation-test'
        })
    }
}

const testAuthError = async () => {
    try {
        // Geçersiz token ile istek
        await $fetch('/api/test/auth-required', {
            headers: {
                'Authorization': 'Bearer invalid-token'
            }
        })
    } catch (error) {
        await handleError(error, {
            context: 'backend-auth-test'
        })
    }
}

const testAuthorizationError = async () => {
    try {
        // Yetkisiz endpoint'e istek
        await $fetch('/api/test/admin-only')
    } catch (error) {
        await handleError(error, {
            context: 'backend-authorization-test'
        })
    }
}

const testNotFoundError = async () => {
    try {
        // Olmayan endpoint'e istek
        await $fetch('/api/test/nonexistent-endpoint')
    } catch (error) {
        await handleError(error, {
            context: 'backend-not-found-test'
        })
    }
}

const testServerError = async () => {
    try {
        // Server error tetikleyici endpoint
        await $fetch('/api/test/server-error')
    } catch (error) {
        await handleError(error, {
            context: 'backend-server-error-test'
        })
    }
}

const testRateLimitError = async () => {
    try {
        // Rate limit aşımı için çoklu istek
        const promises = Array.from({ length: 10 }, () =>
            $fetch('/api/test/rate-limited-endpoint')
        )
        await Promise.all(promises)
    } catch (error) {
        await handleError(error, {
            context: 'backend-rate-limit-test'
        })
    }
}
</script>