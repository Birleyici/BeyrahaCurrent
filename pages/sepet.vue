<template>
  <div>
    <ClientOnly>
      <div>
        <div class="container">
          <UiCommonBreadcrumb class="mb-3 md:mb-6" :links="links" />

          <div v-if="cartState.cart.length > 0" class="lg:grid lg:grid-cols-3 gap-8">
            <div class="lg:col-span-2">
              <!-- Sayfa Başlığı -->
              <div class="mb-6">
                <h1 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">Sepetim</h1>
                <p class="text-neutral-600 dark:text-neutral-400">{{ cartState.cartQyt }} ürün sepetinizde</p>
              </div>

              <!-- Sepet Öğeleri -->
              <div class="space-y-4">
                <TransitionGroup name="list" tag="div" class="space-y-4">
                  <PartialsCartListBig :key="cartItem.id" :delete-cart-item="cartState.deleteCartItem" :index="index"
                    :item="cartItem" v-for="cartItem, index in cartState.cart" />
                </TransitionGroup>
              </div>
            </div>

            <!-- Sepet Özeti -->
            <div class="lg:col-span-1 mt-8 lg:mt-0">
              <PartialsCartExtre>
                <template #button>
                  <!-- Desktop Button -->
                  <div class="hidden md:block mt-2">
                    <UButton to="/auth?callback=/odeme" color="secondary" class="w-full flex justify-center font-bold"
                      size="lg" variant="solid">
                      Ödeme Yap
                    </UButton>
                  </div>
                </template>
              </PartialsCartExtre>
            </div>

            <!-- Mobile Fixed Button - Teleported to body -->
            <ClientOnly>
              <Teleport to="body">
                <div v-if="cartState.cart.length > 0"
                  class="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-800 p-4 shadow-2xl border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-between"
                  style="z-index: 999999;">
                  <!-- Toplam Tutar -->
                  <div class="flex flex-col">
                    <span class="text-sm text-neutral-500 dark:text-neutral-400">Toplam</span>
                    <span class="text-lg font-bold text-neutral-900 dark:text-neutral-100">{{
                      formatPrice(cartState.cartTotalAmount +
                        calculateShippingCost(cartState.cartTotalAmount))
                    }}</span>
                  </div>

                  <!-- Ödeme Butonu -->
                  <UButton to="/auth?callback=/odeme" color="secondary" class="flex justify-center font-bold px-6"
                    size="lg" variant="solid">
                    Ödeme Yap
                  </UButton>
                </div>
              </Teleport>
            </ClientOnly>
          </div>

          <!-- Boş Sepet -->
          <div v-else class="text-center py-16">
            <div class="max-w-md mx-auto">
              <div
                class="w-24 h-24 bg-neutral-200 dark:bg-neutral-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <UIcon name="i-heroicons-shopping-bag" class="w-12 h-12 text-neutral-400 dark:text-neutral-500" />
              </div>
              <h2 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">Sepetiniz boş</h2>
              <p class="text-neutral-600 dark:text-neutral-400 mb-8">Alışverişe başlamak için ürünleri sepete ekleyin
              </p>
              <UButton to="/" color="secondary" size="lg" class="font-bold">
                Alışverişe Başla
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- İlginizi Çekebilir -->
      <div v-if="cartState.cart.length > 0" class="section-spacing pb-20 md:pb-0">
        <UiSlidesProductSlide title="İlginizi çekebilir" id="ilginizi_cekebilir" :filters="{ piece: 8 }" />
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>

const { settings, siteName } = useSettings()

useHead({
  title: computed(() => `Sepet - ${siteName.value}`),
})

const cartState = useCartState()
const { calculateShippingCost } = useSettings()

const links = [{
  label: 'Ana Sayfa',
  to: '/'
}, {
  label: 'Sepet'
}]
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