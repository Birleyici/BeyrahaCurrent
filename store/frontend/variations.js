import { defineStore } from "pinia";


export const useVariationsFrontState = defineStore('variationsFront', () => {

    const variations = ref([])

    const fetchVariations = async (productId) => {

        const response = await useBaseOFetch(`front/products/${productId}/variations`)

        console.log(response)
        variations.value = response;

    };


    return { variations, fetchVariations }
})




