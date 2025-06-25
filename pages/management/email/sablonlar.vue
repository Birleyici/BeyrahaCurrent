<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <AdminCommonPageHeader title="Email Şablon Yönetimi"
            :description="`Toplam ${templates.length} şablon bulunuyor`" :breadcrumb-links="breadcrumbLinks">
            <template #actions>
                <UButton icon="i-heroicons-arrow-path" size="sm" color="gray" variant="outline" label="Yenile"
                    @click="fetchTemplates" :loading="loading" class="touch-manipulation" />
                <UButton icon="i-heroicons-plus" size="sm" color="primary" variant="solid" label="Yeni Şablon"
                    to="/management/email/sablon/olustur" class="touch-manipulation" />
            </template>
        </AdminCommonPageHeader>

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
                <p class="text-lg font-medium text-neutral-600 dark:text-neutral-400">Şablonlar yükleniyor...</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="templates.length === 0" class="text-center py-12">
                <UIcon name="i-heroicons-envelope"
                    class="w-16 h-16 text-neutral-400 dark:text-neutral-500 mx-auto mb-4" />
                <h3 class="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                    Henüz email şablonu yok
                </h3>
                <p class="text-neutral-600 dark:text-neutral-400 mb-6">
                    İlk email şablonunuzu oluşturarak başlayın
                </p>
                <UButton icon="i-heroicons-plus" color="primary" variant="solid" label="Yeni Şablon Oluştur"
                    to="/management/email/sablon/olustur" class="touch-manipulation" />
            </div>

            <!-- Templates Grid -->
            <div v-else class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="template in templates" :key="template.id"
                        class="bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 hover:shadow-md transition-shadow duration-200 overflow-hidden">

                        <!-- Template Header -->
                        <div
                            class="bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 p-4 border-b border-neutral-200 dark:border-neutral-700">
                            <div class="flex items-start justify-between">
                                <div class="flex-1 min-w-0">
                                    <h3 class="text-lg font-semibold text-neutral-900 dark:text-white truncate">
                                        {{ template.name }}
                                    </h3>
                                    <div class="flex items-center gap-2 mt-1">
                                        <UBadge :color="getTypeColor(template.type)" size="xs" v-if="template.type">
                                            {{ getTypeLabel(template.type) }}
                                        </UBadge>
                                        <UBadge :color="template.is_active ? 'green' : 'neutral'" size="xs">
                                            {{ template.is_active ? 'Aktif' : 'Pasif' }}
                                        </UBadge>
                                    </div>
                                </div>
                                <UDropdown :items="getTemplateActions(template)" :popper="{ placement: 'bottom-end' }">
                                    <UButton icon="i-heroicons-ellipsis-vertical" size="xs" color="neutral"
                                        variant="ghost" class="touch-manipulation" />
                                </UDropdown>
                            </div>
                        </div>

                        <!-- Template Content -->
                        <div class="p-4">
                            <p v-if="template.description"
                                class="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                                {{ template.description }}
                            </p>
                            <p v-if="template.subject"
                                class="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Konu: {{ template.subject }}
                            </p>

                            <!-- Preview -->
                            <div class="bg-neutral-50 dark:bg-neutral-700 rounded-md p-3 mb-3 max-h-32 overflow-hidden">
                                <div class="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-4"
                                    v-html="getPreviewContent(template.content)">
                                </div>
                            </div>

                            <!-- Actions -->
                            <div
                                class="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                                <span>{{ timeAgo(template.updated_at) }}</span>
                                <div class="flex items-center gap-2">
                                    <UButton size="xs" color="primary" variant="outline"
                                        :to="`/management/email/sablon/${template.id}/duzenle`"
                                        class="touch-manipulation">
                                        Düzenle
                                    </UButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    PlusIcon,
    EnvelopeIcon,
    PencilIcon,
    EyeIcon,
    TrashIcon,
    CalendarIcon,
    XMarkIcon,
    DocumentDuplicateIcon,
    ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'

// API Composable
const {
    templates,
    loading,
    error,
    fetchTemplates,
    deleteTemplate,
    previewTemplate,
    duplicateTemplate
} = useEmailTemplates()

// Local State
const showPreviewModal = ref(false)
const showDeleteModal = ref(false)
const templateToDelete = ref(null)
const currentPreviewTemplate = ref(null)
const previewContent = ref('')

// Breadcrumb
const breadcrumbLinks = [
    { label: 'Ana Sayfa', to: '/management' },
    { label: 'Email Yönetimi', to: '/management/email' },
    { label: 'Şablonlar' }
]

// Lifecycle
onMounted(() => {
    fetchTemplates()
})

// Methods
const getTypeColor = (type) => {
    const colors = {
        welcome: 'blue',
        order_confirmation: 'green',
        shipping: 'orange',
        newsletter: 'purple',
        promotion: 'pink'
    }
    return colors[type] || 'gray'
}

const getTypeLabel = (type) => {
    const labels = {
        welcome: 'Hoş Geldin',
        order_confirmation: 'Sipariş Onayı',
        shipping: 'Kargo',
        newsletter: 'Bülten',
        promotion: 'Promosyon'
    }
    return labels[type] || type
}

const getPreviewContent = (content) => {
    // HTML'i temizle ve ilk birkaç kelimeyi al
    return content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
}

const timeAgo = (date) => {
    const now = new Date()
    const past = new Date(date)
    const diff = now - past
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) return 'Bugün'
    if (days === 1) return 'Dün'
    if (days < 7) return `${days} gün önce`
    if (days < 30) return `${Math.floor(days / 7)} hafta önce`
    return `${Math.floor(days / 30)} ay önce`
}

const getTemplateActions = (template) => {
    return [
        [{
            label: 'Düzenle',
            icon: 'i-heroicons-pencil-square',
            to: `/management/email/sablon/${template.id}/duzenle`
        }],
        [{
            label: 'Sil',
            icon: 'i-heroicons-trash',
            click: () => confirmDelete(template)
        }]
    ]
}

const showPreview = (template) => {
    // TODO: Preview modal implementasyonu
    console.log('Preview template:', template)
}

const duplicateTemplateAction = async (template) => {
    try {
        // TODO: Duplicate implementasyonu
        console.log('Duplicate template:', template)
    } catch (err) {
        console.error('Kopyalama hatası:', err)
    }
}

const confirmDelete = (template) => {
    templateToDelete.value = template
    showDeleteModal.value = true
}

const deleteTemplateAction = async () => {
    if (!templateToDelete.value) return

    try {
        await deleteTemplate(templateToDelete.value.id)
        showDeleteModal.value = false
        templateToDelete.value = null
        console.log('Şablon başarıyla silindi')
    } catch (err) {
        console.error('Şablon silme hatası:', err)
    }
}

// Meta
definePageMeta({
    layout: 'admin'
})

useHead({
    title: 'Email Şablonları - Beyraha Admin'
})
</script>