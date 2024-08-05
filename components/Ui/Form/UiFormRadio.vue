<template>
  <div class=" items-center w-full">
    <input
      v-model="model"
      :name="name"
      type="radio"
      class="hidden"
      :value="value"
      :id="id"
    />
    <label :for="id" class="flex items-center space-x-2 cursor-pointer " :class="labelClass">
      <div>
        <span class="block w-5 h-5 border-2 border-gray-300 rounded-full relative">
          <Icon
            v-if="model === value"
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
const {labelClass, name, id, value } = defineProps(['name', 'id', 'value', 'labelClass']);
const model = defineModel()
</script>

<style>
input[type="radio"]:checked ~ label div span:first-child svg {
  opacity: 1;
}

input[type="radio"]:checked ~ label div span:first-child {
  background-color: #f97316; /* bg-secondary-500 */
}
</style>
