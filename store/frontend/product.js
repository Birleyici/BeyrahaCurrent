import { defineStore } from "pinia";


export const useProductState = defineStore('productState', () => {


  const product = ref({
    id: null,
    name: "",
    description: "",
    additional_info: "",
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


  const getProducts = async ({ piece, filters = {} }) => {

    // Eğer filters objesinde page yoksa, varsayılan olarak 1 ayarla
    if (!('page' in filters)) {
      filters.page = 1;
    }

    const params = piece ? { piece } : { ...filters };

    const response = await useBaseOFetchWithAuth(`products`,
      {
        params
      }
    )

    if (piece) {
      products.value = response
    } else {

      //eğer sayfalama verileri yoksa
      if (!products.value.total || filters.page == 1) {
        products.value = response
      } else {
        const dataArray = Object.values(response.data);
        products.value.data.push(...dataArray);
      }

    }

    if (process.client && 'page' in filters) {
      localStorage.setItem("prevPage", filters.page);
    }
  };

  return { product, newProduct, products, categoryProducts, vendorProducts, fetchProduct, getProducts, fetchCategoryProducts, patchProduct, patchCategoryProducts, patchVendorProducts }
})