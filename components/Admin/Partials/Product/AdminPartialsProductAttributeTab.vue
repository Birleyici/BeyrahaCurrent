<template>
  <div>
    <div class="flex items-center space-x-12">
      <Select2 class="w-full" v-model="attrsAndVarsState.selectedAttrId" :options="attrsAndVarsState.globalAttrs" />
      <UiButtonsBaseButton @click="addAttr()" color="secondary">Ekle</UiButtonsBaseButton>
    </div>
    <div v-for="item in attrsAndVarsState.attributes" :key="item.attribute_id" class="my-4">
      <UiAccordion @is-delete="deleteAttr(item.product_attribute_id)" :isOpen="item.isOpen"
        @change-status="(e) => (item.isOpen = e)"
        headerClass="flex justify-between bg-tertiary-50 border rounded-md text-sm p-minimal"
        :header="item.attribute_name">
        <div class="border border-t-0 p-minimal">
          <div class="flex space-x-12 bg-white">
            <UiFormInput @keydown.enter="addTerm(item)" placeholder="Nitelik terimi" v-model="item.termWord">
            </UiFormInput>
            <UiButtonsBaseButton @click="addTerm(item)" color="secondary">Ekle</UiButtonsBaseButton>
          </div>

          <div class="my-minimal space-y-4">
            <div>
              <p class="text-sm font-medium mb-2" v-if="item.product_terms.length > 0">
                Nitelik terimleri:
              </p>

              <div class="flex flex-wrap items-center">
                <UiBadgesBadge @is-click="removeTerm(term, item.product_terms)" class="m-1"
                  v-for="term in item.product_terms">
                  {{ term.term_name }}
                </UiBadgesBadge>
              </div>
            </div>
            <UiFormCheckbox v-model="item.useForVariation" :value="true" :id="item.attribute_id">Varyasyonlar için
              kullan</UiFormCheckbox>
            <UiFormCheckbox v-model="item.showProductPage" :value="true"
              :id="item.attribute_id + Math.floor(Math.random() * 10)">Ürün sayfasında göster</UiFormCheckbox>
          </div>
        </div>
      </UiAccordion>
    </div>
    <div v-if="attrsAndVarsState.attributes.length > 0" class="flex justify-end mt-4">
      <UiButtonsBaseButton :loading="loadingSaveAttrs" @click="saveAttrs()" color="secondary">Nitelikleri kaydet
      </UiButtonsBaseButton>
    </div>
    
  </div>
</template>

<script setup>
import { useAttrsAndVarsState } from "~/store/attrsAndVariations";
const { productState } = useProductCreate();
const attrsAndVarsState = useAttrsAndVarsState()

const {
  fetchVariations,
} = useVariations()

const {
  fetchAttributes,
  deleteAttr,
  addAttr,
  addTerm,
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
