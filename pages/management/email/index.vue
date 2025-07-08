<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <AdminCommonPageHeader title="Email Yönetimi" description="Email şablonlarını ve gönderim ayarlarını yönetin"
            :breadcrumb-links="breadcrumbLinks">
        </AdminCommonPageHeader>

        <!-- Email System Card -->
        <div class="grid grid-cols-1 gap-6">
            <!-- Blade Templates (Primary System) -->
            <UCard
                class="hover:shadow-lg transition-shadow duration-200 ring-2 ring-secondary-200 dark:ring-secondary-800">
                <template #header>
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg">
                            <UIcon name="i-heroicons-code-bracket"
                                class="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
                                Blade Email Şablonları
                            </h3>
                            <p class="text-sm text-neutral-600 dark:text-neutral-400">
                                Laravel Blade engine ile güçlü şablonlar
                            </p>
                        </div>
                    </div>
                </template>

                <div class="space-y-4">
                    <p class="text-neutral-600 dark:text-neutral-400">
                        Laravel Blade template engine ile güçlü, esnek ve bakımı kolay email şablonları. Döngüler,
                        koşullar ve component desteği ile profesyonel email tasarımları.
                    </p>

                    <div class="flex items-center gap-2">
                        <UBadge color="blue" size="sm">{{ templateStats.blade }} şablon</UBadge>
                        <UBadge color="green" size="sm">Blade Engine</UBadge>
                        <UBadge color="purple" size="sm">Loops & Conditions</UBadge>
                        <UBadge color="emerald" size="sm">Database Güvenli</UBadge>
                    </div>

                    <div class="bg-secondary-50 dark:bg-secondary-900/20 p-3 rounded-lg">
                        <h4 class="font-medium text-secondary-900 dark:text-secondary-100 text-sm mb-1">✨ Avantajları:
                        </h4>
                        <ul class="text-xs text-secondary-700 dark:text-secondary-300 space-y-1">
                            <li>• @foreach döngüleri ile dinamik içerik</li>
                            <li>• @if koşulları ile akıllı email yapısı</li>
                            <li>• Laravel'de doğrudan render ediliyor</li>
                            <li>• Daha hızlı ve güvenilir</li>
                            <li>• 🔒 Database'de güvenli depolama</li>
                            <li>• Blade syntax validation ile hata önleme</li>
                        </ul>
                    </div>

                    <div class="flex gap-2 pt-2">
                        <UButton to="/management/email/blade-sablonlar" color="blue" variant="solid" size="sm"
                            class="flex-1">
                            <UIcon name="i-heroicons-cog-6-tooth" class="w-4 h-4 mr-2" />
                            Şablonları Yönet
                        </UButton>
                        <UButton to="/management/email/blade-sablon/olustur" color="blue" variant="outline" size="sm"
                            class="flex-1">
                            <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-2" />
                            Yeni Oluştur
                        </UButton>
                    </div>
                </div>
            </UCard>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <UCard>
                <div class="flex items-center gap-3">
                    <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <div class="text-lg font-semibold text-neutral-900 dark:text-white">
                            {{ templateStats.active }}
                        </div>
                        <div class="text-sm text-neutral-600 dark:text-neutral-400">
                            Aktif Şablon
                        </div>
                    </div>
                </div>
            </UCard>

            <UCard>
                <div class="flex items-center gap-3">
                    <div class="p-2 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg">
                        <UIcon name="i-heroicons-paper-airplane"
                            class="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                    </div>
                    <div>
                        <div class="text-lg font-semibold text-neutral-900 dark:text-white">
                            {{ templateStats.sent }}
                        </div>
                        <div class="text-sm text-neutral-600 dark:text-neutral-400">
                            Bu Ay Gönderilen
                        </div>
                    </div>
                </div>
            </UCard>

            <UCard>
                <div class="flex items-center gap-3">
                    <div class="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <UIcon name="i-heroicons-eye" class="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                        <div class="text-lg font-semibold text-neutral-900 dark:text-white">
                            %{{ templateStats.openRate }}
                        </div>
                        <div class="text-sm text-neutral-600 dark:text-neutral-400">
                            Açılma Oranı
                        </div>
                    </div>
                </div>
            </UCard>

            <UCard>
                <div class="flex items-center gap-3">
                    <div class="p-2 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg">
                        <UIcon name="i-heroicons-cursor-arrow-rays"
                            class="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                    </div>
                    <div>
                        <div class="text-lg font-semibold text-neutral-900 dark:text-white">
                            %{{ templateStats.clickRate }}
                        </div>
                        <div class="text-sm text-neutral-600 dark:text-neutral-400">
                            Tıklama Oranı
                        </div>
                    </div>
                </div>
            </UCard>
        </div>

        <!-- Recent Activity -->
        <UCard>
            <template #header>
                <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
                    Son Aktiviteler
                </h3>
            </template>

            <div class="space-y-3">
                <div v-for="activity in recentActivities" :key="activity.id"
                    class="flex items-center gap-3 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                    <div class="p-2 rounded-lg" :class="activity.bgColor">
                        <UIcon :name="activity.icon" class="w-4 h-4" :class="activity.iconColor" />
                    </div>
                    <div class="flex-1">
                        <div class="text-sm font-medium text-neutral-900 dark:text-white">
                            {{ activity.title }}
                        </div>
                        <div class="text-xs text-neutral-600 dark:text-neutral-400">
                            {{ activity.description }}
                        </div>
                    </div>
                    <div class="text-xs text-neutral-500 dark:text-neutral-400">
                        {{ activity.time }}
                    </div>
                </div>
            </div>
        </UCard>
    </div>
