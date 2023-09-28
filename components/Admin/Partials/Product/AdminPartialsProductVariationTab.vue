<template>
  <div class="grid gap-4">
    <div class="flex space-x-4">
      <UiFormSelect v-model="addedType">
        <option value="1">Varyasyon ekle</option>
        <option value="2">Tüm niteliklerden varyasyonlar oluştur</option>
        <option value="3">Tüm varyasyonları sil</option>
      </UiFormSelect>
      <UiButtonsBaseButton @click="createOneVariation()" color="secondary"
        >Git</UiButtonsBaseButton
      >
    </div>
    <div class="rounded-md gap-4">
      <UiAccordion
        :key="item.id"
        @is-delete="deleteVariation(item.id)"
        headerClass="flex justify-between bg-tertiary-50 mt-2 border rounded-md text-sm px-minimal items-center"
        :isOpen="item.isOpen"
        @change-status="(e) => (item.isOpen = e)"
        v-for="item in useAttrsAndVariations().variations"
      >
        <template v-slot:header>
          <div class="flex text-sm">
            <template v-for="term in item.terms">
              <p class="border-r last:border-r-0 px-2">
                {{
                  findValueInAttrs(
                    useAttrsAndVariations().attributes,
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
              <UiFormSelect v-model="term.product_term_id">
                <option value="null">
                  Herhangi Bir
                  {{
                    useAttrsAndVariations().attributes.find(
                      (e) =>
                        e.product_attribute_id == term.product_term.product_attribute_id
                    ).attribute_name
                  }}
                </option>
                <option
                  :value="opt.product_term_id"
                  v-for="opt in useAttrsAndVariations().attributes.find(
                    (e) =>
                      e.product_attribute_id == term.product_term.product_attribute_id
                  ).product_terms"
                >
                  {{ opt.term_name }}
                </option>
              </UiFormSelect>
            </template>
          </div>

          <div class="bg-tertiary-50 border p-2 rounded-md flex space-x-4 items-center">
            <img src="/img-placeholder.jpg" class="w-16 rounded-md" alt="" />
            <p class="text-sm text-center">Görsel seçilmedi...</p>
          </div>
          <div></div>

          <UiFormInput v-model="item.stockCode" placeholder="Stok kodu"></UiFormInput>
          <UiFormInput v-model="item.price" placeholder="Normal fiyat"></UiFormInput>
          <UiFormInput
            v-model="item.sale_price"
            placeholder="İndirimli fiyat"
          ></UiFormInput>
          <UiFormInput v-model="item.coast" placeholder="Maliyet"></UiFormInput>

          <div class="grid gap-4">
            <UiFormCheckbox
              v-model="item.isStockManagement"
              id="stock"
              name="stock"
              :value="true"
              >Stok yönetimini etkinleştir</UiFormCheckbox
            >

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
      <UiButtonsBaseButton
        :loading="loadingVariationUpdate"
        @click="saveVariations()"
        color="secondary"
        >Varyasyonları kaydet</UiButtonsBaseButton
      >
    </div>
  </div>
</template>

<script setup>
import { useAttrsAndVariations } from "~/stores/attrsAndVariations.js";
await useAttrsAndVariations().fetchAttributes();
await useAttrsAndVariations().fetchVariations();

const addedType = ref(1);
const errorMessage = ref(null);

const variationHandle = () => {
  console.log(addedType.value);
  if (addedType.value == 1) {
    createOneVariation();
  }
};

const createOneVariation = async () => {
  // Öncelikle, useForVariation değeri 1 olan herhangi bir attribute olup olmadığını kontrol edin.
  const hasAttributesForVariation = useAttrsAndVariations().attributes.some(attribute => attribute.useForVariation == 1);

  // Eğer hiç attribute yoksa, fonksiyonu burada sonlandırın.
  if (!hasAttributesForVariation) {
    return;
  }

  const newVariation = {
    isOpen: true,
    price: null,
    sale_price: null,
    coast: null,
    stockCode: "",
    stockAmount: 0,
    isStockManagement: false,
    product_id: 1,
    terms: [],
  };

  const { data, pending, refresh, error } = await useJsonPlaceholderData("/variations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newVariation),
    cache: false,
  });

  console.log(data);

  if (error.value == null) {
    // Şimdi, yeni oluşturulan varyasyon için şablon term'leri oluşturalım:
    const createdVariation = data.value.variation;
    createdVariation.terms = [];
    useAttrsAndVariations().attributes.forEach((attribute) => {
      if (attribute.useForVariation == 0) {
        return;
      }
      const templateTerm = {
        product_variation_id: createdVariation.id,
        product_term_id: "null",
        product_term: {
          product_attribute_id: attribute.product_attribute_id,
          term_id: null,
        },
      };
      createdVariation.terms.push(templateTerm);
    });

    // Eğer term'ler oluşturulduysa, varyasyonu listeye ekleyin.
    if (createdVariation.terms.length > 0) {
      useAttrsAndVariations().variations.unshift(createdVariation);
    }
  }
};


const loadingVariationUpdate = ref(false);
const saveVariations = async () => {
  loadingVariationUpdate.value = true;

  const {
    data: data3,
    pending: pending3,
    refresh: refresh3,
    error: error3,
  } = await useJsonPlaceholderData("/products/1/variations/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(useAttrsAndVariations().variations),
    cache: false,
  });
  loadingVariationUpdate.value = pending3.value;

  if (error3.value == null) {
    console.log(data3.value);

    await useAttrsAndVariations().fetchVariations();
    errorMessage.value = null;
  } else {
    errorMessage.value = error3.value.data.message;
  }
};

const findValueInAttrs = (data, product_term_id, attribute_id, attribute_name) => {
  const term_name = data
    .find((e) => e.product_attribute_id == attribute_id)
    .product_terms.find((d) => d.product_term_id == product_term_id)?.term_name;

  return term_name
    ? term_name
    : "Herhangi Bir " +
        data.find((e) => e.product_attribute_id == attribute_id).attribute_name;
};

const deleteVariation = async (id) => {
  const {
    data: data4,
    pending: pending4,
    refresh: refresh4,
    error: error4,
  } = await useJsonPlaceholderData("variations/" + id, {
    method: "DELETE",
  });

  await useAttrsAndVariations().deleteVariation(id);
};
</script>
