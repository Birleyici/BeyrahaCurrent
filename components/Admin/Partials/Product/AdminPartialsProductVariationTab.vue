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
      <UiAccordion :key="item.id" @is-delete="deleteVariation(item.id)"
        headerClass="flex justify-between bg-tertiary-50 mt-2 border rounded-md text-sm px-minimal items-center"
        :isOpen="item.isOpen" @change-status="(e) => (item.isOpen = e)" v-for="item in attrsAndVarsState.variations">
        <UiModal ok-button="true" header="Galeri" className="lg:!max-w-[800px] max-h-[500px]"
          :isOpen="isOpenGalleryModal" @status-change="(e) => (isOpenGalleryModal = e)">
          <AdminPartialsMediaModal :selecteds="item.variation_images" @selecteds="(e) => (item.variation_images = e)">
          </AdminPartialsMediaModal>
        </UiModal>

        <template v-slot:header>
          <div class="flex text-sm">
            <template v-for="term in item.terms">
              <p class="border-r last:border-r-0 px-2" v-if="isAttributeExists(term.product_term.product_attribute_id)">
                {{
                  findValueInAttrs(
                    attrsAndVarsState.attributes,
                    term.product_term_id,
                    term.product_term.product_attribute_id,
                    item
                  )
                }}
              </p>
            </template>
          </div>
        </template>

        <div class="grid lg:grid-cols-2 gap-4 bg-white border border-t-0 p-minimal">
          <div class="lg:col-span-2 flex space-x-4 justify-between">
            <template v-for="term in item.terms">
              <UiFormSelect v-model="term.product_term_id"
                v-if="isAttributeExists(term.product_term.product_attribute_id)">
                <option value="null">
                  Herhangi Bir
                  {{
                    (
                      attrsAndVarsState.attributes.find(
                        (e) =>
                          e.product_attribute_id ==
                          term.product_term.product_attribute_id
                      ) || {}
                    ).attribute_name || ""
                  }}
                </option>
                <option :value="opt.product_term_id" v-for="opt in (
                  attrsAndVarsState.attributes.find(
                    (e) =>
                      e.product_attribute_id ==
                      term.product_term.product_attribute_id
                  ) || {}
                ).product_terms || []">
                  {{ opt.term_name }}
                </option>
              </UiFormSelect>
            </template>
          </div>

         <pre>
          {{ item  }}
         </pre>
          <div class="inline-block">
            <div class="bg-tertiary-50 border p-2 rounded-md inline-block space-x-4 items-center"
              :class="!item.variation_images && 'flex'">
              <NuxtImg v-if="item.variation_images.length >0" @click="isOpenGalleryModal = true" :src="item.variation_images"
                class="cursor-pointer w-16 rounded-md" alt="" />
              <img @click="isOpenGalleryModal = true" v-else src="/img-placeholder.jpg" alt=""
                class="cursor-pointer w-16 rounded-md" />
              <p v-if="!item.variation_images" class="text-sm text-center">
                Görsel seçilmedi...
              </p>
            </div>
          </div>
          <div></div>

          <UiFormInput v-model="item.stockCode" placeholder="Stok kodu"></UiFormInput>
          <UiFormInput v-model="item.price" placeholder="Normal fiyat"></UiFormInput>
          <UiFormInput v-model="item.sale_price" placeholder="İndirimli fiyat"></UiFormInput>
          <UiFormInput v-model="item.coast" placeholder="Maliyet"></UiFormInput>

          <div class="grid gap-4">
            <UiFormCheckbox v-model="item.isStockManagement" :id="item.id" name="stock" :value="true">Stok yönetimini
              etkinleştir</UiFormCheckbox>

            <div v-show="item.isStockManagement">
              <UiFormInput placeholder="Stok miktarı"></UiFormInput>
            </div>
          </div>
        </div>
      </UiAccordion>
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
const  productState  = useNewProductStore();
const attrsAndVarsState = useAttrsAndVarsState()

const {
  fetchVariations,
  createOneVariation,
  createAllVariation,
  saveVariations,
  findValueInAttrs,
  deleteVariation
} = useVariations()
const {
  fetchAttributes,
} = useAttributes()


const isOpenGalleryModal = ref(false);
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

const isAttributeExists = (attributeId) => {
  return !!attrsAndVarsState.attributes.find((e) => e.product_attribute_id === attributeId);
};



</script>
