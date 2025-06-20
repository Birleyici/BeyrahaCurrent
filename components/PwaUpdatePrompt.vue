<template>
    <div v-if="needRefresh" class="fixed top-4 left-4 right-4 z-50 mx-auto max-w-md">
        <div class="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
            <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                    <Icon name="heroicons:arrow-path" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Yeni Güncelleme Mevcut
                    </h3>
                    <p class="text-sm text-blue-600 dark:text-blue-300 mt-1">
                        Yeni özellikleri kullanmak için sayfayı yenileyin.
                    </p>
                </div>
            </div>

            <div class="mt-3 flex space-x-2">
                <button @click="handleUpdate"
                    class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                    Güncelle
                </button>
                <button @click="handleClose"
                    class="px-4 py-2 border border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300 rounded-md text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
                    Kapat
                </button>
            </div>
        </div>
    </div>

    <!-- Offline Ready Notification -->
    <div v-if="offlineReady" class="fixed top-4 left-4 right-4 z-50 mx-auto max-w-md">
        <div class="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4">
            <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                    <Icon name="heroicons:wifi" class="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="text-sm font-medium text-green-800 dark:text-green-200">
                        Uygulama Hazır
                    </h3>
                    <p class="text-sm text-green-600 dark:text-green-300 mt-1">
                        Uygulama artık offline çalışmaya hazır.
                    </p>
                </div>
                <button @click="hideOfflineReady" class="flex-shrink-0 text-green-400 hover:text-green-600">
                    <Icon name="heroicons:x-mark" class="w-5 h-5" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const {
    needRefresh,
    offlineReady,
    updateServiceWorker,
    closePrompt
} = usePwa()

const showOfflineReady = ref(false)

// Offline ready durumunu yönet
watch(offlineReady, (newValue) => {
    if (newValue) {
        showOfflineReady.value = true
        // 5 saniye sonra otomatik kapat
        setTimeout(() => {
            showOfflineReady.value = false
        }, 5000)
    }
})

const handleUpdate = async () => {
    await updateServiceWorker(true)
}

const handleClose = () => {
    closePrompt()
}

const hideOfflineReady = () => {
    showOfflineReady.value = false
}
</script>