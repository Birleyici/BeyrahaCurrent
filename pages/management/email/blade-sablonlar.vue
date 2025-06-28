<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <AdminCommonPageHeader title="Blade Email Şablon Yönetimi"
            :description="`Blade template ile güçlü email şablonları - ${templates.length} şablon`"
            :breadcrumb-links="breadcrumbLinks">
            <template #actions>
                <UButton icon="i-heroicons-plus" size="sm" color="primary" variant="solid" label="Yeni Oluştur"
                    to="/management/email/blade-sablon/olustur" class="touch-manipulation mr-2" />
                <UButton icon="i-heroicons-arrow-path" size="sm" color="gray" variant="outline" label="Yenile"
                    @click="fetchTemplates" :loading="loading" class="touch-manipulation" />
            </template>
        </AdminCommonPageHeader>

        <!-- Info Alert -->
        <UAlert color="blue" variant="soft" title="Blade Template Sistemi"
            description="Laravel Blade template sistemi ile güçlü ve esnek email şablonları oluşturun. Bu sistem Laravel backend'te saklanır ve Nuxt üzerinden yönetilir." />

        <!-- Error State -->
        <UAlert v-if="error" color="red" variant="solid" :title="error" />

        <!-- Templates Grid/List -->
        <div
            class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700">
            <!-- Loading State -->
            <div v-if="loading" class="text-center py-12">
                <div
                    class="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <UIcon name="i-heroicons-arrow-path"
                        class="w-8 h-8 text-primary-600 dark:text-primary-400 animate-spin" />
                </div>
                <p class="text-lg font-medium text-neutral-600 dark:text-neutral-400">Blade şablonları yükleniyor...</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="templates.length === 0" class="text-center py-12">
                <UIcon name="i-heroicons-document-text"
                    class="w-16 h-16 text-neutral-400 dark:text-neutral-500 mx-auto mb-4" />
                <h3 class="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                    Henüz Blade şablonu yok
                </h3>
                <p class="text-neutral-600 dark:text-neutral-400 mb-6">
                    Laravel Blade template dosyaları burada görünecek
                </p>
            </div>

            <!-- Templates Grid -->
            <div v-else class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="template in templates" :key="template.type"
                        class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow duration-200 overflow-hidden">

                        <!-- Template Header -->
                        <div
                            class="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-800 dark:to-blue-700 p-4 border-b border-neutral-200 dark:border-neutral-700">
                            <div class="flex items-start justify-between">
                                <div class="flex-1 min-w-0">
                                    <div class="flex items-center gap-2 mb-2">
                                        <span class="text-2xl">{{ getTemplateIcon(template.type) }}</span>
                                        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white truncate">
                                            {{ getTemplateName(template) }}
                                        </h3>
                                    </div>
                                    <UBadge color="blue" size="xs" class="mb-2">
                                        Blade Template
                                    </UBadge>
                                    <p class="text-sm text-neutral-600 dark:text-neutral-400">
                                        {{ template.type }}.blade.php
                                    </p>
                                </div>
                                <UDropdown :items="getTemplateActions(template)" :popper="{ placement: 'bottom-end' }">
                                    <UButton icon="i-heroicons-ellipsis-vertical" size="xs" color="neutral"
                                        variant="ghost" class="touch-manipulation" />
                                </UDropdown>
                            </div>
                        </div>

                        <!-- Template Content -->
                        <div class="p-4">
                            <div class="space-y-3">
                                <!-- Template Info -->
                                <div class="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span class="text-neutral-500 dark:text-neutral-400">Boyut:</span>
                                        <span class="ml-1 font-medium">{{ formatFileSize(template.size) }}</span>
                                    </div>
                                    <div>
                                        <span class="text-neutral-500 dark:text-neutral-400">Güncelleme:</span>
                                        <span class="ml-1 font-medium">{{ timeAgo(template.modified) }}</span>
                                    </div>
                                </div>

                                <!-- Actions -->
                                <div class="flex items-center gap-2 pt-2">
                                    <UButton size="xs" color="primary" variant="outline"
                                        :to="`/management/email/blade-sablon/${template.type}/duzenle`"
                                        class="touch-manipulation flex-1">
                                        <UIcon name="i-heroicons-pencil" class="w-3 h-3 mr-1" />
                                        Düzenle
                                    </UButton>
                                    <UButton size="xs" color="blue" variant="outline" @click="showPreview(template)"
                                        class="touch-manipulation flex-1">
                                        <UIcon name="i-heroicons-eye" class="w-3 h-3 mr-1" />
                                        Önizle
                                    </UButton>
                                    <UButton size="xs" color="red" variant="outline" @click="confirmDelete(template)"
                                        class="touch-manipulation">
                                        <UIcon name="i-heroicons-trash" class="w-3 h-3" />
                                    </UButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Preview Modal -->
        <UModal v-model="showPreviewModal" :ui="{ width: 'max-w-4xl' }">
            <UCard>
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
                            {{ getTemplateName(currentPreviewTemplate) }} - Önizleme
                        </h3>
                        <UButton icon="i-heroicons-x-mark" size="sm" color="gray" variant="ghost"
                            @click="showPreviewModal = false" />
                    </div>
                </template>

                <div v-if="previewLoading" class="text-center py-8">
                    <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-primary-600 animate-spin mx-auto mb-2" />
                    <p class="text-neutral-600 dark:text-neutral-400">Önizleme hazırlanıyor...</p>
                </div>

                <div v-else-if="previewContent" class="space-y-4">
                    <div class="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
                        <iframe :srcdoc="previewContent" class="w-full h-96 border rounded bg-white"
                            sandbox="allow-same-origin"></iframe>
                    </div>
                </div>

                <div v-else class="text-center py-8">
                    <p class="text-neutral-500 dark:text-neutral-400">Önizleme yüklenemedi</p>
                </div>
            </UCard>
        </UModal>

        <!-- Delete Confirmation Modal -->
        <UModal v-model="showDeleteModal" :ui="{ width: 'max-w-md' }">
            <UCard>
                <template #header>
                    <div class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                            <UIcon name="i-heroicons-exclamation-triangle"
                                class="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-neutral-900 dark:text-white">
                                Şablonu Sil
                            </h3>
                            <p class="text-sm text-neutral-500 dark:text-neutral-400">
                                Bu işlem geri alınamaz
                            </p>
                        </div>
                    </div>
                </template>

                <div class="space-y-4">
                    <div v-if="templateToDelete" class="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-lg">
                        <div class="flex items-center gap-3">
                            <span class="text-2xl">{{ getTemplateIcon(templateToDelete?.type) }}</span>
                            <div>
                                <h4 class="font-medium text-neutral-900 dark:text-white">
                                    {{ getTemplateName(templateToDelete) }}
                                </h4>
                                <p class="text-sm text-neutral-500 dark:text-neutral-400">
                                    {{ templateToDelete?.type }}.blade.php
                                </p>
                            </div>
                        </div>
                    </div>

                    <div
                        class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                        <div class="flex items-start gap-3">
                            <UIcon name="i-heroicons-exclamation-triangle"
                                class="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                            <div>
                                <h5 class="font-medium text-amber-800 dark:text-amber-200 mb-1">Dikkat!</h5>
                                <p class="text-sm text-amber-700 dark:text-amber-300">
                                    Bu şablonu sildiğinizde, şablon dosyası tamamen kaldırılacak ve bu işlem geri
                                    alınamayacaktır.
                                    Emin misiniz?
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-3 pt-4">
                        <UButton color="gray" variant="outline" size="sm" class="flex-1"
                            @click="showDeleteModal = false" :disabled="deleteLoading">
                            İptal
                        </UButton>
                        <UButton color="red" size="sm" class="flex-1" @click="deleteTemplate" :loading="deleteLoading">
                            <UIcon name="i-heroicons-trash" class="w-4 h-4 mr-2" />
                            {{ deleteLoading ? 'Siliniyor...' : 'Evet, Sil' }}
                        </UButton>
                    </div>
                </div>
            </UCard>
        </UModal>
    </div>
