<template>
  <div class="space-y-y-mobile md:space-y-y-desktop ">
    <div>
      <div v-for="attribute in props.attrsAndVarsState" :key="attribute.name">
        <!-- Öznitelik Adı -->
        <div>
          <div v-if="attribute.name.toLowerCase() == 'renk' && attribute?.options?.length > 1">
            <div class="space-y-4">
              <!-- Renk Başlığı ve Seçili Renk -->
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <h3 class="font-semibold text-neutral-900">Renk Seçenekleri</h3>
                  <div v-if="selectedOptions['Renk']" class="flex items-center space-x-2">
                    <div class="w-4 h-4 bg-secondary-500 rounded-full"></div>
                    <span class="text-sm font-medium text-secondary-600">{{ selectedOptions['Renk'] }}</span>
                  </div>
                </div>
                <span class="text-xs text-neutral-500">{{ attribute.options.length }} renk mevcut</span>
              </div>

              <!-- Renk Seçenekleri Grid -->
              <div v-if="$mainState.isLoaded" class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
                <div v-for="item in attribute.options" :key="item.term_name"
                  @click="isActive(attribute.name, item.term_name) && selectColorOption(attribute.name, item.term_name, item)"
                  :class="{
                    'ring-2 ring-secondary-500 ring-offset-2 scale-105': isSelected(attribute.name, item.term_name),
                    'opacity-50 cursor-not-allowed': !isActive(attribute.name, item.term_name),
                    'cursor-pointer hover:scale-105 hover:shadow-lg': isActive(attribute.name, item.term_name)
                  }"
                  class="group relative aspect-square rounded-xl overflow-hidden border-2 border-neutral-200 transition-all duration-300 ease-out">

                  <!-- Renk Resmi -->
                  <NuxtImg :src="getTermImageSrc(item, item.term_name)" :alt="item.term_name" width="120" height="120"
                    fit="cover"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />

                  <!-- Hover Overlay -->
                  <div
                    class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none">
                  </div>

                  <!-- Renk Adı -->
                  <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <span class="text-xs font-medium text-white truncate block">{{ item.term_name }}</span>
                  </div>
                </div>
              </div>

              <!-- Loading State -->
              <div v-else class="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
                <div v-for="item in 6" :key="item" class="aspect-square rounded-xl bg-neutral-200 animate-pulse"></div>
              </div>
            </div>
          </div>

          <div class="p-0 duration-300 grid gap-1 mt-pad-1"
            :class="{ 'rounded-md p-2 border border-red-400 ': selectionRequired }"
            v-else-if="attribute.name.toLowerCase() != 'renk'">
            <p v-if="selectionRequired" class="text-sm text-red-500">Lütfen seçim yapın</p>

            <p class="font-medium text-sm">{{ attribute.name }}</p>
            <div class="flex space-x-2 ">
              <UButton class="cursor-pointer font-normal" size="md" color="gray" v-for="option in attribute.options"
                :key="option.term_name" :class="{
                  '!bg-secondary-500 text-white': isSelected(
                    attribute.name,
                    option.term_name
                  ),
                }" :disabled="!isActive(attribute.name, option.term_name)"
                @click="selectOption(attribute.name, option.term_name)">
                {{ option.term_name }}
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <PartialsProductInputItem :product="props.productState.product" />

    <div>
      <div>
        <div v-if="getSelectedVariation">
          <PartialsProductPrice type="page" :sale-price="getSelectedVariation.sale_price"
            :price="getSelectedVariation.price" />
        </div>
        <div v-else>
          <PartialsProductPrice type="page" :sale-price="props.productState.product.sale_price"
            :price="props.productState.product.price" />
        </div>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row justify-between lg:justify-start space-y-4 lg:space-y-0 lg:space-x-4">
      <!-- Sayaç ve Butonlar Bölümü -->
      <div class="space-y-4">
        <!-- Mobil Düzen (lg altı) -->
        <div class="lg:hidden space-y-4">
          <!-- Sayaç -->
          <div class="flex justify-center">
            <UInput type="number" v-model="qyt" min="1" max="99" class="w-fit counter-height" size="sm" />
          </div>

          <!-- Butonlar -->
          <div class="flex flex-col space-y-3">
            <!-- Sepete Ekle Butonu -->
            <UButton :loading="cartState.addToCartloading" @click="addToCart()" color="secondary"
              class="!rounded-full font-bold flex justify-center relative text-sm px-6 overflow-hidden w-full text-white">
              <Icon name="material-symbols:shopping-bag" class="w-14 h-14 absolute left-0 top-0 opacity-30">
              </Icon>
              <p class="text-white">SEPETE EKLE</p>
            </UButton>

            <!-- WhatsApp Sipariş Butonu -->
            <UButton @click="orderViaWhatsApp()"
              class="group relative !rounded-full font-bold flex justify-center items-center text-sm px-6  w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ">
              <!-- WhatsApp Icon with Animation -->
              <div class="relative flex items-center">
                <svg class="w-5 h-5 mr-2 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787" />
                </svg>
                <span class="relative">
                  WhatsApp Sipariş
                  <!-- Shimmer Effect -->
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700">
                  </div>
                </span>
              </div>

              <!-- Background Decoration -->
              <div
                class="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              </div>

              <!-- Floating Dots -->
              <div
                class="absolute -top-1 -right-1 w-3 h-3 bg-green-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping">
              </div>
            </UButton>
          </div>
        </div>

        <!-- Desktop Düzen (lg ve üstü) -->
        <div class="hidden lg:flex lg:flex-row lg:items-center lg:space-x-4">
          <div>
            <UInput type="number" v-model="qyt" min="1" max="99" class="counter-height"></UInput>
          </div>

          <div class="flex space-x-4">
            <UButton :loading="cartState.addToCartloading" @click="addToCart()" color="secondary"
              class="!rounded-full font-bold flex justify-center relative text-sm lg:!px-12 px-6 overflow-hidden min-w-[180px] text-white">
              <Icon name="material-symbols:shopping-bag" class="w-14 h-14 absolute left-0 top-0 opacity-30">
              </Icon>
              <p class="text-white">SEPETE EKLE</p>
            </UButton>

            <UButton @click="orderViaWhatsApp()"
              class="group relative !rounded-full font-bold flex justify-center items-center text-sm lg:!px-8 px-6 min-w-[180px] bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <!-- WhatsApp Icon with Animation -->
              <div class="relative flex items-center">
                <svg class="w-5 h-5 mr-2 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787" />
                </svg>
                <span class="relative">
                  WhatsApp Sipariş
                  <!-- Shimmer Effect -->
                  <div
                    class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700">
                  </div>
                </span>
              </div>

              <!-- Background Decoration -->
              <div
                class="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              </div>

              <!-- Floating Dots -->
              <div
                class="absolute -top-1 -right-1 w-3 h-3 bg-green-300 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping">
              </div>
            </UButton>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
