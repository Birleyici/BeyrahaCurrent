<template>
  <div
    class="card group cursor-pointer max-w-[280px] w-full bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md dark:hover:shadow-lg transition-all duration-300">
    <div class="relative overflow-hidden rounded-t-xl">
      <NuxtLink :to="productUrl">
        <NuxtImg sizes="390px sm:300px md:390px" v-if="props.product.coverImage" :src="`cl/${props.product.coverImage}`"
          format="webp" quality="90" fit="inside" :loading="imgLoadingType" :preload="imgPreload" width="400"
          height="600" :alt="props.product.name" :background="backgroundColor"
          class="w-full h-[320px] object-cover transition-transform duration-300 group-hover:scale-105" />
        <img v-else :src="img_placeholder"
          class="w-full h-[320px] object-cover transition-transform duration-300 group-hover:scale-105"
          alt="Ürün görseli yer tutucusu" />
      </NuxtLink>

      <!-- Hover overlay -->
      <div
        class="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/20 transition-colors duration-300 pointer-events-none">
      </div>
    </div>

    <div class="p-4 space-y-3">
      <div class="text-center">
        <NuxtLink :to="productUrl" class="block">
          <h3
            class="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors duration-200 product-name-clamp line-clamp-2">
            {{ props.product.name }}
          </h3>
        </NuxtLink>
      </div>

      <div class="flex justify-center pt-2">
        <PartialsProductPrice type="card" :sale-price="props.product.sale_price" :price="props.product.price" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['product', 'index', 'lcp'])
const img_placeholder = '/img-placeholder.jpg'

// Dark mode reactive tracking
const isDarkMode = ref(false);

// Dynamic background color based on theme
const backgroundColor = computed(() => {
  return isDarkMode.value ? '#262626' : '#f5f5f5';
});

// Dark mode durumunu kontrol et
const checkDarkMode = () => {
  if (process.client) {
    isDarkMode.value = document.documentElement.classList.contains('dark');
  }
};

// Component mount edildiğinde ve theme değiştiğinde kontrol et
onMounted(() => {
  checkDarkMode();

  // Theme değişikliklerini izle
  const observer = new MutationObserver(() => {
    checkDarkMode();
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });

  // Cleanup
  onUnmounted(() => {
    observer.disconnect();
  });
});

// Debug için product_url'yi kontrol et
console.log('Product URL:', props.product.product_url)
console.log('Product:', props.product)

// Eğer product_url yoksa manuel olarak oluştur
const productUrl = computed(() => {
  if (props.product.product_url) {
    return props.product.product_url
  }
  // Manuel URL oluşturma (slug ve id kullanarak)
  if (props.product.slug && props.product.id) {
    return `/urun/${props.product.slug}--${props.product.id}`
  }
  // Fallback olarak sadece id kullan
  if (props.product.id) {
    return `/urun/urun--${props.product.id}`
  }
  return '#'
})

const imgLoadingType = computed(() => {
  return props.lcp && (props.index == 0 || props.index == 1) ? 'eager' : 'lazy'
})
const imgPreload = computed(() => {
  return props.lcp && (props.index === 0 || props.index === 1) ? true : false
})
</script>

<style scoped>
.product-name-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.4;
  max-height: calc(1.4em * 2);
}
</style>