</template>

<script setup>
// Blade Templates Composable
const {
    templates,
    loading,
    error,
    fetchTemplates,
    previewTemplate,
    getTemplateTypes,
    api
} = useBladeTemplates()

// Local State
const showPreviewModal = ref(false)
const currentPreviewTemplate = ref(null)
const previewContent = ref('')
const previewLoading = ref(false)
const showDeleteModal = ref(false)
const templateToDelete = ref(null)
const deleteLoading = ref(false)

// Template types for mapping
const templateTypes = getTemplateTypes()

// Breadcrumb
const breadcrumbLinks = [
    { label: 'Ana Sayfa', to: '/management' },
    { label: 'Email Yönetimi', to: '/management/email' },
    { label: 'Blade Şablonlar' }
]

// Lifecycle
onMounted(() => {
    fetchTemplates()
})

// Methods
const getTemplateName = (template) => {
    // Null kontrolü
    if (!template) return 'Bilinmeyen Şablon'

    // Type'ı al
    const type = typeof template === 'string' ? template : template?.type
    if (!type) return 'Bilinmeyen Şablon'

    // Eğer template'in name alanı varsa onu kullan
    if (template?.name) {
        return template.name
    }

    // Sipariş durum şablonları için özel isimlendirme
    if (type.endsWith('-order-status-change')) {
        const status = type.replace('-order-status-change', '')
        const orderStatusNames = {
            'pending': 'Beklemede',
            'processing': 'İşleme Alındı',
            'prepared': 'Hazırlandı',
            'shipped': 'Kargoya Verildi',
            'in_transit': 'Yolda',
            'delivered': 'Teslim Edildi',
            'cancelled': 'İptal Edildi',
            'returned': 'İade Edildi',
            'failed': 'Başarısız'
        }

        const statusName = orderStatusNames[status] || status.charAt(0).toUpperCase() + status.slice(1)
        return `${statusName} - Durum Bildirimi`
    }

    // Diğer şablon tipleri için
    const templateTypeNames = {
        'order-confirmation': 'Sipariş Onayı',
        'shipping-notification': 'Kargo Bildirimi', 
        'welcome': 'Hoş Geldin',
        'password-reset': 'Şifre Sıfırlama',
        'newsletter': 'Haber Bülteni',
        'promotional': 'Promosyon'
    }

    return templateTypeNames[type] || type
}

