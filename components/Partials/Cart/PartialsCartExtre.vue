<template>
    <div class="lg:col-span-1 w-full lg:grid gap-2">
        <div class="w-full">
            <div class="sticky top-4 w-full z-[2]">
                <div class="bg-tertiary-50 w-full rounded-md p-minimal space-y-3">
                    <b>Sipariş özeti</b>

                    <div class="flex justify-between">
                        <p>Ürün toplam:</p>
                        <p class="text-secondary-500 ">{{ formatPrice(cartState.cartTotalAmount) }}</p>
                    </div>
                    <div class="flex justify-between pb-2">
                        <p>Kargo ücreti:</p>
                        <p class="text-medium text-secondary-500 ">
                            {{ shippingCost == 0 ? 'Ücretsiz' : formatPrice(shippingCost) }}
                        </p>
                    </div>
                    <UDivider type="dashed"></UDivider>
                    <div class="flex justify-between space-x-4 text-lg">
                        <p>Toplam:</p>
                        <Transition name="slide-up" mode="out-in">
                            <p class="text-secondary-500 font-bold" :key="cartState.cartTotalAmount">{{
                                formatPrice(cartState.cartTotalAmount + shippingCost) }}</p>
                        </Transition>

                    </div>
                </div>
                <div class="mt-4 bottom-0 fixed md:!relative  bg-white w-full right-0 left-0 p-2 md:p-0">
                    <slot name="button" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const cartState = useStateIndex().useCartState()
const shippingCost = computed(() => {
  return cartState.cartTotalAmount > 1000 ? 0 : 60
})
</script>