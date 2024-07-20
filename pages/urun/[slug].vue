<template>
    <div class="lg:px-x-desktop max-w-full">
       

     </div>
     
</template>

<script setup>
const { useAttrsAndVarsState, useNewProductStore } = useStateIndex()
const { getProduct } = useProductCreate();
const productState = useNewProductStore()
const attrsAndVarsState = useAttrsAndVarsState()
const { categoryProducts, getProductsByCatId } = useProduct()
const slug = useRoute().params.slug
await getProduct(slug);
await getProductsByCatId(productState.selectedCategories)


const selectedImages = computed(() => {
  return productState.selectedColorTermImages?.length ? productState.selectedColorTermImages : productState.selectedImages;
});

// if (!productState.id) {
//     navigateTo('/')
// }
</script>