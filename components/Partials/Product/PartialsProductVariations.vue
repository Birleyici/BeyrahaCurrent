<template>
  <div>
    <div>
      <div v-for="attribute in props.attrsAndVarsState" :key="attribute.name">
        <!-- Öznitelik Adı -->
        <div class="mb-4">
          <div class="my-minimal" v-if="attribute.name.toLowerCase() == 'renk'">
            <div>

              <div class="flex space-x-2 items-center">
                <p class="font-medium text-sm">Renk:</p>
                <p class="text-sm">{{ selectedOptions['Renk'] }}</p>
              </div>

              <UCarousel v-if="$mainState.isLoaded" v-slot="{ item }" :items="attribute.options"
                :ui="{ item: 'snap-end' }">
                <NuxtImg @click="selectColorOption(attribute.name, item.term_name, item)"
                  :src="getTermImageSrc(item, item.term_name)" width="60"
                  class="cursor-pointer m-1 rounded-full p-[2px] border w-16 h-16 object-cover object-top" :class="{
                    'border-2 !border-secondary-500 text-white': isSelected(
                      attribute.name,
                      item.term_name
                    ),
                  }" />
              </UCarousel>
              <div class="flex space-x-2" v-else>
                <SkeletonUiThumb v-for="item in 4" :key="item"></SkeletonUiThumb>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="font-medium text-sm">{{ attribute.name }}</p>
            <div class="flex space-x-2">
              <UiButtonsBaseButton color="slate" v-for="option in attribute.options" :key="option.term_name" :class="{
                '!bg-secondary-500 text-white': isSelected(
                  attribute.name,
                  option.term_name
                ),
              }" :disabled="!isActive(attribute.name, option.term_name)"
                @click="selectOption(attribute.name, option.term_name)">
                {{ option.term_name }}
              </UiButtonsBaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <PartialsProductInputItem :product="props.productState.product" />

    <div class="my-minimal">
      <div>
        <div v-if="getSelectedVariation">
          <span v-if="getSelectedVariation.sale_price" class="flex items-center space-x-2">
            <del class="text-gray-500">{{ formatPrice(getSelectedVariation.price) }} TL</del>
            <span class="text-secondary-500 text-3xl font-bold">{{ formatPrice(getSelectedVariation.sale_price) }}
              TL</span>
          </span>
          <span v-else class="text-secondary-500 text-3xl font-bold">
            {{ formatPrice(getSelectedVariation.price) || "0" }} TL
          </span>
        </div>
        <div v-else>
          <span v-if="props.productState.product.sale_price" class="flex items-center space-x-2">
            <del class="text-gray-500">{{ formatPrice(props.productState.product.price) }} TL</del>
            <span class="text-secondary-500 text-3xl font-bold">{{ formatPrice(props.productState.product.sale_price) }}
              TL</span>
          </span>
          <span v-else class="text-secondary-500 text-3xl font-bold">
            {{ formatPrice(props.productState.product.price) || "0" }} TL
          </span>
        </div>
      </div>
    </div>
    <div class="flex justify-between lg:justify-start space-x-4 lg:space-x-8">
      <div class="inline-block">
        <UiFormCounter v-model="qyt"></UiFormCounter>
      </div>
      
      <UButton :loading="cartState.addToCartloading" @click="addToCart()" :disabled="isActiveAddToCartButton" color="secondary"
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
const { useCartState } = useStateIndex()
const cartState = useCartState()
const qyt = ref(1)
const currentRoute = useRouter().currentRoute.value


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
const selectColorOption = (attributeName, termName, item)=>{

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

const addToCart = () => {
  // Eğer miktar 0 ise işlemi durdur
  if (qyt.value == 0) {
    return;
  }
  // Ürünün varyasyonlu olup olmadığını kontrol et
  const selectedVariation = getSelectedVariation.value;

  // Eğer varyasyon yoksa, basit ürün olarak ekleme yap
  let newCartItem = {
    product_attribute_term_id: selectedColor.value.term_id
  };
  if (selectedVariation) {
    // Varyasyonlu ürün için
    newCartItem = {
      ...newCartItem,
      product_id: props.productState.product.id,
      product_name: `${props.productState.product.name} `, // Varyasyon adını ekle
      product_thumb: selectedVariation.images?.[0] || props.productState.product.selectedColorTermImages[0] || props.productState.product.selectedImages[0],
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
      product_name: props.productState.product.name + ' - ' + selectedColor.value.term_name,
      product_thumb: props.productState.product.selectedColorTermImages[0] || props.productState.product.selectedImages[0],
      qyt: parseInt(qyt.value),
      price: props.productState.product.sale_price ? props.productState.product.sale_price : props.productState.product.price, // Ürünün fiyatını ekle
      total: (props.productState.product.sale_price ? props.productState.product.sale_price : props.productState.product.price) * parseInt(qyt.value) // Toplam tutarı hesapla
    };
  }

  // Sepeti güncelle
  cartState.patchCart(newCartItem, parseInt(qyt.value));

};



</script>
