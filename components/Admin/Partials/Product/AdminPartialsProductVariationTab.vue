<template>
  <div class="grid gap-4">
    <div class="flex space-x-4">
      <USelectMenu class="w-full" color="orange" size="md" placeholder="İşlem seçin..." :options="options"
        v-model="addedType" value-attribute="value" option-attribute="label" />

      <UButton @click="variationHandle()" color="orange" size="md">Git</UButton>
    </div>
    <div class="rounded-md gap-4">
      <AdminPartialsVariation :item="item" v-for="item in variationState.variations" />
    </div>
    <div v-if="errorMessage" class="my-4">
      <UiNotificationBar type="error">{{ errorMessage }}</UiNotificationBar>
    </div>
    <div class="flex justify-end">
      <UButton v-if="variationState.variations?.length > 0"
        @click="saveVariations(productState.product.id, variationState.variations)" size="md" color="orange">
        Varyasyonları kaydet</UButton>
    </div>
  </div>
</template>

<script setup>
const { useProductState, useVariationState, useAttributeState } = useStateIndex();
const productState = useProductState();
const variationState = useVariationState();
const attributeState = useAttributeState();

const options = [
  { value: "1", label: "Varyasyon ekle" },
  { value: "2", label: "Tüm niteliklerden varyasyonlar oluştur" },
  { value: "3", label: "Tüm varyasyonları sil" },
];

const {
  createOneVariation,
  createAllVariation,
  saveVariations,
  deleteAllVariations,
} = useVariations();

await attributeState.fetchAttributes(productState.product.id);
await variationState.fetchVariations(productState.product.id);

const addedType = ref(null);
const errorMessage = ref(null);

const variationHandle = () => {
  if (addedType.value == 1) {
    createOneVariation();
  }
  if (addedType.value == 2) {
    createAllVariation(productState.product.id);
  }
  if (addedType.value == 3) {
    deleteAllVariations(productState.product.id);
  }
};
</script>
