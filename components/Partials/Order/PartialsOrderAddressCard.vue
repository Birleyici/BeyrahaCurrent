<template>
    <div :class="{ 'animate-pulse': loading }"
        class="bg-white border border-neutral-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <div class="relative bg-gradient-to-r from-neutral-50 to-neutral-100 px-4 py-3 border-b border-neutral-200">
            <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                    <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-secondary-600" />
                </div>
                <h3 class="font-medium text-neutral-900">{{ props.title }}</h3>
            </div>
            <!-- Dekoratif ikon -->
            <UIcon name="i-heroicons-map-pin" class="absolute top-2 right-4 w-8 h-8 text-neutral-200 opacity-30" />
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
