<template>
  <div
    class="card group cursor-pointer w-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden"
    :class="{ 'opacity-75': !isProductInStock }">
    <div class="relative overflow-hidden">
      <NuxtLink :to="productUrl">
        <NuxtImg v-if="props.product.coverImage" :src="`cl/${props.product.coverImage}`" format="webp" quality="95"
          :loading="imgLoadingType" :preload="imgPreload" :alt="props.product.name" :background="backgroundColor"
          width="140" height="170" class="h-[300px] w-full object-cover object-top transition-transform duration-500"
          :class="{ 'group-hover:scale-105': isProductInStock }" />
        <img v-else :src="img_placeholder" class="w-full h-[340px] object-cover transition-transform duration-500"
          :class="{ 'group-hover:scale-105': isProductInStock }" alt="Ürün görseli yer tutucusu" />
      </NuxtLink>

      <!-- Premium hover overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 pointer-events-none"
        :class="{ 'group-hover:opacity-100': isProductInStock }">
      </div>

      <!-- Video Badge -->
      <div v-if="hasProductVideo" class="absolute top-4 right-4">
        <div
          class="bg-gradient-to-r from-red-500 to-pink-500 backdrop-blur-sm rounded-xl px-3 py-2 flex items-center space-x-2 transition-all duration-300 hover:from-red-600 hover:to-pink-600 shadow-lg">
          <UIcon name="i-heroicons-play-circle-solid" class="w-5 h-5 text-white" />
          <span class="text-sm font-medium text-white">Video</span>
        </div>
      </div>

      <!-- Stok Durumu Badge -->
      <div v-if="!isProductInStock" class="absolute top-4 left-4">
        <UBadge :color="stockBadgeColor" variant="solid" size="sm" class="font-medium backdrop-blur-sm">
          {{ stockStatusLabel }}
        </UBadge>
      </div>
    </div>

    <div class="p-4 space-y-3 min-h-[140px] flex flex-col justify-between">
      <div class="text-center flex-1 flex items-center justify-center">
        <NuxtLink :to="productUrl" class="block">
          <h3
            class="font-semibold text-slate-800 dark:text-slate-100 transition-colors duration-300 product-name-clamp line-clamp-2 text-base leading-snug"
            :class="{ 'group-hover:text-secondary-600 dark:group-hover:text-secondary-400': isProductInStock }">
            {{ props.product.name }}
          </h3>
        </NuxtLink>
      </div>

      <!-- Değerlendirme Yıldızları -->
      <div v-if="props.product.review_count > 0" class="flex justify-center">
        <UiCommonStarRating :rating="props.product.average_rating" :review-count="props.product.review_count" size="sm"
          :show-text="true" />
      </div>

      <div class="flex justify-center">
        <PartialsProductPrice v-if="isProductInStock" type="card" :sale-price="props.product.sale_price"
          :price="props.product.price" :display-price="props.product.display_price"
          :is-variation-product="props.product.is_variation_product" :has-price-range="props.product.has_price_range" />
        <div v-else class="text-sm text-red-600 dark:text-red-400 font-semibold">
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

// Video kontrolü
const hasProductVideo = computed(() => {
  // Önce products tablosundaki video var mı kontrol et
  if (props.product.video_url) {
    return true;
  }

  // Seçili renk varsa onun videosunu kontrol et
  if (props.product.selectedColorTerm &&
    props.product.selectedColorTerm.term_videos &&
    props.product.selectedColorTerm.term_videos.length > 0) {
    return true;
  }

  // Renk varyantı ürünse, term_videos'u kontrol et (backend'ten gelen)
  if (props.product.term_videos && props.product.term_videos.length > 0) {
    return true;
  }

  return false;
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
