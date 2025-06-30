<template>
    <div class="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4">
        <div class="flex items-center space-x-2 mb-3">
            <UIcon name="i-heroicons-ticket" class="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">İndirim Kuponu</h3>
        </div>

        <!-- Kupon Uygulama Formu -->
        <div v-if="!cartState.hasCoupon" class="space-y-3">
            <div class="flex space-x-2">
                <UInput v-model="couponCode" placeholder="Kupon kodunu girin" :disabled="cartState.couponLoading"
                    @keypress.enter="applyCouponHandler" class="flex-1"
                    :class="cartState.couponError ? 'border-red-500 dark:border-red-400' : ''" />
                <UButton @click="applyCouponHandler" :loading="cartState.couponLoading" color="secondary"
                    variant="solid" class="px-4 py-2 whitespace-nowrap">
                    Uygula
                </UButton>
            </div>

            <!-- Hata Mesajı -->
            <div v-if="cartState.couponError"
                class="text-sm text-red-600 dark:text-red-400 flex items-center space-x-1">
                <UIcon name="i-heroicons-exclamation-triangle" class="w-4 h-4" />
                <span>{{ cartState.couponError }}</span>
            </div>


        </div>

        <!-- Uygulanan Kupon -->
        <div v-else class="space-y-3">
            <div class="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg p-3">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-2">
                        <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-600 dark:text-green-400" />
                        <div>
                            <p class="text-sm font-medium text-green-800 dark:text-green-200">
                                {{ cartState.appliedCoupon.name }}
                            </p>
                            <p class="text-xs text-green-600 dark:text-green-400">
                                Kod: {{ cartState.appliedCoupon.code }}
                            </p>
                        </div>
                    </div>
                    <UButton @click="cartState.removeCoupon" color="red" variant="ghost" size="sm"
                        icon="i-heroicons-x-mark" class="flex-shrink-0" />
                </div>

                <div class="mt-2 flex items-center justify-between text-sm">
                    <span class="text-green-700 dark:text-green-300">İndirim miktarı:</span>
                    <span class="font-semibold text-green-800 dark:text-green-200">
                        -{{ formatPrice(cartState.couponDiscount) }}
                    </span>
                </div>


            </div>
        </div>

        <!-- Loading State -->
        <div v-if="cartState.couponLoading" class="flex items-center justify-center py-4">
            <div class="flex items-center space-x-2 text-neutral-600 dark:text-neutral-400">
                <UIcon name="i-heroicons-cog-6-tooth" class="w-4 h-4 animate-spin" />
                <span class="text-sm">Kupon doğrulanıyor...</span>
            </div>
        </div>
    </div>
</template>

<script setup>
const cartState = useCartState()
const couponCode = ref('')

const applyCouponHandler = async () => {
    if (!couponCode.value) return

    const success = await cartState.applyCoupon(couponCode.value)
    if (success) {
        couponCode.value = ''
    }
}

const getCouponTypeLabel = (type) => {
    const types = {
        'fixed': 'Sabit İndirim',
        'percentage': 'Yüzde İndirim',
        'free_shipping': 'Ücretsiz Kargo'
    }
    return types[type] || type
}

// Sayfa yüklendiğinde mevcut kuponu kontrol et
onMounted(() => {
    if (cartState.appliedCoupon) {
        cartState.validateCurrentCoupon()
    }
})
</script>

<style scoped>
/* Custom focus styles */
.focus\:border-secondary-500:focus {
    border-color: rgb(var(--color-secondary-500));
}
</style>