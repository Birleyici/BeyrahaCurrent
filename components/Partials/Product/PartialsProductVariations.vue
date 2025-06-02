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
    <div class="flex justify-between lg:justify-start space-x-4 lg:space-x-8">
      <div class="inline-block">
        <UiFormCounter v-model="qyt"></UiFormCounter>
      </div>

      <UButton :loading="cartState.addToCartloading" @click="addToCart()" color="secondary"
        class="!rounded-full font-bold flex justify-center relative text-sm lg:!px-12 px-6 overflow-hidden min-w-[180px] text-white">
        <Icon name="material-symbols:shopping-bag" class="w-14 h-14 absolute left-0 top-0 opacity-30">
        </Icon>
        <p class="text-white">SEPETE EKLE</p>
      </UButton>
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

watch(getSelectedVariation, () => {
  selectionRequired.value = false
})

</script>
