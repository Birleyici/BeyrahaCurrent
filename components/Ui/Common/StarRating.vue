<template>
    <div class="flex items-center space-x-2">
        <!-- Yıldızlar -->
        <div class="flex items-center space-x-0.5">
            <UIcon v-for="star in 5" :key="star" name="i-heroicons-star-solid" :class="[
                size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5',
                star <= Math.round(rating)
                    ? 'text-amber-400 dark:text-amber-300'
                    : 'text-slate-300 dark:text-slate-600'
            ]" />
        </div>

        <!-- Rating ve Review Count -->
        <div v-if="showText" class="flex items-center space-x-1">
            <span :class="[
                'font-medium text-slate-700 dark:text-slate-300',
                size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
            ]">
                {{ formattedRating }}
            </span>
            <span v-if="reviewCount > 0" :class="[
                'text-slate-500 dark:text-slate-400',
                size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
            ]">
                ({{ reviewCount }})
            </span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    rating: {
        type: Number,
        default: 0
    },
    reviewCount: {
        type: Number,
        default: 0
    },
    size: {
        type: String,
        default: 'md', // sm, md, lg
        validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    showText: {
        type: Boolean,
        default: true
    }
})

const formattedRating = computed(() => {
    return Math.round(props.rating * 10) / 10
})
</script>