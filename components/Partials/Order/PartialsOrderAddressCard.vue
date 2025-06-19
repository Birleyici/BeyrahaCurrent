<template>
    <div :class="{ 'animate-pulse': loading }"
        class="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-sm hover:shadow-md dark:hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div
            class="relative bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
            <div class="flex items-center space-x-3">
                <div
                    class="w-8 h-8 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center">
                    <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
                </div>
                <h3 class="font-medium text-neutral-900 dark:text-neutral-100">{{ props.title }}</h3>
            </div>
            <!-- Dekoratif ikon -->
            <UIcon name="i-heroicons-map-pin"
                class="absolute top-2 right-4 w-8 h-8 text-neutral-200 dark:text-neutral-600 opacity-30" />
        </div>

        <!-- İçerik -->
        <div class="p-4">
            <PartialsOrderAddress :address-options="props.addressOptions" :address="props.address"
                :save-function="props.saveFunction" />
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["address", "class", 'title', 'addressOptions', 'saveFunction']);
const loading = ref(false)
</script>
