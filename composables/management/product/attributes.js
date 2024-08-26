
export const useAttributes = () => {

    const attrsAndVarsState = useAttrsAndVarsState()
    const attributeState = useAttributeState()



    const addAttr = () => {

        const item = attrsAndVarsState.selectedAttrObj

        // attributes içerisinde bu attribute_id'ye sahip bir öğe olup olmadığını kontrol ediyoruz.
        const isAttributeExists = attributeState.attributes.some(
            (attr) => attr.attribute_id === item.id
        );

        // Eğer bu ID'ye sahip bir öğe zaten varsa veya attributes uzunluğu 30'dan fazla ise, yeni bir öğe eklemiyoruz.
        if (!isAttributeExists && attributeState.attributes.length < 30) {
            attributeState.attributes.unshift({
                attribute_id: item.id,
                attribute_name: item.text,
                isOpen: true,
                useForVariation: false,
                showProductPage: true,
                termWord: "",
                product_attribute_terms: [],
            });
        }
    }

    const addTerm = (term) => {
        if (
            term.termWord &&
            term.termWord.length <= 25 &&
            !term.product_attribute_terms.some((t) => t.term_name === term.termWord)
        ) {
            term.product_attribute_terms.push({ term_name: term.termWord });
            term.termWord = "";
        }
    };


    const fetchAttributes = async (id) => {

        if (id == null) { return }

        const response = await useBaseOFetchWithAuth(`products/${id}/attributes`)

        attrsAndVarsState.attributes = response

    }


    const removeTerm = async (term, terms) => {
        const { data, error } = await useBaseOFetchWithAuth(
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

    const deleteAttr = async (attrId) => {

        await useBaseOFetchWithAuth(
            "product-attributes/" + attrId,
            {
                method: "DELETE",
            }
        );

        attributeState.attributes = attributeState.attributes.filter(attribute => attribute.product_attribute_id !== attrId);

    };




    const fetchGlobalAttrs = async () => {

        const response = await useBaseOFetchWithAuth(
            "attributes/global"
        );

        attrsAndVarsState.globalAttrs = response
    }


    return {
        deleteAttr,
        fetchAttributes,
        addAttr,
        addTerm,
        removeTerm,
        fetchGlobalAttrs,
        deleteAttr
    }
}