<template>
    <div v-if="shouldShowPrompt" class="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4">
            <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                    <Icon name="heroicons:device-phone-mobile" class="w-8 h-8 text-indigo-600" />
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                        Beyraha'yı Telefonunuza Kurun
                    </h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Daha hızlı erişim ve offline kullanım için uygulamamızı kurun.
                    </p>
                </div>
            </div>

            <div class="mt-4 flex space-x-2">
                <button @click="handleInstall"
                    class="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
                    Kur
                </button>
                <button @click="handleShowLater"
                    class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Daha Sonra
                </button>
                <button @click="handleNeverShow"
                    class="px-4 py-2 text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    Bir Daha Gösterme
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>


const handleInstall = async () => {
    const success = await install()
    if (success) {
        console.log('PWA başarıyla kuruldu!')
    }
}

const handleShowLater = () => {
    showLater()
}

const handleNeverShow = () => {
    neverShow()
}
</script>