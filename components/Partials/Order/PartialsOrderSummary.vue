<template>
  <div class="bg-white border border-neutral-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
    <!-- Ürün Bilgileri -->
    <div class="flex flex-col md:flex-row md:items-center gap-4">
      <!-- Ürün Resmi -->
      <div class="flex-shrink-0">
        <div class="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-neutral-100">
          <NuxtImg v-if="props.item.image?.path" :src="'cl/' + props.item.image?.path" :alt="props.item.product_name"
            class="w-full h-full object-cover" format="webp" quality="80" :width="80" :height="80" fit="cover" />
          <img v-else class="w-full h-full object-cover" src="/img-placeholder.jpg" :alt="props.item.product_name">
        </div>
      </div>

      <!-- Ürün Detayları -->
      <div class="flex-1 min-w-0">
        <div class="space-y-2">
          <!-- Ürün Adı -->
          <h4 class="font-medium text-neutral-900 truncate">
            <NuxtLink v-if="props.item.slug" :to="props.item.slug"
              class="hover:text-secondary-600 transition-colors duration-200">
              {{ props.item.product_name }}
            </NuxtLink>
            <span v-else>{{ props.item.product_name }}</span>
          </h4>

          <!-- Varyasyon Bilgileri -->
          <div v-if="props.item.variation?.terms" class="space-y-1">
            <div v-for="(value, key) in props.item.variation.terms" :key="key"
              class="flex items-center text-sm text-neutral-600">
              <span class="font-medium min-w-0 mr-2">{{ key }}:</span>
              <span class="text-neutral-800">{{ value }}</span>
            </div>
          </div>

          <!-- Özel Input'lar -->
          <div v-if="props.item.order_item_inputs?.length" class="space-y-2">
            <div v-for="input in props.item.order_item_inputs" :key="input.id" class="flex items-center gap-2 text-sm">
              <span class="font-medium text-neutral-600 min-w-0">{{ input.label }}:</span>
              <span v-if="!props.editingMode" class="text-neutral-800">{{ input.value }}</span>
              <div v-else class="flex items-center gap-2">
                <UInput v-model="input.new_value" :model-value="input.new_value || input.value" size="xs"
                  class="w-24" />
                <UButton :loading="input.loading" icon="i-heroicons-check" @click="orderStore.saveInput(input)"
                  size="xs" color="green" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Fiyat Bilgileri -->
      <div class="flex-shrink-0">
        <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <!-- Birim Fiyat -->
          <div class="text-center md:text-right">
            <p class="text-xs text-neutral-500 mb-1">Birim Fiyat</p>
            <div class="flex items-center justify-center md:justify-end gap-1">
              <PartialsProductPrice :del-price="false" type="card"
                :price="props.item.variation?.price || props.item.price"
                :sale-price="props.item.variation?.sale_price || props.item.sale_price" />
              <span class="text-sm text-neutral-600">× {{ props.item.quantity }}</span>
            </div>
          </div>

          <!-- Toplam Fiyat -->
          <div class="text-center md:text-right">
            <p class="text-xs text-neutral-500 mb-1">Toplam</p>
            <p class="text-lg font-semibold text-secondary-600">
              {{ formatPrice(props.item.price * props.item.quantity) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Silme Butonu (Düzenleme Modunda) -->
    <div v-if="props.deletable && props.editingMode" class="mt-3 pt-3 border-t border-neutral-200">
      <div class="flex justify-end">
        <UButton @click="deleteCartItem(props.item.id)" icon="i-heroicons-trash" size="xs" color="red" variant="soft"
          label="Kaldır" />
      </div>
    </div>
  </div>
</template>

<script setup>
const orderStore = useOrderManagementStore()
const props = defineProps(['item', 'deletable', 'editingMode'])

const deleteCartItem = async (itemId) => {
  if (await useConfirmation("İşlem Onayı", "Sipariş öğesini silmek istediğinize emin misiniz?")) {
    await orderStore.deleteSubOrderItem(itemId)
  }
}
</script>
