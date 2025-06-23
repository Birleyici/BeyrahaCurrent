<template>
    <div class="text-center md:flex space-x-2 md:items-center" :class="props.class">
        <!-- Varyasyonlı ürün fiyat gösterimi -->
        <template v-if="props.isVariationProduct">
            <div v-if="props.displayPrice" class="flex flex-col items-center">
                <p :class="priceClasses">
                    {{ formatPrice(props.displayPrice) }}<span v-if="props.hasPriceRange">+</span>
                </p>
                <p v-if="props.type === 'page'" class="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                    Varyasyonlara göre
                </p>
            </div>
            <div v-else>
                <p class="text-sm text-orange-500 dark:text-orange-400">
                    Varyasyon fiyatı belirlenmemiş
                </p>
            </div>
        </template>

        <!-- Normal ürün fiyat gösterimi -->
        <template v-else>
            <p :class="delClasses" v-if="props.salePrice && props.delPrice"
                class="line-through text-neutral-400 dark:text-neutral-500">
                {{ formatPrice(props.price) }}
            </p>
            <p :class="priceClasses">
                {{ formatPrice(props.salePrice || props.price) }}
            </p>
        </template>
    </div>
</template>
<script setup>
const props = defineProps({
    price: Number,
    salePrice: Number,
    displayPrice: Number,
    isVariationProduct: Boolean,
    hasPriceRange: Boolean,
    type: String,
    delPrice: {
        type: Boolean,
        default: true
    }
})

const priceClasses = computed(() => {
    return {
        'text-heading-3 font-bold text-secondary-600 dark:text-secondary-400': props.type == 'page',
        'text-lg font-semibold text-secondary-600 dark:text-secondary-400': props.type == 'card',
    }
})

const delClasses = computed(() => {
    return {
        'text-xl text-neutral-500 dark:text-neutral-400': props.type == 'page',
        'text-sm text-neutral-400 dark:text-neutral-500': props.type == 'card',
    }
})


</script>