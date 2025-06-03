<template>
  <div class="bg-neutral-50 min-h-screen">
    <!-- Ürün Detay -->
    <section class="section-spacing !pt-0">
      <div class="container">
        <!-- Breadcrumb -->
        <UiCommonBreadcrumb class="mb-6" :links="breadcrumbLinks" />

        <div class="lg:grid lg:grid-cols-12 lg:gap-12">
          <!-- Ürün Görselleri -->
          <div class="col-span-5 mt-6 lg:mt-0" v-if="$mainState.isLoaded">
            <div class="sticky top-24">
              <PartialsProductImageGallery :alt="productState.product.name" :images="selectedImages" />
            </div>
          </div>
          <SkeletonProductGallery v-else class="col-span-5 mt-6 lg:mt-0"></SkeletonProductGallery>

          <!-- Ürün Bilgileri -->
          <div class="col-span-7 mt-6 lg:mt-0">
            <div class="space-y-8">
              <!-- Ürün Başlığı -->
              <div>
                <h1 class="text-heading-1 font-bold text-neutral-900 mb-4">
                  {{ productState.product.name }}
                </h1>
              </div>

              <!-- Ürün Varyasyonları -->
              <PartialsProductVariations :attrs-and-vars-state="attributeState.transformedAttrs"
                :product-state="productState" />

              <!-- Öne Çıkan Bilgiler -->
              <div class="card">
                <div class="card-body">
                  <h3 class="font-semibold text-neutral-900 mb-4">Öne çıkan bilgiler</h3>
                  <ul class="space-y-2 text-neutral-700">
                    <li class="flex items-start space-x-2">
                      <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>15 gün içerisinde ücretsiz iade</span>
                    </li>
                    <li v-for="feature in productState.product.featured_infos.slice(0, 2)" :key="feature.id"
                      class="flex items-start space-x-2">
                      <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{{ feature.content }}</span>
                    </li>
                  </ul>

                  <button @click="goInfo()" v-if="productState.product?.featured_infos?.length > 2"
                    class="mt-4 group flex items-center space-x-2 text-secondary-600 hover:text-secondary-700 font-medium transition-colors duration-200">
                    <span>Tüm ürün bilgilerini gör</span>
                    <UIcon name="i-heroicons-chevron-down"
                      class="w-4 h-4 transition-transform duration-200 group-hover:translate-y-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ürün Açıklaması -->
    <section ref="product_information" class="section-spacing bg-white">
      <div class="container">
        <PartialsProductInformation :attributes="attributeState.transformedAttrs" />
      </div>
    </section>

    <!-- Benzer Ürünler -->
    <section class="section-spacing">
      <UiSlidesProductSlide id="product_page_slide_1" title="Benzer Ürünler" :filters="{
        selectedCategoryIds: JSON.stringify(productCategoryIds),
        exceptId: productState.product.id,
        piece: 8
      }" />
    </section>


  </div>
</template>

<script setup>
const productState = useProductState();
const attributeState = useAttributeState();
const variationsFrontState = useVariationsFrontState();
const product_information = ref(null)
const productCategoryIds = computed(() => {
  return productState.product.categories?.map(c => c.id) || []
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
  await productState.fetchCategoryProducts(productState.product.categories || [])
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
  product_information.value?.scrollIntoView({ behavior: "smooth" })
}

const breadcrumbLinks = computed(() => {
  const links = [{
    label: 'Ana Sayfa',
    to: '/'
  }]

  // Kategorileri ekle - product.categories kullan
  if (productState.product.categories?.length > 0) {
    const mainCategory = productState.product.categories[0]

    links.push({
      label: mainCategory.name,
      to: `/${mainCategory.slug}-a${mainCategory.id}`
    })
  }

  // Ürün adını ekle
  links.push({
    label: productState.product.name
  })

  return links
})
</script>
