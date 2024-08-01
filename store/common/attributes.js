import { defineStore } from 'pinia';

export const useAttributeState = defineStore('attributeState', () => {

    const attributes = ref([])
    const transformedAttrs = ref([])

    const fetchAttributes = async (productId) => {

        if (productId == null) { return }

        const response = await useBaseOFetch(`products/${productId}/attributes`)

        attributes.value = response

    }

    

    return { attributes, transformedAttrs, fetchAttributes }
})










