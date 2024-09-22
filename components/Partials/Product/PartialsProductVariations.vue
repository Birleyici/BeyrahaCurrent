<template>
  <div class="space-y-y-mobile md:space-y-y-desktop ">
    <div>
      <div v-for="attribute in props.attrsAndVarsState" :key="attribute.name">
        <!-- Öznitelik Adı -->
        <div>
          <div v-if="attribute.name.toLowerCase() == 'renk' && attribute?.options?.length > 1">
            <div>
              <div class="flex space-x-2 items-center">
                <p class="font-medium text-sm">Renk:</p>
                <p class="text-sm">{{ selectedOptions['Renk'] }}</p>
              </div>

              <UCarousel v-if="$mainState.isLoaded" v-slot="{ item }" :items="attribute.options"
                :ui="{ item: 'snap-end' }">
                <div :class="{
                  'border-2 !border-secondary-500 text-white': isSelected(
                    attribute.name,
                    item.term_name
                  ),
                }" class=" border w-[80px] h-[80px] rounded-full mr-2 overflow-hidden cursor-pointer">
                  <NuxtImg
                    @click="isActive(attribute.name, item.term_name) && selectColorOption(attribute.name, item.term_name, item)"
                    :src="getTermImageSrc(item, item.term_name)" :class="{
                      'opacity-50 cursor-not-allowed': !isActive(attribute.name, item.term_name),
                    }" width="80" height="120" fit="cover" />
                </div>
              </UCarousel>
              <div class="flex space-x-2" v-else>
                <SkeletonUiThumb v-for="item in 4" :key="item"></SkeletonUiThumb>
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
        class="!rounded-full font-bold flex justify-center relative text-sm lg:!px-12 px-6 overflow-hidden min-w-[180px] ">
        <Icon name="material-symbols:shopping-bag" class="w-14 h-14 absolute left-0 top-0 opacity-30">
        </Icon>
        <p>SEPETE EKLE</p>
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


const isActiveAddToCartButton = computed(() => {
  return getSelectedVariation.value === null
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

  if (!getSelectedVariation.value) {
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



</script>
