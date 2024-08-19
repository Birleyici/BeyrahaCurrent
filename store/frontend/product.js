import { defineStore } from "pinia";


export const useProductState = defineStore('productState', () => {


  const product = ref({
    id: null,
    name: "",
    description: "",
    additional_info: "",
    coverImageId: 0,
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
    featured_infos: [],
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

    catIds = catIds.map(cat => cat.id);

    const response = await useBaseOFetch('products/category',
      {
        params: {
          catIds: catIds.join(','),
          limit: 5
        }
      }
    )

    patchCategoryProducts(response)

  }

  return { product, newProduct, products, categoryProducts, vendorProducts, fetchProduct, fetchCategoryProducts, patchProduct, patchCategoryProducts, patchVendorProducts }
})