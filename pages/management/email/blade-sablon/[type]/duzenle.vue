<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <AdminCommonPageHeader :title="`${templateData?.name || 'Blade Şablon'} - Düzenle`"
            :description="`${templateData?.type || ''} tipindeki Blade şablonunu düzenleyin`"
            :breadcrumb-links="breadcrumbLinks">
            <template #actions>
                <UButton icon="i-heroicons-arrow-left" size="sm" color="gray" variant="outline" label="Geri"
                    to="/management/email/blade-sablonlar" class="touch-manipulation" />
            </template>
        </AdminCommonPageHeader>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
            <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-primary-600 animate-spin mx-auto mb-2" />
            <p class="text-neutral-600 dark:text-neutral-400">Şablon yükleniyor...</p>
        </div>

        <!-- Error State -->
        <UAlert v-else-if="error" color="red" variant="solid" :title="error" />

        <!-- Template Not Found -->
        <UAlert v-else-if="!templateData" color="amber" variant="solid" title="Şablon Bulunamadı"
            description="Bu tipte bir şablon mevcut değil." />

        <!-- Form Component -->
        <BladeTemplateForm v-else :is-edit="true" :template-data="templateData" @saved="handleSaved" />
    </div>
</template>

<script setup>
// Route params
const route = useRoute()
const templateType = route.params.type

// Breadcrumb links
const breadcrumbLinks = [
    { label: 'Ana Sayfa', to: '/management' },
    { label: 'Email Yönetimi', to: '/management/email' },
    { label: 'Blade Şablonlar', to: '/management/email/blade-sablonlar' },
    { label: 'Düzenle' }
]

// Blade Templates Composable
const { loading, error, api } = useBladeTemplates()

// Template Data
const templateData = ref(null)

// Fetch template data
const fetchTemplate = async () => {
    try {
        const response = await api.getByType(templateType)
        if (response.success && response.template) {
            templateData.value = response.template
        } else {
            templateData.value = null
        }
    } catch (err) {
        console.error('Şablon yüklenirken hata:', err)
        templateData.value = null
    }
}

// Methods
const handleSaved = (template) => {
    // Başarıyla kaydedildikten sonra template verilerini güncelle
    templateData.value = template

    // Success message
    const toast = useToast()
    toast.add({
        title: 'Başarılı',
        description: 'Şablon başarıyla güncellendi',
        color: 'green'
    })
}

// Lifecycle
onMounted(() => {
    fetchTemplate()
})

// Meta
definePageMeta({
    layout: 'admin'
})

useHead({
    title: computed(() => `${templateData.value?.name || 'Blade Şablon'} - Düzenle - Beyraha Admin`)
})
</script>
