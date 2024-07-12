<template>
  
  <div>
    <div>
      <div v-for="attribute in attrsAndVarsState.attributes" :key="attribute.name">
        <!-- Öznitelik Adı -->
        <div class="mb-4">
          <p class="font-medium text-sm">{{ attribute.name }}</p>
          <div class="flex space-x-2">
            <UiButtonsBaseButton color="slate" v-for="option in attribute.options" :key="option" :class="{
              '!bg-secondary-500 text-white': isSelected(
                attribute.name,
                option
              ),
            }" :disabled="!isActive(attribute.name, option)" @click="selectOption(attribute.name, option)">
              {{ option }}
            </UiButtonsBaseButton>
          </div>
        </div>
      </div>
    </div>

    <div class="my-minimal">
      <div>
        <span v-if="getSelectedVariation?.sale_price" class="flex items-center space-x-2">
          <del class="text-gray-500">{{ getSelectedVariation?.price  }} TL</del>
          <span class="text-secondary-500 text-3xl font-bold">{{ getSelectedVariation?.sale_price }} TL</span>
        </span>
        <span v-else class="text-secondary-500 text-3xl font-bold">
          {{ getSelectedVariation?.price || "0" }} TL
        </span>
      </div>
    </div>
  </div>

</template>

<script setup>
import { useAttrsAndVarsState } from "~/store/attrsAndVariations";
const attrsAndVarsState = useAttrsAndVarsState()
const { productState } = useProductCreate();

const {
  fetchVariationsForFrontEnd,
  isActive,
  selectOption,
  isSelected,
  getSelectedVariation
} = useVariations()

const {
  fetchAttributes,
} = useAttributes()

await fetchVariationsForFrontEnd(productState.id)
await fetchAttributes(productState.id)



function transform(attributes) {
  let newAttrs = [];
  attributes.forEach((a) => {
    const obj = {};
    obj.name = a.attribute_name;
    const termNames = a.product_terms.map((item) => {
      return item.term_name
    });
    obj.options = termNames;
    newAttrs.push(obj);
  });
  return newAttrs;
}

attrsAndVarsState.attributes = transform(attrsAndVarsState.attributes || []) || [];




</script>

<style>
/* Basit stillendirmeler */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
