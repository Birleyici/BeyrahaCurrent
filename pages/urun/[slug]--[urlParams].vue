<template>
  <div class="lg:px-x-desktop max-w-full">
    <div class="lg:grid lg:grid-cols-8 lg:gap-4 xl:gap-16">
      <div class="col-span-3" v-if="$mainState.isLoaded">
        <PartialsProductImageGallery :alt="productState.product.name" :images="selectedImages" />
      </div>
      <SkeletonProductGallery v-else></SkeletonProductGallery>

      <div class="col-span-5 my-minimal lg:my-0 px-x-mobil">
        <h1 class="text-2xl font-medium pb-2">
          {{ productState.product.name }}
        </h1>

        <PartialsProductVariations :attrs-and-vars-state="attributeState.transformedAttrs"
          :product-state="productState">
        </PartialsProductVariations>

        <div class="p-1 my-4 border  bg-slate-50   rounded-md mb-4 inline-block">
          <div class="flex items-center space-x-2 ">
            <img src="/logo.jpg" width="100" class="border  bg-white rounded-md w-8 h-8 object-contain p-1" alt="">
            <div class="flex space-x-2 items-center">
              <p class="font-medium text-sky-500 text-sm">Beyraha</p>
              <div>
                <UBadge color="orange" label="9.8" size="xs" />
              </div>
            </div>
          </div>
        </div>

        <div class=" bg-tertiary-50 border rounded-md py-4 px-6">
          <p class="font-medium mb-2">Öne çıkan bilgiler</p>
          <ul class="list-disc grid gap-2 text-sm">
            <li>15 gün içerisinde ücretsiz iade</li>
            <li v-for="feature in productState.product.featured_infos.slice(0, 2)">
              {{ feature.content }}
            </li>
            <div @click="goInfo()" v-if="productState.product?.featured_infos?.length > 2"
              class="cursor-pointer w-full  flex  space-x-2 items-center">
              <p class="underline">Tüm ürün bilgilerini gör</p>
              <UIcon name="i-heroicons-chevron-double-down" />
            </div>
          </ul>
        </div>
      </div>
    </div>


    <div ref="product_information" class="my-minimal lg:my-maximal px-x-mobil lg:px-0">
      <PartialsProductInformation :attributes="attributeState.transformedAttrs" />
    </div>
    <div class="px-x-mobil md:px-0">
      <UiSlidesProductSlide id="product_page_slide_1" title="Benzer Ürünler" :filters="{
        selectedCategoryIds: JSON.stringify(productCategoryIds),
        piece: 8
      }">
      </UiSlidesProductSlide>
    </div>

    <!-- <PartialsProductComment /> -->
  </div>
</template>

<script setup>
const productState = useProductState();
const attributeState = useAttributeState();
const variationsFrontState = useVariationsFrontState();
const product_information = ref(null)
const productCategoryIds = computed(() => {
  return productState.product.selectedCategories.map(c => c.id)
})

const route = useRoute();

const { transform } = useVariationsFront();

await useAsyncData("initProductPageData", async () => {
  const response = await productState.fetchProduct(route.params)
  await variationsFrontState.fetchVariations(response.id)
  await attributeState.fetchAttributes(response.id, route.params)
  return true
})

// Ürün ismini kontrol et ve hata yönetimi uygula
await useErrorHandle(productState.product.name);

onMounted(async () => {
  await productState.fetchCategoryProducts(productState.product.selectedCategories)
})

attributeState.transformedAttrs = transform(
  attributeState.attributes || [],
  variationsFrontState.variations || []
);

const selectedImages = computed(() => {
  return productState.product.selectedColorTermImages?.length
    ? productState.product.selectedColorTermImages
    : productState.product.selectedImages;
});



useHead({
  title: `${productState.product.name}`,
  meta: [
    { name: 'description', content: productState.product.description }
  ],
})

const goInfo = () => {
  console.log(product_information)
  product_information.value?.scrollIntoView({ behavior: "smooth" })

}
</script>
