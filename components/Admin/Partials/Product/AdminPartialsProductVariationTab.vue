<template>
  <div class="grid gap-4">
    <div class="flex space-x-4">
      <UiFormSelect v-model="addedType">
        <option value="1">Varyasyon ekle</option>
        <option value="2">Tüm niteliklerden varyasyonlar oluştur</option>
        <option value="3">Tüm varyasyonları sil</option>
      </UiFormSelect>
      <UiButtonsBaseButton @click="variationHandle()" color="secondary">Git</UiButtonsBaseButton>
    </div>
    <div class="rounded-md gap-4">
      <AdminPartialsVariation :item="item" v-for="item in attrsAndVarsState.variations" />
    </div>
    <div v-if="errorMessage" class="my-4">
      <UiNotificationBar type="error">{{ errorMessage }}</UiNotificationBar>
    </div>
    <div class="flex justify-end">
      <UiButtonsBaseButton @click="saveVariations()" color="secondary">Varyasyonları
        kaydet</UiButtonsBaseButton>
    </div>
  </div>
</template>

<script setup>
const { useNewProductStore, useAttrsAndVarsState } = useStateIndex()
const productState = useNewProductStore();
const attrsAndVarsState = useAttrsAndVarsState()

const {
  fetchVariations,
  createOneVariation,
  createAllVariation,
  saveVariations,
} = useVariations()
const {
  fetchAttributes,
} = useAttributes()


await fetchAttributes(productState.id);
await fetchVariations(productState.id);

const addedType = ref(1);
const errorMessage = ref(null);

const variationHandle = () => {
  if (addedType.value == 1) {
    createOneVariation();
  }
  if (addedType.value == 2) {
    createAllVariation();
  }
  if (addedType.value == 3) {
    deleteAllVariations();
  }
};




</script>
