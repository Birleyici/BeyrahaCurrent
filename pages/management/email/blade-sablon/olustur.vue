<template>
    <div class="space-y-6">
        <!-- Page Header -->
        <AdminCommonPageHeader title="Yeni Blade Email Şablonu Oluştur"
            description="Laravel Blade template sistemi ile güçlü ve esnek email şablonları oluşturun"
            :breadcrumb-links="breadcrumbLinks">
            <template #actions>
                <UButton icon="i-heroicons-arrow-left" size="sm" color="gray" variant="outline" label="Geri"
                    to="/management/email/blade-sablonlar" class="touch-manipulation" />
            </template>
        </AdminCommonPageHeader>

        <!-- Form Component -->
        <BladeTemplateForm :is-edit="false" @saved="handleSaved" />
    </div>
</template>

<script setup>
// Breadcrumb links
const breadcrumbLinks = [
    { label: 'Ana Sayfa', to: '/management' },
    { label: 'Email Yönetimi', to: '/management/email' },
    { label: 'Blade Şablonlar', to: '/management/email/blade-sablonlar' },
    { label: 'Yeni Şablon' }
]

// Methods
const handleSaved = (template) => {
    // Başarıyla kaydedildikten sonra yönlendirme
    navigateTo(`/management/email/blade-sablon/${template.type}/duzenle`)
}

// Meta
definePageMeta({
    layout: 'admin'
})

useHead({
    title: 'Yeni Blade Email Şablonu - Beyraha Admin'
})
</script>