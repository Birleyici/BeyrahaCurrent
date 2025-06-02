<template>
    <USlideover v-model="model" :ui="{ wrapper: 'fixed inset-0 flex z-[999999]' }">
        <UCard class="flex flex-col flex-1" :ui="{
            body: { base: 'flex-1' },
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-neutral-900">
                        Hesabım
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="model = false" />
                </div>
            </template>

            <div v-if="!authStore.token" class="p-4">
                <PartialsFormAuthForm :redirect="false" />
            </div>

            <div v-else class="space-y-2">
                <ul class="list-none space-y-2">
                    <li v-for="menu in menuItems" :key="menu.link"
                        class="group relative overflow-hidden rounded-xl bg-white border border-neutral-200 hover:border-secondary-300 hover:shadow-md transition-all duration-300">
                        <NuxtLink :to="menu.link" class="flex items-center p-4 w-full">
                            <div class="flex items-center space-x-3 w-full">
                                <!-- İkon -->
                                <div
                                    class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-secondary-100 to-secondary-200 group-hover:from-secondary-200 group-hover:to-secondary-300 transition-all duration-200">
                                    <UIcon :name="getMenuIcon(menu.name)" class="w-5 h-5 text-secondary-600" />
                                </div>
                                <!-- Menü adı -->
                                <span
                                    class="font-medium text-neutral-800 group-hover:text-secondary-700 transition-colors duration-200">
                                    {{ menu.name }}
                                </span>
                                <!-- Ok ikonu -->
                                <div class="ml-auto">
                                    <UIcon name="i-heroicons-chevron-right"
                                        class="w-4 h-4 text-neutral-400 group-hover:text-secondary-500 transition-colors duration-200" />
                                </div>
                            </div>
                        </NuxtLink>
                        <!-- Hover efekti için gradient overlay -->
                        <div
                            class="absolute inset-0 bg-gradient-to-r from-secondary-50/0 to-secondary-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        </div>
                    </li>

                    <!-- Çıkış yap butonu -->
                    <li @click="authStore.logout()"
                        class="group relative overflow-hidden rounded-xl bg-white border border-red-200 hover:border-red-300 hover:shadow-md transition-all duration-300 cursor-pointer">
                        <div class="flex items-center p-4 w-full">
                            <div class="flex items-center space-x-3 w-full">
                                <!-- İkon -->
                                <div
                                    class="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-red-100 to-red-200 group-hover:from-red-200 group-hover:to-red-300 transition-all duration-200">
                                    <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-5 h-5 text-red-600" />
                                </div>
                                <!-- Menü adı -->
                                <span
                                    class="font-medium text-neutral-800 group-hover:text-red-700 transition-colors duration-200">
                                    Çıkış Yap
                                </span>
                                <!-- Ok ikonu -->
                                <div class="ml-auto">
                                    <UIcon name="i-heroicons-chevron-right"
                                        class="w-4 h-4 text-neutral-400 group-hover:text-red-500 transition-colors duration-200" />
                                </div>
                            </div>
                        </div>
                        <!-- Hover efekti için gradient overlay -->
                        <div
                            class="absolute inset-0 bg-gradient-to-r from-red-50/0 to-red-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        </div>
                    </li>
                </ul>
            </div>
        </UCard>
    </USlideover>
</template>

<script setup>
const authStore = useAuthStore()
const router = useRouter()
const { nextNotRegister } = defineProps(["nextNotRegister"]);
const model = defineModel();

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