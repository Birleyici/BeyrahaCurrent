<template>
    <div class="w-full">
        <div class="sticky top-4 w-full">
            <div
                class="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 shadow-sm">
                <!-- Başlık -->
                <div class="flex items-center space-x-3 mb-6">
                    <div
                        class="w-8 h-8 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center">
                        <UIcon name="i-heroicons-document-text"
                            class="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
                    </div>
                    <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Sipariş Özeti</h3>
                </div>

                <!-- Fiyat Detayları -->
                <div class="space-y-4">
                    <!-- Ürün Toplam -->
                    <div class="flex justify-between items-center">
                        <span class="text-neutral-600 dark:text-neutral-400">Ürün toplam:</span>
                        <span class="font-medium text-neutral-900 dark:text-neutral-100">{{
                            formatPrice(cartState.cartTotalAmount) }}</span>
                    </div>

                    <!-- Kargo Ücreti -->
                    <div class="flex justify-between items-center">
                        <span class="text-neutral-600 dark:text-neutral-400">Kargo ücreti:</span>
                        <span class="font-medium"
                            :class="shippingCost == 0 ? 'text-green-600 dark:text-green-400' : 'text-neutral-900 dark:text-neutral-100'">
                            {{ shippingCost == 0 ? 'Ücretsiz' : formatPrice(shippingCost) }}
                        </span>
                    </div>

                    <!-- Ücretsiz Kargo Bilgisi -->
                    <div v-if="shippingCost > 0 && remainingAmount > 0"
                        class="bg-secondary-50 dark:bg-secondary-900/50 border border-secondary-200 dark:border-secondary-700 rounded-lg p-3">
                        <div class="flex items-center space-x-2">
                            <UIcon name="i-heroicons-truck"
                                class="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
                            <span class="text-sm text-secondary-700 dark:text-secondary-300">
                                {{ formatPrice(remainingAmount) }} daha alışveriş yapın,
                                <span class="font-semibold">ücretsiz kargo</span> kazanın!
                            </span>
                        </div>
                    </div>

                    <!-- Ayırıcı -->
                    <div class="border-t border-neutral-200 dark:border-neutral-700 pt-4">
                        <div class="flex justify-between items-center">
                            <span class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Toplam:</span>
                            <Transition name="slide-up" mode="out-in">
                                <span class="text-xl font-bold text-secondary-600 dark:text-secondary-400"
                                    :key="cartState.cartTotalAmount">
                                    {{ formatPrice(cartState.cartTotalAmount + shippingCost) }}
                                </span>
                            </Transition>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Buton Alanı -->
            <div
                class="mt-4 bottom-0 fixed md:!relative bg-white dark:bg-neutral-800 w-full right-0 left-0 p-4 md:p-0 border-t md:border-t-0 border-neutral-200 dark:border-neutral-700 md:border-none md:dark:border-none">
                <slot name="button" />
            </div>
        </div>
    </div>
</template>

<script setup>
const cartState = useCartState()
const { settings, calculateShippingCost, remainingForFreeShipping } = useSettings()

const shippingCost = computed(() => {
    return calculateShippingCost(cartState.cartTotalAmount)
})

const remainingAmount = computed(() => {
    return remainingForFreeShipping(cartState.cartTotalAmount)
})

// Test amaçlı refresh fonksiyonu
const refreshSettings = async () => {
    console.log('Ayarlar yenileniyor...')
    await settings.refreshSettings()
    console.log('Yeni shipping cost:', settings.shippingCost)
}

// Dev mode'da console'a log at
if (process.dev) {
    console.log('Current shipping cost:', settings.shippingCost)
}
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