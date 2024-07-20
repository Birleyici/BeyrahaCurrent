<template>
    <div class="lg:px-x-desktop max-w-full">
       

        <div class="px-6 lg:px-0 mt-minimal lg:mt-maximal" v-if="categoryProducts.length > 0">
            <p class="mb-2 font-bold">Benzer ürünler</p>
            <UiSlidesProductSlide :products="categoryProducts"></UiSlidesProductSlide>
        </div>

        <div class="px-6 lg:px-0 mt-minimal lg:mt-maximal">
            <p class="mb-2 font-bold">Yorum yap</p>

            <UiNotificationBar type="info">Ürüne yalnızca ürünü satın alan oturum açmış kullanıcılar yorum
                yapabilir.
            </UiNotificationBar>

            <UiFormTextarea class="h-60 my-minimal border-quaternary-300" placeholder="Yorumunuz"></UiFormTextarea>

            <div class="mb-minimal space-y-minimal lg:space-y-0 lg:flex items-center justify-between">
                <UiFormFileInput></UiFormFileInput>
                <UiFormSelect class="!w-full lg:!w-72">
                    <option value="">Ürüne puanınız</option>
                    <option class="text-secondary-500" value="">★</option>
                    <option class="text-secondary-500" value="">★★</option>
                    <option class="text-secondary-500" value="">★★★</option>
                    <option class="text-secondary-500" value="">★★★★</option>
                    <option class="text-secondary-500" value="">★★★★★</option>
                </UiFormSelect>
            </div>
            <UiButtonsBaseButton color="secondary">Yorumu gönder</UiButtonsBaseButton>
        </div>

        <div class="px-6 lg:px-0 mt-minimal lg:mt-maximal">
            <div class="mb-2 font-bold flex items-end space-x-2">
                <p>Yorumlar</p>
            </div>
            <div class="text-xl my-minimal font-medium flex space-x-2">
                <p class="text-secondary-500">3.8</p>
                <p>(253 değerlendirme)</p>
            </div>

            <div class="grid gap-4 border-b border-dotted pb-3">
                <PartialsCommentItem></PartialsCommentItem>
            </div>
        </div>
    </div>
</template>

<script setup>
const { useAttrsAndVarsState, useNewProductStore } = useStateIndex()
const { getProduct } = useProductCreate();
const productState = useNewProductStore()
const attrsAndVarsState = useAttrsAndVarsState()
const { categoryProducts, getProductsByCatId } = useProduct()
const slug = useRoute().params.slug
await getProduct(slug);
await getProductsByCatId(productState.selectedCategories)


const selectedImages = computed(() => {
  return productState.selectedColorTermImages?.length ? productState.selectedColorTermImages : productState.selectedImages;
});

// if (!productState.id) {
//     navigateTo('/')
// }
</script>