<template>
    <div class="space-y-6">
        <!-- Header -->
        <div
            class="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6">
            <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                    <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">Sistem Ayarları</h1>
                    <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                        Site ayarlarını buradan yönetebilirsiniz
                    </p>
                </div>
                <UButton @click="saveSettings" :loading="saving" :disabled="saving" color="primary" size="lg"
                    icon="i-heroicons-check" class="w-full lg:w-auto">
                    {{ saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet' }}
                </UButton>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-12">
            <UIcon name="i-heroicons-arrow-path" class="h-8 w-8 text-primary-600 animate-spin" />
        </div>

        <!-- Main Content -->
        <div v-else class="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <!-- Sidebar Navigation -->
            <div class="xl:col-span-3">
                <div
                    class="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-4">
                    <h3 class="text-sm font-semibold text-neutral-900 dark:text-white mb-4">Ayar Kategorileri</h3>
                    <nav class="space-y-1">
                        <button v-for="group in settingGroups" :key="group.key" @click="activeGroup = group.key" :class="[
                            'w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center',
                            activeGroup === group.key
                                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 border border-primary-200 dark:border-primary-800'
                                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-white'
                        ]">
                            <UIcon :name="group.icon" class="w-4 h-4 mr-3 flex-shrink-0" />
                            <span>{{ group.title }}</span>
                        </button>
                    </nav>
                </div>
            </div>

            <!-- Settings Content -->
            <div class="xl:col-span-9">
                <div
                    class="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
                    <!-- Content Header -->
                    <div class="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
                        <div class="flex items-center">
                            <UIcon :name="currentGroup?.icon"
                                class="w-6 h-6 mr-3 text-primary-600 dark:text-primary-400" />
                            <div>
                                <h2 class="text-lg font-semibold text-neutral-900 dark:text-white">
                                    {{ currentGroup?.title }}
                                </h2>
                                <p class="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                                    {{ currentGroup?.description }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Settings Form -->
                    <div class="p-6">
                        <div class="space-y-6">
                            <div v-for="setting in currentGroupSettings" :key="setting.key"
                                class="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start p-4 rounded-lg border border-neutral-100 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors duration-200">

                                <!-- Label Section -->
                                <div class="lg:col-span-1">
                                    <label :for="setting.key"
                                        class="block text-sm font-medium text-neutral-900 dark:text-white">
                                        {{ setting.label }}
                                    </label>
                                    <p v-if="setting.description"
                                        class="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                                        {{ setting.description }}
                                    </p>
                                </div>

                                <!-- Input Section -->
                                <div class="lg:col-span-2">
                                    <!-- Text Input -->
                                    <UInput v-if="setting.type === 'text'" :id="setting.key"
                                        v-model="localSettings[setting.key]" :placeholder="setting.placeholder"
                                        size="md" class="w-full" />

                                    <!-- Number Input -->
                                    <UInput v-else-if="setting.type === 'number'" :id="setting.key"
                                        v-model.number="localSettings[setting.key]" type="number"
                                        :placeholder="setting.placeholder" :min="setting.min" :max="setting.max"
                                        :step="setting.step" size="md" class="w-full" />

                                    <!-- Email Input -->
                                    <UInput v-else-if="setting.type === 'email'" :id="setting.key"
                                        v-model="localSettings[setting.key]" type="email"
                                        :placeholder="setting.placeholder" size="md" class="w-full" />

                                    <!-- Phone Input -->
                                    <UInput v-else-if="setting.type === 'tel'" :id="setting.key"
                                        v-model="localSettings[setting.key]" type="tel"
                                        :placeholder="setting.placeholder" size="md" class="w-full" />

                                    <!-- Textarea -->
                                    <UTextarea v-else-if="setting.type === 'textarea'" :id="setting.key"
                                        v-model="localSettings[setting.key]" :placeholder="setting.placeholder"
                                        :rows="3" size="md" class="w-full" />

                                    <!-- Boolean Toggle -->
                                    <div v-else-if="setting.type === 'boolean'" class="flex items-center space-x-3">
                                        <UToggle v-model="localSettings[setting.key]" size="md" />
                                        <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                            {{ localSettings[setting.key] ? 'Aktif' : 'Pasif' }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Actions Footer -->
                    <div
                        class="px-6 py-4 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-200 dark:border-neutral-700 rounded-b-xl">
                        <div class="flex flex-col sm:flex-row gap-3 sm:justify-end">
                            <UButton variant="outline" color="neutral" @click="fetchSettings"
                                icon="i-heroicons-arrow-path" size="md">
                                Yenile
                            </UButton>
                            <UButton @click="saveSettings" :loading="saving" :disabled="saving" color="primary"
                                icon="i-heroicons-check" size="md">
                                {{ saving ? 'Kaydediliyor...' : 'Kaydet' }}
                            </UButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Success Notification -->
        <UNotifications />
    </div>
</template>

<script setup>
definePageMeta({
    layout: 'admin'
})

// States
const loading = ref(true)
const saving = ref(false)
const activeGroup = ref('shipping')
const localSettings = ref({})

// Setting Groups Configuration
const settingGroups = [
    {
        key: 'shipping',
        title: 'Kargo Ayarları',
        description: 'Ücretsiz kargo limiti ve kargo ücretlerini yönetin',
        icon: 'i-heroicons-truck'
    },
    {
        key: 'general',
        title: 'Genel Ayarlar',
        description: 'Site başlığı ve açıklaması gibi temel bilgiler',
        icon: 'i-heroicons-cog-6-tooth'
    },
    {
        key: 'contact',
        title: 'İletişim Bilgileri',
        description: 'Telefon, e-posta ve WhatsApp bilgileri',
        icon: 'i-heroicons-phone'
    },
    {
        key: 'payment',
        title: 'Ödeme Ayarları',
        description: 'Banka hesap bilgileri ve ödeme yöntemleri',
        icon: 'i-heroicons-credit-card'
    }
]

// Settings Configuration
const settingsConfig = {
    shipping: [
        {
            key: 'free_shipping_limit',
            label: 'Ücretsiz Kargo Limiti',
            description: 'Bu tutarın üzerindeki siparişlerde kargo ücretsiz olur (TL)',
            type: 'number',
            placeholder: '1000',
            min: 0,
            step: 50
        },
        {
            key: 'shipping_cost',
            label: 'Kargo Ücreti',
            description: 'Standart kargo ücreti (TL)',
            type: 'number',
            placeholder: '60',
            min: 0,
            step: 5
        }
    ],
    general: [
        {
            key: 'site_title',
            label: 'Site Başlığı',
            description: 'Web sitesinin ana başlığı',
            type: 'text',
            placeholder: 'Beyraha'
        },
        {
            key: 'site_description',
            label: 'Site Açıklaması',
            description: 'Web sitesinin kısa açıklaması',
            type: 'textarea',
            placeholder: 'Kaliteli ürünler, uygun fiyatlar'
        }
    ],
    contact: [
        {
            key: 'contact_phone',
            label: 'Telefon Numarası',
            description: 'Ana iletişim telefon numarası',
            type: 'tel',
            placeholder: '+905436024821'
        },
        {
            key: 'contact_email',
            label: 'E-posta Adresi',
            description: 'Ana iletişim e-posta adresi',
            type: 'email',
            placeholder: 'info@beyraha.com'
        },
        {
            key: 'whatsapp_number',
            label: 'WhatsApp Numarası',
            description: 'WhatsApp iletişim numarası (ülke kodu olmadan)',
            type: 'tel',
            placeholder: '905436024821'
        }
    ],
    payment: [
        {
            key: 'bank_name',
            label: 'Banka Adı',
            description: 'Havale/EFT için banka adı',
            type: 'text',
            placeholder: 'Türkiye İş Bankası'
        },
        {
            key: 'bank_account_name',
            label: 'Hesap Sahibi',
            description: 'Banka hesabının sahibi',
            type: 'text',
            placeholder: 'BEYRAHA TEKSTİL'
        },
        {
            key: 'bank_iban',
            label: 'IBAN Numarası',
            description: 'Havale/EFT için IBAN numarası',
            type: 'text',
            placeholder: 'TR12 3456 7890 1234 5678 9012 34'
        }
    ]
}

// Computed
const currentGroup = computed(() => {
    return settingGroups.find(group => group.key === activeGroup.value)
})

const currentGroupSettings = computed(() => {
    return settingsConfig[activeGroup.value] || []
})

// Methods
const fetchSettings = async () => {
    loading.value = true
    try {
        const response = await useBaseOFetchWithAuth('settings')
        if (response && !response.error) {
            const settingsObject = {}
            response.forEach(setting => {
                settingsObject[setting.key] = setting.value
            })
            localSettings.value = settingsObject
        }
    } catch (error) {
        console.error('Ayarlar yüklenirken hata:', error)
        const toast = useToast()
        toast.add({
            title: 'Hata',
            description: 'Ayarlar yüklenirken bir hata oluştu',
            color: 'red'
        })
    } finally {
        loading.value = false
    }
}

const saveSettings = async () => {
    saving.value = true
    try {
        // Sadece değiştirilen ayarları gönder
        const settingsToUpdate = Object.keys(localSettings.value).map(key => ({
            key,
            value: String(localSettings.value[key] || '')
        }))

        console.log('🔧 Gönderilecek ayarlar:', settingsToUpdate)

        const response = await useBaseOFetchWithAuth('settings', {
            method: 'PUT',
            body: {
                settings: settingsToUpdate
            }
        })

        console.log('📡 API Response:', response)

        if (response && !response.error) {
            const toast = useToast()
            toast.add({
                title: 'Başarılı',
                description: 'Ayarlar başarıyla kaydedildi!',
                color: 'green',
                icon: 'i-heroicons-check-circle'
            })

            // Ayarları tekrar yükle
            await fetchSettings()
        } else {
            console.error('❌ API hatası:', response)
            throw new Error(response?.message || 'API hatası')
        }

    } catch (error) {
        console.error('💥 Ayarlar kaydedilirken hata:', error)
        const toast = useToast()
        toast.add({
            title: 'Hata',
            description: error.message || 'Ayarlar kaydedilirken bir hata oluştu',
            color: 'red'
        })
    } finally {
        saving.value = false
    }
}

// Lifecycle
onMounted(() => {
    fetchSettings()
})
</script>