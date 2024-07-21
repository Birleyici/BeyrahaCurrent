<template>
  <div>
    
    <div>
      <div v-for="attribute in attrsAndVarsState.attributes" :key="attribute.name">
        <!-- Öznitelik Adı -->
        <div class="mb-4">
          <div class="my-minimal" v-if="attribute.name.toLowerCase() == 'renk'">
            <div>
              <p class="font-medium text-sm">Renk</p>
              <UCarousel v-if="$mainState.isLoaded" v-slot="{ item }" :items="attribute.options"
                :ui="{ item: 'snap-end' }">
                <NuxtImg @click="selectOption(attribute.name, item.term_name, item)"
                  :src="getTermImageSrc(item, item.term_name)" width="60"
                  class="cursor-pointer m-1 rounded-full p-[2px] border w-16 h-16 object-cover object-top" :class="{
                    'border-2 !border-secondary-500 text-white': isSelected(
                      attribute.name,
                      item.term_name
                    ),
                  }" />
              </UCarousel>
              <div class="flex space-x-2" v-else>
                <SkeletonUiThumb v-for="item in 4" :key="item"></SkeletonUiThumb>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="font-medium text-sm">{{ attribute.name }}</p>
            <div class="flex space-x-2">
              <UiButtonsBaseButton color="slate" v-for="option in attribute.options" :key="option.term_name" :class="{
                '!bg-secondary-500 text-white': isSelected(
                  attribute.name,
                  option.term_name
                ),
              }" :disabled="!isActive(attribute.name, option.term_name)"
                @click="selectOption(attribute.name, option.term_name)">
                {{ option.term_name }}
              </UiButtonsBaseButton>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="my-minimal">
      <div>
        <span v-if="getSelectedVariation?.sale_price" class="flex items-center space-x-2">
          <del class="text-gray-500">{{ getSelectedVariation?.price }} TL</del>
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
const { useNewProductStore, useAttrsAndVarsState } = useStateIndex()
const attrsAndVarsState = useAttrsAndVarsState()
const productState = useNewProductStore();

const {
  fetchVariationsForFrontEnd,
  isActive,
  selectOption,
  isSelected,
  getSelectedVariation,
  transform,
  getTermImageSrc
} = useVariationsFront()

const { fetchAttributes } = useAttributes()

await fetchVariationsForFrontEnd(productState.id)
await fetchAttributes(productState.id)

attrsAndVarsState.attributes = transform(attrsAndVarsState.attributes || [], attrsAndVarsState.variations);
</script>