const props = defineProps(["attrsAndVarsState", "productState"]);
const cartState = useCartState()
const qyt = ref(1)
const currentRoute = useRouter().currentRoute.value
const toast = useToast()


const {
  isActive,
  selectOption,
  isSelected,
  selectedOptions,
  getSelectedVariation,
  getTermImageSrc,
} = useVariationsFront();


const isVariableProduct = computed(() => {
  return props.attrsAndVarsState.some(i => i.useForVariation === 1)
})

const selectedColor = ref(null)
const selectColorOption = (attributeName, termName, item) => {

  selectedColor.value = item
  selectOption(attributeName, termName, item)

}

const initialColor = () => {
  const colorTermId = currentRoute.params?.urlParams.split('-')[1]
  if (colorTermId) {
    const color = props.attrsAndVarsState.find(i => i.name === 'Renk');
    const colorTerm = color?.options.find(c => c.term_id === parseInt(colorTermId))
    selectedColor.value = colorTerm
    selectOption('Renk', colorTerm?.term_name, colorTerm)
  }
};
initialColor()



const selectionRequired = ref(false)
const addToCart = () => {

  if (!getSelectedVariation.value && isVariableProduct.value) {
    selectionRequired.value = true
    return
  } else {
    selectionRequired.value = false
  }

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
    // Basit ürün için
    newCartItem = {
      ...newCartItem,
      product_id: props.productState.product.id,
      product_name: props.productState.product.name + ' ' + (selectedColor.value?.term_name || ''),
      image_id: props.productState.product.selectedColorTermImages?.[0]?.id || props.productState.product.selectedImages?.[0]?.id,
      qyt: parseInt(qyt.value),
      price: props.productState.product.sale_price ? props.productState.product.sale_price : props.productState.product.price, // Ürünün fiyatını ekle
      total: (props.productState.product.sale_price ? props.productState.product.sale_price : props.productState.product.price) * parseInt(qyt.value) // Toplam tutarı hesapla
    };
  }

  // Sepeti güncelle
  cartState.patchCart(newCartItem, parseInt(qyt.value));

};

