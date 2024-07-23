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

        <PartialsProductVariations :attrs-and-vars-state="attrsAndVarsState" :product-state="productState">
        </PartialsProductVariations>

        <div class="flex justify-between lg:justify-start space-x-4 lg:space-x-8">
          <div class="inline-block">
            <UiFormCounter></UiFormCounter>
          </div>
          <UiButtonsBaseButton color="secondary"
            class="!rounded-full font-bold !flex relative text-sm lg:!px-12 px-6 overflow-hidden">
            <Icon name="material-symbols:shopping-bag" class="w-14 h-14 absolute left-0 top-0 opacity-30">
            </Icon>
            <p>SEPETE EKLE</p>
          </UiButtonsBaseButton>
        </div>
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
    <UiSlidesProductSlide title="Benzer ürünler" :products="productState.categoryProducts">
    </UiSlidesProductSlide>

    <!-- <PartialsProductComment /> -->
  </div>
</template>

<script setup>
const { useAttrsAndVarsState, useProductState } = useStateIndex();
const productState = useProductState();
const attrsAndVarsState = useAttrsAndVarsState();
const slug = useRoute().params.slug;

const { getProduct } = useProductCreate();
const { getProductsByCatId } = useProduct();
const { fetchVariationsForFrontEnd, transform } = useVariationsFront();
const { fetchAttributes } = useAttributes();

await getProduct(slug);
await getProductsByCatId(productState.product.selectedCategories);
await fetchVariationsForFrontEnd(productState.product.id);
await fetchAttributes(productState.product.id);

attrsAndVarsState.attributes = transform(
  attrsAndVarsState.attributes || [],
  attrsAndVarsState.variations
);


const selectedImages = computed(() => {
  return productState.product.selectedColorTermImages?.length
    ? productState.product.selectedColorTermImages
    : productState.product.selectedImages;
});

// if (!productState.product.id) {
//     navigateTo('/')
// }
</script>
