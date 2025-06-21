<template>
  <div class="bg-neutral-50 dark:bg-neutral-900 min-h-screen transition-colors duration-300">
    <!-- Yükleniyor Durumu -->
    <div v-if="!ordersLoaded" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div
          class="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <UIcon name="i-heroicons-arrow-path"
            class="w-8 h-8 text-secondary-600 dark:text-secondary-400 animate-spin" />
        </div>
        <p class="text-lg font-medium text-neutral-600 dark:text-neutral-400">Siparişleriniz yükleniyor...</p>
      </div>
    </div>

    <!-- Ana İçerik -->
    <div v-else class="container">
      <UiCommonBreadcrumb class="mb-3 md:mb-6" :links="links" />

      <div class="lg:grid lg:grid-cols-4 gap-8">
        <!-- Sol Menü -->
        <div class="lg:col-span-1">
          <PartialsAccountMenu />
        </div>

        <!-- Ana İçerik -->
        <div class="lg:col-span-3 lg:mt-0">
          <!-- Sayfa Başlığı -->
          <div class="mb-6">
            <h1 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 transition-colors duration-300">
              Siparişlerim</h1>
            <p class="text-neutral-600 dark:text-neutral-400 transition-colors duration-300">Geçmiş siparişlerinizi
              görüntüleyebilir ve detaylarını inceleyebilirsiniz.</p>
          </div>

          <!-- Siparişler -->
          <div v-if="paginatedOrders?.length" class="space-y-6">
            <PartialsOrderItem v-for="(order, index) in paginatedOrders" :key="order.id" :item="order" :index="index">
              <!-- Adres Kartları -->
              <div class="grid md:grid-cols-2 gap-4">
                <PartialsOrderAddressCard title="Teslimat Adresi" :address="order.shipping_address || {}"
                  :address-options="{ allAction: false }" />
                <PartialsOrderAddressCard title="Fatura Adresi" :address="order.billing_address || {}"
                  :address-options="{ allAction: false }" />
              </div>
            </PartialsOrderItem>
          </div>

          <!-- Sayfalandırma -->
          <div v-if="orderState.orders?.length > pageSize" class="flex justify-center py-8">
            <UPagination v-model="currentPage" :page-count="pageSize" :total="orderState.orders?.length || 0" />
          </div>

          <!-- Boş Durum -->
          <div v-if="!orderState.orders?.length" class="text-center py-12">
            <div
              class="w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
              <UIcon name="i-heroicons-shopping-bag" class="w-12 h-12 text-neutral-400 dark:text-neutral-500" />
            </div>
            <h3 class="text-lg font-medium text-neutral-900 dark:text-neutral-100 mb-2 transition-colors duration-300">
              Henüz sipariş vermediniz</h3>
            <p class="text-neutral-600 dark:text-neutral-400 mb-6 transition-colors duration-300">İlk siparişinizi
              vermek için ürünlerimizi keşfedin.</p>
            <UButton to="/" color="secondary" size="lg" label="Alışverişe Başla" icon="i-heroicons-arrow-right"
              trailing />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { siteName } = useSettings()

useHead({
  title: computed(() => `Siparişlerim - ${siteName.value}`)
})

const orderState = useOrderStoreFront()
const ordersLoaded = ref(false)

// Sayfalandırma için state'ler
const currentPage = ref(1)
const pageSize = 5 // Her sayfada 5 sipariş göster

// Sayfalandırılmış siparişleri hesapla
const paginatedOrders = computed(() => {
  if (!orderState.orders?.length) return []

  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return orderState.orders.slice(start, end)
})

useAsyncData('siparislerimInit', async () => {
  await orderState.getOrders()
  ordersLoaded.value = true
})

const links = [{
  label: 'Ana Sayfa',
  to: '/'
}, {
  label: 'Hesabım',
  to: '/hesap'
}, {
  label: 'Siparişlerim'
}]
</script>
