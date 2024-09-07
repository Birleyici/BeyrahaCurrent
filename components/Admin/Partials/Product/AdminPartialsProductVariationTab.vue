<template>
  <div class="grid gap-4">
    <div class="flex space-x-4">
      <USelectMenu class="w-full" color="orange" size="md" placeholder="İşlem seçin..." :options="options"
        v-model="addedType" value-attribute="value" option-attribute="label" />

      <UButton :loading="loading" @click="variationHandle()" color="orange" size="md">Git</UButton>
    </div>
    <div class="flex space-x-2 items-center text-sm">
      <UToggle v-model="bulkEditMode" />
      <p>Toplu düzenleme</p>
    </div>
    <div v-if="bulkEditMode">
      Toplu düzenlemeler
    </div>
    <div class="rounded-md grid gap-2">
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
const productState = useProductState();
const variationState = useVariationState();
const attributeState = useAttributeState();
const bulkEditMode = ref(false)

const options = [
  { value: "2", label: "Tüm niteliklerden varyasyonlar oluştur" },
  { value: "3", label: "Tüm varyasyonları sil" },
];

const {
  createAllVariation,
  saveVariations,
  deleteAllVariations,
} = useVariations();

await attributeState.fetchAttributes(productState.product.id);
await variationState.fetchVariations(productState.product.id);

const addedType = ref(null);
const errorMessage = ref(null);
const loading = ref(false)
const variationHandle = async () => {
  loading.value = true
  if (addedType.value == 2) {
    await createAllVariation(productState.product.id);
  }
  if (addedType.value == 3) {
    await deleteAllVariations(productState.product.id);
  }
  loading.value = false

};
</script>
