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
    price: null,
    sale_price: null,
    sku: null,
    stock_management: false,
    stock: 0,
    loading: false,
    categories: [],
    featured_infos: []
  })
  const products = ref([])
  const categoryProducts = ref([])
  const vendorProducts = ref([])

  const patchProduct  = (obj) => {
    product.value = obj
  }

  const patchCategoryProducts = (obj) => {
    categoryProducts.value = obj
  }

  const patchVendorProducts = (obj) => {
    vendorProducts.value = obj
  }

  return { product, products, categoryProducts, vendorProducts, patchProduct , patchCategoryProducts, patchVendorProducts }
})