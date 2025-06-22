<template>
    <div
        class="bg-white dark:bg-neutral-800 rounded-none md:rounded-xl border-0 md:border border-neutral-200 dark:border-neutral-700 p-6 lg:p-8 shadow-none md:shadow-soft transition-colors duration-300">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <!-- Overall Rating -->
            <div class="text-center lg:text-left">
                <div class="flex items-center justify-center lg:justify-start space-x-4 mb-4">
                    <div class="text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-100">
                        {{ averageRatingFormatted }}
                    </div>
                    <div>
                        <div class="flex items-center space-x-1 mb-1">
                            <UIcon v-for="star in 5" :key="star" name="i-heroicons-star-solid" :class="[
                                'w-6 h-6',
                                star <= Math.round(stats.average_rating)
                                    ? 'text-warning-400'
                                    : 'text-neutral-300 dark:text-neutral-600'
                            ]" />
                        </div>
                        <p class="text-sm text-neutral-600 dark:text-neutral-400">
                            {{ stats.total_reviews }} değerlendirme
                        </p>
                    </div>
                </div>


            </div>

            <!-- Rating Distribution -->
            <div class="space-y-3">
                <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                    Puan Dağılımı
                </h3>

                <div v-for="rating in [5, 4, 3, 2, 1]" :key="rating" class="flex items-center space-x-3">
                    <div class="flex items-center space-x-1 w-16">
                        <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                            {{ rating }}
                        </span>
                        <UIcon name="i-heroicons-star-solid" class="w-4 h-4 text-warning-400" />
                    </div>

                    <div class="flex-1 bg-neutral-200 dark:bg-neutral-600 rounded-full h-2 overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-warning-400 to-secondary-400 rounded-full transition-all duration-500 ease-out"
                            :style="{ width: `${getRatingPercentage(rating)}%` }" />
                    </div>

                    <div class="w-12 text-right">
                        <span class="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                            {{ getRatingCount(rating) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    stats: {
        type: Object,
        required: true
    },
    loading: {
        type: Boolean,
        default: false
    }
})

// Computed
const averageRatingFormatted = computed(() => {
    return Math.round(props.stats.average_rating * 10) / 10
})

const satisfactionPercentage = computed(() => {
    if (!props.stats.rating_distribution) return 0

    const total = props.stats.total_reviews
    if (total === 0) return 0

    const satisfied = (props.stats.rating_distribution[4] || 0) + (props.stats.rating_distribution[5] || 0)
    return Math.round((satisfied / total) * 100)
})

const getRatingPercentage = (rating) => {
    const total = props.stats.total_reviews
    if (total === 0) return 0

    const count = props.stats.rating_distribution[rating] || 0
    return Math.round((count / total) * 100)
}

const getRatingCount = (rating) => {
    return props.stats.rating_distribution[rating] || 0
}
</script>