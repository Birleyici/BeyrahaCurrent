<template>
    <USlideover v-model="model">
        <div class="bg-white w-full px-2 py-4">
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Sepet
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="model = false" />
                </div>
        </div>
       
        <div class="w-full h-screen overflow-y-scroll p-2">
            <!-- Scrollable area -->
            <div v-if="cartState.cart.length > 0" class="overflow-y-auto">
                <div>
                    <PartialsCartList :key="Math.random()" :item="cartItem"
                        v-for="(cartItem, index) in cartState.cart" />
                </div>
            </div>
            <p v-else class="italic">Sepette ürün bulunmuyor...</p>
        </div>

        <div class="bg-white p-2">
            <UDivider icon="i-heroicons-shopping-cart" type="dashed" />
            <div class="grid grid-cols-2">
                <div class="flex justify-between">
                    <b>Toplam</b>
                    <span>:</span>
                </div>
                <div class="flex justify-end">
                    <p class="text-secondary-500 font-bold">{{ formatPrice(cartState.cartTotalAmount) }}</p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-2 mt-2">
                <nuxt-link to="/sepet">
                    <UiButtonsBaseButton class="w-full" color="slate">Sepete Git</UiButtonsBaseButton>
                </nuxt-link>
                <UButton to="/auth?callback=/odeme" color="orange" class="w-full flex justify-center" size="md"
                    variant="solid">
                    Ödeme</UButton>
            </div>
        </div>
    </USlideover>
</template>

<script setup>
const { nextNotRegister } = defineProps(["nextNotRegister"]);
const cartState = useCartState();
const model = defineModel();
</script>
