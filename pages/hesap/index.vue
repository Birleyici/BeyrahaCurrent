<template>
    <div>
        <NuxtLayout name="account">
            <!-- Sayfa Başlığı -->
            <div class="mb-6">
                <h1
                    class="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 transition-colors duration-300">
                    Hesabım
                </h1>
                <p class="text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
                    Hesap bilgilerinizi yönetin ve sipariş geçmişinizi inceleyin.
                </p>
            </div>

            <!-- Hesap Özeti -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <NuxtLink v-for="item in accountMenuItems" :key="item.link" :to="item.link"
                    class="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-md transition-all duration-300 group">
                    <div class="flex items-center space-x-4">
                        <div :class="getColorClasses(item.color)"
                            class="w-12 h-12 rounded-lg flex items-center justify-center transition-colors">
                            <UIcon :name="item.icon" :class="getIconColorClasses(item.color)" class="w-6 h-6" />
                        </div>
                        <div>
                            <h3
                                class="font-semibold text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
                                {{ item.name }}
                            </h3>
                            <p class="text-sm text-neutral-500 dark:text-neutral-400 transition-colors duration-300">
                                {{ item.description }}
                            </p>
                        </div>
                    </div>
                </NuxtLink>
            </div>

            <!-- Hoş Geldiniz Kartı -->
            <div
                class="bg-gradient-to-r from-secondary-50 to-secondary-100 dark:from-secondary-900/20 dark:to-secondary-800/20 rounded-xl border border-secondary-200 dark:border-secondary-700 p-6 transition-colors duration-300">
                <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center">
                        <UIcon name="i-heroicons-user" class="w-6 h-6 text-white" />
                    </div>
                    <div class="flex-1">
                        <h3 class="font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                            Hoş Geldiniz!
                        </h3>
                        <p class="text-secondary-700 dark:text-secondary-300 mb-4">
                            Hesabınızdan siparişlerinizi takip edebilir, adreslerinizi yönetebilir ve
                            sorularınızı görüntüleyebilirsiniz.
                        </p>
                        <div class="flex flex-wrap gap-2">
                            <UButton to="/hesap/siparislerim" color="secondary" variant="solid" size="sm">
                                Siparişlerim
                            </UButton>
                            <UButton to="/" color="secondary" variant="outline" size="sm">
                                Alışverişe Devam Et
                            </UButton>
                        </div>
                    </div>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'default'
})

const { siteName } = useSettings()

useHead({
    title: computed(() => `Hesabım - ${siteName.value}`)
})

// Merkezi account menu composable'ını kullan
const { accountMenuItems } = useAccountMenu()

// Renk sınıflarını get et
const getColorClasses = (color) => {
    const colorMap = {
        blue: 'bg-secondary-100 dark:bg-secondary-900/30 group-hover:bg-secondary-200 dark:group-hover:bg-secondary-900/50',
        green: 'bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 dark:group-hover:bg-green-900/50',
        amber: 'bg-amber-100 dark:bg-amber-900/30 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50',
        purple: 'bg-purple-100 dark:bg-purple-900/30 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50'
    }
    return colorMap[color] || colorMap.blue
}

const getIconColorClasses = (color) => {
    const colorMap = {
        blue: 'text-secondary-600 dark:text-secondary-400',
        green: 'text-green-600 dark:text-green-400',
        amber: 'text-amber-600 dark:text-amber-400',
        purple: 'text-purple-600 dark:text-purple-400'
    }
    return colorMap[color] || colorMap.blue
}
</script>