<template>
  <div class="lg:px-x-desktop max-w-full">
    <div class="lg:grid lg:grid-cols-8 lg:gap-4 xl:gap-16">
      <div class="col-span-3" v-if="$mainState.isLoaded">
        <PartialsProductImageGallery :images="selectedImages" />
      </div>
      <SkeletonProductGallery v-else></SkeletonProductGallery>

      <div class="col-span-5 my-minimal lg:my-0 px-x-mobil">
        <h1 class="text-2xl font-semibold pb-2">
          {{ productState.product.name }}
        </h1>
        <UDivider class="my-2" type="dashed" />
        <PartialsProductVariations :attrs-and-vars-state="attributeState.transformedAttrs"
          :product-state="productState">
        </PartialsProductVariations>

        <div class="my-minimal lg:my-maximal bg-tertiary-50 border rounded-md p-4">
          <p class="font-medium">Öne çıkan bilgiler</p>
          <ul class="list-disc p-4 !pl-5 text-sm">
            <li>15 gün içerisinde ücretsiz iade</li>
            <li v-for="feature in productState.product.featured_infos">
              {{ feature.content }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="my-minimal lg:my-maximal px-x-mobil lg:px-0">
      <PartialsProductInformation :additional_info="productState.product.additional_info"
        :attributes="attrsAndVarsState.attributes" />
    </div>
    <ClientOnly>

      <div class="px-x-mobil md:px-0">
        <LazyUiSlidesProductSlide title="Benzer ürünler" :products="productState.categoryProducts">
        </LazyUiSlidesProductSlide>
      </div>
    </ClientOnly>

    <!-- <PartialsProductComment /> -->
  </div>
</template>

<script setup>
const productState = useProductState();
const attributeState = useAttributeState();
const variationsFrontState = useVariationsFrontState();
const attrsAndVarsState = useAttrsAndVarsState();

const route = useRoute();

const { transform } = useVariationsFront();

await useAsyncData("initProductPageData", async () => {
  const response = await productState.fetchProduct(route.params)
  await variationsFrontState.fetchVariations(response.id)
  await attributeState.fetchAttributes(response.id, route.params)
  return true
})


onMounted(async() => {
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
</script>