</template>

<script setup>
// Composables
const {
    templates: bladeTemplates,
    fetchTemplates: fetchBladeTemplates
} = useBladeTemplates()

// Local State
const templateStats = ref({
    blade: 0,
    active: 0,
    sent: 0,
    openRate: 0,
    clickRate: 0
})

const recentActivities = ref([
    {
        id: 1,
        title: 'Blade şablon sistemi aktifleştirildi',
        description: 'Laravel Blade template engine ile güçlü email şablonları artık kullanılabilir',
        time: '2 saat önce',
        icon: 'i-heroicons-code-bracket',
        iconColor: 'text-secondary-600 dark:text-secondary-400',
        bgColor: 'bg-secondary-100 dark:bg-secondary-900/30'
    },
    {
        id: 2,
        title: 'Sipariş onay şablonu güncellendi',
        description: 'Mobile responsive düzenlemeler ve ödeme bilgileri iyileştirildi',
        time: '1 gün önce',
        icon: 'i-heroicons-pencil-square',
        iconColor: 'text-green-600 dark:text-green-400',
        bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
        id: 3,
        title: '145 sipariş onay emaili gönderildi',
        description: 'Bugün başarıyla gönderilen email sayısı',
        time: 'Bugün',
        icon: 'i-heroicons-paper-airplane',
        iconColor: 'text-purple-600 dark:text-purple-400',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    }
])

// Breadcrumb
const breadcrumbLinks = [
    { label: 'Ana Sayfa', to: '/management' },
    { label: 'Email Yönetimi' }
]

// Lifecycle
onMounted(async () => {
    await loadStats()
})

// Methods
const loadStats = async () => {
    try {
        // Load Blade templates
        await fetchBladeTemplates()
        templateStats.value.blade = bladeTemplates.value.length
        templateStats.value.active = bladeTemplates.value.filter(t => t.is_active).length

        // Mock data for other stats (these would come from API in real app)
        templateStats.value.sent = 1247
        templateStats.value.openRate = 68
        templateStats.value.clickRate = 12
    } catch (err) {
        console.error('İstatistikler yüklenirken hata:', err)
    }
}

// Meta
definePageMeta({
    layout: 'admin'
})

useHead({
    title: 'Email Yönetimi - Beyraha Admin'
})
</script>