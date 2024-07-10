export const useAttrsAndVariations = () => {

    const attrsAndVarsState = reactive({
        attributes: [],
        variations: [],
        globalAttrs: [],
        selectedAttrId : 1

    })


    const addAttr = () => {
        const item = attrsAndVarsState.globalAttrs.find((option) => option.id === attrsAndVarsState.selectedAttrId);
        // attributes içerisinde bu attribute_id'ye sahip bir öğe olup olmadığını kontrol ediyoruz.
        const isAttributeExists = attrsAndVarsState.attributes.some(
            (attr) => attr.attribute_id === item.id
        );

        // Eğer bu ID'ye sahip bir öğe zaten varsa veya attributes uzunluğu 30'dan fazla ise, yeni bir öğe eklemiyoruz.
        if (!isAttributeExists && attrsAndVarsState.attributes.length < 30) {
            attrsAndVarsState.attributes.unshift({
                attribute_id: item.id,
                attribute_name: item.text,
                isOpen: true,
                useForVariation: false,
                showProductPage: true,
                termWord: "",
                product_terms: [],
            });
        }
    }




    const fetchVariations = async (id) => {
        const { data, error } = await useBaseFetch("products/" + id + "/variations", {
            cache: false,
        });

        attrsAndVarsState.variations = data.value

        if (!error.value) {
            attrsAndVarsState.variations.variations.forEach((variation) => {
                if (!variation.terms || variation.terms.length < attrsAndVarsState.attributes.length) {
                    let missingTerms = [];

                    attrsAndVarsState.attributes.forEach((attribute) => {
                        if (attribute.useForVariation == 0) {
                            return;
                        }

                        if (!variation.terms.some((term) => term.product_term.product_attribute_id === attribute.product_attribute_id)) {
                            const templateTerm = {
                                product_variation_id: variation.id,
                                useForVariation: attribute.useForVariation,
                                product_term_id: "null",
                                product_term: {
                                    product_attribute_id: attribute.product_attribute_id,
                                    term_id: null,
                                },
                            };
                            missingTerms.push(templateTerm);
                        }

                    });

                    variation.terms = missingTerms.concat(variation.terms);
                }

                if (variation.variation_image && typeof variation.variation_image === 'string') {
                    try {
                        variation.variation_image = JSON.parse(variation.variation_image);
                    } catch (e) {
                        console.error('JSON parse error:', e);
                        // Hatalı parse işlemi için hata işleme
                    }
                }

                // Gerçek ve şablon term'lerini product_attribute_id'ye göre sıralayın
                variation.terms.sort((a, b) => a.product_term.product_attribute_id - b.product_term.product_attribute_id);
            });
        }
        attrsAndVarsState.variations = attrsAndVarsState.variations.variations;
    }

    const addTerm = (term) => {
        if (
            term.termWord &&
            term.termWord.length <= 25 &&
            !term.product_terms.some((t) => t.term_name === term.termWord)
        ) {
            term.product_terms.push({ term_name: term.termWord });
            term.termWord = "";
        }
    };


    const fetchAttributes = async (id) => {

        if (id == null) { return }

        const {
            data,
            error,
        } = await useBaseFetch("products/" + id + "/attributes", {
            method: 'GET',
            cache: false

        });

        attrsAndVarsState.attributes = data.value

    }


    const removeTerm = async (term, terms) => {
        const { data, error } = await useBaseFetch(
            "product-terms/" + term.product_term_id,
            {
                method: "DELETE",
            }
        );

        if (data.value && !error.value) {

            const index = terms.indexOf(term);
            if (index !== -1) {
                terms.splice(index, 1);
            }

        }
    };

    const deleteVariation = (id) => {
        attrsAndVarsState.variations = attrsAndVarsState.variations.filter(variation => variation.id !== id);
    }

    const deleteAttr = (id) => {
        attrsAndVarsState.attributes = attrsAndVarsState.attributes.filter(attribute => attribute.product_attribute_id !== id);
    }


    const fetchGlobalAttrs = async () => {

        const { data, error } = await useBaseFetch(
            "attributes/global"
        );

        if (data.value && !error.value) {

            attrsAndVarsState.globalAttrs = data.value
        }
    }



    return {

        attrsAndVarsState,
        deleteAttr,
        deleteVariation,
        fetchAttributes,
        fetchVariations,
        addAttr,
        addTerm,
        removeTerm,
        fetchGlobalAttrs
    }
}