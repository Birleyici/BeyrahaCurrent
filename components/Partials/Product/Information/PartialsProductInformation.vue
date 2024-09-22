<template>
  <UiCardsSectionCard title="Ürün açıklaması ve özellikleri">
    <div class="grid gap-4">
      <ul class="list-disc ">
        <li v-for="feature in productState.product.featured_infos">
          {{ feature.content }}
        </li>
      </ul>
      <div v-html="productState.product.additional_info"></div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-4 ">
        <div class="items-center  bg-tertiary-100 p-3 lg:p-4 w-full rounded-sm" v-for="attr in props.attributes"
          :key="attr.name">
          <p class="font-medium">{{ attr.name }}</p>
          <div class="text-xs ">
            <p>{{ attr.options.map(t => t.term_name).join(', ') }}</p>
          </div>
        </div>
      </div>
    </div>

  </UiCardsSectionCard>
</template>

<script setup>
const productState = useProductState();
const props = defineProps(['attributes'])
</script>
