<template>
    <USlideover v-model="model">
        <UCard class="flex flex-col flex-1" :ui="{
            body: { base: 'flex-1' },
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        Sepet
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="model = false" />
                </div>
            </template>
            <div>
                <div v-if="cartState.cart.length > 0" class="h-[400px] pr-6 overflow-y-scroll">
                 
                    <PartialsCartList :key="Math.random()" :item="cartItem" v-for="(cartItem, index) in cartState.cart">
                    </PartialsCartList>
                    <br> <br>
                </div>
                <p v-else class="italic">Sepette ürün bulunmuyor...</p>
                <div v-if="cartState.cart.length > 0" class="sticky bottom-0  bg-white py-2  ">
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
            </div>
        </UCard>
    </USlideover>
</template>

<script setup>
const { nextNotRegister } = defineProps(["nextNotRegister"]);
const cartState = useCartState()
const model = defineModel();


</script>