<template>
  <div
    class="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 lg:p-6 hover:shadow-soft dark:hover:shadow-lg transition-all duration-200">
    <!-- Ana İçerik -->
    <div class="flex flex-col lg:flex-row gap-4">
      <!-- Ürün Resmi -->
      <div class="flex-shrink-0">
        <div
          class="w-[100px] h-[150px] lg:w-[120px] lg:h-[180px] rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-700 ring-1 ring-neutral-200 dark:ring-neutral-600">
          <NuxtImg v-if="props.item.image?.path" :src="'cl/' + props.item.image?.path" :alt="props.item.product_name"
            class="w-[120px] h-[180px] object-cover object-top" format="webp" quality="80" :width="70" :height="100"
            fit="cover" />
          <div v-else class="w-full h-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-700">
            <UIcon name="i-heroicons-photo" class="w-8 h-8 text-neutral-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>

      <!-- Ürün Bilgileri -->
      <div class="flex-1 min-w-0">
        <div class="space-y-3">

          <!-- Ürün Adı -->
          <div>
            <h4 class="font-semibold text-neutral-900 dark:text-neutral-100 text-base lg:text-lg leading-tight">
              <NuxtLink v-if="props.item.slug" :to="props.item.slug"
                class="hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors duration-200">
                {{ props.item.product_name }}
              </NuxtLink>
              <span v-else>{{ props.item.product_name }}</span>
            </h4>
          </div>

          <!-- Varyasyon Bilgileri -->
          <div v-if="props.item.variation?.terms" class="flex flex-wrap gap-2">
            <div v-for="(value, key) in props.item.variation.terms" :key="key" class="inline-flex items-center gap-2">
              <span
                class="inline-flex items-center px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                {{ key }}
              </span>
              <span class="text-sm font-medium text-neutral-900 dark:text-neutral-100">{{ value }}</span>
            </div>
          </div>

          <!-- Özel Input'lar -->
          <div v-if="props.item.order_item_inputs?.length" class="space-y-2">
            <div v-for="input in props.item.order_item_inputs" :key="input.id"
              class="bg-neutral-50 dark:bg-neutral-700 rounded-lg p-3">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-x-4 gap-y-1">
                <span class="text-xs font-medium text-neutral-500 dark:text-neutral-400 flex-shrink-0">{{ input.label
                }}:</span>
                <div v-if="!props.editingMode" class="text-xs text-neutral-700 dark:text-neutral-300 cursor-pointer"
                  tabindex="0" @click="toggleExpand(input.id)" @blur="collapseInput(input.id)">
                  <template v-if="isExpanded(input.id)">
                    {{ input.value }}
                  </template>
                  <template v-else>
                    {{ truncatedValue(input.value) }}
                    <span v-if="input.value && input.value.length > 15" class="text-sky-500 font-semibold"> ...</span>
                  </template>
                </div>
                <div v-else class="flex items-center gap-2">
                  <UInput v-model="input.new_value" :model-value="input.new_value || input.value" size="sm"
                    class="w-32" />
                  <UButton :loading="input.loading" icon="i-heroicons-check" @click="orderStore.saveInput(input)"
                    size="sm" color="green" variant="soft" />
                </div>
              </div>
            </div>
          </div>

          <!-- Mobilde Fiyat Bilgileri -->
          <div class="lg:hidden space-y-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
            <!-- Miktar -->
            <div class="flex items-center justify-between">
              <span class="text-sm text-neutral-600 dark:text-neutral-400">Miktar:</span>
              <div class="inline-flex items-center gap-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg px-3 py-1">
                <UIcon name="i-heroicons-cube" class="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">{{ props.item.quantity }}
                  adet</span>
              </div>
            </div>

            <!-- Birim Fiyat -->
            <div class="flex items-center justify-between">
              <span class="text-sm text-neutral-600 dark:text-neutral-400">Birim Fiyat:</span>
              <PartialsProductPrice :del-price="false" type="card"
                :price="props.item.variation?.price || props.item.price"
                :sale-price="props.item.variation?.sale_price || props.item.sale_price" />
            </div>

            <!-- Toplam Fiyat -->
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">Toplam:</span>
              <div
                class="bg-secondary-50 dark:bg-secondary-900/50 border border-secondary-200 dark:border-secondary-700 rounded-lg px-3 py-2">
                <p class="text-lg font-bold text-secondary-600 dark:text-secondary-400">
                  {{ formatPrice(props.item.price * props.item.quantity) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Desktop Fiyat ve Miktar -->
      <div class="hidden lg:block flex-shrink-0 text-right">
        <div class="space-y-4">

          <!-- Miktar -->
          <div class="inline-flex items-center gap-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg px-3 py-2">
            <UIcon name="i-heroicons-cube" class="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            <span class="text-sm font-medium text-neutral-700 dark:text-neutral-300">{{ props.item.quantity }}
              adet</span>
          </div>

          <!-- Birim Fiyat -->
          <div class="space-y-1">
            <p class="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Birim Fiyat</p>
            <div class="flex items-center justify-end">
              <PartialsProductPrice :del-price="false" type="card"
                :price="props.item.variation?.price || props.item.price"
                :sale-price="props.item.variation?.sale_price || props.item.sale_price" />
            </div>
          </div>

          <!-- Toplam Fiyat -->
          <div class="space-y-1">
            <p class="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Toplam</p>
            <div
              class="bg-secondary-50 dark:bg-secondary-900/50 border border-secondary-200 dark:border-secondary-700 rounded-lg px-3 py-2">
              <p class="text-lg font-bold text-secondary-600 dark:text-secondary-400">
                {{ formatPrice(props.item.price * props.item.quantity) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Silme Butonu (Düzenleme Modunda) -->
    <div v-if="props.deletable && props.editingMode"
      class="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
      <div class="flex justify-end">
        <UButton @click="deleteCartItem(props.item.id)" icon="i-heroicons-trash" size="sm" color="red" variant="soft"
          label="Ürünü Kaldır" class="hover:!text-white" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const orderStore = useOrderManagementStore()
const props = defineProps(['item', 'deletable', 'editingMode'])

const expandedInputs = ref(new Set());

const isExpanded = (inputId) => expandedInputs.value.has(inputId);

const toggleExpand = (inputId) => {
  if (expandedInputs.value.has(inputId)) {
    expandedInputs.value.delete(inputId);
  } else {
    expandedInputs.value.add(inputId);
  }
};

const collapseInput = (inputId) => {
  expandedInputs.value.delete(inputId);
};

const truncatedValue = (value) => {
  if (value && value.length > 20) {
    return value.substring(0, 15);
  }
  return value;
};

const deleteCartItem = async (itemId) => {
  if (await useConfirmation("İşlem Onayı", "Sipariş öğesini silmek istediğinize emin misiniz?")) {
    await orderStore.deleteSubOrderItem(itemId)
  }
}
</script>
