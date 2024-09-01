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
        <PartialsCartExtre>
          <template #button>
            <div class="mt-2 bottom-0 fixed md:!relative  bg-white w-full right-0 left-0 p-2">
              <UButton to="/auth?callback=/odeme" color="orange" class="w-full flex justify-center" size="md"
                variant="solid">
                Ödeme</UButton>
            </div>
          </template>
        </PartialsCartExtre>
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
        <LazyUiSlidesProductSlide title="Bunlarda ilginizi çekebilir" :products="productState.products.data">
        </LazyUiSlidesProductSlide>
      </div>
    </ClientOnly>


  </div>
</template>

<script setup>
const cartState = useCartState()
const productState = useProductState()
const { getProducts } = useProduct()

onMounted(async () => {
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