<template>
  <div class="bg-white border border-neutral-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
    <!-- Sipariş Header -->
    <div class="bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-t-xl p-4 md:p-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <!-- Sol Taraf - Sipariş Bilgileri -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center">
              <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5 text-secondary-600" />
            </div>
            <div>
              <p class="text-sm text-neutral-600">Sipariş No</p>
              <p class="font-semibold text-neutral-900">#{{ props.item.id }}</p>
            </div>
          </div>

          <div class="hidden sm:block w-px h-8 bg-neutral-300"></div>

          <div>
            <p class="text-sm text-neutral-600">Sipariş Tarihi</p>
            <p class="font-medium text-neutral-900">{{ formatDate(props.item.created_at) }}</p>
          </div>

          <!-- Ürün Resimleri -->
          <div class="hidden sm:block w-px h-8 bg-neutral-300"></div>

          <div class="flex items-center">
            <div class="flex -space-x-2">
              <!-- İlk 3 ürün resmi -->
              <div v-for="(product, index) in displayedProducts" :key="index"
                class="relative w-8 h-8 rounded-full border-2 border-white shadow-sm overflow-hidden bg-neutral-100"
                :style="{ zIndex: 10 - index }">
                <NuxtImg v-if="product.image?.path" :src="'cl/' + product.image.path" :alt="product.name"
                  class="w-full h-full object-cover" format="webp" quality="80" :width="32" :height="32" fit="cover" />
                <img v-else class="w-full h-full object-cover" src="/img-placeholder.jpg" :alt="product.name">
              </div>

              <!-- Kalan ürün sayısı -->
              <div v-if="remainingProductCount > 0"
                class="relative w-8 h-8 rounded-full border-2 border-white shadow-sm bg-secondary-500 flex items-center justify-center"
                style="z-index: 7">
                <span class="text-xs font-medium text-white">+{{ remainingProductCount }}</span>
              </div>
            </div>

            <span class="ml-3 text-sm text-neutral-600">
              {{ totalProductCount }} ürün
            </span>
          </div>
        </div>

        <!-- Sağ Taraf - Toplam Tutar -->
        <div class="flex items-center justify-between sm:justify-end">
          <div class="text-right">
            <p class="text-sm text-neutral-600">Toplam Tutar</p>
            <p class="text-lg font-bold text-secondary-600">{{ formatPrice(props.item.total_with_shipping) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Sipariş Detayları Accordion -->
    <div class="border-t border-neutral-200">
      <UAccordion :items="[
        {
          label: 'Sipariş Detayları',
          slot: 'order-details',
          defaultOpen: props.index == 0
        }]" :ui="{
          wrapper: 'w-full',
          item: {
            base: '',
            padding: 'p-0',
            size: 'text-sm',
            color: 'text-neutral-700',
            ring: '',
            rounded: ''
          }
        }">
        <template #default="{ item, open }">
          <button
            class="w-full flex items-center justify-between p-4 md:p-6 hover:bg-neutral-50 transition-colors duration-200">
            <div class="flex items-center space-x-3">
              <UIcon name="i-heroicons-list-bullet" class="w-5 h-5 text-neutral-500" />
              <span class="font-medium text-neutral-900">{{ item.label }}</span>
            </div>
            <UIcon name="i-heroicons-chevron-down"
              class="w-5 h-5 text-neutral-500 transform transition-transform duration-200"
              :class="{ 'rotate-180': open }" />
          </button>
        </template>

        <template #order-details>
          <div class="px-4 md:px-6 pb-4 md:pb-6 space-y-4">
            <!-- Sipariş İçeriği -->
            <div v-for="subOrder in props.item.sub_orders" :key="subOrder.id" class="space-y-3">
              <PartialsOrderSummary v-for="subOrderItem in subOrder.order_items" :key="subOrderItem.id"
                :item="subOrderItem" />
            </div>

            <!-- Slot İçeriği (Adres Kartları) -->
            <div class="pt-4 border-t border-neutral-200">
              <slot />
            </div>
          </div>
        </template>
      </UAccordion>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['item', 'index'])
const orderState = useOrderManagementStore()

// Debug için sipariş verisini yazdır
console.log('Sipariş verisi:', props.item)

// Siparişteki tüm ürünleri topla
const allProducts = computed(() => {
  if (!props.item?.sub_orders) {
    return []
  }

  const products = []
  props.item.sub_orders.forEach(subOrder => {
    if (subOrder.order_items) {
      subOrder.order_items.forEach(orderItem => {
        // OrderItem'dan ürün bilgisini oluştur
        const product = {
          id: orderItem.product_id || orderItem.id,
          name: orderItem.product_name,
          image: orderItem.image
        }

        products.push(product)
      })
    }
  })

  return products
})

// Toplam ürün sayısı
const totalProductCount = computed(() => {
  return allProducts.value.length
})

// Gösterilecek ürün resimleri (en fazla 3 tane)
const displayedProducts = computed(() => {
  const maxDisplay = 3
  return allProducts.value.slice(0, maxDisplay)
})

// Kalan ürün sayısı
const remainingProductCount = computed(() => {
  const maxDisplay = 3
  const remaining = totalProductCount.value - maxDisplay
  return remaining > 0 ? remaining : 0
})
</script>