const orderViaWhatsApp = () => {
  // Varyasyon kontrolü
  if (!getSelectedVariation.value && isVariableProduct.value) {
    selectionRequired.value = true
    toast.add({
      title: 'Lütfen ürün seçeneklerini belirleyin!',
      color: 'red',
      icon: "i-heroicons-exclamation-triangle",
    })
    return
  } else {
    selectionRequired.value = false
  }

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
    toast.add({
      title: 'Lütfen geçerli bir miktar seçin!',
      color: 'red',
      icon: "i-heroicons-exclamation-triangle",
    })
    return;
  }

  // Ürün bilgilerini hazırla
  const selectedVariation = getSelectedVariation.value;
  const productName = props.productState.product.name;
  const colorName = selectedColor.value?.term_name || '';
  const quantity = qyt.value;

  // Fiyat hesaplama
  let price;
  if (selectedVariation) {
    price = selectedVariation.sale_price || selectedVariation.price;
  } else {
    price = props.productState.product.sale_price || props.productState.product.price;
  }

  const totalPrice = price * quantity;

  // Varyasyon bilgilerini topla
  let variationText = '';
  if (selectedVariation && selectedVariation.attributes) {
    const variations = Object.entries(selectedVariation.attributes)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');
    variationText = variations ? `\n📋 Seçenekler: ${variations}` : '';
  }

  // Input değeri varsa ekle
  let inputText = '';
  if (inputValue && input) {
    inputText = `\n📝 ${input.label}: ${inputValue}`;
  }

  // Renk bilgisi ekle
  let colorText = '';
  if (colorName) {
    colorText = `\n🎨 Renk: ${colorName}`;
  }

  // WhatsApp mesajını oluştur
  const message = `🛍️ *Sipariş Talebi*

📦 *Ürün:* ${productName}${colorText}${variationText}${inputText}
📊 *Miktar:* ${quantity} adet
💰 *Birim Fiyat:* ${price.toLocaleString('tr-TR')} ₺
💳 *Toplam:* ${totalPrice.toLocaleString('tr-TR')} ₺

🌐 *Ürün Linki:* ${window.location.href}

Merhaba! Yukarıdaki ürün için sipariş vermek istiyorum. Detayları inceleyip bana geri dönüş yapabilir misiniz?`;

  // WhatsApp numarası (bu değeri kendi numaranızla değiştirin)
  const whatsappNumber = '905436024821'; // Gerçek numara

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

watch(getSelectedVariation, () => {
  selectionRequired.value = false
})

</script>

<style scoped>
.counter-height :deep(.ui-form-counter) {
  height: 2.75rem;
  /* UButton'ların varsayılan yüksekliği ile eşleşir */
}

.counter-height :deep(.ui-form-counter button),
.counter-height :deep(.ui-form-counter input) {
  height: 2.75rem;
}
</style>
