<template>
  <div class="items-center">
    <input
      :checked="isChecked"
      @change="onChange"
      :name="name"
      type="checkbox"
      class="hidden"
      :id="id"
    />
    <label
      :for="id"
      class="flex items-center space-x-2 cursor-pointer"
      :class="labelClass"
    >
      <div>
        <span class="block w-5 h-5 border-2 border-gray-300 rounded-md relative">
          <Icon
            v-if="isChecked"
            name="material-symbols:fitbit-check-small-rounded"
            class="text-white w-5 h-5 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
          ></Icon>
        </span>
      </div>
      <span class="text-gray-700 no-select text-sm"><slot></slot></span>
    </label>
  </div>
</template>

<script setup>
const { name, id, modelValue, value, labelClass } = defineProps([
  "name",
  "id",
  "modelValue",
  "value",
  "labelClass",
]);
const emit = defineEmits(["update:modelValue"]);

const isChecked = ref(modelValue == value);

const onChange = () => {
  if (isChecked.value) {
    emit("update:modelValue", false);
  } else {
    emit("update:modelValue", value);
  }
  isChecked.value = !isChecked.value;
};
</script>

<style>
input[type="checkbox"]:checked + label span:first-child svg {
  opacity: 1;
}

input[type="checkbox"]:checked + label span:first-child {
  background-color: #f97316; /* bg-secondary-500 */
}
</style>
