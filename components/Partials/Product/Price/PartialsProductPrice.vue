<template>
    <div class="flex space-x-2 items-center" :class="props.class">
        <del  :class="delClasses" v-if="props.salePrice && props.delPrice" class="text-slate-400">
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
        'text-3xl font-bold text-orange-500': props.type == 'page',
        'text-orange-500': props.type == 'card',
    }
})

const delClasses = computed(() => {
    return {
        'text-xl': props.type == 'page',
    }
})


</script>