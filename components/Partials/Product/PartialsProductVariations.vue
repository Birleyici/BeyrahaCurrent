<template>
  <div>
    <div>
      <div v-for="attribute in attributes" :key="attribute.name">
        <!-- Öznitelik Adı -->
        <div class="mb-4">
          <p class="font-medium text-sm">{{ attribute.name }}:</p>
          <div class="flex space-x-2">
            <UiButtonsBaseButton
              color="slate"
              v-for="option in attribute.options"
              :key="option"
              :class="{
                '!bg-secondary-500 text-white': isSelected(attribute.name, option),
              }"
              :disabled="!isActive(attribute.name, option)"
              @click="selectOption(attribute.name, option)"
            >
              {{ option }}
            </UiButtonsBaseButton>
          </div>
        </div>
      </div>
    </div>

    <div class="my-minimal">
      <p class="text-secondary-500 text-3xl font-bold">
        {{ getSelectedVariation()?.sale_price ? getSelectedVariation()?.sale_price : getSelectedVariation()?.price || "0" }} TL
      </p>
    </div>
  </div>
</template>

<script setup>
const { data: variations, pending, refresh, error } = await useBaseFetch(
  "page/products/58/variations",
  {
    method: 'GET',
    cache: 'no-cache',
  }
);


const {
  data: attributes,
  refresh: refreshAttrs,
  error: errorAttrs,
} = await useBaseFetch("products/58/attributes", {
  method: 'GET',
  cache: 'no-cache',
});

function transform(attributes) {
  let newAttrs = [];
  attributes.forEach((a) => {
    const obj = {};
    obj.name = a.attribute_name;
    const termNames = a.product_terms.map((item) => item.term_name);

    obj.options = termNames;

    newAttrs.push(obj);
  });
  return newAttrs;
}

attributes.value = transform(attributes.value || []) || [];

const selectedOptions = ref({});

const selectOption = (attributeName, option) => {
  selectedOptions.value = { ...selectedOptions.value, [attributeName]: option };
};

const isActive = (attributeName, option) => {
  let tempSelected = { ...selectedOptions.value, [attributeName]: option };

  return variations.value.some((variation) => {
    return Object.keys(tempSelected).every((key) => {
      if (!variation.attributes[key]) return true; // Öznitelik varyasyonda yoksa doğru olarak kabul ediyoruz.
      return variation.attributes[key] === tempSelected[key];
    });
  });
};

const isSelected = (attributeName, option) => {
  return selectedOptions.value[attributeName] === option;
};

const getSelectedVariation = () => {
  // Önce tam eşleşen bir varyasyon ara.
  let selectedVariation = variations.value.find((variation) => {
    return Object.keys(selectedOptions.value).every((key) => {
      return variation.attributes[key] === selectedOptions.value[key];
    });
  });

  // Eğer tam eşleşen bir varyasyon bulamazsanız, "any" durumunu da dikkate al.
  if (!selectedVariation) {
    selectedVariation = variations.value.find((variation) => {
      return Object.keys(selectedOptions.value).every((key) => {
        return (
          !variation.attributes[key] ||
          variation.attributes[key] === selectedOptions.value[key]
        );
      });
    });
  }

  return selectedVariation;
};
</script>

<style>
/* Basit stillendirmeler */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
