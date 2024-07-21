import { defineStore } from "pinia";


export const useProductState = defineStore('productFront', () => {
  
    const products = ref([])
    const categoryProducts = ref([])
  
    return { products, categoryProducts }
  })