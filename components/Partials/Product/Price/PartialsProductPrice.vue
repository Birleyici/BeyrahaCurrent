<template>
    <div class="flex items-center gap-2" :class="props.class">
        <!-- Varyasyonlı ürün fiyat gösterimi -->
        <template v-if="props.isVariationProduct">
            <div v-if="props.displayPrice">
                <span :class="priceClasses">
                    {{ formatPrice(props.displayPrice) }}<span v-if="props.hasPriceRange">+</span>
                </span>
                <span v-if="props.type === 'page'" class="text-sm text-slate-500 dark:text-slate-400 ml-2">
                    varyasyonlara göre
                </span>
            </div>
            <div v-else>
                <span class="text-sm text-amber-600 dark:text-amber-400 font-medium">
                    Fiyat belirlenmemiş
                </span>
            </div>
        </template>

        <!-- Normal ürün fiyat gösterimi -->
        <template v-else>
            <span v-if="props.salePrice && props.delPrice" :class="delClasses" class="line-through">
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
        'text-xl md:text-4xl font-bold text-secondary-600 dark:text-secondary-400': props.type == 'page',
        'text-lg font-bold text-secondary-600 dark:text-secondary-400': props.type == 'card',
    }
})

const delClasses = computed(() => {
    return {
        'text-lg text-slate-400 dark:text-slate-500': props.type == 'page',
        'text-sm text-slate-400 dark:text-slate-500': props.type == 'card',
    }
})
</script>