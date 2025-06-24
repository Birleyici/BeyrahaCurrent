import { defineStore } from 'pinia'

export const useProductState = defineStore('productState', () => {
  const product = ref({
    id: null,
    name: '',
    description: '',
    additional_info: '',
    coverImageId: null,
    selectedImages: [],
    selectedCategories: [],
    selectedColorTermImages: [],
    selectedInput: null,
    inputValue: null,
    price: null,
    sale_price: null,
    sku: null,
    stock_management: false,
    stock: 0,
    loading: false,
    categories: [],
    featured_infos: []
  })

  const newProduct = toRaw({ ...product.value })

  const products = ref([])
  const categoryProducts = ref([])
  const vendorProducts = ref([])

  const patchProduct = (obj) => {
    product.value = obj
  }

  const patchCategoryProducts = (obj) => {
    categoryProducts.value = obj
  }

  const patchVendorProducts = (obj) => {
    vendorProducts.value = obj
  }

  const fetchProduct = async (params) => {
    const response = await useBaseOFetch(`product/${params.slug}`, {
      params: {
        urlParams: params.urlParams
      },
      method: 'GET'
    })

    patchProduct({ ...response })

    return response
  }

  const fetchCategoryProducts = async (catIds) => {
    catIds = catIds.map((cat) => cat.id)

    const response = await useBaseOFetch('products/category', {
      params: {
        catIds: catIds.join(','),
        limit: 5
      }
    })

    patchCategoryProducts(response)
  }

  const getProducts = async (filters, shouldReturnResponse = false) => {
    // Eğer filters objesinde page yoksa, varsayılan olarak 1 ayarla
    if (!('page' in filters)) {
      filters.page = 1
    }

    try {
      const response = await useBaseOFetch(`products`, {
        params: filters
      })

      if (shouldReturnResponse) {
        return response
      } else {
        // Sayfa 1 ise veya mevcut ürün listesi yoksa/boşsa - yeni liste oluştur
        if (filters.page == 1 || !products.value.data || products.value.data.length === 0) {
          products.value = response
        } else {
          // Sayfa 1'den büyükse ve mevcut liste varsa - listeye ekle
          if (response.data && response.data.length > 0) {
            // Duplicate kontrolü - aynı ID'li ürünleri eklemeyi engelle
            const existingIds = new Set(products.value.data.map(p => p.id));
            const newProducts = response.data.filter(p => !existingIds.has(p.id));
            
            if (newProducts.length > 0) {
              products.value.data.push(...newProducts);
              products.value.current_page = response.current_page;
              products.value.last_page = response.last_page;
              products.value.total = response.total;
            }
          }
        }
      }
    } catch (error) {
      console.error('Product fetch error:', error);
      throw error;
    }
  }

  return {
    product,
    newProduct,
    products,
    categoryProducts,
    vendorProducts,
    fetchProduct,
    getProducts,
    fetchCategoryProducts,
    patchProduct,
    patchCategoryProducts,
    patchVendorProducts
  }
})
