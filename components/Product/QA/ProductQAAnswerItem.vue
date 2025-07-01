<template>
    <div class="border-l-4 border-green-200 dark:border-green-700 pl-4 py-3 bg-white dark:bg-neutral-800 rounded-r-lg">
        <!-- Cevap Başlığı -->
        <div class="flex items-start justify-between mb-3">
            <div class="flex items-center space-x-2">
                <UIcon :name="answer.is_vendor_answer ? 'i-heroicons-building-storefront' : 'i-heroicons-user-circle'"
                    class="w-5 h-5"
                    :class="answer.is_vendor_answer ? 'text-orange-500 dark:text-orange-400' : 'text-neutral-500 dark:text-neutral-400'" />
                <span class="text-sm font-medium"
                    :class="answer.is_vendor_answer ? 'text-orange-700 dark:text-orange-300' : 'text-neutral-900 dark:text-neutral-100'">
                    {{ answer.user_display_name }}
                </span>

                <!-- Satıcı Badge -->
                <UBadge v-if="answer.is_vendor_answer" color="orange" variant="soft" size="xs">
                    <UIcon name="i-heroicons-building-storefront" class="w-3 h-3 mr-1" />
                    Satıcı
                </UBadge>

                <span class="text-xs text-neutral-500 dark:text-neutral-400">
                    {{ answer.time_ago }}
                </span>
            </div>
        </div>

        <!-- Cevap İçeriği -->
        <div class="text-neutral-900 dark:text-neutral-100 leading-relaxed text-sm">
            {{ answer.answer }}
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    answer: {
        type: Object,
        required: true
    }
})
</script>
