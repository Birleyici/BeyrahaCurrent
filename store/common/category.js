import { defineStore } from "pinia";

export const useCategoryState = defineStore('categoryCommon', () => {
  const route = useRoute()


  const categories = ref([])
  const selectedCategories = ref([])
  const selectedCategoryIds = computed(() => {
    return selectedCategories?.value?.map(category => category.id) || [];
  });


  const getCategories = async () => {
    const response = await useBaseOFetchWithAuth("categories");
    categories.value = response
  };

  const patchCategories = (obj) => {
    categories.value = obj
  }

  const patchSelectedCategories = (cats, isPush = true) => {
    const newCatIds = cats.split(',').map(Number);

    // Zaten mevcut olmayan kategorileri seç
    const uniqueNewCats = newCatIds.filter(
        newCat => !selectedCategories.value.some(cat => cat.id === newCat)
    ).map(id => ({ id }));

    // Sadece yeni olanları ekle
    if (uniqueNewCats.length) {
        if (isPush) {
            selectedCategories.value.push(...uniqueNewCats);
        } else if (uniqueNewCats.length === 1) {
            // Eğer uniqueNewCats 1 tane ise ve isPush false ise
            selectedCategories.value = [uniqueNewCats[0]];
        }
    }
};


const sortedCategories = computed(() => {
  const selectedIds = selectedCategories.value.map(cat => cat.id);

  return categories.value.slice().sort((a, b) => {
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
});


  return {
    categories,
    selectedCategories,
    selectedCategoryIds,
    sortedCategories,
    getCategories,
    patchCategories,
    patchSelectedCategories
  }
})