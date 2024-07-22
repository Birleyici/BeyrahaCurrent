import { defineStore } from "pinia";

export const useCategoryState = defineStore('categoryCommon', () => {
  const route = useRoute()
  const initCategoryIdsInParams = route.query.selectedCategoryIds
    ? route.query.selectedCategoryIds.split(',').map(Number).map(id => ({ id }))
    : [];

  const categories = ref([])
  const selectedCategories = ref(initCategoryIdsInParams)

  return { categories, selectedCategories }
})