<template>
  <div>
    <div class="container">
      <UiCommonBreadcrumb class="mb-6" :links="links" />

      <div class="lg:grid lg:grid-cols-4 gap-8">
        <div class="lg:col-span-1">
          <PartialsAccountMenu />
        </div>

        <div class="lg:col-span-3 lg:mt-0">
          <!-- Sayfa Başlığı -->
          <div class="mb-6">
            <h1 class="text-2xl font-bold text-neutral-900 mb-2">Adreslerim</h1>
            <p class="text-neutral-600">Kayıtlı adreslerinizi görüntüleyebilir ve yönetebilirsiniz.</p>
          </div>

          <UButton @click="orderState.isOpenAddressModal = true" color="orange" class="mb-6" size="md"
            icon="i-heroicons-plus">Yeni adres</UButton>

          <!-- Adresler -->
          <div v-if="paginatedAddresses?.length" class="grid lg:grid-cols-2 gap-6">
            <UModal v-model="orderState.isOpenAddressModal" :fullscreen="$device.isMobile">
              <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', }">
                <template #header>
                  <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                      Adres
                    </h3>
                    <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                      @click="orderState.isOpenAddressModal = false" />
                  </div>
                </template>
                <PartialsOrderAddressForm :address="orderState.newAddress"></PartialsOrderAddressForm>
              </UCard>
            </UModal>

            <div :key="address.id" v-for="address in paginatedAddresses">
              <div class="border p-4 rounded-md flex items-center w-full bg-white"
                :class="{ 'bg-tertiary-50 border-2 border-orange-500': address.isDefault }">
                <PartialsOrderAddress :address="address" :address-options="{
                  allAction: true
                }" />
              </div>
            </div>
          </div>
          <!-- Sayfalandırma -->
          <div v-if="orderState.addresses?.length > pageSize" class="flex justify-center py-8">
            <UPagination v-model="currentPage" :page-count="pageSize" :total="orderState.addresses?.length || 0" />
          </div>
          <!-- Boş Durum -->
          <!-- Boş Durum -->
          <div v-if="!orderState.addresses?.length" class="text-center py-12">
            <div class="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-heroicons-map-pin" class="w-12 h-12 text-neutral-400" />
            </div>
            <h3 class="text-lg font-medium text-neutral-900 mb-2">Henüz adres eklemediniz</h3>
            <p class="text-neutral-600 mb-6">İlk adresinizi eklemek için yukarıdaki butonu kullanın.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Adreslerim - Beyraha',
})

const orderState = useOrderStoreFront()

// Sayfalandırma için state'ler
const currentPage = ref(1)
const pageSize = 6 // Her sayfada 6 adres göster (2x3 grid)

// Sayfalandırılmış adresleri hesapla
const paginatedAddresses = computed(() => {
  if (!orderState.addresses?.length) return []

  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return orderState.addresses.slice(start, end)
})

onMounted(async () => {
  await orderState.fetchAddresses()
})

const links = [{
  label: 'Ana Sayfa',
  to: '/'
}, {
  label: 'Hesabım',
  to: '/hesap'
}, {
  label: 'Adreslerim'
}]
</script>
