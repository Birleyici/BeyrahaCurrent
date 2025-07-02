<template>
  <div>
    <NuxtLayout name="account">
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
      <div v-else>
        <!-- Sayfa Başlığı -->
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 transition-colors duration-300">
            Siparişlerim
          </h1>
          <p class="text-neutral-600 dark:text-neutral-400 transition-colors duration-300">
            Geçmiş siparişlerinizi görüntüleyebilir ve detaylarını inceleyebilirsiniz.
          </p>
        </div>

        <!-- Siparişler -->
        <div v-if="paginatedOrders?.length" class="space-y-4">
          <PartialsOrderSummaryCard v-for="order in paginatedOrders" :key="order.id" :item="order" />
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
            Henüz sipariş vermediniz
          </h3>
          <p class="text-neutral-600 dark:text-neutral-400 mb-6 transition-colors duration-300">
            İlk siparişinizi vermek için ürünlerimizi keşfedin.
          </p>
          <UButton to="/" color="secondary" size="lg" label="Alışverişe Başla" icon="i-heroicons-arrow-right"
            trailing />
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const { siteName } = useSettings()

useHead({
  title: computed(() => `Siparişlerim - ${siteName.value}`)
})

const orderState = useOrderStoreFront()

// Loading state
const ordersLoaded = ref(false)

// Sayfalandırma için state'ler
const currentPage = ref(1)
const pageSize = 6 // Her sayfada 6 sipariş göster

// Sayfalandırılmış siparişleri hesapla
const paginatedOrders = computed(() => {
  if (!orderState.orders?.length) return []

  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return orderState.orders.slice(start, end)
})

// Siparişleri getir
const fetchOrders = async () => {
  try {
    await orderState.getOrders()
    ordersLoaded.value = true
  } catch (error) {
    console.error('Siparişler yüklenirken hata:', error)
    ordersLoaded.value = true
  }
}

// İlk yükleme
onMounted(() => {
  fetchOrders()
})
</script>
