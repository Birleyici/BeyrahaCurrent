<template>
    <div class="space-y-4">
        <!-- Breadcrumb - Üst kısımda -->
        <div v-if="breadcrumbLinks && breadcrumbLinks.length > 0" class="px-1">
            <UBreadcrumb :links="breadcrumbLinks" />
        </div>

        <!-- Page Header Card -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <!-- Sayfa Başlığı -->
                    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
                        {{ title }}
                    </h1>

                    <!-- Açıklama -->
                    <p v-if="description" class="text-gray-600 dark:text-gray-400 mt-1">
                        {{ description }}
                    </p>
                </div>

                <!-- Aksiyonlar -->
                <div v-if="$slots.actions" class="flex items-center gap-3">
                    <slot name="actions" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    breadcrumbLinks: {
        type: Array,
        default: () => []
    }
})
</script>