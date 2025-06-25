<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <AdminCommonPageHeader title="Yeni Email Şablonu Oluştur"
            description="Dinamik değişkenler ve hazır bileşenlerle email şablonunuzu oluşturun"
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
        <EmailTemplateForm :is-edit="false" hide-header />
    </div>
</template>

<script setup>
// Meta
definePageMeta({
    layout: 'admin'
})

useHead({
    title: 'Yeni Email Şablonu - Beyraha Admin'
})

// Breadcrumb links
const breadcrumbLinks = [
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
        label: 'Yeni Şablon',
        icon: 'i-heroicons-plus'
    }
]
</script>