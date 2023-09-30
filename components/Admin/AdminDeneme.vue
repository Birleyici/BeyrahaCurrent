<template>
  <div>
    <div v-if="attributesLoaded">
      <div v-for="attribute in attributes" :key="attribute.name">
        <!-- Öznitelik Adı -->
        <strong>{{ attribute.name }}:</strong>
        <div class="flex space-x-2">
          <UiButtonsBaseButton
            color="slate"
            v-for="option in attribute.options"
            :key="option"
            :class="{ '!bg-secondary-500 text-white': isSelected(attribute.name, option) }"
            :disabled="!isActive(attribute.name, option)"
            @click="selectOption(attribute.name, option)"
          >
            {{ option }}
          </UiButtonsBaseButton>
        </div>
      </div>
    </div>
    <div v-else>Yükleniyor...</div>
  </div>
</template>

<script setup>
// Örnek varyasyon verisi:
const variations = [{ Beden: "S", Renk: "Kırmızı" }, { Beden: "L" }];

// Öznitelikler ve seçenekleri:
const attributes = [
  { name: "Beden", options: ["S", "M", "L", "XL"] },
  { name: "Renk", options: ["Kırmızı", "Siyah", "Lacivert"] },
];

const selectedOptions = ref({});

const attributesLoaded = ref(true);

const selectOption = (attributeName, option) => {
  selectedOptions.value = { ...selectedOptions.value, [attributeName]: option };
};

const isActive = (attributeName, option) => {
  let tempSelected = { ...selectedOptions.value, [attributeName]: option };

  return variations.some((v) => {
    return Object.keys(tempSelected).every((key) => {
      return v[key] === tempSelected[key] || !v[key];
    });
  });
};

const isSelected = (attributeName, option) => {
  return selectedOptions.value[attributeName] === option;
};
</script>

<style>
/* Basit stillendirmeler */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
