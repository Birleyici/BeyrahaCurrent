<template>
  <div class="bg-neutral-50 dark:bg-neutral-900 min-h-screen transition-colors duration-300">
    <!-- Breadcrumb -->
    <UiCommonBreadcrumb :links="breadcrumbLinks" />

    <!-- Ürün Detay -->
    <section class="pb-8 md:py-8 lg:py-12">
      <div class="md:container mx-auto  md:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-12 lg:gap-12 space-y-6 lg:space-y-0">
          <!-- Ürün Görselleri - Mobilde tam genişlik -->
          <div id="product-gallery" class="col-span-5  md:mx-0" v-if="$mainState.isLoaded">
            <div class="lg:sticky lg:top-24">
              <PartialsProductImageGallery :alt="productState.product.name" :images="selectedImages" />
            </div>
          </div>
          <SkeletonProductGallery v-else class="col-span-5  md:mx-0"></SkeletonProductGallery>

          <!-- Ürün Bilgileri -->
          <div class="col-span-7 px-4 md:px-0">
            <div class="space-y-6 md:space-y-8">
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
                class="bg-white dark:bg-neutral-800 rounded-none md:rounded-xl border-0 md:border border-neutral-200 dark:border-neutral-700 p-4 md:p-6 shadow-none md:shadow-sm transition-colors duration-300 -mx-4 md:mx-0">
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
    <section ref="product_information "
      class="py-8 lg:py-12 bg-white dark:bg-neutral-800 transition-colors duration-300">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <PartialsProductInformation :attributes="attributeState.transformedAttrs" />
      </div>
    </section>

    <!-- Ürün Yorumları -->
    <section class="py-8 lg:py-12 bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      <div class="md:container md:mx-auto md:px-6 lg:px-8">
        <ProductReviewsSection v-if="productState.product && productState.product.id" :product="productState.product" />
      </div>
    </section>

    <!-- Benzer Ürünler -->
    <UiSlidesProductSlide id="similar-products" :is-ssr="false" title="Benzer Ürünler"
      :filters="similarProductsFilters" />

    <!-- Admin Edit Button - Sabit konumda sol alt köşe -->
    <div v-if="isAdmin" class="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50">
      <UButton :to="`/management/urunler/${productState.product.id}`" color="orange" variant="solid" size="lg"
        icon="i-heroicons-pencil-square"
        class="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm" :ui="{
          rounded: 'rounded-full',
          background: 'bg-orange-500/90 hover:bg-orange-600/90 dark:bg-orange-600/90 dark:hover:bg-orange-700/90'
        }" title="Ürünü Düzenle">
        <span class="hidden sm:inline ml-2">Düzenle</span>
      </UButton>
    </div>
  </div>
</template>

<script setup>
const productState = useProductState();
const attributeState = useAttributeState();
const variationsFrontState = useVariationsFrontState();
const product_information = ref(null)
const { settings } = useSettings()

// Auth kontrolü için
const authStore = useAuthStore()

// Admin kontrolü - currentUser'da role bilgisi varsa kullan, yoksa management route'una erişimi kontrol et
const isAdmin = computed(() => {
  // Basit kontrol: kullanıcı giriş yapmış mı ve token var mı
  if (!authStore.token || !authStore.currentUser || !authStore.currentUser.user) {
    return false;
  }

  // Rol bilgisi kontrolü - doğru yapı: authStore.currentUser.user.role
  if (authStore.currentUser.user.role) {
    return authStore.currentUser.user.role === 'admin' || authStore.currentUser.user.role === 'manager';
  }

  return false;
});

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

  // Kullanıcı giriş yapmışsa kullanıcı verilerini al
  if (authStore.token) {
    await authStore.fetchUser()
  }

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
