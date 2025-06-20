<template>
  <div class="bg-neutral-50 dark:bg-neutral-900 min-h-screen transition-colors duration-300">
    <div class="container mx-auto px-4 py-6">
      <!-- Breadcrumb -->
      <div class="mb-6">
        <UBreadcrumb :links="links" class="mb-4" />

        <!-- Sayfa Başlığı -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Sipariş Detayı
            </h1>
            <p class="text-neutral-600 dark:text-neutral-400">
              Sipariş #{{ orderId }} - {{ formatDate(orderState.vendorOrder?.created_at) }}
            </p>
          </div>

          <!-- Düzenleme Modu Toggle -->
          <div
            class="flex items-center space-x-3 bg-white dark:bg-neutral-800 rounded-xl p-3 border border-neutral-200 dark:border-neutral-700 shadow-sm">
            <UIcon name="i-heroicons-pencil-square" class="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Düzenleme modu:</span>
            <UToggle v-model="editingMode" />
          </div>
        </div>
      </div>

      <div class="space-y-8">
        <!-- Sipariş Durumu ve Adres Bilgileri -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Adres Kartları -->
          <div class="lg:col-span-2 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PartialsOrderAddressCard :address-options="{ editMode: editingMode }"
                :save-function="orderState.saveAddress" title="Teslimat Adresi"
                :address="order.shipping_address || {}" />
              <PartialsOrderAddressCard v-if="isAddressesDifferent" :address-options="{ editMode: editingMode }"
                :save-function="orderState.saveAddress" title="Fatura Adresi" :address="order.billing_address || {}" />
            </div>
          </div>

          <!-- Sipariş Durumu Kartı -->
          <div class="lg:col-span-1">
            <div
              class="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 shadow-sm hover:shadow-md transition-shadow duration-300 h-fit sticky top-6">
              <!-- Başlık -->
              <div class="flex items-center space-x-3 mb-6">
                <div class="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                  <UIcon name="i-heroicons-clipboard-document-check"
                    class="w-4 h-4 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Sipariş Durumu</h3>
              </div>

              <!-- Durum Badge -->
              <div class="mb-6">
                <label class="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2 block">Mevcut
                  Durum</label>
                <UBadge :ui="{ rounded: 'rounded-full' }" :color="badge.color" size="lg" class="px-4 py-2">
                  {{ badge.text }}
                </UBadge>
              </div>

              <!-- Kargo Kodu Bildirimi -->
              <div v-if="orderState.vendorOrder.shipping_code" class="mb-6">
                <div
                  class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div class="flex items-start space-x-3">
                    <UIcon name="i-heroicons-truck" class="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                    <div>
                      <h4 class="text-sm font-medium text-green-900 dark:text-green-100 mb-1">Kargo Takip Kodu</h4>
                      <p
                        class="text-sm text-green-700 dark:text-green-300 font-mono bg-green-100 dark:bg-green-800 px-2 py-1 rounded">
                        {{ orderState.vendorOrder.shipping_code }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Aksiyon Butonları -->
              <div class="space-y-3">
                <UButton v-if="orderState.vendorOrder.status == 'processing'"
                  @click="orderState.getShippingCode(orderState.vendorOrder)"
                  :loading="orderState.vendorOrder.shippingLoading" color="secondary" variant="soft" size="lg" block
                  icon="i-heroicons-truck">
                  Kargo Kodu Al
                </UButton>

                <UButton v-if="orderState.vendorOrder.status == 'pending'"
                  @click="orderState.updateStatus(orderState.vendorOrder, 'processing')"
                  :loading="orderState.vendorOrder.loadingState === 'processing'" color="primary" size="lg" block
                  icon="i-heroicons-check-circle">
                  Siparişi Onayla
                </UButton>

                <UButton
                  v-if="orderState.vendorOrder.status == 'processing' || orderState.vendorOrder.status == 'pending'"
                  @click="cancelHandling()" :loading="orderState.vendorOrder.loadingState === 'cancelled'" color="red"
                  variant="soft" size="lg" block icon="i-heroicons-x-circle">
                  Siparişi İptal Et
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <!-- Sipariş İçeriği -->
        <div
          class="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 shadow-sm">
          <!-- Başlık -->
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 bg-secondary-100 dark:bg-secondary-900 rounded-full flex items-center justify-center">
                <UIcon name="i-heroicons-shopping-bag" class="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Sipariş İçeriği</h3>
            </div>
          </div>

          <!-- Ürün Listesi -->
          <div class="space-y-4">
            <PartialsOrderSummary v-for="item in orderState.vendorOrder.order_items || []" :key="item.id"
              :editing-mode="editingMode" :deletable="true" :item="item" />
          </div>
        </div>

        <!-- Sipariş Özeti -->
        <div
          class="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 shadow-sm">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <UIcon name="i-heroicons-calculator" class="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Ödeme Özeti</h3>
          </div>

          <div class="max-w-md ml-auto space-y-4">
            <div class="flex justify-between items-center py-2 border-b border-neutral-200 dark:border-neutral-700">
              <span class="text-neutral-600 dark:text-neutral-400">Ödeme Yöntemi:</span>
              <span class="font-medium text-secondary-600 dark:text-secondary-400">Havale / EFT</span>
            </div>

            <div class="flex justify-between items-center py-2 border-b border-neutral-200 dark:border-neutral-700">
              <span class="text-neutral-600 dark:text-neutral-400">Kargo:</span>
              <span class="font-medium text-green-600 dark:text-green-400">Ücretsiz</span>
            </div>

            <div
              class="flex justify-between items-center py-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg px-4">
              <span class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Genel Toplam:</span>
              <span class="text-xl font-bold text-secondary-600 dark:text-secondary-400">
                {{ formatPrice(orderState.vendorOrder.subtotal) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Ürün Ekleme Modalı -->
    <UModal v-model="isOpenAddProductModal">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Ürün Ekle
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid"
              @click="isOpenAddProductModal = false" />
          </div>
        </template>

        <div class="p-4 h-72 flex items-center justify-center">
          <p class="text-neutral-500 dark:text-neutral-400">Ürün ekleme özelliği yakında gelecek...</p>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
const route = useRoute()
definePageMeta({
  layout: "admin",
});
const orderId = route.params.id
const orderState = useOrderManagementStore();
const editingMode = ref(false)
const isOpenAddProductModal = ref(false)

const badge = computed(() => {
  return orderState.statuses[orderState.vendorOrder.status] || { color: 'gray', text: 'Bilinmeyen' };
});


await useAsyncData('orderInManagement', async () => {
  await orderState.fetchVendorOrder(orderId)
  return true
})

const order = orderState.vendorOrder?.order
const isAddressesDifferent = computed(() => {
  return order.shipping_address.id !== order.billing_address.id
})

const links = [{
  label: 'Siparişler',
  icon: 'i-heroicons-squares-2x2',
  to: '/management/siparisler'
}, {
  label: 'Sipariş #' + orderId,
  icon: 'i-heroicons-squares-plus'
}]

const cancelHandling = async () => {

  if (await useConfirmation("İşlem Onayı", "Siparişi iptal etmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) {
    orderState.updateStatus(orderState.vendorOrder, 'cancelled')
  }
}

</script>