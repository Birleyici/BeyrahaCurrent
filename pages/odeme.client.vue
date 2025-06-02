<template>
  <div class="standart-section-spacing !mt-0 pb-20 md:pb-0">
    <div class="container">
      <!-- Breadcrumb -->
      <UiCommonBreadcrumb class="mb-6" :links="links" />

      <!-- Sayfa Başlığı -->
      <div class="mb-8">
        <h1 class="text-2xl lg:text-3xl font-bold text-neutral-900 mb-2">Ödeme</h1>
        <p class="text-neutral-600">Sipariş bilgilerinizi kontrol edin ve ödeme yöntemini seçin</p>
      </div>

      <div class="lg:grid lg:grid-cols-3 gap-8">
        <!-- Sol Taraf - Sipariş Formu -->
        <div class="lg:col-span-2 space-y-8" v-if="isLoaded">
          <!-- Teslimat Adresi -->
          <div class="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
                <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-secondary-600" />
              </div>
              <h2 class="text-lg font-semibold text-neutral-900">Teslimat Adresi</h2>
            </div>

            <!-- Varsayılan Adres -->
            <div v-if="orderState.defaultAddress"
              class="bg-secondary-50 border border-secondary-200 rounded-lg p-4 mb-4">
              <PartialsOrderAddress :addressOptions="{ edit: true }" :address="orderState.defaultAddress" />
            </div>

            <!-- Adres Butonları -->
            <div class="flex flex-col sm:flex-row gap-3">
              <UButton v-if="isShowNewAddressButton" @click="orderState.isOpenAddressModal = true" color="secondary"
                variant="outline" icon="i-heroicons-plus" class="flex-1 sm:flex-none">
                Yeni Adres Ekle
              </UButton>

              <UButton v-if="orderState.addresses?.length > 1 && authStore.token"
                @click="orderState.openAllAddressModal = true" color="gray" variant="outline"
                icon="i-heroicons-list-bullet" class="flex-1 sm:flex-none">
                Diğer Adresler
              </UButton>
            </div>
          </div>

          <!-- Ödeme Yöntemleri -->
          <div class="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <UIcon name="i-heroicons-credit-card" class="w-5 h-5 text-green-600" />
              </div>
              <h2 class="text-lg font-semibold text-neutral-900">Ödeme Yöntemi</h2>
            </div>

            <!-- Havale/EFT Seçeneği -->
            <div class="border rounded-lg transition-all duration-200 hover:border-secondary-300"
              :class="orderState.orderOptions.selectedPaymentMethod == 'bacs' ? 'bg-secondary-50 border-secondary-300' : 'border-neutral-200'">
              <label class="flex items-start space-x-4 p-4 cursor-pointer">
                <URadio v-model="orderState.orderOptions.selectedPaymentMethod" value="bacs" name="paymentMethod"
                  class="mt-1" />
                <div class="flex-1">
                  <div class="flex items-center space-x-2 mb-2">
                    <UIcon name="i-heroicons-building-library" class="w-5 h-5 text-neutral-600" />
                    <h3 class="font-semibold text-neutral-900">Havale / EFT ile Ödeme</h3>
                  </div>
                  <p class="text-sm text-neutral-600 leading-relaxed">
                    Sipariş onay ekranında verilecek banka bilgilerine sipariş toplam tutarını
                    havale veya EFT yoluyla gönderebilirsiniz.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-else class="lg:col-span-2 space-y-8">
          <div class="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <div class="space-y-4">
              <USkeleton class="h-6 w-32" />
              <USkeleton class="h-32 w-full" />
              <div class="flex gap-3">
                <USkeleton class="h-10 w-32" />
                <USkeleton class="h-10 w-32" />
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <div class="space-y-4">
              <USkeleton class="h-6 w-32" />
              <USkeleton class="h-24 w-full" />
            </div>
          </div>
        </div>

        <!-- Sağ Taraf - Sipariş Özeti -->
        <div class="lg:col-span-1 mt-8 lg:mt-0">
          <div v-if="isLoaded" class="sticky top-4">
            <PartialsCartExtre>
              <template #button>
                <!-- Desktop Button -->
                <div class="hidden md:block">
                  <UButton :loading="orderState.createOrderLoading" @click="orderState.createOrder()" color="secondary"
                    class="font-bold w-full flex justify-center" size="lg">
                    Siparişi Onayla
                  </UButton>
                </div>
              </template>
            </PartialsCartExtre>
          </div>
          <div v-else class="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
            <USkeleton class="h-48 w-full" />
            <USkeleton class="h-12 w-full mt-4" />
          </div>
        </div>
      </div>

      <!-- Mobile Fixed Button - Teleported to body -->
      <ClientOnly>
        <Teleport to="body">
          <div v-if="isLoaded"
            class="md:hidden fixed bottom-0 left-0 right-0 bg-white p-4 shadow-2xl border-t border-neutral-200 flex items-center justify-between"
            style="z-index: 999;">
            <!-- Toplam Tutar -->
            <div class="flex flex-col">
              <span class="text-sm text-neutral-500">Toplam</span>
              <span class="text-lg font-bold text-neutral-900">{{ formatPrice(cartState.cartTotalAmount + shippingCost)
              }}</span>
            </div>

            <!-- Siparişi Onayla Butonu -->
            <UButton :loading="orderState.createOrderLoading" @click="orderState.createOrder()" color="secondary"
              class="flex justify-center font-bold px-6" size="lg" variant="solid">
              Siparişi Onayla
            </UButton>
          </div>
        </Teleport>
      </ClientOnly>
    </div>

    <!-- Yeni Adres Modalı -->
    <UModal v-model="orderState.isOpenAddressModal" :fullscreen="$device.isMobile" :prevent-close="true" :ui="{
      wrapper: 'fixed inset-0 z-[9999999] overflow-y-auto',
      overlay: { base: 'fixed inset-0 transition-opacity z-[9999998]' },
      container: 'flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 z-[9999999]',
      base: 'relative text-left rtl:text-right flex flex-col z-[9999999]'
    }">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-neutral-900">
              Yeni Adres Ekle
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
              @click="orderState.isOpenAddressModal = false" />
          </div>
        </template>
        <PartialsOrderAddressForm />
      </UCard>
    </UModal>

    <!-- Tüm Adresler Modalı -->
    <UModal v-model="orderState.openAllAddressModal" :fullscreen="$device.isMobile" :prevent-close="true" :ui="{
      wrapper: 'fixed inset-0 z-[9999999] overflow-y-auto',
      overlay: { base: 'fixed inset-0 transition-opacity z-[9999998]' },
      container: 'flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 z-[9999999]',
      base: 'relative text-left rtl:text-right flex flex-col z-[9999999]'
    }">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold text-neutral-900">
                Kayıtlı Adreslerim
              </h3>
              <p class="text-sm text-neutral-500 mt-1">
                {{ paginatedAddresses.length }} / {{ orderState.addresses?.length || 0 }} adres gösteriliyor
              </p>
            </div>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
              @click="orderState.openAllAddressModal = false" />
          </div>
        </template>

        <div class="p-4">
          <!-- Adres Listesi -->
          <div class="max-h-96 overflow-y-auto space-y-4">
            <div v-if="paginatedAddresses.length === 0" class="text-center py-8">
              <UIcon name="i-heroicons-map-pin" class="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <p class="text-neutral-600">
                Henüz kayıtlı adresiniz yok
              </p>
            </div>

            <div v-for="address in paginatedAddresses" :key="address.id">
              <div class="border rounded-lg p-4 transition-all duration-200"
                :class="address.isDefault ? 'bg-secondary-50 border-secondary-300' : 'border-neutral-200 hover:border-neutral-300'">
                <PartialsOrderAddress :address-options="{ allAction: true }" :address="address" />
              </div>
            </div>
          </div>

          <!-- Sayfalama -->
          <div v-if="totalPages > 1"
            class="flex justify-center items-center space-x-2 mt-6 pt-4 border-t border-neutral-200">
            <UButton :disabled="currentPage === 1" @click="currentPage--" color="gray" variant="outline" size="sm">
              <UIcon name="i-heroicons-chevron-left" />
            </UButton>

            <div class="flex space-x-1">
              <UButton v-for="page in visiblePages" :key="page" @click="currentPage = page"
                :variant="currentPage === page ? 'solid' : 'outline'"
                :color="currentPage === page ? 'secondary' : 'gray'" size="sm">
                {{ page }}
              </UButton>
            </div>

            <UButton :disabled="currentPage === totalPages" @click="currentPage++" color="gray" variant="outline"
              size="sm">
              <UIcon name="i-heroicons-chevron-right" />
            </UButton>
          </div>

          <!-- Sayfa Bilgisi -->
          <div v-if="totalPages > 1" class="text-center text-sm text-neutral-500 mt-3">
            Sayfa {{ currentPage }} / {{ totalPages }}
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
useHead({
  title: 'Ödeme - Beyraha',
})

