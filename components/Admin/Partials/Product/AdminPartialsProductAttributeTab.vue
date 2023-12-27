<template>
  <div>
    <div class="flex items-center space-x-12">
      <Select2 class="w-full" v-model="attrId" :options="options" />
      <UiButtonsBaseButton @click="addAttr()" color="secondary">Ekle</UiButtonsBaseButton>
    </div>
    <div
      v-for="item in attrsAndVariations.attributes"
      :key="item.attribute_id"
      class="my-4"
    >
      <UiAccordion
        @is-delete="deleteAttr(item.product_attribute_id)"
        :isOpen="item.isOpen"
        @change-status="(e) => (item.isOpen = e)"
        headerClass="flex justify-between bg-tertiary-50 border rounded-md text-sm p-minimal"
        :header="item.attribute_name"
      >
        <div class="border border-t-0 p-minimal">
          <div class="flex space-x-12 bg-white">
            <UiFormInput
              @keydown.enter="addTerm(item)"
              placeholder="Nitelik terimi"
              v-model="item.termWord"
            ></UiFormInput>
            <UiButtonsBaseButton @click="addTerm(item)" color="secondary"
              >Ekle</UiButtonsBaseButton
            >
          </div>

          <div class="my-minimal space-y-4">
            <div>
              <p class="text-sm font-medium mb-2" v-if="item.product_terms.length > 0">
                Nitelik terimleri:
              </p>

              <div class="flex flex-wrap items-center">
                <UiBadgesBadge
                  @is-click="removeTerm(term, item.product_terms)"
                  class="m-1"
                  v-for="term in item.product_terms"
                >
                  {{ term.term_name }}
                </UiBadgesBadge>
              </div>
            </div>
            <UiFormCheckbox
              v-model="item.useForVariation"
              :value="true"
              :id="item.attribute_id"
              >Varyasyonlar için kullan</UiFormCheckbox
            >
            <UiFormCheckbox
              v-model="item.showProductPage"
              :value="true"
              :id="item.attribute_id + Math.floor(Math.random() * 10)"
              >Ürün sayfasında göster</UiFormCheckbox
            >
          </div>
        </div>
      </UiAccordion>
    </div>
    <div
      v-if="attrsAndVariations.attributes.length > 0"
      class="flex justify-end mt-4"
    >
      <UiButtonsBaseButton
        :loading="loadingSaveAttrs"
        @click="saveAttrs()"
        color="secondary"
        >Nitelikleri kaydet</UiButtonsBaseButton
      >
    </div>
  </div>
</template>

<script setup>
import { useNewProductStore } from "~/stores/newProduct.js";
import { useAttrsAndVariations } from "~/stores/attrsAndVariations.js";

const product = useNewProductStore();
const attrsAndVariations = useAttrsAndVariations()

let productId = useRoute().params.id;

await attrsAndVariations.fetchAttributes(productId);

const attrId = ref("1");
const addAttr = () => {
  const item = options.value.find((option) => option.id === parseInt(attrId.value));
  // attributes içerisinde bu attribute_id'ye sahip bir öğe olup olmadığını kontrol ediyoruz.
  const isAttributeExists = attrsAndVariations.attributes.some(
    (attr) => attr.attribute_id === item.id
  );

  // Eğer bu ID'ye sahip bir öğe zaten varsa veya attributes uzunluğu 30'dan fazla ise, yeni bir öğe eklemiyoruz.
  if (!isAttributeExists && attrsAndVariations.attributes.length < 30) {
    attrsAndVariations.attributes.unshift({
      attribute_id: item.id,
      attribute_name: item.text,
      isOpen: true,
      useForVariation: false,
      showProductPage: true,
      termWord: "",
      product_terms: [],
    });
  }
};

const addTerm = (term) => {
  if (
    term.termWord &&
    term.termWord.length <= 25 &&
    !term.product_terms.some((t) => t.term_name === term.termWord)
  ) {
    term.product_terms.push({ term_name: term.termWord });
    term.termWord = "";
  }
};

const removeTerm = async (term, terms) => {
  const { data, pending, refresh, error } = await useBaseFetch(
    "product-terms/" + term.product_term_id,
    {
      method: "DELETE",
    }
  );

  const index = terms.indexOf(term);
  if (index !== -1) {
    terms.splice(index, 1);
  }
};

const loadingSaveAttrs = ref(false);
const saveAttrs = async () => {
  if (product.id == null) {
    await product.saveProduct(productId);
  }

  loadingSaveAttrs.value = true;
  const { data, pending, refresh, error } = await useBaseFetch(
    "products/" + product.id + "/attributes",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attrsAndVariations.attributes),
      cache: false,
    }
  );
  loadingSaveAttrs.value = pending.value;

  await attrsAndVariations.fetchAttributes(productId);
  await attrsAndVariations.fetchVariations(productId);
};

const deleteAttr = async (id) => {
  const { data, pending, refresh, error } = await useBaseFetch(
    "product-attributes/" + id,
    {
      method: "DELETE",
      headers: {
        ...useMain().returnHeader(),
      },
    }
  );
  await attrsAndVariations.deleteAttr(id);
  await attrsAndVariations.fetchVariations(productId);
};

const { data: options, pending, refresh, error } = await useBaseFetch(
  "attributes/global"
);
</script>
