<template>
    <div
        class="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 lg:p-6 shadow-soft transition-colors duration-300">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <!-- Filter Title -->
            <div class="flex items-center space-x-2">
                <UIcon name="i-heroicons-funnel" class="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                <h3 class="font-medium text-neutral-900 dark:text-neutral-100">Yorumları Filtrele</h3>
            </div>

            <!-- Filters -->
            <div class="flex flex-col sm:flex-row gap-3 lg:gap-4">
                <!-- Rating Filter -->
                <USelectMenu v-model="localFilters.rating" :options="ratingOptions" placeholder="Tüm Puanlar"
                    class="w-full sm:w-40">
                    <template #label>
                        <div v-if="localFilters.rating" class="flex items-center space-x-1">
                            <UIcon v-for="star in localFilters.rating" :key="star" name="i-heroicons-star-solid"
                                class="w-4 h-4 text-warning-400" />
                            <span class="ml-1">ve üzeri</span>
                        </div>
                        <span v-else>Tüm Puanlar</span>
                    </template>

                    <template #option="{ option }">
                        <div v-if="option.value" class="flex items-center space-x-1">
                            <UIcon v-for="star in option.value" :key="star" name="i-heroicons-star-solid"
                                class="w-4 h-4 text-warning-400" />
                            <span class="ml-1">{{ option.label }}</span>
                        </div>
                        <span v-else>{{ option.label }}</span>
                    </template>
                </USelectMenu>

                <!-- Sort Filter -->
                <USelectMenu v-model="localFilters.sort" :options="sortOptions" class="w-full sm:w-44">
                    <template #label>
                        {{ getSortLabel(localFilters.sort) }}
                    </template>
                </USelectMenu>

                <!-- Toggle Filters -->
                <div class="flex items-center space-x-3">
                    <!-- Verified Purchase -->
                    <UToggle v-model="localFilters.verified_only" :ui="{
                        active: 'bg-success-500 dark:bg-success-400',
                        inactive: 'bg-neutral-200 dark:bg-neutral-700'
                    }" />
                    <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300 cursor-pointer select-none"
                        @click="localFilters.verified_only = !localFilters.verified_only">
                        <div class="flex items-center space-x-1">
                            <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-success-500" />
                            <span>Doğrulanmış</span>
                        </div>
                    </label>

                    <!-- With Images -->
                    <UToggle v-model="localFilters.with_images" :ui="{
                        active: 'bg-accent-500 dark:bg-accent-400',
                        inactive: 'bg-neutral-200 dark:bg-neutral-700'
                    }" />
                    <label class="text-sm font-medium text-neutral-700 dark:text-neutral-300 cursor-pointer select-none"
                        @click="localFilters.with_images = !localFilters.with_images">
                        <div class="flex items-center space-x-1">
                            <UIcon name="i-heroicons-camera" class="w-4 h-4 text-accent-500" />
                            <span>Fotoğraflı</span>
                        </div>
                    </label>
                </div>

                <!-- Clear Filters -->
                <UButton v-if="hasActiveFilters" @click="clearFilters" color="neutral" variant="outline" size="sm"
                    class="whitespace-nowrap">
                    <UIcon name="i-heroicons-x-mark" class="w-4 h-4 mr-1" />
                    Temizle
                </UButton>
            </div>
        </div>

        <!-- Active Filters Summary -->
        <div v-if="hasActiveFilters" class="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            <div class="flex items-center space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                <span>Aktif filtreler:</span>
                <div class="flex flex-wrap gap-2">
                    <UBadge v-if="localFilters.rating" color="warning" variant="soft" size="xs">
                        {{ localFilters.rating }} yıldız ve üzeri
                    </UBadge>

                    <UBadge v-if="localFilters.verified_only" color="success" variant="soft" size="xs">
                        Doğrulanmış alımlar
                    </UBadge>

                    <UBadge v-if="localFilters.with_images" color="accent" variant="soft" size="xs">
                        Fotoğraflı yorumlar
                    </UBadge>

                    <UBadge v-if="localFilters.sort !== 'recent'" color="secondary" variant="soft" size="xs">
                        {{ getSortLabel(localFilters.sort) }}
                    </UBadge>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    filters: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['update:filters', 'update'])

// Local reactive copy of filters
const localFilters = reactive({
    rating: props.filters.rating,
    sort: props.filters.sort || 'recent',
    verified_only: props.filters.verified_only || false,
    with_images: props.filters.with_images || false
})

// Filter options
const ratingOptions = [
    { label: 'Tüm Puanlar', value: null },
    { label: 've üzeri', value: 5 },
    { label: 've üzeri', value: 4 },
    { label: 've üzeri', value: 3 },
    { label: 've üzeri', value: 2 },
    { label: 've üzeri', value: 1 }
]

const sortOptions = [
    { label: 'En Yeni', value: 'recent' },
    { label: 'En Eski', value: 'oldest' },
    { label: 'En Yararlı', value: 'helpful' },
    { label: 'En Yüksek Puan', value: 'highest_rating' },
    { label: 'En Düşük Puan', value: 'lowest_rating' }
]

// Computed
const hasActiveFilters = computed(() => {
    return localFilters.rating !== null ||
        localFilters.sort !== 'recent' ||
        localFilters.verified_only ||
        localFilters.with_images
})

// Methods
const getSortLabel = (sortValue) => {
    const option = sortOptions.find(opt => opt.value === sortValue)
    return option ? option.label : 'En Yeni'
}

const clearFilters = () => {
    localFilters.rating = null
    localFilters.sort = 'recent'
    localFilters.verified_only = false
    localFilters.with_images = false
}

// Watch for changes and emit
watch(localFilters, (newFilters) => {
    emit('update:filters', { ...newFilters })
    emit('update')
}, { deep: true })

// Watch for external filter changes
watch(() => props.filters, (newFilters) => {
    Object.assign(localFilters, newFilters)
}, { deep: true })
</script>