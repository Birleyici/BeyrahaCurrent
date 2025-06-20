<template>
    <USlideover v-model="model" :ui="{ wrapper: 'fixed inset-0 flex z-[999999]' }">
        <div class="flex flex-col h-full">
            <!-- Header -->
            <div
                class="bg-gradient-to-r from-secondary-50 to-secondary-100 dark:from-secondary-900/50 dark:to-secondary-800/50 border-b border-secondary-200 dark:border-secondary-700 px-6 py-4 flex-shrink-0 transition-colors duration-300">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div
                            class="w-10 h-10 bg-secondary-500 dark:bg-secondary-600 rounded-full flex items-center justify-center">
                            <UIcon name="i-heroicons-user-circle" class="w-5 h-5 text-white" />
                        </div>
                        <h3 class="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                            Hesabım
                        </h3>
                    </div>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        class="hover:bg-white/50 dark:hover:bg-neutral-700/50 transition-colors duration-200"
                        @click="model = false" />
                </div>
            </div>

            <!-- Content -->
            <div class="flex-1 overflow-y-auto bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
                <!-- Giriş yapmamış kullanıcılar için form -->
                <div v-if="!authStore.token" class="p-4">
                    <PartialsFormAuthForm :redirect="false" />
                </div>

                <!-- Giriş yapmış kullanıcılar için menü -->
                <div v-else class="p-4 space-y-2">
                    <ul class="list-none space-y-2">
                        <li v-for="menu in menuItems" :key="menu.link"
                            class="group relative overflow-hidden rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-secondary-300 dark:hover:border-secondary-600 hover:shadow-md transition-all duration-300">
                            <NuxtLink :to="menu.link" class="flex items-center p-4 w-full">
                                <div class="flex items-center space-x-3 w-full">
                                    <!-- İkon -->
                                    <div
                                        class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-secondary-100 to-secondary-200 dark:from-secondary-800/50 dark:to-secondary-700/50 group-hover:from-secondary-200 group-hover:to-secondary-300 dark:group-hover:from-secondary-700/70 dark:group-hover:to-secondary-600/70 transition-all duration-200">
                                        <UIcon :name="getMenuIcon(menu.name)"
                                            class="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                                    </div>
                                    <!-- Menü adı -->
                                    <span
                                        class="font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-secondary-700 dark:group-hover:text-secondary-300 transition-colors duration-200">
                                        {{ menu.name }}
                                    </span>
                                    <!-- Ok ikonu -->
                                    <div class="ml-auto">
                                        <UIcon name="i-heroicons-chevron-right"
                                            class="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-secondary-500 dark:group-hover:text-secondary-400 transition-colors duration-200" />
                                    </div>
                                </div>
                            </NuxtLink>
                            <!-- Hover efekti için gradient overlay -->
                            <div
                                class="absolute inset-0 bg-gradient-to-r from-secondary-50/0 to-secondary-50/50 dark:from-secondary-900/0 dark:to-secondary-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            </div>
                        </li>

                        <!-- Çıkış yap butonu -->
                        <li @click="authStore.logout()"
                            class="group relative overflow-hidden rounded-xl bg-white dark:bg-neutral-800 border border-red-200 dark:border-red-800/50 hover:border-red-300 dark:hover:border-red-700 hover:shadow-md transition-all duration-300 cursor-pointer">
                            <div class="flex items-center p-4 w-full">
                                <div class="flex items-center space-x-3 w-full">
                                    <!-- İkon -->
                                    <div
                                        class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 group-hover:from-red-200 group-hover:to-red-300 dark:group-hover:from-red-800/50 dark:group-hover:to-red-700/50 transition-all duration-200">
                                        <UIcon name="i-heroicons-arrow-right-on-rectangle"
                                            class="w-5 h-5 text-red-600 dark:text-red-400" />
                                    </div>
                                    <!-- Menü adı -->
                                    <span
                                        class="font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors duration-200">
                                        Çıkış Yap
                                    </span>
                                    <!-- Ok ikonu -->
                                    <div class="ml-auto">
                                        <UIcon name="i-heroicons-chevron-right"
                                            class="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors duration-200" />
                                    </div>
                                </div>
                            </div>
                            <!-- Hover efekti için gradient overlay -->
                            <div
                                class="absolute inset-0 bg-gradient-to-r from-red-50/0 to-red-50/50 dark:from-red-900/0 dark:to-red-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- Theme Toggle - Hem giriş yapmış hem yapmamış kullanıcılar için -->
                <div class="p-4 border-t border-neutral-200 dark:border-neutral-700">
                    <div @click="toggleDarkMode"
                        class="group relative overflow-hidden rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-secondary-300 dark:hover:border-secondary-600 hover:shadow-md transition-all duration-300 cursor-pointer">
                        <div class="flex items-center p-4 w-full">
                            <div class="flex items-center space-x-3 w-full">
                                <!-- İkon -->
                                <div
                                    class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-secondary-100 to-secondary-200 dark:from-secondary-800/50 dark:to-secondary-700/50 group-hover:from-secondary-200 group-hover:to-secondary-300 dark:group-hover:from-secondary-700/70 dark:group-hover:to-secondary-600/70 transition-all duration-200">
                                    <UIcon :name="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
                                        class="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                                </div>
                                <!-- Menü adı -->
                                <span
                                    class="font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-secondary-700 dark:group-hover:text-secondary-300 transition-colors duration-200">
                                    {{ isDark ? 'Açık Tema' : 'Koyu Tema' }}
                                </span>
                                <!-- Toggle Switch -->
                                <div class="ml-auto">
                                    <div
                                        class="relative w-12 h-6 bg-neutral-200 dark:bg-neutral-600 rounded-full transition-colors duration-200">
                                        <div :class="[
                                            'absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm',
                                            isDark ? 'translate-x-7' : 'translate-x-1'
                                        ]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Hover efekti için gradient overlay -->
                        <div
                            class="absolute inset-0 bg-gradient-to-r from-secondary-50/0 to-secondary-50/50 dark:from-secondary-900/0 dark:to-secondary-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </USlideover>
</template>

<script setup>

const authStore = useAuthStore()
const router = useRouter()
const { nextNotRegister } = defineProps(["nextNotRegister"]);
const model = defineModel();

// Dark mode composable
const { isDark, toggleDarkMode } = useDarkMode();

// Native back button handler - TEK SATIR!
const { useBackHandler } = await import('~/composables/useNativeBackHandler.js')
useBackHandler(model)

const menuItems = [
    {
        name: 'Siparişlerim',
        link: '/hesap/siparislerim'
    },
    {
        name: 'Adreslerim',
        link: '/hesap/adreslerim'
    }
]

// Menü ikonlarını belirleyen fonksiyon
const getMenuIcon = (menuName) => {
    const iconMap = {
        'Siparişlerim': 'i-heroicons-shopping-bag',
        'Adreslerim': 'i-heroicons-map-pin'
    }
    return iconMap[menuName] || 'i-heroicons-document'
}
</script>