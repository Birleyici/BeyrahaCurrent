<template>
    <div class="flex items-center gap-2" :class="props.class">
        <!-- Varyasyonlı ürün fiyat gösterimi -->
        <template v-if="props.isVariationProduct">
            <div v-if="props.displayPrice">
                <span :class="priceClasses">
                    {{ formatPrice(props.displayPrice) }}<span v-if="props.hasPriceRange">+</span>
                </span>
                <span v-if="props.type === 'page'" class="text-sm text-neutral-500 dark:text-neutral-400 ml-2">
                    varyasyonlara göre
                </span>
            </div>
            <div v-else>
                <span class="text-sm text-orange-500 dark:text-orange-400">
                    Fiyat belirlenmemiş
                </span>
            </div>
        </template>

        <!-- Normal ürün fiyat gösterimi -->
        <template v-else>
            <span v-if="props.salePrice && props.delPrice" :class="delClasses" class="line-through text-sm">
                {{ formatPrice(props.price) }}
            </span>
            <span :class="priceClasses">
                {{ formatPrice(props.salePrice || props.price) }}
            </span>
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
        'text-2xl md:text-3xl font-bold text-secondary-600 dark:text-secondary-400': props.type == 'page',
        'text-lg font-semibold text-secondary-600 dark:text-secondary-400': props.type == 'card',
    }
})

const delClasses = computed(() => {
    return {
        'text-lg text-neutral-400 dark:text-neutral-500': props.type == 'page',
        'text-sm text-neutral-400 dark:text-neutral-500': props.type == 'card',
    }
})


</script>