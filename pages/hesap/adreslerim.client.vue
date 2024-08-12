<template>
  <div class="px-x-mobil lg:px-x-desktop my-minimal">
    <b>Adreslerim</b>

    <div class="lg:grid lg:grid-cols-4 mt-minimal lg:mt-orta gap-10">
      <div class="col-span-1">
        <PartialsAccountMenu></PartialsAccountMenu>
      </div>
      <div class="col-span-3">
        <UButton
          @click="orderState.isOpenAddressModal = true"
          color="orange"
          class="mb-minimal"
          size="md"
          icon="i-heroicons-plus"
          >Yeni adres</UButton
        >
        <div class="grid lg:grid-cols-2 gap-10">
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
       
          <div :key="address.id" v-for="address in orderState.addresses">
            <div class="border  p-minimal rounded-md flex items-center w-full"
              :class="{ 'bg-tertiary-50 border-2 border-orange-500': address.isDefault }">
              <PartialsOrderAddressCard class="!border-none" :address="address" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { useOrderState } = useStateIndex()
const orderState = useOrderState()
await orderState.fetchAddresses()
</script>
