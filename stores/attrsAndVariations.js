import { defineStore } from 'pinia';

export const useAttrsAndVariations = defineStore({
    id: 'attrsAndVariations',
    state: () => ({

        attributes: [],
        variations: []
    }),

    actions: {
        async fetchVariations(id) {
            const { data: variations, pending, refresh, error } = await useJsonPlaceholderData("products/"+id+"/variations", {
                cache: false,
            });
        
            if (!error.value) {
                variations.value.variations.forEach((variation) => {
                    if (!variation.terms || variation.terms.length < this.attributes.length) {
                        let missingTerms = [];
        
                        this.attributes.forEach((attribute) => {
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
            this.variations = variations.value.variations;
        },
                

        async fetchAttributes(id) {

            if(id==null)
            return

            const {
                data,
                pending,
                refresh,
                error,
            } = await useJsonPlaceholderData("products/"+ id +"/attributes", {
                cache: false

            });

                this.attributes = typeof data.value === 'string' ? JSON.parse(data.value) : data.value

        },

        deleteVariation(id) {
            this.variations = this.variations.filter(variation => variation.id !== id);
        },

        deleteAttr(id) {
            this.attributes = this.attributes.filter(attribute => attribute.product_attribute_id !== id);
        },



    },

    getters: {
        attrsForVariation(state) {
           return state.attributes.filter(attribute => attribute.useForVariation == 1)
        },
    },
});





