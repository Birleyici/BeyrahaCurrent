<template>
    <div class="lg:px-x-desktop max-w-full">
        <div class="lg:grid lg:grid-cols-8 lg:gap-4 xl:gap-16">
            <div class="col-span-3" v-if="$mainState.isLoaded">
                <PartialsProductImageGallery :images="selectedImages" />
            </div>

            <SkeletonProductGallery v-else></SkeletonProductGallery>

            <div class="col-span-5 my-minimal lg:my-0 px-x-mobil">
                <h1 class="text-2xl font-semibold pb-2">
                    {{ productState.name }}
                </h1>
                <UDivider class="my-2" type="dashed" />



                <PartialsProductVariations></PartialsProductVariations>

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
                        <li v-for="feature in productState.featured_infos">
                            {{ feature.content }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="my-minimal lg:my-maximal px-x-mobil lg:px-0">
            <UiCardsSectionCard title="Ürün açıklaması ve özellikleri">
                <div v-html="productState.additional_info"></div>
                <div
                    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-4 mt-minimal">
                    <ClientOnly>
                        <div class="flex lg:block items-center space-x-4 lg:space-x-0 bg-tertiary-100 p-3 lg:p-4 w-full rounded-sm"
                            v-for="attr in attrsAndVarsState.attributes" :key="attr.name">
                            <p class="font-medium">{{ attr.name }}</p>
                            <div class="text-xs flex" v-for="(term, index) in attr.options" :key="index">
                                {{ term.term_name }}<span v-if="index < attr.options.length - 1">, </span>
                            </div>
                        </div>
                    </ClientOnly>
                </div>
            </UiCardsSectionCard>
        </div>

        <UiSlidesProductSlide title="Benzer ürünler" :products="productFrontState.categoryProducts"></UiSlidesProductSlide>


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
        {{ productState.selectedColorTermImages }}
    </div>
</template>

<script setup>
const { useAttrsAndVarsState, useNewProductStore, useProductState } = useStateIndex()
const productState = useNewProductStore()
const productFrontState = useProductState()

const { getProduct } = useProductCreate();
const attrsAndVarsState = useAttrsAndVarsState()
const { getProductsByCatId } = useProduct()
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