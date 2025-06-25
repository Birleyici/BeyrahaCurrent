<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <AdminCommonPageHeader :title="pageTitle" description="Email şablonunu düzenleyin ve kaydedin"
            :breadcrumb-links="breadcrumbLinks">
            <template #actions>
                <NuxtLink to="/management/email/sablonlar"
                    class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <UIcon name="i-heroicons-x-mark" class="w-5 h-5 mr-2" />
                    İptal
                </NuxtLink>
            </template>
        </AdminCommonPageHeader>

        <!-- Form Component -->
        <EmailTemplateForm :is-edit="true" :template-id="$route.params.id" hide-header
            @template-loaded="onTemplateLoaded" />
    </div>
</template>

<script setup>
// Page Meta
definePageMeta({
    layout: 'admin'
})

useHead({
    title: 'Email Şablonu Düzenle - Beyraha Admin'
})

// Local state
const templateName = ref('')
const pageTitle = computed(() => {
    return templateName.value ? `${templateName.value} Düzenle` : 'Şablon Düzenle'
})

// Breadcrumb links
const breadcrumbLinks = computed(() => [
    {
        label: 'Dashboard',
        icon: 'i-heroicons-home',
        to: '/management'
    },
    {
        label: 'Email Şablonları',
        icon: 'i-heroicons-envelope',
        to: '/management/email/sablonlar'
    },
    {
        label: templateName.value || 'Şablon Düzenle',
        icon: 'i-heroicons-pencil'
    }
])

// Methods
const onTemplateLoaded = (template) => {
    if (template?.name) {
        templateName.value = template.name
    }
}
</script>