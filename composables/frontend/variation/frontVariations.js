export const useVariationsFront = () => {
  const productState = useProductState()
  const variationsFrontState = useVariationsFrontState()
  const attributeState = useAttributeState()
  const router = useRouter()
  const nuxtApp = useNuxtApp()

  const fetchVariationsForFrontEnd = async (productId) => {
    const response = await useBaseOFetch(
      `front/products/${productId}/variations`
    )

    if (response) {
      variationsFrontState.variations = response
    }

    return response
  }

  function transform(attributes, variations) {
    let newAttrs = []

    attributes.forEach((a) => {
      const obj = {}
      obj.name = a.attribute_name
      obj.useForVariation = a.useForVariation

      // Include all terms for the Renk attribute regardless of variations
      const isRenkAttribute = a.attribute_name === 'Renk'
      const termDetails = a.product_attribute_terms
        .filter((term) => {
          return (
            isRenkAttribute ||
            variations.some(
              (variation) =>
                variation.attributes[a.attribute_name] === term.term_name
            )
          )
        })
        .map((item) => {
          return {
            term_id: item.product_attribute_term_id,
            term_name: item.term_name,
            term_images: item.term_images.map((image) => ({
              id: image.id,
              path: image.path
            }))
          }
        })

      // Add the attribute if it has term details or if it's the Renk attribute
      if (termDetails.length > 0 || isRenkAttribute) {
        obj.options = termDetails
        newAttrs.push(obj)
      }
    })

    return newAttrs || []
  }

  const filteredVariations = computed(() => {
    return variationsFrontState.variations.filter((variation) => {
      // Eğer varyasyon 'renk' içermiyorsa, fiyatı kontrol et, aksi takdirde her zaman geri döndür
      return (
        variation.attributes['Renk'] || variation.price || variation.sale_price
      )
    })
  })

  const isActive = computed(() => (attributeName, option) => {
    let tempSelected = { ...selectedOptions.value, [attributeName]: option }

    return filteredVariations.value.some((variation) => {
      // Önce varyasyon kombinasyonunun mevcut olup olmadığını kontrol et
      const isVariationMatch = Object.keys(tempSelected).every((key) => {
        if (!variation.attributes[key]) return true
        return variation.attributes[key] === tempSelected[key]
      })

      // Eğer varyasyon kombinasyonu eşleşmiyorsa false döndür
      if (!isVariationMatch) {
        return false
      }

      // Varyasyonun stok durumunu kontrol et
      // Manuel olarak stok dışı işaretlenmişse
      if (variation.stock_status === 'out_of_stock' || variation.stock_status === 'discontinued') {
        return false
      }

      // Stok yönetimi aktifse stok miktarını kontrol et
      if (variation.isStockManagement && variation.stockAmount <= 0) {
        return false
      }

      return true
    })
  })

  const getSelectedVariation = computed(() => {
    // Seçili seçeneklerin olup olmadığını ve tüm attribute terimlerinin seçilip seçilmediğini kontrol et
    const hasSelectedOptions =
      Object.keys(selectedOptions.value).length ===
      attributeState?.transformedAttrs?.length

    // Eğer tüm attribute terimleri seçilmemişse, null dön
    if (!hasSelectedOptions) {
      return null
    }

    // İlk tam eşleşen varyasyonu bul
    let selectedVariation = variationsFrontState.variations?.find(
      (variation) => {
        return Object.keys(selectedOptions.value).every((key) => {
          return variation.attributes[key] === selectedOptions.value[key]
        })
      }
    )

    // Eğer tam eşleşen bir varyasyon bulamazsanız, kısmi eşleşen varyasyonu bul
    if (!selectedVariation) {
      selectedVariation = useVariationsFrontState.variations?.find(
        (variation) => {
          return Object.keys(selectedOptions.value).every((key) => {
            return (
              !variation.attributes[key] ||
              variation.attributes[key] === selectedOptions.value[key]
            )
          })
        }
      )
    }

    return selectedVariation
  })

  const selectedOptions = ref({})

  const selectOption = (attributeName, option, colorTerm = null) => {
    if (colorTerm) {
      productState.product.selectedColorTermImages = []
      productState.product.selectedColorTermImages = colorTerm.term_images

      if (process.client) {
        const currentSlug = router.currentRoute.value.params.slug
        const newParams =
          nuxtApp.$slugify(colorTerm.term_name, { lower: true }) +
          '-' +
          colorTerm.term_id
        const newUrl = '/urun/' + currentSlug + '--' + newParams

        router.currentRoute.value.params.urlParams = newParams
        // Preserve the current history state
        const currentState = window.history.state

        window.history.replaceState(currentState, '', newUrl)
      }
    }

    selectedOptions.value = {
      ...selectedOptions.value,
      [attributeName]: option
    }

    if (getSelectedVariation.value?.image) {
      const selectedVarImg = {
        ...getSelectedVariation.value.image,
        added: true
      }
      if (productState.product.selectedImages[0]?.added) {
        productState.product.selectedImages[0] = selectedVarImg
      } else {
        productState.product.selectedImages.unshift(selectedVarImg)
      }
    } else if (productState.product.selectedImages[0]?.added) {
      productState.product.selectedImages.shift()
    }
  }

  const isSelected = (attributeName, option) => {
    return selectedOptions.value[attributeName] === option
  }

  const getTermImageSrc = (item, termName) => {
    const imagePath = item?.term_images?.[0]?.path
    return imagePath
      ? `cl/${imagePath}`
      : `https://placehold.co/100x100?text=${termName}`
  }

  return {
    fetchVariationsForFrontEnd,
    isActive,
    selectOption,
    isSelected,
    selectedOptions,
    getSelectedVariation,
    transform,
    getTermImageSrc
  }
}
