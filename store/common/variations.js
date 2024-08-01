import { defineStore } from 'pinia';

export const useVariationState = defineStore('variationState', () => {

    const variations = ref([])
    const transformedVariations = ref([])

    const fetchVariations = async (productId) => {

        if (productId == null) { return }

        const response = await useBaseOFetchWithAuth(`products/${productId}/variations`);

        variations.value = response.variations

    }

    const deleteVariation = async (id) => {

        await useBaseOFetchWithAuth("variations/" + id, { method: "DELETE" });

        deleteVariationOnState(id)
    };

    function deleteVariationOnState(id) {

        variations.value = variations.value.filter(variation => variation.id !== id)
    }


    return { variations, transformedVariations, fetchVariations, deleteVariation }
})










