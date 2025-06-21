<template>
  <div class="bg-neutral-50 dark:bg-neutral-900 min-h-screen transition-colors duration-300">
    <!-- Ürün Detay -->
    <section class="page-content-spacing !mt-0 !pt-0">
      <div class="container">
        <!-- Breadcrumb -->
        <UiCommonBreadcrumb class="mb-3 md:mb-8" :links="breadcrumbLinks" />

        <div class="lg:grid lg:grid-cols-12 lg:gap-12 space-y-8 lg:space-y-0">
          <!-- Ürün Görselleri -->
          <div class="col-span-5" v-if="$mainState.isLoaded">
            <div class="sticky top-24">
              <PartialsProductImageGallery :alt="productState.product.name" :images="selectedImages" />
            </div>
          </div>
          <SkeletonProductGallery v-else class="col-span-5"></SkeletonProductGallery>

          <!-- Ürün Bilgileri -->
          <div class="col-span-7">
            <div class="content-gap">
              <!-- Ürün Başlığı -->
              <div>
                <h1 class="text-heading-1 font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  {{ productState.product.name }}
                </h1>
              </div>

              <!-- Ürün Varyasyonları -->
              <PartialsProductVariations :attrs-and-vars-state="attributeState.transformedAttrs"
                :product-state="productState" />

              <!-- Öne Çıkan Bilgiler -->
              <div
                class="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 shadow-sm transition-colors duration-300">
                <h3 class="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Öne çıkan bilgiler</h3>
                <ul class="space-y-3 text-neutral-700 dark:text-neutral-300">
                  <li class="flex items-start space-x-3">
                    <UIcon name="i-heroicons-check-circle"
                      class="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span>15 gün içerisinde ücretsiz iade</span>
                  </li>
                  <li v-for="feature in productState.product.featured_infos.slice(0, 2)" :key="feature.id"
                    class="flex items-start space-x-3">
                    <UIcon name="i-heroicons-check-circle"
                      class="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{{ feature.content }}</span>
                  </li>
                </ul>

                <button @click="goInfo()" v-if="productState.product?.featured_infos?.length > 2"
                  class="mt-4 group flex items-center space-x-2 text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 font-medium transition-colors duration-200">
                  <span>Tüm ürün bilgilerini gör</span>
                  <UIcon name="i-heroicons-chevron-down"
                    class="w-4 h-4 transition-transform duration-200 group-hover:translate-y-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ürün Açıklaması -->
    <section ref="product_information"
      class="enhanced-section-spacing bg-white dark:bg-neutral-800 transition-colors duration-300">
      <div class="container">
        <PartialsProductInformation :attributes="attributeState.transformedAttrs" />
      </div>
    </section>

    <!-- Benzer Ürünler -->
    <UiSlidesProductSlide id="similar-products" :is-ssr="false" title="Benzer Ürünler"
      :filters="similarProductsFilters" />
  </div>
</template>

<script setup>
const productState = useProductState();
const attributeState = useAttributeState();
const variationsFrontState = useVariationsFrontState();
const product_information = ref(null)
const { settings } = useSettings()
const productCategoryIds = computed(() => {
  const categoryIds = productState.product.categories?.map(c => c.id) || []
  console.log('Product categories:', productState.product.categories)
  console.log('Product category IDs computed:', categoryIds)
  return categoryIds
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
  title: computed(() => `${productState.product.name} - ${settings.value.siteName}`),
  meta: [
    {
      name: 'description',
      content: computed(() => productState.product.short_description || productState.product.name)
    }
  ]
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

const similarProductsFilters = computed(() => {
  const filters = {
    selectedCategoryIds: JSON.stringify(productCategoryIds.value),
    piece: 8
  }
  console.log('Similar products filters:', filters)
  console.log('Product category IDs:', productCategoryIds.value)
  return filters
})
</script>
