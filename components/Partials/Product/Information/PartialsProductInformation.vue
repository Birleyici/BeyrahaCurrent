<template>
  <div>
    <div>
      <!-- Öne Çıkan Özellikler -->
      <div v-if="productState.product.featured_infos?.length" class="space-y-4">
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Öne Çıkan Özellikler
        </h3>
        <ul class="space-y-2">
          <li v-for="(feature, index) in productState.product.featured_infos" :key="index"
            class="flex items-start gap-3">
            <span class="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
            <span class="text-neutral-700 dark:text-neutral-300">{{ feature.content }}</span>
          </li>
        </ul>
      </div>

      <!-- Detaylı Açıklama -->
      <div v-if="productState.product.additional_info" class="space-y-4">
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Detaylı Açıklama
        </h3>
        <div
          class="prose prose-sm dark:prose-invert prose-headings:text-neutral-900 dark:prose-headings:text-neutral-100 prose-p:text-neutral-700 dark:prose-p:text-neutral-300"
          v-html="productState.product.additional_info"></div>
      </div>

      <!-- Ürün Nitelikleri -->
      <div v-if="props.attributes?.length" class="space-y-4">
        <h3 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Ürün Nitelikleri
        </h3>
        <div class="space-y-4">
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
</template>

<script setup>
const productState = useProductState();
const props = defineProps(['attributes'])
</script>
