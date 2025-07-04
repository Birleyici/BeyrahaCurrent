<template>
  <div>
    <div class="space-y-4">
      <!-- Öne Çıkan Özellikler -->
      <div v-if="productState.product.featured_infos?.length"
        class="border border-neutral-200 dark:border-neutral-700 rounded-lg">
        <button @click="toggleAccordion('featured')"
          class="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200">
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-3">
            <UIcon name="i-heroicons-star" class="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
            Öne Çıkan Özellikler
          </h3>
          <UIcon :name="activeAccordion === 'featured' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
            class="w-5 h-5 text-neutral-500 dark:text-neutral-400 transition-transform duration-200" />
        </button>
        <div v-show="activeAccordion === 'featured'"
          class="px-4 pb-4 border-t border-neutral-200 dark:border-neutral-700">
          <ul class="space-y-2 pt-4">
            <li v-for="(feature, index) in productState.product.featured_infos" :key="index"
              class="flex items-start gap-3">
              <span class="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
              <span class="text-neutral-700 dark:text-neutral-300">{{ feature.content }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Detaylı Açıklama -->
      <div v-if="productState.product.additional_info"
        class="border border-neutral-200 dark:border-neutral-700 rounded-lg">
        <button @click="toggleAccordion('description')"
          class="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200">
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-3">
            <UIcon name="i-heroicons-document-text" class="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
            Detaylı Açıklama
          </h3>
          <UIcon :name="activeAccordion === 'description' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
            class="w-5 h-5 text-neutral-500 dark:text-neutral-400 transition-transform duration-200" />
        </button>
        <div v-show="activeAccordion === 'description'"
          class="px-4 pb-4 border-t border-neutral-200 dark:border-neutral-700">
          <div
            class="prose prose-sm dark:prose-invert prose-headings:text-neutral-900 dark:prose-headings:text-neutral-100 prose-p:text-neutral-700 dark:prose-p:text-neutral-300 pt-4"
            v-html="productState.product.additional_info">
          </div>
        </div>
      </div>

      <!-- Ürün Nitelikleri -->
      <div v-if="props.attributes?.length" class="border border-neutral-200 dark:border-neutral-700 rounded-lg">
        <button @click="toggleAccordion('attributes')"
          class="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-200">
          <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-3">
            <UIcon name="i-heroicons-list-bullet" class="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
            Ürün Nitelikleri
          </h3>
          <UIcon :name="activeAccordion === 'attributes' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'"
            class="w-5 h-5 text-neutral-500 dark:text-neutral-400 transition-transform duration-200" />
        </button>
        <div v-show="activeAccordion === 'attributes'"
          class="px-4 pb-4 border-t border-neutral-200 dark:border-neutral-700">
          <div class="space-y-4 pt-4">
            <div v-for="attr in props.attributes" :key="attr.name" class="space-y-2">
              <h4 class="text-sm font-medium text-neutral-900 dark:text-neutral-100">{{ attr.name }}</h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="option in attr.options" :key="option.term_name"
                  class="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-md">
                  {{ option.term_name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const productState = useProductState();
const props = defineProps(['attributes']);

// Akordiyonlar için reactive state
const activeAccordion = ref('featured'); // Varsayılan olarak 'featured' açık

// Akordiyonu toggle etme fonksiyonu
const toggleAccordion = (accordion) => {
  if (activeAccordion.value === accordion) {
    activeAccordion.value = null; // Aynı akordiyona tıklanırsa kapat
  } else {
    activeAccordion.value = accordion; // Farklı akordiyona tıklanırsa onu aç
  }
};
</script>