const getTemplateIcon = (type) => {
    // Null kontrolü
    if (!type) return '📄'

    // Sipariş durum şablonları için özel iconlar
    if (type.endsWith('-order-status-change')) {
        const status = type.replace('-order-status-change', '')
        const statusIcons = {
            'pending': '⏳',
            'processing': '⚙️',
            'prepared': '📦',
            'shipped': '🚚',
            'in_transit': '🚛',
            'delivered': '✅',
            'cancelled': '❌',
            'returned': '↩️',
            'failed': '⚠️'
        }
        return statusIcons[status] || '📦'
    }

    // Diğer şablon tipleri için iconlar
    const icons = {
        'order-confirmation': '📋',
        'shipping-notification': '🚚',
        'welcome': '👋',
        'password-reset': '🔑',
        'newsletter': '📰',
        'promotional': '🎯'
    }
    return icons[type] || '📄'
}

const formatFileSize = (bytes) => {
    if (!bytes) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

const timeAgo = (timestamp) => {
    if (!timestamp) return 'Bilinmiyor'

    const now = Date.now()
    const diff = now - (timestamp * 1000) // Laravel timestamp to JS timestamp
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'Az önce'
    if (minutes < 60) return `${minutes} dakika önce`
    if (hours < 24) return `${hours} saat önce`
    if (days < 7) return `${days} gün önce`
    if (days < 30) return `${Math.floor(days / 7)} hafta önce`
    return `${Math.floor(days / 30)} ay önce`
}

const getTemplateActions = (template) => {
    return [
        [{
            label: 'Düzenle',
            icon: 'i-heroicons-pencil-square',
            to: `/management/email/blade-sablon/${template.type}/duzenle`
        }],
        [{
            label: 'Önizle',
            icon: 'i-heroicons-eye',
            click: () => showPreview(template)
        }],
        [{
            label: 'Sil',
            icon: 'i-heroicons-trash',
            click: () => confirmDelete(template),
            class: 'text-red-600 dark:text-red-400'
        }]
    ]
}

const showPreview = async (template) => {
    currentPreviewTemplate.value = template
    showPreviewModal.value = true
    previewLoading.value = true
    previewContent.value = ''

    try {
        const response = await previewTemplate(template.type)
        if (response.success) {
            previewContent.value = response.html
        }
    } catch (err) {
        console.error('Önizleme hatası:', err)
        // Toast veya error state göster
    } finally {
        previewLoading.value = false
    }
}

const confirmDelete = (template) => {
    templateToDelete.value = template
    showDeleteModal.value = true
}

const deleteTemplate = async () => {
    if (!templateToDelete.value) {
        showDeleteModal.value = false
        return
    }

    deleteLoading.value = true

    try {
        const response = await useBaseOFetchWithAuth(`admin/blade-templates/${templateToDelete.value.id}`, {
            method: 'DELETE',
            headers: useRequestHeaders(['cookie'])
        })

        if (response.success) {
            // Close modal first
            showDeleteModal.value = false
            templateToDelete.value = null

            // Toast success message
            const toast = useToast()
            toast.add({
                title: 'Başarılı',
                description: 'Şablon başarıyla silindi',
                color: 'green'
            })

            // Refresh templates list
            await fetchTemplates()
        }
    } catch (err) {
        console.error('Silme hatası:', err)

        // Toast error message
        const toast = useToast()
        toast.add({
            title: 'Hata',
            description: err.data?.message || 'Şablon silinirken hata oluştu',
            color: 'red'
        })
    } finally {
        deleteLoading.value = false
        // Error durumunda da modal'ı kapatalım
        if (!templateToDelete.value) {
            showDeleteModal.value = false
        }
    }
}

// Meta
definePageMeta({
    layout: 'admin'
})

useHead({
    title: 'Blade Email Şablonları - Beyraha Admin'
})
</script>