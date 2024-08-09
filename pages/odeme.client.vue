<template>
  <div class="px-x-mobil lg:px-x-desktop">
    <div class="lg:grid lg:grid-cols-3 gap-16">
      <div class="col-span-2 my-minimal">
        <div class="text-center lg:text-left">
          <b>Sipariş oluştur</b>
        </div>
        <div class="border rounded-md mt-minimal">
          <Transition name="fade">
            <div v-if="orderState.getDefaultAddress"
              class="bg-tertiary-50 border border-orange-500 p-minimal rounded-md flex items-center w-full">
              <PartialsOrderAddressCard class="!border-none" :address="orderState.getDefaultAddress" />
            </div>
          </Transition>

          <div class="flex justify-between ">
            <div class="flex h-full items-center space-x-2 text-secondary-500 text-sm">
              <button v-if="isShowNewAddressButton" @click="orderState.isOpenAddressModal = true"
                class="flex h-full items-center font-semibold p-3">
                Yeni adres
                <Icon name="mdi:plus" class="font-semibold w-4 h-4"></Icon>
              </button>
            </div>
            <div v-if="orderState.addresses?.length > 1" class="flex justify-center space-x-2 items-center">
              <UButton @click="orderState.openAllAddressModal = true" variant="link" color="orange"
                class="text-sm font-medium p-3 h-full">
                Diğer adresler
              </UButton>
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
              <UiButtonsBaseButton @click="orderState.createOrder()" color="secondary"
                class="font-semibold px-8 w-full">Siparişi Onayla
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

    <UModal v-model="orderState.openAllAddressModal" :fullscreen="$device.isMobile">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800 ' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Adresler
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="orderState.openAllAddressModal = false" />
          </div>
        </template>

        <div class="h-[400px] overflow-y-scroll relative pr-4">

          <div :key="address.id" v-for="address in orderState.addresses">
            <div class="border my-2 p-minimal rounded-md flex items-center w-full"
              :class="{ 'bg-tertiary-50 border border-orange-500': address.isDefault }">
              <PartialsOrderAddressCard class="!border-none" :address="address" />
            </div>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
const { useOrderState } = useStateIndex()
const orderState = useOrderState()
const mainState = useNuxtApp().$mainState

const isShowNewAddressButton = computed(() => {
  return (!mainState.isAuthenticate && orderState.addresses.length == 0) || mainState.isAuthenticated
})

onMounted(async () => {

  await orderState.fetchAddresses()

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