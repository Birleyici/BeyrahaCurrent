<template>
    <div class="fixed bottom-4 right-4 z-50" v-if="isDevelopment">
        <!-- Error Monitor Toggle -->
        <div class="relative">
            <!-- Error Counter Badge -->
            <button @click="toggleMonitor"
                class="bg-red-500 hover:bg-red-600 text-white rounded-full p-3 shadow-lg transition-all duration-200"
                :class="{ 'animate-pulse': hasNewErrors }">
                <Icon name="i-heroicons-exclamation-triangle" class="w-5 h-5" />
                <span v-if="errorCount > 0"
                    class="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {{ errorCount > 99 ? '99+' : errorCount }}
                </span>
            </button>

            <!-- Error Monitor Panel -->
            <div v-if="showMonitor"
                class="absolute bottom-16 right-0 w-96 max-h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <!-- Header -->
                <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 class="font-semibold text-gray-900 dark:text-white">Error Monitor</h3>
                    <div class="flex items-center gap-2">
                        <button @click="clearErrors"
                            class="text-xs bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1 rounded">
                            Clear
                        </button>
                        <button @click="exportLogs"
                            class="text-xs bg-secondary-100 hover:bg-secondary-200 text-secondary-700 px-2 py-1 rounded">
                            Export
                        </button>
                        <button @click="showMonitor = false" class="text-gray-400 hover:text-gray-600">
                            <Icon name="i-heroicons-x-mark" class="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <!-- Filters -->
                <div class="p-3 border-b border-gray-200 dark:border-gray-700">
                    <div class="flex gap-2 mb-2">
                        <select v-model="selectedSeverity" class="text-xs border rounded px-2 py-1 flex-1">
                            <option value="">All Severities</option>
                            <option v-for="severity in Object.values(ERROR_SEVERITY)" :key="severity" :value="severity">
                                {{ severity.toUpperCase() }}
                            </option>
                        </select>
                        <select v-model="selectedType" class="text-xs border rounded px-2 py-1 flex-1">
                            <option value="">All Types</option>
                            <option v-for="type in uniqueErrorTypes" :key="type" :value="type">
                                {{ type.replace('_', ' ') }}
                            </option>
                        </select>
                    </div>
                    <div class="text-xs text-gray-500">
                        {{ filteredErrors.length }} of {{ errorCount }} errors
                    </div>
                </div>

                <!-- Errors List -->
                <div class="max-h-64 overflow-y-auto">
                    <div v-if="filteredErrors.length === 0" class="p-4 text-center text-gray-500">
                        No errors found
                    </div>
                    <div v-for="error in filteredErrors" :key="error.id"
                        class="border-b border-gray-100 dark:border-gray-700 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        @click="selectError(error)">
                        <div class="flex items-start justify-between mb-1">
                            <div class="flex items-center gap-2">
                                <span class="w-2 h-2 rounded-full" :class="{
                                    'bg-secondary-400': error.severity === 'info',
                                    'bg-yellow-400': error.severity === 'warning',
                                    'bg-red-400': error.severity === 'error',
                                    'bg-purple-400': error.severity === 'critical'
                                }"></span>
                                <span class="text-xs font-medium text-gray-900 dark:text-white">
                                    {{ error.type.replace('_', ' ') }}
                                </span>
                            </div>
                            <span class="text-xs text-gray-500">
                                {{ formatTime(error.timestamp) }}
                            </span>
                        </div>
                        <p class="text-xs text-gray-600 dark:text-gray-300 truncate">
                            {{ getDisplayMessage(error) }}
                        </p>
                        <div class="text-xs text-gray-400 mt-1">
                            Context: {{ error.context }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Error Detail Modal -->
            <div v-if="selectedError" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                @click="selectedError = null">
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl max-h-[80vh] overflow-hidden"
                    @click.stop>
                    <!-- Modal Header -->
                    <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                        <h3 class="font-semibold text-gray-900 dark:text-white">Error Details</h3>
                        <button @click="selectedError = null" class="text-gray-400 hover:text-gray-600">
                            <Icon name="i-heroicons-x-mark" class="w-5 h-5" />
                        </button>
                    </div>

                    <!-- Modal Content -->
                    <div class="p-4 overflow-y-auto max-h-96">
                        <div class="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Error
                                    ID</label>
                                <p class="text-sm text-gray-900 dark:text-white font-mono">{{ selectedError.id }}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Type</label>
                                <p class="text-sm text-gray-900 dark:text-white">{{ selectedError.type }}</p>
                            </div>
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">Severity</label>
                                <p class="text-sm text-gray-900 dark:text-white">{{ selectedError.severity }}</p>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Status
                                    Code</label>
                                <p class="text-sm text-gray-900 dark:text-white">{{ selectedError.statusCode }}</p>
                            </div>
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">Timestamp</label>
                                <p class="text-sm text-gray-900 dark:text-white">{{
                                    formatTimestamp(selectedError.timestamp) }}</p>
                            </div>
                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300">Context</label>
                                <p class="text-sm text-gray-900 dark:text-white">{{ selectedError.context }}</p>
                            </div>
                        </div>

                        <div class="mb-4">
                            <label
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                            <p class="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded">
                                {{ selectedError.message }}
                            </p>
                        </div>

                        <div v-if="selectedError.details" class="mb-4">
                            <label
                                class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Details</label>

                            <!-- Validation Errors için özel görünüm -->
                            <div v-if="selectedError.type === 'VALIDATION_ERROR' && selectedError.details.errors"
                                class="mb-3">
                                <h4 class="text-sm font-medium text-red-700 dark:text-red-300 mb-2">Validation Errors:
                                </h4>
                                <div class="space-y-2">
                                    <div v-for="(fieldErrors, field) in selectedError.details.errors" :key="field"
                                        class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-2">
                                        <div class="font-medium text-red-800 dark:text-red-200 text-sm">{{ field }}:
                                        </div>
                                        <ul class="text-red-700 dark:text-red-300 text-xs ml-2 mt-1">
                                            <li v-for="error in (Array.isArray(fieldErrors) ? fieldErrors : [fieldErrors])"
                                                :key="error">
                                                • {{ error }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <!-- Business Logic Errors için özel görünüm -->
                            <div v-if="selectedError.type === 'BUSINESS_LOGIC_ERROR'" class="mb-3">
                                <h4 class="text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">Business
                                    Logic
                                    Error:</h4>
                                <div
                                    class="bg-secondary-50 dark:bg-secondary-900/20 border border-secondary-200 dark:border-secondary-800 rounded p-3">
                                    <div class="text-secondary-800 dark:text-secondary-200 text-sm">
                                        {{ selectedError.message }}
                                    </div>
                                    <div v-if="selectedError.details.full_response?.success === false"
                                        class="text-secondary-700 dark:text-secondary-300 text-xs mt-2">
                                        <strong>Status:</strong> Operation Failed
                                    </div>
                                </div>
                            </div>

                            <!-- Tüm detaylar -->
                            <details class="mt-2">
                                <summary class="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer">Raw
                                    Details</summary>
                                <pre
                                    class="text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded overflow-x-auto mt-2">{{ JSON.stringify(selectedError.details, null, 2) }}</pre>
                            </details>
                        </div>

                        <div v-if="selectedError.raw" class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Raw
                                Error</label>
                            <pre
                                class="text-xs text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded overflow-x-auto max-h-32">{{ JSON.stringify(selectedError.raw, null, 2) }}</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useErrorHandler, ERROR_SEVERITY } from '~/composables/useErrorHandler'

const {
    errors,
    clearErrors,
    exportErrorLogs,
    ERROR_TYPES
} = useErrorHandler()

// State
const showMonitor = ref(false)
const selectedError = ref(null)
const selectedSeverity = ref('')
const selectedType = ref('')
const hasNewErrors = ref(false)

// Development mode check
const isDevelopment = process.dev || process.env.NODE_ENV === 'development'

// Computed
const errorCount = computed(() => errors.value?.length || 0)

const filteredErrors = computed(() => {
    if (!errors.value) return []
    return errors.value.filter(error => {
        const severityMatch = !selectedSeverity.value || error.severity === selectedSeverity.value
        const typeMatch = !selectedType.value || error.type === selectedType.value
        return severityMatch && typeMatch
    })
})

const uniqueErrorTypes = computed(() => {
    if (!errors.value) return []
    const types = [...new Set(errors.value.map(error => error.type))]
    return types.sort()
})

// Methods
const toggleMonitor = () => {
    showMonitor.value = !showMonitor.value
    if (showMonitor.value) {
        hasNewErrors.value = false
    }
}

const selectError = (error) => {
    selectedError.value = error
}

const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString()
}

const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString()
}

const exportLogs = () => {
    exportErrorLogs()
}

const getDisplayMessage = (error) => {
    // Validation hatalarında ilk hata mesajını göster
    if (error.type === 'VALIDATION_ERROR' && error.details?.validation_errors?.length > 0) {
        return error.details.validation_errors[0]
    }
    return error.message
}

// Watch for new errors
watch(errors, (newErrors, oldErrors) => {
    if (newErrors && oldErrors && newErrors.length > oldErrors.length) {
        hasNewErrors.value = true
    }
}, { deep: true })

// Auto-hide new error notification after 5 seconds
watch(hasNewErrors, (hasNew) => {
    if (hasNew) {
        setTimeout(() => {
            hasNewErrors.value = false
        }, 5000)
    }
})
</script>

<style scoped>
/* Custom scrollbar for webkit browsers */
.overflow-y-auto::-webkit-scrollbar {
    width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
}
</style>