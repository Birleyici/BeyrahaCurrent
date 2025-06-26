<template>
  <div class="space-y-6">
    <!-- Ürün Tamamen Stok Dışıysa Sadece Uyarı Göster -->
    <div v-if="!isProductInStock" class="py-6">
      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6">
        <div class="flex items-start space-x-4">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" />
          <div class="flex-1">
            <h4 class="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
              Stok Dışı
            </h4>
            <p class="text-red-700 dark:text-red-300">
              Bu ürün şu anda stok dışıdır.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Ürün Stokta İse Normal Component -->
    <template v-else>
      <div>
        <div v-for="attribute in props.attrsAndVarsState" :key="attribute.name">
          <!-- Öznitelik Adı -->
          <div>
            <div v-if="attribute.name.toLowerCase() == 'renk' && attribute?.options?.length > 1">
              <div class="space-y-4 mb-4"
                :class="{ 'p-4 border border-red-200 rounded-xl bg-red-50 dark:bg-red-900/10 dark:border-red-700': selectionRequired && !selectedOptions['Renk'] }">
                <!-- Renk Başlığı ve Seçili Renk -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <h3 class="font-semibold text-neutral-900 dark:text-neutral-100">Renk Seçenekleri</h3>
                    <div v-if="selectedOptions['Renk']" class="flex items-center space-x-2">
                      <div class="w-3 h-3 bg-secondary-500 rounded-full"></div>
                      <span class="text-sm font-medium text-secondary-600 dark:text-secondary-400">{{
                        selectedOptions['Renk'] }}</span>
                    </div>
                  </div>
                  <span class="text-xs text-neutral-500 dark:text-neutral-400">{{ attribute.options.length }} renk
                    mevcut</span>
                </div>

                <!-- Hata mesajı -->
                <div v-if="selectionRequired && !selectedOptions['Renk']" class="flex items-center space-x-2">
                  <UIcon name="i-heroicons-exclamation-triangle" class="w-4 h-4 text-red-500" />
                  <p class="text-sm text-red-500 dark:text-red-400">Lütfen bir renk seçin</p>
                </div>

                <!-- Renk Seçenekleri Grid -->
                <div v-if="$mainState.isLoaded"
                  class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3">
                  <button v-for="item in attribute.options" :key="item.term_name"
                    @click="isActive(attribute.name, item.term_name) && selectColorOption(attribute.name, item.term_name, item)"
                    :disabled="!isActive(attribute.name, item.term_name)" :class="{
                      'ring-2 ring-secondary-500 ring-offset-2 dark:ring-offset-neutral-800 scale-105': isSelected(attribute.name, item.term_name),
                      'opacity-50 cursor-not-allowed': !isActive(attribute.name, item.term_name),
                      'hover:scale-105 hover:shadow-lg active:scale-95': isActive(attribute.name, item.term_name)
                    }"
                    class="group relative aspect-square rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-700 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-secondary-400 dark:focus:ring-secondary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800">

                    <!-- Renk Resmi -->
                    <NuxtImg v-if="item?.term_images?.[0]?.path" :src="getTermImageSrc(item, item.term_name)"
                      :alt="item.term_name" width="100" height="120" fit="cover"
                      class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                    <img v-else src="/img-placeholder.jpg" :alt="item.term_name"
                      class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />

                    <!-- Hover Overlay -->
                    <div
                      class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none">
                    </div>

                    <!-- Seçili Durumu -->
                    <div v-if="isSelected(attribute.name, item.term_name)"
                      class="absolute inset-0 bg-secondary-500/20 flex items-center justify-center">
                      <div class="w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center shadow-lg">
                        <UIcon name="i-heroicons-check" class="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <!-- Renk Adı Tooltip -->
                    <div
                      class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span class="text-xs font-medium text-white truncate block">{{ item.term_name }}</span>
                    </div>
                  </button>
                </div>

                <!-- Loading State -->
                <div v-else class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3">
                  <div v-for="item in 7" :key="item"
                    class="aspect-square rounded-xl bg-neutral-200 dark:bg-neutral-700 animate-pulse"></div>
                </div>
              </div>
            </div>

            <!-- Diğer Öznitelikler -->
            <div v-else-if="attribute.name.toLowerCase() != 'renk'" class="space-y-3"
              :class="{ 'p-4 border border-red-200 rounded-xl bg-red-50 dark:bg-red-900/10 dark:border-red-700': selectionRequired && !selectedOptions[attribute.name] }">

              <!-- Hata mesajı -->
              <div v-if="selectionRequired && !selectedOptions[attribute.name]" class="flex items-center space-x-2">
                <UIcon name="i-heroicons-exclamation-triangle" class="w-4 h-4 text-red-500" />
                <span class="text-sm text-red-500 dark:text-red-400">Lütfen {{ attribute.name.toLowerCase() }}
                  seçin</span>
              </div>

              <div class="space-y-3">
                <h3 class="font-semibold text-neutral-900 dark:text-neutral-100">{{ attribute.name }}</h3>
                <div class="flex flex-wrap gap-2">
                  <button v-for="option in attribute.options" :key="option.term_name"
                    :disabled="!isActive(attribute.name, option.term_name)"
                    @click="selectOption(attribute.name, option.term_name)" :class="{
                      'bg-secondary-500 text-white border-secondary-500 shadow-md': isSelected(attribute.name, option.term_name),
                      'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-neutral-200 dark:border-neutral-700 hover:border-secondary-300 dark:hover:border-secondary-600 hover:bg-secondary-50 dark:hover:bg-secondary-900/20': !isSelected(attribute.name, option.term_name) && isActive(attribute.name, option.term_name),
                      'opacity-50 cursor-not-allowed': !isActive(attribute.name, option.term_name)
                    }"
                    class="px-4 py-2.5 text-sm font-medium border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary-400 dark:focus:ring-secondary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800 hover:scale-105 active:scale-95">
                    {{ option.term_name }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Ürün Input -->
      <PartialsProductInputItem :product="props.productState.product" />

      <!-- Fiyat -->
      <div class="py-2">
        <div v-if="getSelectedVariation">
          <PartialsProductPrice type="page" :sale-price="getSelectedVariation.sale_price"
            :price="getSelectedVariation.price" />
        </div>
        <div v-else-if="isVariableProduct && defaultVariationPrice">
          <PartialsProductPrice type="page" :sale-price="defaultVariationPrice.sale_price"
            :price="defaultVariationPrice.price" />
        </div>
        <div v-else>
          <PartialsProductPrice type="page" :sale-price="props.productState.product.sale_price"
            :price="props.productState.product.price" />
        </div>
      </div>

      <!-- Sayaç ve Butonlar -->
      <div class="flex flex-col lg:flex-row justify-between lg:justify-start space-y-4 lg:space-y-0 lg:space-x-4">
        <!-- Sayaç ve Butonlar Bölümü -->
        <div class="space-y-4">
          <!-- Mobil Düzen (lg altı) -->
          <div class="lg:hidden space-y-4">
            <!-- Sayaç -->
            <div class="flex justify-center">
              <div
                class="flex items-center bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <button @click="decreaseQty" :disabled="qyt <= 1"
                  class="flex items-center justify-center w-10 h-10 text-neutral-600 dark:text-neutral-400 hover:text-secondary-600 dark:hover:text-secondary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  <UIcon name="i-heroicons-minus" class="w-4 h-4" />
                </button>
                <input v-model="qyt" type="number" min="1" max="99"
                  class="w-16 h-10 text-center bg-transparent border-0 text-neutral-900 dark:text-neutral-100 font-medium focus:outline-none focus:ring-0"
                  @input="validateQty" />
                <button @click="increaseQty" :disabled="qyt >= 99"
                  class="flex items-center justify-center w-10 h-10 text-neutral-600 dark:text-neutral-400 hover:text-secondary-600 dark:hover:text-secondary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  <UIcon name="i-heroicons-plus" class="w-4 h-4" />
                </button>
              </div>
            </div>

            <!-- Butonlar -->
            <div class="flex flex-col space-y-3">
              <!-- Sepete Ekle Butonu -->
              <UButton :loading="cartState.addToCartloading" @click="addToCart()" color="secondary"
                :disabled="!isSelectedVariationInStock"
                class="!rounded-full font-bold flex justify-center relative text-sm px-6 overflow-hidden w-full text-white h-12">
                <Icon name="material-symbols:shopping-bag" class="w-14 h-14 absolute left-0 top-0 opacity-30">
                </Icon>
                <p class="text-white">SEPETE EKLE</p>
              </UButton>

              <!-- WhatsApp Sipariş Butonu -->
              <UButton @click="orderViaWhatsApp()" :disabled="!isSelectedVariationInStock"
                class="!rounded-full font-bold flex justify-center items-center text-sm px-6 w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 transition-all duration-200">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787" />
                </svg>
                <span>WhatsApp Sipariş</span>
              </UButton>
            </div>
          </div>

          <!-- Desktop Düzen (lg ve üstü) -->
          <div class="hidden lg:flex lg:flex-row lg:items-center lg:space-x-4">
            <div
              class="flex items-center bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
              <button @click="decreaseQty" :disabled="qyt <= 1"
                class="flex items-center justify-center w-11 h-11 text-neutral-600 dark:text-neutral-400 hover:text-secondary-600 dark:hover:text-secondary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <UIcon name="i-heroicons-minus" class="w-5 h-5" />
              </button>
              <input v-model="qyt" type="number" min="1" max="99"
                class="w-20 h-11 text-center bg-transparent border-0 text-neutral-900 dark:text-neutral-100 font-medium focus:outline-none focus:ring-0"
                @input="validateQty" />
              <button @click="increaseQty" :disabled="qyt >= 99"
                class="flex items-center justify-center w-11 h-11 text-neutral-600 dark:text-neutral-400 hover:text-secondary-600 dark:hover:text-secondary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <UIcon name="i-heroicons-plus" class="w-5 h-5" />
              </button>
            </div>

            <div class="flex space-x-4">
              <!-- Sepete Ekle Butonu -->
              <UButton :loading="cartState.addToCartloading" @click="addToCart()" color="secondary"
                :disabled="!isSelectedVariationInStock"
                class="!rounded-full font-bold flex justify-center relative text-sm px-8 overflow-hidden min-w-[180px] h-12 text-white">
                <Icon name="material-symbols:shopping-bag" class="w-14 h-14 absolute left-0 top-0 opacity-30">
                </Icon>
                <p class="text-white">SEPETE EKLE</p>
              </UButton>

              <!-- WhatsApp Sipariş Butonu -->
              <UButton @click="orderViaWhatsApp()" :disabled="!isSelectedVariationInStock"
                class="!rounded-full font-bold flex justify-center items-center text-sm px-8 min-w-[180px] h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 transition-all duration-200">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787" />
                </svg>
                <span>WhatsApp Sipariş</span>
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>

<script setup>
const props = defineProps({
  attrsAndVarsState: {
    type: Array,
    default: () => []
  },
  productState: {
    type: Object,
    required: true
  }
});

const cartState = useCartState();
const { $mainState } = useNuxtApp();
const currentRoute = useRoute();
const toast = useToast();

const qyt = ref(1);

// Ürünün stok durumunu kontrol et
const isProductInStock = computed(() => {
  const product = props.productState.product;

  // Manuel olarak stok dışı işaretlenmişse
  if (product.stock_status === 'out_of_stock' || product.stock_status === 'discontinued') {
    return false;
  }

  // Varyasyonlu ürün ise
  if (isVariableProduct.value) {
    // En az bir varyasyonun stokta ve fiyatlı olması gerekir
    const variations = props.productState.product.variations || [];
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

  // Basit ürün için stok kontrolü
  if (product.stock_management == 1) {
    return product.stock > 0;
  }

  return true; // Stok yönetimi kapalıysa her zaman stokta kabul et
});

// Ana stok dışı mesajını al
const outOfStockMessage = computed(() => {
  return 'Bu ürün şu anda stok dışıdır.';
});

const {
  isActive: originalIsActive,
  selectOption,
  isSelected,
  selectedOptions,
  getSelectedVariation,
  getTermImageSrc,
} = useVariationsFront();

// Stok durumu kontrolü ile birlikte isActive fonksiyonu
const isActive = (attributeName, termName) => {
  // Ürün genel olarak stok dışıysa hiçbir seçenek aktif olmasın
  if (!isProductInStock.value) {
    return false;
  }

  // Orijinal mantığı kullan - computed value olduğu için .value ile erişim
  return originalIsActive.value(attributeName, termName);
};

// Seçili varyasyonun stok durumunu kontrol et
const isSelectedVariationInStock = computed(() => {
  const selectedVariation = getSelectedVariation.value;

  // Varyasyon seçilmemişse stokta kabul et (basit ürün veya varyasyon seçilmemiş)
  if (!selectedVariation) {
    return isProductInStock.value;
  }

  // Seçili varyasyonun fiyat kontrolü - fiyatı yoksa stok dışı
  if (!selectedVariation.price && !selectedVariation.sale_price) {
    return false;
  }

  // Manuel olarak stok dışı işaretlenmişse
  if (selectedVariation.stock_status === 'out_of_stock' || selectedVariation.stock_status === 'discontinued') {
    return false;
  }

  // Stok yönetimi aktifse stok miktarını kontrol et
  if (selectedVariation.isStockManagement && selectedVariation.stockAmount <= 0) {
    return false;
  }

  return true;
});

const isVariableProduct = computed(() => {
  const hasVariationAttrs = props.attrsAndVarsState.some(i => {
    // Farklı veri tipleri için kontrol
    return i.useForVariation === 1 ||
      i.useForVariation === "1" ||
      i.useForVariation === true ||
      i.use_for_variation === 1 ||
      i.use_for_variation === "1" ||
      i.use_for_variation === true;
  });

  return hasVariationAttrs;
});

// Varsayılan varyant fiyatını al (en ucuz fiyatlı ve stokta olan varyant)
const defaultVariationPrice = computed(() => {
  if (!isVariableProduct.value) {
    return null;
  }

  const variations = props.productState.product.variations || [];

  // Fiyatlı ve stokta olan varyantları filtrele
  const availableVariations = variations.filter(variation => {
    // Fiyat kontrolü
    if (!variation.price && !variation.sale_price) {
      return false;
    }

    // Stok durumu kontrolü
    if (variation.stock_status === 'out_of_stock' || variation.stock_status === 'discontinued') {
      return false;
    }

    // Stok yönetimi kontrolü
    if (variation.isStockManagement && variation.stockAmount <= 0) {
      return false;
    }

    return true;
  });

  if (availableVariations.length === 0) {
    return null;
  }

  // En ucuz varyantı bul (sale_price varsa onu, yoksa price'ı kullan)
  const cheapestVariation = availableVariations.reduce((cheapest, current) => {
    const cheapestPrice = cheapest.sale_price || cheapest.price;
    const currentPrice = current.sale_price || current.price;

    return currentPrice < cheapestPrice ? current : cheapest;
  });

  return cheapestVariation;
});

const selectedColor = ref(null)
const selectColorOption = (attributeName, termName, item) => {
  selectedColor.value = item
  selectOption(attributeName, termName, item)

  // Renk değiştirildiğinde ürün galerisinin başına git
  // Özellikle mobilde görsellerin değiştiğini kullanıcının fark etmesi için
  nextTick(() => {
    const galleryElement = document.getElementById('product-gallery')
    if (galleryElement) {
      galleryElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  })
}

const initialColor = () => {
  const urlParams = currentRoute.params?.urlParams;
  if (urlParams && urlParams.includes('-')) {
    // Son tire işaretinin pozisyonunu bul
    const lastDashPos = urlParams.lastIndexOf('-');
    const colorTermId = urlParams.substring(lastDashPos + 1);

    if (colorTermId) {
      const color = props.attrsAndVarsState.find(i => i.name === 'Renk');
      const colorTerm = color?.options.find(c => c.term_id === parseInt(colorTermId))
      selectedColor.value = colorTerm
      selectOption('Renk', colorTerm?.term_name, colorTerm)
    }
  }
};
initialColor()

const selectionRequired = ref(false)

// Counter fonksiyonları
const increaseQty = () => {
  if (qyt.value < 99) {
    qyt.value++
  }
}

const decreaseQty = () => {
  if (qyt.value > 1) {
    qyt.value--
  }
}

const validateQty = () => {
  // Input'tan gelen değeri kontrol et
  if (qyt.value < 1) {
    qyt.value = 1
  } else if (qyt.value > 99) {
    qyt.value = 99
  }
}

const addToCart = () => {
  // Stok kontrolü
  if (!isProductInStock.value) {
    toast.add({
      title: 'Ürün stok dışı!',
      description: outOfStockMessage.value,
      color: 'red',
      icon: "i-heroicons-exclamation-triangle",
    });
    return;
  }

  // Ürünün hiç attribute'u yoksa direkt devam et
  if (!props.attrsAndVarsState || props.attrsAndVarsState.length === 0) {
    // Normal sepete ekleme devam eder
  }
  // Varyasyonlu ürün kontrolü - daha detaylı
  else if (isVariableProduct.value) {
    // Gerekli varyantların seçilip seçilmediğini kontrol et
    const requiredAttributes = props.attrsAndVarsState.filter(attr => {
      return attr.useForVariation === 1 ||
        attr.useForVariation === "1" ||
        attr.useForVariation === true ||
        attr.use_for_variation === 1 ||
        attr.use_for_variation === "1" ||
        attr.use_for_variation === true;
    });

    const missingSelections = [];

    requiredAttributes.forEach(attr => {
      if (!selectedOptions.value[attr.name]) {
        missingSelections.push(attr.name);
      }
    });

    if (missingSelections.length > 0) {
      selectionRequired.value = true;
      toast.add({
        title: 'Varyant seçimi gerekli!',
        description: `Lütfen şu seçenekleri belirleyin: ${missingSelections.join(', ')}`,
        color: 'red',
        icon: "i-heroicons-exclamation-triangle",
      });
      return;
    }

    // Varyant seçilmiş ama geçerli varyasyon yok
    if (!getSelectedVariation.value) {
      selectionRequired.value = true;
      toast.add({
        title: 'Geçersiz varyant kombinasyonu!',
        description: 'Seçtiğiniz varyant kombinasyonu mevcut değil. Lütfen farklı seçenekler deneyin.',
        color: 'red',
        icon: "i-heroicons-exclamation-triangle",
      });
      return;
    }

    // Seçili varyasyonun stok durumunu kontrol et
    const selectedVariation = getSelectedVariation.value;

    // Seçili varyasyonun fiyat kontrolü - fiyatı yoksa hata ver
    if (!selectedVariation.price && !selectedVariation.sale_price) {
      toast.add({
        title: 'Seçili varyantın fiyatı yok!',
        description: 'Bu varyant için fiyat belirtilmemiş. Lütfen farklı bir varyant seçin.',
        color: 'red',
        icon: "i-heroicons-exclamation-triangle",
      });
      return;
    }

    if (selectedVariation.stock_status === 'out_of_stock' || selectedVariation.stock_status === 'discontinued') {
      toast.add({
        title: 'Seçili varyant stok dışı!',
        description: 'Lütfen farklı bir varyant seçin.',
        color: 'red',
        icon: "i-heroicons-exclamation-triangle",
      });
      return;
    }

    if (selectedVariation.isStockManagement && selectedVariation.stockAmount <= 0) {
      toast.add({
        title: 'Seçili varyant stok dışı!',
        description: 'Bu varyant için stok kalmamıştır.',
        color: 'red',
        icon: "i-heroicons-exclamation-triangle",
      });
      return;
    }
  }

  // Başarılı seçim
  selectionRequired.value = false;

  const input = props.productState.product.inputs?.[0]
  const inputValue = props.productState.product.inputValue

  if (input?.isRequired && !inputValue) {
    toast.add({
      title: input.label + ' alanı gereklidir!',
      color: 'red',
      icon: "i-heroicons-exclamation-triangle",
    })
    return
  }

  // Eğer miktar 0 ise işlemi durdur
  if (qyt.value == 0) {
    return;
  }
  // Ürünün varyasyonlu olup olmadığını kontrol et
  const selectedVariation = getSelectedVariation.value;

  // Eğer varyasyon yoksa, basit ürün olarak ekleme yap
  let newCartItem = {
    product_attribute_term_id: selectedColor.value?.term_id,
  };
  if (inputValue) {
    newCartItem.input_value = {
      value: inputValue,
      label: input.label,
      product_input_id: input.pivot.id,
    };
  }

  if (selectedVariation) {
    // Varyasyonlu ürün için
    newCartItem = {
      ...newCartItem,
      product_id: props.productState.product.id,
      product_name: `${props.productState.product.name} ` + (selectedColor.value?.term_name || ''), // Varyasyon adını ekle
      image_id: selectedVariation.images?.[0]?.id || props.productState.product.selectedColorTermImages?.[0].id || props.productState.product.selectedImages?.[0]?.id,
      qyt: parseInt(qyt.value),
      variation: selectedVariation,
      price: selectedVariation.sale_price ? selectedVariation.sale_price : selectedVariation.price, // Varyasyonun fiyatını ekle
      total: (selectedVariation.sale_price ? selectedVariation.sale_price : selectedVariation.price) * parseInt(qyt.value) // Toplam tutarı hesapla
    };
  } else {
    // Basit ürün için veya varyantlı ürünlerde varyant seçilmemişse
    let effectivePrice;
    let effectiveSalePrice;

    if (isVariableProduct.value && defaultVariationPrice.value) {
      // Varyantlı üründe varsayılan varyant fiyatını kullan
      effectivePrice = defaultVariationPrice.value.price;
      effectiveSalePrice = defaultVariationPrice.value.sale_price;
    } else {
      // Basit ürün fiyatını kullan
      effectivePrice = props.productState.product.price;
      effectiveSalePrice = props.productState.product.sale_price;
    }

    newCartItem = {
      ...newCartItem,
      product_id: props.productState.product.id,
      product_name: props.productState.product.name + ' ' + (selectedColor.value?.term_name || ''),
      image_id: props.productState.product.selectedColorTermImages?.[0]?.id || props.productState.product.selectedImages?.[0]?.id,
      qyt: parseInt(qyt.value),
      price: effectiveSalePrice ? effectiveSalePrice : effectivePrice, // Efektif fiyatı kullan
      total: (effectiveSalePrice ? effectiveSalePrice : effectivePrice) * parseInt(qyt.value) // Toplam tutarı hesapla
    };
  }

  // Sepeti güncelle
  cartState.patchCart(newCartItem, parseInt(qyt.value));
};

const orderViaWhatsApp = () => {
  // Stok kontrolü
  if (!isProductInStock.value) {
    toast.add({
      title: 'Ürün stok dışı!',
      description: outOfStockMessage.value,
      color: 'red',
      icon: "i-heroicons-exclamation-triangle",
    });
    return;
  }

  // Varyasyonlu ürün kontrolü - addToCart ile aynı
  if (isVariableProduct.value) {
    // Gerekli varyantların seçilip seçilmediğini kontrol et
    const requiredAttributes = props.attrsAndVarsState.filter(attr => {
      return attr.useForVariation === 1 ||
        attr.useForVariation === "1" ||
        attr.useForVariation === true ||
        attr.use_for_variation === 1 ||
        attr.use_for_variation === "1" ||
        attr.use_for_variation === true;
    });
    const missingSelections = [];

    requiredAttributes.forEach(attr => {
      if (!selectedOptions.value[attr.name]) {
        missingSelections.push(attr.name);
      }
    });

    if (missingSelections.length > 0) {
      selectionRequired.value = true;
      toast.add({
        title: 'Varyant seçimi gerekli!',
        description: `Lütfen şu seçenekleri belirleyin: ${missingSelections.join(', ')}`,
        color: 'red',
        icon: "i-heroicons-exclamation-triangle",
      });
      return;
    }

    // Varyant seçilmiş ama geçerli varyasyon yok
    if (!getSelectedVariation.value) {
      selectionRequired.value = true;
      toast.add({
        title: 'Geçersiz varyant kombinasyonu!',
        description: 'Seçtiğiniz varyant kombinasyonu mevcut değil. Lütfen farklı seçenekler deneyin.',
        color: 'red',
        icon: "i-heroicons-exclamation-triangle",
      });
      return;
    }

    // Seçili varyasyonun stok durumunu kontrol et
    const selectedVariation = getSelectedVariation.value;

    // Seçili varyasyonun fiyat kontrolü - fiyatı yoksa hata ver
    if (!selectedVariation.price && !selectedVariation.sale_price) {
      toast.add({
        title: 'Seçili varyantın fiyatı yok!',
        description: 'Bu varyant için fiyat belirtilmemiş. Lütfen farklı bir varyant seçin.',
        color: 'red',
        icon: "i-heroicons-exclamation-triangle",
      });
      return;
    }

    if (selectedVariation.stock_status === 'out_of_stock' || selectedVariation.stock_status === 'discontinued') {
      toast.add({
        title: 'Seçili varyant stok dışı!',
        description: 'Lütfen farklı bir varyant seçin.',
        color: 'red',
        icon: "i-heroicons-exclamation-triangle",
      });
      return;
    }

    if (selectedVariation.isStockManagement && selectedVariation.stockAmount <= 0) {
      toast.add({
        title: 'Seçili varyant stok dışı!',
        description: 'Bu varyant için stok kalmamıştır.',
        color: 'red',
        icon: "i-heroicons-exclamation-triangle",
      });
      return;
    }
  }

  // Başarılı seçim
  selectionRequired.value = false;

  const input = props.productState.product.inputs?.[0]
  const inputValue = props.productState.product.inputValue

  if (input?.isRequired && !inputValue) {
    toast.add({
      title: input.label + ' alanı gereklidir!',
      color: 'red',
      icon: "i-heroicons-exclamation-triangle",
    })
    return
  }

  // Miktar kontrolü
  if (qyt.value == 0) {
    return;
  }

  // Seçili varyasyon bilgilerini al
  const selectedVariation = getSelectedVariation.value;
  let productName = props.productState.product.name;
  let productPrice;

  if (selectedVariation) {
    productName += ` (${selectedColor.value?.term_name || ''})`;
    productPrice = selectedVariation.sale_price || selectedVariation.price;
  } else if (isVariableProduct.value && defaultVariationPrice.value) {
    // Varyantlı üründe varsayılan varyant fiyatını kullan
    if (selectedColor.value) {
      productName += ` (${selectedColor.value.term_name})`;
    }
    productPrice = defaultVariationPrice.value.sale_price || defaultVariationPrice.value.price;
  } else {
    // Basit ürün fiyatını kullan
    if (selectedColor.value) {
      productName += ` (${selectedColor.value.term_name})`;
    }
    productPrice = props.productState.product.sale_price || props.productState.product.price;
  }

  // WhatsApp mesajını oluştur
  const message = `Merhaba! Aşağıdaki ürün için sipariş vermek istiyorum:

🛍️ *Ürün:* ${productName}
💰 *Fiyat:* ${new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(productPrice)}
📦 *Adet:* ${qyt.value}
💵 *Toplam:* ${new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(productPrice * qyt.value)}

Detayları konuşabilir miyiz?`;

  // WhatsApp numarası - bu değer dinamik olarak ayarlanmalı
  const whatsappNumber = "905555555555"; // Bu değer ayarlardan gelmelidir

  // WhatsApp URL'sini oluştur
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  // WhatsApp'ı aç
  window.open(whatsappUrl, '_blank');

  // Başarı mesajı göster
  toast.add({
    title: 'WhatsApp açılıyor...',
    description: 'Sipariş talebiniz WhatsApp üzerinden iletiliyor.',
    color: 'green',
    icon: "i-simple-icons-whatsapp",
  })
};

</script>

<style scoped>
/* Counter stilleri artık gerekli değil - kaldırıldı */
</style>