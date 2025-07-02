<template>
  <div>
    <UAccordion :items="accordionItems" :ui="{
      item: {
        padding: 'p-4',
        base: 'mt-2 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden',

      },
      default: {
        class: 'bg-white border border-neutral-200  dark:bg-neutral-800 hover:bg-orange-50 dark:hover:bg-neutral-700'
      }
    }">
      <!-- Ürün Bilgileri Slot -->
      <template #product-info>
        <div class="space-y-6">
          <!-- Öne Çıkan Özellikler -->
          <div v-if="productState.product.featured_infos?.length" class="space-y-3">
            <h4 class="font-medium text-neutral-900 dark:text-neutral-100 flex items-center">
              <UIcon name="i-heroicons-star" class="w-4 h-4 mr-2 text-yellow-500" />
              Öne Çıkan Özellikler
            </h4>
            <ul class="space-y-2">
              <li v-for="(feature, index) in productState.product.featured_infos" :key="index"
                class="flex items-start space-x-2">
                <UIcon name="i-heroicons-check" class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span class="text-neutral-700 dark:text-neutral-300 text-sm">{{ feature.content }}</span>
              </li>
            </ul>
          </div>

          <!-- Detaylı Açıklama -->
          <div v-if="productState.product.additional_info" class="space-y-3">
            <h4 class="font-medium text-neutral-900 dark:text-neutral-100 flex items-center">
              <UIcon name="i-heroicons-information-circle" class="w-4 h-4 mr-2 text-blue-500" />
              Detaylı Açıklama
            </h4>
            <div
              class="prose prose-sm dark:prose-invert prose-headings:text-neutral-900 dark:prose-headings:text-neutral-100 prose-p:text-neutral-700 dark:prose-p:text-neutral-300"
              v-html="productState.product.additional_info"></div>
          </div>

          <!-- Teknik Özellikler -->
          <div v-if="props.attributes?.length" class="space-y-3">
            <h4 class="font-medium text-neutral-900 dark:text-neutral-100 flex items-center">
              <UIcon name="i-heroicons-cog-6-tooth" class="w-4 h-4 mr-2 text-blue-500" />
              Teknik Özellikler
            </h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div v-for="attr in props.attributes" :key="attr.name"
                class="bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-lg p-4 hover:shadow-sm transition-all duration-200">
                <div class="space-y-2">
                  <div class="flex items-center space-x-2">
                    <UIcon name="i-heroicons-tag" class="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                    <h5 class="font-semibold text-neutral-900 dark:text-neutral-100 text-sm">{{ attr.name }}</h5>
                  </div>
                  <div class="flex flex-wrap gap-1">
                    <UBadge v-for="option in attr.options" :key="option.term_name" size="xs" color="blue" variant="soft"
                      :ui="{ rounded: 'rounded-full' }">
                      {{ option.term_name }}
                    </UBadge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </UAccordion>
  </div>
</template>

<script setup>
const productState = useProductState();
const props = defineProps(['attributes'])

// Tek accordion item
const accordionItems = computed(() => [
  {
    label: 'Ürün Açıklaması ve Özellikleri',
    icon: 'i-heroicons-document-text',
    defaultOpen: true,
    slot: 'product-info'
  }
])
</script>
