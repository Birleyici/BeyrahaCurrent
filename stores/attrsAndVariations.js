import { defineStore } from 'pinia';

export const useAttrsAndVariations = defineStore({
    id: 'attrsAndVariations',
    state: () => ({

        attributes: [],
        variations: []
    }),

    actions: {

        async fetchVariations() {

            const { data: variations, pending, refresh, error } = await useJsonPlaceholderData(
                "/products/1/variations",
                {
                    cache: false,
                }
            );

            // Eğer variations verisi başarıyla alındıysa ve hata yoksa:
            if (!error.value) {
                // Her bir varyasyon için:
                variations.value.variations.forEach((variation) => {
                    // Eğer bu varyasyonun terms dizisi attributes dizisinin uzunluğundan daha kısa ise:
                    if (!variation.terms || variation.terms.length < this.attributes.length) {
                        // Her bir özellik (attribute) için kontrol edelim:
                        this.attributes.forEach((attribute) => {

                            if(attribute.useForVariation==0){
                                return;
                            }

                            console.log("buraya geldi")


                            // Eğer bu attribute için bir term zaten eklenmemişse:
                            if (
                                !variation.terms.some(
                                    (term) =>
                                        term.product_term.product_attribute_id === attribute.product_attribute_id
                                )
                            ) {
                                // Şablon term'i oluşturun:
                                const templateTerm = {
                                    product_variation_id: variation.id,
                                    useForVariation: attribute.useForVariation,
                                    product_term_id: "null", // Bu değeri null olarak bırakıyoruz çünkü henüz bir term seçilmedi.
                                    product_term: {
                                        product_attribute_id: attribute.product_attribute_id,
                                        term_id: null, // Bu değeri de null olarak bırakıyoruz.
                                    },
                                };
                                // Bu şablon term'i varyasyonun terms dizisine ekleyin:
                                variation.terms.push(templateTerm);
                            }
                        });
                    }
                });
            }

            this.variations = variations.value.variations
        },

        async fetchAttributes() {

            const {
                data,
                pending,
                refresh,
                error,
            } = await useJsonPlaceholderData("products/1/attributes", {
                cache: false,

            });

            this.attributes = data.value
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





