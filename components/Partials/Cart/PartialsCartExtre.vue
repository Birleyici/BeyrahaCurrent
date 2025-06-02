<template>
    <div class="w-full">
        <div class="sticky top-4 w-full">
            <div class="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
                <!-- Başlık -->
                <div class="flex items-center space-x-3 mb-6">
                    <div class="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                        <UIcon name="i-heroicons-document-text" class="w-4 h-4 text-secondary-600" />
                    </div>
                    <h3 class="text-lg font-semibold text-neutral-900">Sipariş Özeti</h3>
                </div>

                <!-- Fiyat Detayları -->
                <div class="space-y-4">
                    <!-- Ürün Toplam -->
                    <div class="flex justify-between items-center">
                        <span class="text-neutral-600">Ürün toplam:</span>
                        <span class="font-medium text-neutral-900">{{ formatPrice(cartStore.cartTotalAmount) }}</span>
                    </div>

                    <!-- Kargo Ücreti -->
                    <div class="flex justify-between items-center">
                        <span class="text-neutral-600">Kargo ücreti:</span>
                        <span class="font-medium" :class="shippingCost == 0 ? 'text-green-600' : 'text-neutral-900'">
                            {{ shippingCost == 0 ? 'Ücretsiz' : formatPrice(shippingCost) }}
                        </span>
                    </div>

                    <!-- Ücretsiz Kargo Bilgisi -->
                    <div v-if="shippingCost > 0 && (1000 - cartStore.cartTotalAmount) > 0"
                        class="bg-secondary-50 border border-secondary-200 rounded-lg p-3">
                        <div class="flex items-center space-x-2">
                            <UIcon name="i-heroicons-truck" class="w-4 h-4 text-secondary-600" />
                            <span class="text-sm text-secondary-700">
                                {{ formatPrice(1000 - cartStore.cartTotalAmount) }} daha alışveriş yapın,
                                <span class="font-semibold">ücretsiz kargo</span> kazanın!
                            </span>
                        </div>
                    </div>

                    <!-- Ayırıcı -->
                    <div class="border-t border-neutral-200 pt-4">
                        <div class="flex justify-between items-center">
                            <span class="text-lg font-semibold text-neutral-900">Toplam:</span>
                            <Transition name="slide-up" mode="out-in">
                                <span class="text-xl font-bold text-secondary-600" :key="cartStore.cartTotalAmount">
                                    {{ formatPrice(cartStore.cartTotalAmount + shippingCost) }}
                                </span>
                            </Transition>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Buton Alanı -->
            <div
                class="mt-4 bottom-0 fixed md:!relative bg-white w-full right-0 left-0 p-4 md:p-0 border-t md:border-t-0 border-neutral-200 md:border-none">
                <slot name="button" />
            </div>
        </div>
    </div>
</template>

<script setup>
const cartStore = useCartState()
const shippingCost = computed(() => {
    return cartStore.cartTotalAmount > 1000 ? 0 : 60
})
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.3s ease;
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.slide-up-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>