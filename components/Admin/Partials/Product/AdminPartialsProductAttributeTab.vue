<template>
  <div>
    <div class="flex items-center space-x-12">
      <Select2 class="w-full" v-model="attrsAndVarsState.selectedAttrId" :options="attrsAndVarsState.globalAttrs" />
      <UiButtonsBaseButton @click="addAttr()" color="secondary">Ekle</UiButtonsBaseButton>
    </div>
    <div v-for="item in attrsAndVarsState.attributes" :key="item.attribute_id" class="my-4">
      <AdminPartialsAttributeColor v-if="item.attribute_name.toLowerCase() == 'renk'" :item="item" />
      <AdminPartialsAttribute v-else :item="item" />
    </div>
    <div v-if="attrsAndVarsState.attributes.length > 0" class="flex justify-end mt-4">
      <UiButtonsBaseButton :loading="loadingSaveAttrs" @click="saveAttrs()" color="secondary">Nitelikleri kaydet
      </UiButtonsBaseButton>
    </div>

  </div>
</template>

<script setup>
const { useAttrsAndVarsState, useNewProductStore } = useStateIndex()
const productState = useNewProductStore();
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


await fetchAttributes(productState.id);
await fetchGlobalAttrs()

const saveAttrs = async () => {

  if (productState.id == null) {
    await saveProduct(productState.id);
  }

  await useBaseFetch(
    "products/" + productState.id + "/attributes",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attrsAndVarsState.attributes),
    }
  );
  await fetchAttributes(productState.id);
  await fetchVariations(productState.id);
};



</script>
