<template>
  <div>
    <div class="flex items-center space-x-12">
      <USelectMenu searchable searchable-placeholder="Bir nitelik seçin..." class="w-full "
        placeholder="Bir nitelik seçin" :options="attrsAndVarsState.globalAttrs"
        v-model="attrsAndVarsState.selectedAttrObj" option-attribute="text" :search-attributes="['text']" />
      <UiButtonsBaseButton @click="addAttr()" color="secondary">Ekle</UiButtonsBaseButton>
    </div>
    <div v-for="item in attrsAndVarsState.attributes" :key="item.attribute_id" class="my-4">
      <AdminPartialsAttributeColor v-if="item.attribute_name.toLowerCase() == 'renk'" :item="item" />
      <AdminPartialsAttribute v-else :item="item" />
    </div>
    <div v-if="attrsAndVarsState.attributes.length > 0" class="flex justify-end mt-4">
      <UiButtonsBaseButton @click="saveAttrs()" color="secondary">Nitelikleri kaydet
      </UiButtonsBaseButton>
    </div>

  </div>
</template>

<script setup>
const { useAttrsAndVarsState, useProductState } = useStateIndex()
const productState = useProductState();
const attrsAndVarsState = useAttrsAndVarsState()

const {
  fetchVariations,
} = useVariations()

const {
  fetchAttributes,
  addAttr,
  removeTerm,
  fetchGlobalAttrs,

} = useAttributes()


await fetchAttributes(productState.product.id);
await fetchGlobalAttrs()

const saveAttrs = async () => {

  if (productState.product.id == null) {
    await saveProduct(productState.product.id);
  }

  await useBaseFetch(
    "products/" + productState.product.id + "/attributes",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attrsAndVarsState.attributes),
    }
  );
  await fetchAttributes(productState.product.id);
  await fetchVariations(productState.product.id);
};



</script>
