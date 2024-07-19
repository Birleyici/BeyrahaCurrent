<template>

  <div class="items-center" :class="[absolute && 'relative']">
    <input v-model="model" :value="value" :name="nameHandle" :type="inputType" class="hidden"
      :id="`image_checkbox_${id}`" />
    <label :for="`image_checkbox_${id}`" class="flex items-center space-x-2 cursor-pointer"
      :class="[labelClass, absolute && '!space-x-0']">
      <div :class="absolute && 'absolute top-2 left-2'">
        <span class="block w-5 h-5 border-2 border-gray-300 rounded-md relative">
          <Icon v-if="isActive" name="material-symbols:fitbit-check-small-rounded"
            class="text-white w-5 h-5 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"></Icon>
        </span>
      </div>
      <span class="text-gray-700 no-select text-sm">
        <slot></slot>
      </span>
    </label>
  </div>

</template>

<script setup>
const { name, id, value, labelClass, absolute } = defineProps([
  "name",
  "id",
  "value",
  "labelClass",
  "absolute",
]);


const model = defineModel()


const inputType = computed(() => {
  return Array.isArray(model.value) ? 'checkbox' : 'radio';
});

const isActive = computed(() => {
  if (Array.isArray(model?.value)) {
    return model.value.some(item => item.id === value.id);
  } else {

    return model?.value?.id === value.id;
  }
});

const nameHandle = computed(() => {

  return inputType.value == 'radio' ? 'image' : name
})


</script>

<style>
input[type="checkbox"]:checked+label span:first-child svg,
input[type="radio"]:checked+label span:first-child svg {
  opacity: 1;
}

input[type="checkbox"]:checked+label span:first-child,
input[type="radio"]:checked+label span:first-child {
  background-color: #f97316;
  /* bg-secondary-500 */
}
</style>
