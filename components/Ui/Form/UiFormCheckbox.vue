<template>
  <div class="items-center" :class="[absolute && 'relative']">
    <input :checked="modelValueIsArray ? modelValue.includes(value) : modelValue == value" @change="onChange($event)"
      :name="name" type="checkbox" class="hidden" :id="id" />
    <label :for="id" class="flex items-center space-x-2 cursor-pointer" :class="[labelClass, absolute && '!space-x-0']">
      <div :class="absolute && 'absolute top-2 left-2'">
        <span class="block w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-md relative">
          <Icon v-if="modelValueIsArray ? modelValue.includes(value) : modelValue == value"
            name="material-symbols:fitbit-check-small-rounded"
            class="text-white w-5 h-5 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"></Icon>
        </span>
      </div>
      <span class="text-gray-700 dark:text-gray-300 no-select text-sm">
        <slot></slot>
      </span>
    </label>
  </div>
</template>

<script setup>
const { name, id, modelValue, value, labelClass, absolute } = defineProps([
  "name",
  "id",
  "modelValue",
  "value",
  "labelClass",
  "absolute",
]);

const emit = defineEmits(["update:modelValue"]);



const modelValueIsArray = Array.isArray(modelValue);

const onChange = (event) => {
  if (modelValueIsArray) {
    const index = modelValue.indexOf(value);
    if (index > -1) {
      modelValue.splice(index, 1);
    } else {
      modelValue.push(value);
    }
    emit("update:modelValue", [...modelValue]);
  } else {
    if (event.target.checked) {
      emit("update:modelValue", value);
    } else {
      emit("update:modelValue", null);
    }
  }
};
</script>

<style>
input[type="checkbox"]:checked+label span:first-child svg {
  opacity: 1;
}

input[type="checkbox"]:checked+label span:first-child {
  background-color: #f97316;
  /* bg-secondary-500 */
}

/* Dark mode support */
.dark input[type="checkbox"]:checked+label span:first-child {
  background-color: #3b82f6;
  /* bg-secondary-500 for dark mode */
}
</style>
