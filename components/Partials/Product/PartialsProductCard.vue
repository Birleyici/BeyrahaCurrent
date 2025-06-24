<template>
  <div
    class="card group cursor-pointer max-w-[280px] w-full bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md dark:hover:shadow-lg transition-all duration-300"
    :class="{ 'opacity-75': !isProductInStock }">
    <div class="relative overflow-hidden rounded-t-xl">
      <NuxtLink :to="productUrl">
        <NuxtImg sizes="390px sm:300px md:390px" v-if="props.product.coverImage" :src="`cl/${props.product.coverImage}`"
          format="webp" quality="90" fit="inside" :loading="imgLoadingType" :preload="imgPreload" width="400"
          height="600" :alt="props.product.name" :background="backgroundColor"
          class="w-full h-[320px] object-cover transition-transform duration-300"
          :class="{ 'group-hover:scale-105': isProductInStock }" />
        <img v-else :src="img_placeholder" class="w-full h-[320px] object-cover transition-transform duration-300"
          :class="{ 'group-hover:scale-105': isProductInStock }" alt="Ürün görseli yer tutucusu" />
      </NuxtLink>

      <!-- Hover overlay -->
      <div class="absolute inset-0 bg-black/0 transition-colors duration-300 pointer-events-none"
        :class="{ 'group-hover:bg-black/10 dark:group-hover:bg-black/20': isProductInStock }">
      </div>

      <!-- Stok Durumu Badge -->
      <div v-if="!isProductInStock" class="absolute top-3 left-3">
        <UBadge :color="stockBadgeColor" variant="solid" size="sm" class="font-medium">
          {{ stockStatusLabel }}
        </UBadge>
      </div>
    </div>

    <div class="p-4 space-y-3">
      <div class="text-center">
        <NuxtLink :to="productUrl" class="block">
          <h3
            class="font-medium text-neutral-900 dark:text-neutral-100 transition-colors duration-200 product-name-clamp line-clamp-2"
            :class="{ 'group-hover:text-secondary-600 dark:group-hover:text-secondary-400': isProductInStock }">
            {{ props.product.name }}
          </h3>
        </NuxtLink>
      </div>

      <div class="flex justify-center pt-2">
        <PartialsProductPrice v-if="isProductInStock" type="card" :sale-price="props.product.sale_price"
          :price="props.product.price" :display-price="props.product.display_price"
          :is-variation-product="props.product.is_variation_product" :has-price-range="props.product.has_price_range" />
        <div v-else class="text-sm text-red-600 dark:text-red-400 font-medium">
          {{ stockStatusLabel }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['product', 'index', 'lcp'])
const img_placeholder = '/img-placeholder.jpg'

// Ürünün stok durumunu kontrol et
const isProductInStock = computed(() => {
  const product = props.product;

  // Renk varyantı için özel stok kontrolü
  if (product.is_color_out_of_stock) {
    return false;
  }

  // Manuel olarak stok dışı işaretlenmişse
  if (product.stock_status === 'out_of_stock' || product.stock_status === 'discontinued') {
    return false;
  }

  // Varyasyonlu ürün ise
  if (product.is_variation_product) {
    // Eğer display_price null ise, hiçbir varyasyon fiyatlı değil demektir
    if (product.display_price === null) {
      return false;
    }

    // En az bir varyasyonun stokta ve fiyatlı olması gerekir
    const variations = product.variations || [];
    if (variations.length > 0) {
      return variations.some(variation => {
        // Önce fiyat kontrolü - fiyatı yoksa bu varyasyon kullanılamaz
        if (!variation.price && !variation.sale_price) {
          return false;
        }

        // Varyasyon manuel olarak stok dışı işaretlenmişse
        if (variation.stock_status === 'out_of_stock' || variation.stock_status === 'discontinued') {
          return false;
        }

        // Stok yönetimi aktifse stok miktarını kontrol et
        if (variation.isStockManagement) {
          return variation.stockAmount > 0;
        }

        // Stok yönetimi kapalıysa ve fiyatlıysa stokta kabul et
        return true;
      });
    }
  }

  // Basit ürün için stok kontrolü
  if (product.stock_management == 1) {
    return product.stock > 0;
  }

  return true; // Stok yönetimi kapalıysa her zaman stokta kabul et
});

// Stok durumu etiketi
const stockStatusLabel = computed(() => {
  const product = props.product;

  // Renk varyantı stok dışı kontrolü
  if (product.is_color_out_of_stock) {
    return 'Bu Renk Stok Dışı';
  }

  if (product.stock_status === 'discontinued') {
    return 'Üretimi Durduruldu';
  }

  if (product.stock_status === 'out_of_stock') {
    return 'Stok Dışı';
  }

  // Varyasyonlu ürün kontrolü
  if (product.is_variation_product) {
    // Eğer display_price null ise, hiçbir varyasyon fiyatlı değil demektir
    if (product.display_price === null) {
      return 'Stok Dışı';
    }

    const variations = product.variations || [];
    if (variations.length > 0) {
      const inStockVariations = variations.filter(variation => {
        // Önce fiyat kontrolü - fiyatı yoksa bu varyasyon kullanılamaz
        if (!variation.price && !variation.sale_price) {
          return false;
        }

        // Varyasyon manuel olarak stok dışı işaretlenmişse
        if (variation.stock_status === 'out_of_stock' || variation.stock_status === 'discontinued') {
          return false;
        }

        // Stok yönetimi aktifse stok miktarını kontrol et
        if (variation.isStockManagement) {
          return variation.stockAmount > 0;
        }

        // Stok yönetimi kapalıysa ve fiyatlıysa stokta kabul et
        return true;
      });

      if (inStockVariations.length === 0) {
        return 'Stok Dışı';
      }
    }
  } else {
    // Basit ürün için stok kontrolü
    if (product.stock_management == 1 && product.stock <= 0) {
      return 'Tükendi';
    }
  }

  return 'Stok Dışı';
});

// Badge rengi
const stockBadgeColor = computed(() => {
  const product = props.product;

  if (product.stock_status === 'discontinued') {
    return 'gray';
  }

  return 'red';
});

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
