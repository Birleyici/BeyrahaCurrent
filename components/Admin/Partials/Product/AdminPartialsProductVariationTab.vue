<template>
  <div class="grid gap-4">
    <div class="flex space-x-4">
      <UiFormSelect v-model="addedType">
        <option value="1">Varyasyon ekle</option>
        <option value="2">Tüm niteliklerden varyasyonlar oluştur</option>
        <option value="3">Tüm varyasyonları sil</option>
      </UiFormSelect>
      <UiButtonsBaseButton @click="variationHandle()" color="secondary"
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
        v-for="item in store.variations"
      >
        <UiModal
          ok-button="true"
          header="Galeri"
          className="lg:!max-w-[800px] max-h-[500px]"
          :isOpen="isOpenGalleryModal"
          @status-change="(e) => (isOpenGalleryModal = e)"
        >
          <AdminPartialsMediaModal
            :selecteds="pathParse(item.variation_image)"
            @selecteds="(e) => (item.variation_image = e)"
          ></AdminPartialsMediaModal>
        </UiModal>

        <template v-slot:header>
          <div class="flex text-sm">
            <template v-for="term in item.terms">
              <p
                class="border-r last:border-r-0 px-2"
                v-if="isAttributeExists(term.product_term.product_attribute_id)"
              >
                {{
                  findValueInAttrs(
                    store.attributes,
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
              <UiFormSelect
                v-model="term.product_term_id"
                v-if="isAttributeExists(term.product_term.product_attribute_id)"
              >
                <option value="null">
                  Herhangi Bir
                  {{
                    (
                      store.attributes.find(
                        (e) =>
                          e.product_attribute_id == term.product_term.product_attribute_id
                      ) || {}
                    ).attribute_name || ""
                  }}
                </option>
                <option
                  :value="opt.product_term_id"
                  v-for="opt in (
                    store.attributes.find(
                      (e) =>
                        e.product_attribute_id == term.product_term.product_attribute_id
                    ) || {}
                  ).product_terms || []"
                >
                  {{ opt.term_name }}
                </option>
              </UiFormSelect>
            </template>
          </div>

          <div class="inline-block">
            <div
              class="bg-tertiary-50 border p-2 rounded-md inline-block space-x-4 items-center"
              :class="!pathParse(item.variation_image) && 'flex'"
            >
              <NuxtImg
                v-if="pathParse(item.variation_image)"
                @click="isOpenGalleryModal = true"
                :src="pathParse(item.variation_image)"
                class="cursor-pointer w-16 rounded-md"
                alt=""
              />
              <img
                @click="isOpenGalleryModal = true"
                v-else
                src="/img-placeholder.jpg"
                alt=""
                class="cursor-pointer w-16 rounded-md"
              />
              <p v-if="!pathParse(item.variation_image)" class="text-sm text-center">
                Görsel seçilmedi...
              </p>
            </div>
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
              :id="item.id"
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

const store = useAttrsAndVariations();
const isOpenGalleryModal = ref(false);
await store.fetchAttributes();
await store.fetchVariations();

const addedType = ref(1);
const errorMessage = ref(null);

const pathParse = (obj) => {
  if (!obj) {
    return null;
  }

  return JSON.parse(obj)?.path;
};

const variationHandle = () => {
  console.log(addedType.value);
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
  return !!store.attributes.find((e) => e.product_attribute_id === attributeId);
};

const createOneVariation = async () => {
  // Öncelikle, useForVariation değeri 1 olan herhangi bir attribute olup olmadığını kontrol edin.
  const hasAttributesForVariation = store.attributes.some(
    (attribute) => attribute.useForVariation == 1
  );

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
    store.attributes.forEach((attribute) => {
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

    // createdVariation.terms'i product_attribute_id'ye göre sıralayın
    createdVariation.terms.sort(
      (a, b) => a.product_term.product_attribute_id - b.product_term.product_attribute_id
    );

    // Eğer term'ler oluşturulduysa, varyasyonu listeye ekleyin.
    if (createdVariation.terms.length > 0) {
      store.variations.unshift(createdVariation);
    }
  }
};

async function createAllVariation() {
  // Tüm nitelikleri ve bu niteliklere ait termleri alalım.
  const attributesWithTerms = store.attributes.filter(
    (attribute) => attribute.product_terms && attribute.product_terms.length > 0
  );

  // Tüm kombinasyonları oluşturmak için bir yardımcı fonksiyon
  function generateCombinations(arrays) {
    return arrays.reduce(
      (acc, curr) => acc.map((a) => curr.map((c) => a.concat([c]))).flat(),
      [[]]
    );
  }

  // Tüm termleri bir diziye alalım.
  const termsArrays = attributesWithTerms.map((attribute) =>
    attribute.product_terms.map((term) => term.product_term_id)
  );

  // Tüm kombinasyonları oluşturalım.
  const allCombinations = generateCombinations(termsArrays);

  // Oluşturulan kombinasyonları kullanarak varyasyonları oluşturalım.
  const allVariations = allCombinations.map((combination) => ({
    isOpen: false,
    price: null,
    sale_price: null,
    coast: null,
    stockCode: "",
    stockAmount: 0,
    isStockManagement: false,
    product_id: 1,
    terms: combination.map((termId, index) => ({
      product_variation_id: null, // Bu değer varyasyon oluşturulduktan sonra atanacak.
      product_term_id: termId,
      product_term: {
        product_attribute_id: attributesWithTerms[index].product_attribute_id,
        term_id: termId,
      },
    })),
  }));

  const { data, pending, refresh, error } = await useJsonPlaceholderData("/variations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(allVariations),
    cache: false,
  });

  if (error.data == null) {
    await store.fetchVariations();
  }
}

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
    body: JSON.stringify(store.variations),
    cache: false,
  });
  loadingVariationUpdate.value = pending3.value;

  if (error3.value == null) {
    console.log(data3.value);

    await store.fetchVariations();
    errorMessage.value = null;
  } else {
    errorMessage.value = error3.value.data.message;
  }
};

const findValueInAttrs = (data, product_term_id, attribute_id, attribute_name) => {
  const attribute = data.find((e) => e.product_attribute_id == attribute_id);

  // Eğer belirli bir attribute_id'ye sahip öğe bulunmazsa, hemen bir default değer döndürelim.
  if (!attribute) return `Herhangi Bir ${attribute_name}`;

  const term = attribute.product_terms?.find((d) => d.product_term_id == product_term_id);

  return term?.term_name || `Herhangi Bir ${attribute.attribute_name}`;
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

  await store.deleteVariation(id);
};

const deleteAllVariations = async (productId) => {
  const { data, pending, refresh, error } = await useJsonPlaceholderData(
    "products/1/variations/",
    {
      method: "DELETE",
    }
  );

  await store.fetchVariations();
};
</script>
