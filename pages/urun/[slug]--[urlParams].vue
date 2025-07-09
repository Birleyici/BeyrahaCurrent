<template>
  <div class="bg-neutral-50 dark:bg-neutral-900 min-h-screen">
    <!-- Breadcrumb -->
    <UiCommonBreadcrumb :links="breadcrumbLinks" />

    <!-- Ürün Detay -->
    <section class="pb-6 md:py-10 lg:py-12">
      <div class="md:container mx-auto  md:px-6 lg:px-8">
        <div class="lg:grid lg:grid-cols-12 lg:gap-8 xl:gap-12 space-y-8 lg:space-y-0">
          <!-- Ürün Görselleri -->
          <div id="product-gallery" class="col-span-5" v-if="$mainState.isLoaded">
            <div class="lg:sticky lg:top-24">
              <!-- Resim Galerisi -->
              <PartialsProductImageGallery :alt="productState.product.name" :images="selectedImages"
                :current-index="productState.product.galleryCurrentIndex" :video="productVideoData"
                :color-video="selectedColorVideoData" :title="productState.product.name" />
            </div>
          </div>
          <SkeletonProductGallery v-else class="col-span-5" />

          <!-- Ürün Bilgileri -->
          <div class="col-span-7">
            <div class="space-y-8">
              <!-- Ürün Başlığı -->
              <header>
                <h1
                  class="px-4 text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
                  {{ productState.product.name }}
                </h1>

                <!-- Değerlendirme Yıldızları -->
                <div v-if="productState.product.review_count > 0" class="px-4 mt-3">
                  <button @click="scrollToReviews"
                    class="group flex items-center space-x-2 hover:opacity-80 transition-opacity">
                    <UiCommonStarRating :rating="productState.product.average_rating"
                      :review-count="productState.product.review_count" size="md" />
                    <span
                      class="text-sm text-neutral-500 dark:text-neutral-400 group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors">
                      değerlendirme
                    </span>
                  </button>
                </div>
              </header>

              <!-- Ürün Varyasyonları -->
              <div class="px-4">
                <PartialsProductVariations :attrs-and-vars-state="attributeState.transformedAttrs"
                  :product-state="productState" />
              </div>


            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ürün Açıklaması -->
    <section ref="productInformation" class="py-8 lg:py-12 bg-white dark:bg-neutral-800">
      <div class="md:container mx-auto px-4 md:px-6 lg:px-8">
        <PartialsProductInformation :attributes="attributeState.transformedAttrs" />
      </div>
    </section>

    <!-- Soru-Cevap Bölümü -->
    <section class="py-8 lg:py-12 bg-neutral-50 dark:bg-neutral-900">
      <div class="md:container mx-auto md:px-6 lg:px-8">
        <ProductQASection v-if="productState.product && productState.product.id" :product="productState.product" />
      </div>
    </section>

    <!-- Ürün Yorumları -->
    <section ref="reviewsSection" class="py-10 lg:py-12 bg-white dark:bg-neutral-800">
      <div class="md:container mx-auto px-4 md:px-6 lg:px-8">
        <ProductReviewsSection v-if="productState.product && productState.product.id" :product="productState.product" />
      </div>
    </section>

    <!-- Benzer Ürünler -->
    <section class="py-10 lg:py-12 bg-neutral-50 dark:bg-neutral-900">

      <div class="md:container mx-auto px-4 md:px-6 lg:px-8">
        <UiSlidesProductSlide id="similar-products" :is-ssr="false" title="Benzer Ürünler"
          :filters="similarProductsFilters" />
      </div>
    </section>

    <!-- Admin Edit Button -->
    <div v-if="isAdmin" class="fixed bottom-6 left-6 z-50">
      <UButton :to="`/management/urunler/${productState.product.id}`" color="green" variant="solid" size="lg"
        icon="i-heroicons-pencil-square"
        class="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm" :ui="{
          rounded: 'rounded-full',
          background: 'bg-secondary-500/90 hover:bg-secondary-600/90 dark:bg-secondary-600/90 dark:hover:bg-secondary-700/90'
        }" title="Ürünü Düzenle">
        <span class="ml-2">Düzenle</span>
      </UButton>
    </div>
  </div>
