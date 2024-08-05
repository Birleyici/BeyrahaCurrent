<template>
  <div class="px-x-mobil lg:px-x-desktop">
    <div class="lg:grid lg:grid-cols-3 gap-16">
      <div class="col-span-2 my-minimal">
        <div class="text-center lg:text-left">
          <b>Sipariş oluştur</b>
        </div>
        <div class="border rounded-md mt-minimal">
          <TransitionGroup name="fade">
          
            <div :key="address.id" v-for="address in orderState.addressList"
              class="bg-tertiary-50 border border-orange-500 p-minimal rounded-md flex items-center w-full">
              <UiFormRadio v-model="orderState.orderOptions.selectedAddress" value="address1" id="address"
                name="address">
                <PartialsOrderAddressCard class="!border-none" :address="address" />
              </UiFormRadio>
            </div>
          </TransitionGroup>

          <div class="flex justify-between ">
            <div class="flex h-full items-center space-x-2 text-secondary-500 text-sm">
              <button v-if="isShowNewAddressButton" @click="orderState.isOpenAddressModal = true"
                class="flex h-full items-center font-semibold p-3">
                Yeni adres
                <Icon name="mdi:plus" class="font-semibold w-4 h-4"></Icon>
              </button>
            </div>
            <div v-if="orderState.addresses?.length > 2" class="flex justify-center space-x-2 items-center">
              <button @click="orderState.orderOptions.isOpenOtherAddress = !orderState.orderOptions.isOpenOtherAddress"
                class="text-sm font-medium p-3 h-full">
                Diğer adresleri {{ !orderState.orderOptions.isOpenOtherAddress ? "gör" : "kapat" }}
                <Icon v-if="orderState.orderOptions.isOpenOtherAddress" name="material-symbols:keyboard-arrow-up"
                  class="font-medium w-5 h-5">
                </Icon>
                <Icon v-else name="material-symbols:keyboard-arrow-down" class="font-medium w-5 h-5"></Icon>
              </button>
            </div>
          </div>
        </div>
        <div class="my-orta">
          <b>Ödeme yöntemleri</b>
          <div class="my-minimal space-y-4">
            <div class="border rounded-md duration-300"
              :class="orderState.orderOptions.selectedPaymentMethod == 'bacs' && 'bg-slate-50  duration-300 border border-orange-500'">
              <UiFormRadio label-class="p-minimal" v-model="orderState.orderOptions.selectedPaymentMethod" value="bacs"
                id="bacs" name="paymentMethod">
                <div class="ml-2">
                  <b>Havale / EFT ile ödeme</b>
                  <p>
                    Sipariş onay ekranında verilecek banka bilgilerine sipariş toplam
                    tutarını havale veya EFT yoluyla gönderebilirsiniz.
                  </p>
                </div>
              </UiFormRadio>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-1">
        <div class="sticky top-4 w-full">
          <PartialsCartExtre>
            <template #button>
              <UiButtonsBaseButton @click="orderState.createOrder()" color="secondary" class="font-semibold px-8 w-full">Siparişi Onayla
              </UiButtonsBaseButton>
            </template>
          </PartialsCartExtre>
        </div>
      </div>
    </div>

    <UModal v-model="orderState.isOpenAddressModal" :fullscreen="$device.isMobile">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Adres
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="orderState.isOpenAddressModal = false" />
          </div>
        </template>
        <PartialsOrderAddressForm></PartialsOrderAddressForm>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
const { useOrderState } = useStateIndex()
const orderState = useOrderState()
const mainState = useNuxtApp().$mainState

const isShowNewAddressButton = computed(() => {
  return (!mainState.isAuthenticate && orderState.addresses.length == 0) || mainState.isAuthenticate
})

</script>


<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>