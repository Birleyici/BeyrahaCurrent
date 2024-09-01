import { defineStore } from "pinia";

export const useCategoryState = defineStore('categoryCommon', () => {
  const route = useRoute()


  const categories = ref([])
  const selectedCategories = ref([])

  const getCategories = async () => {
    const response = await useBaseOFetchWithAuth("categories");
    categories.value = response
  };

  const patchCategories = (obj) => {
    categories.value = obj
  }

  const sortCategories = () => {
    const selectedIds = selectedCategories.value.map(cat => cat.id);
    categories.value = categories.value.slice().sort((a, b) => {
      const aSelected = selectedIds.includes(a.id);
      const bSelected = selectedIds.includes(b.id);

      if (aSelected && !bSelected) {
        return -1;
      }
      if (!aSelected && bSelected) {
        return 1;
      }
      return 0;
    });
  };


  return { categories, selectedCategories, sortCategories, getCategories, patchCategories }
})