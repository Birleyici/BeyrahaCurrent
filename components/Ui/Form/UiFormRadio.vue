<template>
  <div class="relative inline-flex items-center">
    <input :checked="checked&&checked" :name="name" type="radio" class="hidden" :id="id" />
    <label  :for="id" class="flex items-center space-x-2 cursor-pointer">
     <div>
        <span class="block w-5 h-5 border-2 border-gray-300 rounded-full relative">
        <Icon
          name="material-symbols:fitbit-check-small-rounded"
          class="text-white w-5 h-5 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 opacity-0"
        ></Icon>
      </span>
      </div>
      <span class="text-gray-700 no-select text-sm"><slot></slot></span>
    </label>
  </div>

</template>

<script setup>
const { name, id } = defineProps(["name", "id"]);
</script>
<style>
input[type="radio"]:checked ~ label div span:first-child svg {
  opacity: 1;
}

input[type="radio"]:checked ~ label div span:first-child {
  background-color: #f97316; /* bg-secondary-500 */
}

</style>
