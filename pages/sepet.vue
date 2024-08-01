<template>
  <div class="px-x-mobil lg:px-x-desktop">
    <ClientOnly>
    <p class="text-center font-semibold lg:text-left">Sepet</p>
      <div v-if="cartState.cart.length > 0" class="lg:grid lg:grid-cols-3 gap-10">
        <div class="col-span-2">
          <TransitionGroup name="list" tag="div">
            <PartialsCartListBig :key="cartItem" :delete-cart-item="cartState.deleteCartItem" :index="index"
              :item="cartItem" v-for="cartItem, index in cartState.cart" />
          </TransitionGroup>

        </div>
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
              <div class="mt-2 bottom-0 fixed md:!relative  bg-white w-full right-0 left-0 p-2">
                <UiButtonsBaseButton color="secondary" class="font-semibold px-8 w-full">Ödeme</UiButtonsBaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="italic h-44 my-4 rounded-md border p-1  border-dashed">
        <div class="text-center bg-slate-50 w-full h-full rounded-md flex items-center justify-center">
          <div>
            <b class="font-normal text-2xl">:(</b>
            <p>Sepette ürün bulunmuyor...</p>
          </div>
        </div>
      </div>
 
    <div class="my-maximal">
      <LazyUiSlidesProductSlide title="Bunlarda ilginizi çekebilir" :products="productState.products">
      </LazyUiSlidesProductSlide>
    </div>
  </ClientOnly>
  </div>
</template>

<script setup>
const { useCartState, useProductState } = useStateIndex()
const cartState = useCartState()
const productState = useProductState()
const { getProducts } = useProduct()
const shippingCost = computed(() => {
  return cartState.cartTotalAmount > 1000 ? 0 : 60
})
onMounted(() => {
  getProducts({ piece: 7 })
})

</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>