<template>
  <div>
    <div class="flex items-center space-x-12">
      <USelectMenu searchable searchable-placeholder="Bir nitelik seçin..." class="w-full"
        placeholder="Bir nitelik seçin" :options="attrsAndVarsState.globalAttrs"
        v-model="attrsAndVarsState.selectedAttrObj" option-attribute="text" :search-attributes="['text']" />
      <UiButtonsBaseButton @click="addAttr()" color="secondary">Ekle</UiButtonsBaseButton>
    </div>
    <div v-for="item in attributeState.attributes" :key="item.attribute_id" class="my-4">
      <AdminPartialsAttributeColor v-if="item.attribute_name.toLowerCase() == 'renk'" :item="item" />
      <AdminPartialsAttribute v-else :item="item" />
    </div>
    <div  v-if="attributeState.attributes.length > 0" class="flex justify-end mt-4">
      <UButton @click="saveAttrs()" color="orange"  size="md" :loading="attributeState.attributes.loading">Nitelikleri kaydet
      </UButton>
    </div>
  </div>
</template>

<script setup>
const productState = useProductState();
const attributeState = useAttributeState();
const variationState = useVariationState();
const attrsAndVarsState = useAttrsAndVarsState();
const toast = useToast()

const { addAttr, fetchGlobalAttrs } = useAttributes();

await attributeState.fetchAttributes(productState.product.id);
await fetchGlobalAttrs();

const saveAttrs = async () => {
  attributeState.attributes.loading = true
  const response =  await useBaseOFetchWithAuth("products/" + productState.product.id + "/attributes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(attributeState.attributes),
  }).finally(() => {
    attributeState.attributes.loading = false
  });

  if(!response.error){

    toast.add({
      title: 'Nitelikler kaydedildi!',
      color: 'orange',
    })
  }

  await attributeState.fetchAttributes(productState.product.id);
  await variationState.fetchVariations(productState.product.id);
};
</script>