const orderState = useOrderStoreFront()
const authStore = useAuthStore()
const cartState = useCartState()

const shippingCost = computed(() => {
  return cartState.cartTotalAmount > 1000 ? 0 : 60
})

const links = [{
  label: 'Ana sayfa',
  to: '/'
}, {
  label: 'Sepet',
  to: '/sepet'
}, {
  label: 'Ödeme'
}]

const isShowNewAddressButton = computed(() => {
  return (!authStore.token && orderState.addresses.length == 0) || authStore.token
})

const isLoaded = ref(false)

// Adres modal sayfalama
const currentPage = ref(1)
const itemsPerPage = 5

// Sayfalanmış adresler
const paginatedAddresses = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return orderState.addresses.slice(start, end)
})

// Toplam sayfa sayısı
const totalPages = computed(() => {
  return Math.ceil(orderState.addresses.length / itemsPerPage)
})

// Görünür sayfa numaraları
const visiblePages = computed(() => {
  const current = currentPage.value
  const total = totalPages.value
  const pages = []

  if (total <= 5) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, 4, 5)
    } else if (current >= total - 2) {
      pages.push(total - 4, total - 3, total - 2, total - 1, total)
    } else {
      pages.push(current - 2, current - 1, current, current + 1, current + 2)
    }
  }

  return pages
})

onMounted(async () => {
  await orderState.fetchAddresses()
  isLoaded.value = true
})


// onBeforeRouteLeave((to, from, next) => {
//   if (orderState.openAllAddressModal) {
//     orderState.openAllAddressModal = false
//     next(false) // Geri gitme işlemini durdurur
//   } else {
//     next()
//   }
// })

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