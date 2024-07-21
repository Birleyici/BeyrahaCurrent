import { defineStore } from "pinia";


export const useCategoryState = defineStore('categoryCommon', () => {
  
    const categories = ref([])
    const selectedCategories = ref([])
  
    return { categories, selectedCategories }
  })