</template>

<script setup>
const productState = useProductState();
const attributeState = useAttributeState();
const variationsFrontState = useVariationsFrontState();
const productInformation = ref(null)
const reviewsSection = ref(null)
const { settings } = useSettings()
const { $mainState } = useNuxtApp()

// Auth kontrolü için
const authStore = useAuthStore()

// Admin kontrolü - currentUser.user.role yapısına göre düzeltildi
const isAdmin = computed(() => {
  // Token ve currentUser kontrolü
  if (!authStore.token || !authStore.currentUser) {
    return false;
  }

  // currentUser.user.role yapısına göre kontrol
  if (authStore.currentUser && authStore.currentUser.role) {
    return authStore.currentUser.role === 'admin' || authStore.currentUser.role === 'manager';
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

await useAsyncData(`product-${route.params.slug}-${route.params.urlParams}`, async () => {
  // Loading state'ini false yap
  $mainState.isLoaded = false

  const response = await productState.fetchProduct(route.params)
  await variationsFrontState.fetchVariations(response.id)
  await attributeState.fetchAttributes(response.id, route.params)

  // Kullanıcı giriş yapmışsa kullanıcı verilerini al
  if (authStore.token) {
    await authStore.fetchUser()
  }

  // Loading state'ini true yap
  $mainState.isLoaded = true

  return true
})

// Ürün ismini kontrol et ve hata yönetimi uygula
await useErrorHandle(productState.product.name);

// Route parametreleri değiştiğinde yeni ürün verilerini yükle
watch(() => route.params, async (newParams, oldParams) => {
  if (newParams.slug !== oldParams?.slug || newParams.urlParams !== oldParams?.urlParams) {
    // Loading state'ini false yap
    $mainState.isLoaded = false

    // Önceki ürün verilerini temizle
    productState.patchProduct({
      id: null,
      name: '',
      description: '',
      additional_info: '',
      coverImageId: null,
      selectedImages: [],
      selectedCategories: [],
      selectedColorTermImages: [],
      selectedColorTerm: null,
      selectedInput: null,
      inputValue: null,
      price: null,
      sale_price: null,
      sku: null,
      stock_management: false,
      stock: 0,
      loading: true,
      categories: [],
      featured_infos: [],
      galleryCurrentIndex: 0
    });

    // Yeni ürün verilerini yükle
    try {
      const response = await productState.fetchProduct(newParams);
      await variationsFrontState.fetchVariations(response.id);
      await attributeState.fetchAttributes(response.id, newParams);

      // Varyasyonları dönüştür
      attributeState.transformedAttrs = transform(
        attributeState.attributes || [],
        variationsFrontState.variations || []
      );

      // Kategori ürünlerini yükle
      await productState.fetchCategoryProducts(response.categories || []);

      // Ürün ismini kontrol et ve hata yönetimi uygula
      await useErrorHandle(response.name);

      // Loading state'ini true yap
      $mainState.isLoaded = true
    } catch (error) {
      console.error('Ürün yükleme hatası:', error);
      $mainState.isLoaded = true // Hata durumunda da loading'i kapat
      throw createError({
        statusCode: 404,
        statusMessage: 'Ürün bulunamadı'
      });
    }
  }
}, { immediate: false });

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

// Video verilerini hazırla
const productVideoData = computed(() => {
  if (!productState.product.video_url) return null;

  return {
    url: productState.product.video_url,
    type: productState.product.video_type,
    thumbnail: productState.product.video_thumbnail,
    description: productState.product.video_description,
    is_featured: productState.product.is_video_featured
  };
});

// Seçili renk için video verilerini hazırla
const selectedColorVideoData = computed(() => {
  // Önce seçili rengin video verisi var mı kontrol et
  const selectedColorTerm = productState.product.selectedColorTerm;

  if (selectedColorTerm && selectedColorTerm.term_videos && selectedColorTerm.term_videos.length > 0) {
    const videoData = selectedColorTerm.term_videos[0];
    return {
      url: videoData.video_url,
      type: videoData.video_type,
      thumbnail: videoData.video_thumbnail,
      description: videoData.video_description,
      is_featured: videoData.is_video_featured
    };
  }

  return null;
});

useHead({
  title: computed(() => {
    const productName = productState.product.name
    const categoryName = productState.product.categories?.[0]?.name
    if (categoryName) {
      return `${productName} - ${categoryName} Modeli | ${settings.value.siteName}`
    }
    return `${productName} | ${settings.value.siteName}`
  }),
  meta: [
    {
      name: 'description',
      content: computed(() => {
        const description = productState.product.description || productState.product.short_description
        const productName = productState.product.name
        const categoryName = productState.product.categories?.[0]?.name

        if (description) {
          return `${productName} ${description} ${categoryName ? `${categoryName} kategorisinde ` : ''}en uygun fiyatlarla ${settings.value.siteName}'de.`
        } else {
          return `${productName} ${categoryName ? `- ${categoryName} kategorisinde ` : ''}kaliteli ürün. En uygun fiyatlarla ${settings.value.siteName}'de hemen sipariş verin.`
        }
      })
    },
    {
      name: 'keywords',
      content: computed(() => {
        const productName = productState.product.name
        const categoryName = productState.product.categories?.[0]?.name
        const keywords = [productName]

        if (categoryName) {
          keywords.push(categoryName, `${categoryName} modelleri`, `${categoryName} fiyatları`)
        }

        keywords.push('tesettür', 'giyim', 'online alışveriş', 'kaliteli ürün')

        return keywords.join(', ')
      })
    },
    {
      property: 'og:title',
      content: computed(() => {
        const productName = productState.product.name
        const categoryName = productState.product.categories?.[0]?.name
        return categoryName ? `${productName} - ${categoryName}` : productName
      })
    },
    {
      property: 'og:description',
      content: computed(() => {
        const description = productState.product.description || productState.product.short_description
        const productName = productState.product.name

        if (description) {
          return `${productName} ${description}`
        } else {
          return `${productName} - Kaliteli ürün en uygun fiyatlarla.`
        }
      })
    },
    {
      property: 'og:image',
      content: computed(() => {
        const images = selectedImages.value
        return images?.length > 0 ? images[0].image : null
      })
    },
    {
      property: 'og:type',
      content: 'product'
    },
    {
      property: 'product:price:amount',
      content: computed(() => productState.product.sale_price || productState.product.regular_price)
    },
    {
      property: 'product:price:currency',
      content: 'TRY'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: computed(() => {
        const product = productState.product;
        return JSON.stringify({
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: product.name,
          image: selectedImages.value?.[0]?.image,
          description: product.description || product.short_description,
          brand: {
            '@type': 'Brand',
            name: settings.value.siteName
          },
          aggregateRating: product.review_count > 0 ? {
            '@type': 'AggregateRating',
            ratingValue: product.average_rating,
            reviewCount: product.review_count,
            bestRating: '5',
            worstRating: '1'
          } : undefined,
          offers: {
            '@type': 'Offer',
            url: window?.location?.href,
            priceCurrency: 'TRY',
            price: product.sale_price || product.regular_price,
            availability: product.stock_status === 'in_stock' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
          }
        });
      })
    }
  ]
})

const goInfo = () => {
  productInformation.value?.scrollIntoView({ behavior: "smooth" })
}

const scrollToReviews = () => {
  // Yorumlar bölümüne scroll yap
  if (reviewsSection.value) {
    reviewsSection.value.scrollIntoView({ behavior: "smooth" })
  }
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
