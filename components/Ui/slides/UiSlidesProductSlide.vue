<template>
  <div :id="props.id">
    <!-- Skeleton ekranı, yükleme sırasında gösterilir -->
    <div v-if="isLoading" class="w-full overflow-x-hidden">
      <div class="flex gap-4">
        <div v-for="item in 6" :key="item" class="flex-shrink-0 space-y-2 w-[250px] border rounded-md">
          <USkeleton class="w-full h-[300px]" :ui="{ rounded: 'rounded-md' }" />
          <USkeleton class="w-4/6 mx-auto h-4" :ui="{ rounded: 'rounded-md' }" />
          <USkeleton class="w-2/6 mx-auto h-4 mb-2" :ui="{ rounded: 'rounded-md' }" />
        </div>
      </div>
    </div>

    <!-- Ürünler yüklendiğinde skeleton kaybolur ve ürünler gösterilir -->
    <div v-if="!isLoading && products.length > 0">
      <div class="flex items-center space-x-4">
        <p class="text-md font-medium my-2">{{ props.title }}</p>
        <NuxtLink v-if="props.to" :to="props.to"
          class="flex space-x-1 items-center text-sm font-medium text-orange-500">
          <span>Tümü</span>
          <UIcon name="i-heroicons-chevron-right" />
        </NuxtLink>
      </div>
      <UCarousel arrows v-slot="{ item, index }" :items="products" :ui="{ item: 'snap-end' }">
        <PartialsProductCard :lcp="props.lcp" class="mr-4" :index="index" :product="item" :key="item.id" />
      </UCarousel>
    </div>

    <!-- Ürün yoksa hiçbir şey gösterilmez -->
  </div>
</template>

<script setup>
const props = defineProps(['title', 'filters', 'to', 'isSsr', 'id', 'lcp']);
const productState = useProductState();
const products = ref([]);
const isLoading = ref(true); // Yüklenme durumu

if (props.isSsr) {
  const { data } = await useAsyncData(props.to, async () => {
    return await productState.getProducts(props.filters, true);
  });
  products.value = data.value;
  isLoading.value = false; // Yükleme bittiğinde durumu güncelle
}

useShowElement(props.id, async () => {
  if (products?.value?.length == 0) {
    isLoading.value = true; // Yükleme başlatılıyor
    const response = await productState.getProducts(props.filters, true);
    products.value = response;
    isLoading.value = false; // Yükleme tamamlandı
  }
});
</script>
