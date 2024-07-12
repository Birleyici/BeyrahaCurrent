import { useAttrsAndVarsState } from "~/store/attrsAndVariations";


export const useAttributes = ()=>{

    const attrsAndVarsState = useAttrsAndVarsState()



    let productId = computed(() => {
        return productState.id || useRoute().params.id
    });


    const addAttr = () => {

        const item = attrsAndVarsState.globalAttrs.find((option) => option.id === parseInt(attrsAndVarsState.selectedAttrId));


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
        deleteAttr,
        fetchAttributes,
        addAttr,
        addTerm,
        removeTerm,
        fetchGlobalAttrs,
    }
}