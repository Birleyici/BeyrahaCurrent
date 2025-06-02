<template>
    <div class="flex space-x-2 items-center" :class="props.class">
        <del :class="delClasses" v-if="props.salePrice && props.delPrice" class="text-neutral-400">
            {{ formatPrice(props.price) }}
        </del>
        <span :class="priceClasses">
            {{ formatPrice(props.salePrice || props.price) }}
        </span>
    </div>
</template>
<script setup>
const props = defineProps({
    price: Number,
    salePrice: Number,
    type: String,
    delPrice: {
        type: Boolean,
        default: true
    }
})

const priceClasses = computed(() => {
    return {
        'text-heading-3 font-bold text-secondary-600': props.type == 'page',
        'text-lg font-semibold text-secondary-600': props.type == 'card',
    }
})

const delClasses = computed(() => {
    return {
        'text-xl text-neutral-500': props.type == 'page',
        'text-sm text-neutral-400': props.type == 'card',
    }
})


</script>