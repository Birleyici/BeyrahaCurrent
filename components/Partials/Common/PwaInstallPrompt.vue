<template>
    <Transition name="slide-up" enter-active-class="transform transition ease-out duration-300"
        enter-from-class="translate-y-full opacity-0" enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transform transition ease-in duration-200" leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-full opacity-0">
        <div v-if="pwaStore.shouldShowInstallPrompt"
            class="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
            <div class="container mx-auto px-4 py-4">
                <div class="flex items-center justify-between flex-wrap gap-3">
                    <!-- PWA Bilgi -->
                    <div class="flex items-center space-x-3 flex-1">
                        <div class="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon name="heroicons:device-phone-mobile" class="w-6 h-6 text-white" />
                        </div>
                        <div class="min-w-0 flex-1">
                            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">
                                Beyraha'yı Telefonunuza Yükleyin
                            </h3>
                            <p class="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                                Daha hızlı erişim ve offline kullanım için uygulamayı yükleyin
                            </p>
                        </div>
                    </div>

                    <!-- Butonlar -->
                    <div class="flex items-center space-x-2 flex-shrink-0">
                        <!-- Yükle Butonu -->
                        <UButton @click="installApp" size="sm" color="primary" :loading="isInstalling"
                            :disabled="isInstalling">
                            <Icon name="heroicons:arrow-down-tray" class="w-4 h-4 mr-1" />
                            Yükle
                        </UButton>

                        <!-- Daha Sonra -->
                        <UButton @click="showLater" size="sm" variant="ghost" color="gray">
                            Sonra
                        </UButton>

                        <!-- Bir Daha Gösterme -->
                        <UButton @click="neverShow" size="sm" variant="ghost" color="gray">
                            <Icon name="heroicons:x-mark" class="w-4 h-4" />
                        </UButton>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<script setup>
const pwaStore = usePwaStore()
const isInstalling = ref(false)

// PWA'yı yükle
const installApp = async () => {
    isInstalling.value = true
    try {
        const result = await pwaStore.installPwa()
        if (result) {
            // Başarılı yükleme toast'ı göster
            useToast().add({
                title: 'Başarılı!',
                description: 'Uygulama başarıyla yüklendi',
                color: 'green'
            })
        }
    } catch (error) {
        console.error('PWA yükleme hatası:', error)
        useToast().add({
            title: 'Hata!',
            description: 'Uygulama yüklenirken bir hata oluştu',
            color: 'red'
        })
    } finally {
        isInstalling.value = false
    }
}

// Daha sonra göster
const showLater = () => {
    pwaStore.showLater()
    useToast().add({
        title: 'Tamam',
        description: 'Yükleme seçeneği sonraki oturumda tekrar görünecek',
        color: 'blue'
    })
}

// Bir daha gösterme
const neverShow = () => {
    pwaStore.neverShow()
    useToast().add({
        title: 'Tamam',
        description: 'Yükleme seçeneği bir daha gösterilmeyecek',
        color: 'gray'
    })
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
    transform: translateY(100%);
    opacity: 0;
}
</style>