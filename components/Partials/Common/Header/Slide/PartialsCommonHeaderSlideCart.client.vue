<template>
    <USlideover v-model="model" :ui="{ width: 'w-screen max-w-md', wrapper: 'fixed inset-0 flex z-[999999]' }">
        <div class="flex flex-col h-full">
            <!-- Header -->
            <div
                class="bg-gradient-to-r from-secondary-50 to-secondary-100 dark:from-secondary-900 dark:to-secondary-800 border-b border-secondary-200 dark:border-secondary-700 px-6 py-4 flex-shrink-0">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div
                            class="w-10 h-10 bg-secondary-500 dark:bg-secondary-600 rounded-full flex items-center justify-center">
                            <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 class="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                                Sepetim
                            </h3>
                            <p v-if="cartState.cart.length > 0" class="text-sm text-neutral-600 dark:text-neutral-400">
                                {{ cartState.cartQyt }} ürün
                            </p>
                        </div>
                    </div>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
                        class="hover:bg-white/50 dark:hover:bg-black/20 transition-colors duration-200"
                        @click="model = false" />
                </div>
            </div>

            <!-- Content -->
            <div class="flex-1 overflow-y-auto bg-neutral-50 dark:bg-neutral-900">
                <div v-if="cartState.cart.length > 0" class="p-4 space-y-4">
                    <TransitionGroup name="cart-item" tag="div" class="space-y-4">
                        <PartialsCartList :key="cartItem.id" :item="cartItem"
                            v-for="(cartItem, index) in cartState.cart" />
                    </TransitionGroup>
                </div>

                <!-- Boş Sepet -->
                <div v-else class="flex items-center justify-center p-8 h-full">
                    <div class="text-center space-y-4">
                        <div
                            class="w-20 h-20 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto">
                            <UIcon name="i-heroicons-shopping-bag"
                                class="w-10 h-10 text-neutral-400 dark:text-neutral-500" />
                        </div>
                        <div>
                            <h3 class="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2">Sepetiniz boş
                            </h3>
                            <p class="text-neutral-600 dark:text-neutral-400 text-sm">Alışverişe başlamak için ürünleri
                                sepete ekleyin</p>
                        </div>
                        <UButton @click="model = false" color="secondary" variant="outline" class="mt-4">
                            Alışverişe Başla
                        </UButton>
                    </div>
                </div>
            </div>

            <!-- Footer - Sepet Özeti -->
            <div v-if="cartState.cart.length > 0"
                class="bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 p-4 space-y-3 flex-shrink-0">
                <!-- Toplam -->
                <div class="flex justify-between items-center">
                    <span class="text-lg font-bold text-neutral-900 dark:text-neutral-100">Toplam:</span>
                    <span class="text-lg font-bold text-secondary-600 dark:text-secondary-400">
                        {{ formatPrice(cartState.cartTotalAmount) }}
                    </span>
                </div>

                <!-- Butonlar -->
                <div class="grid grid-cols-2 gap-3">
                    <UButton @click="$router.push('/sepet'); model = false" color="gray" variant="outline" size="md"
                        class="w-full flex items-center justify-center">
                        Sepeti Gör
                    </UButton>
                    <UButton @click="$router.push('/auth?callback=/odeme'); model = false" color="secondary" size="md"
                        class="w-full font-bold flex items-center justify-center">
                        Ödeme
                    </UButton>
                </div>
            </div>
        </div>
    </USlideover>
</template>

<script setup>
const cartState = useCartState();
const model = defineModel();
</script>

<style scoped>
.cart-item-enter-active,
.cart-item-leave-active {
    transition: all 0.3s ease;
}

.cart-item-enter-from,
.cart-item-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.cart-item-move {
    transition: transform 0.3s ease;
}
</style>
