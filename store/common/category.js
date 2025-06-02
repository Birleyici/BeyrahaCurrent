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

    // Zaten mevcut olmayan kategorileri seç ve tam objelerini bul
    const uniqueNewCats = newCatIds.filter(
      newCat => !selectedCategories.value.some(cat => cat.id === newCat)
    ).map(id => {
      // categories listesinden tam kategori objesini bul
      const fullCategory = categories.value.find(cat => cat.id === id);
      if (fullCategory) {
        return {
          id: fullCategory.id,
          label: fullCategory.name || fullCategory.label,
          name: fullCategory.name,
          slug: fullCategory.slug,
          ...fullCategory
        };
      }
      // Eğer categories henüz yüklenmemişse geçici obje oluştur
      return { id, label: `Kategori ${id}`, name: `Kategori ${id}` };
    });

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

  // Kategori objelerini güncellemek için yeni fonksiyon
  const updateSelectedCategoriesWithFullData = () => {
    if (categories.value.length > 0 && selectedCategories.value.length > 0) {
      selectedCategories.value = selectedCategories.value.map(selectedCat => {
        const fullCategory = categories.value.find(cat => cat.id === selectedCat.id);
        if (fullCategory) {
          return {
            id: fullCategory.id,
            label: fullCategory.name || fullCategory.label,
            name: fullCategory.name,
            slug: fullCategory.slug,
            ...fullCategory
          };
        }
        return selectedCat;
      });
    }
  };

  const sortedCategories = computed(() => {
    const selectedIds = selectedCategories.value.map(cat => cat.id);

    return categories.value.slice().map(cat => ({
      ...cat,
      label: cat.name || cat.label // UCommandPalette için label alanını garanti et
    })).sort((a, b) => {
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
    patchSelectedCategories,
    updateSelectedCategoriesWithFullData
  }
})