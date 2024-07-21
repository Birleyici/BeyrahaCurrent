import { useCategoryState } from "~/store/common/category";

export function useCategory() {
    const categoryState = useCategoryState();

    const getCategories = async () => {
        const { data, error } = await useBaseFetch("categories");

        if (data.value && !error.value) {
            categoryState.categories = data.value;
            sortCategories();
        }
    };

    const sortCategories = () => {
        const selectedIds = categoryState.selectedCategories.map(cat => cat.id);
        categoryState.categories = categoryState.categories.slice().sort((a, b) => {
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

    watch(() => categoryState.selectedCategories, () => {
        sortCategories()
      })

    return {
        getCategories,
        sortCategories
    };
}
