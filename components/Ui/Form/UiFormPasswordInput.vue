<template>
  <div>
    <div class="w-full relative flex items-center">
      <input
      :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
        :type="!status ? 'password':'text'"
        class="!pr-10 text-sm bg-slate-50 focus:bg-white duration-300 p-3 focus:!outline-0 focus:border-secondary-500 w-full rounded-md border"
      />
    <button class="flex items-center">
        <Icon
        @click="status = !status"
        v-if="!status"
        name="mdi:eye-off-outline"
        class="w-5  h-5 absolute right-2 text-gray-800"
      ></Icon> 
      <Icon
        @click="status = !status"
        v-else
        name="mdi:eye-outline"
        class="w-5  h-5 absolute right-2 text-gray-800"
      ></Icon>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps(['modelValue', 'placeholder'])
defineEmits(['update:modelValue'])
const status = ref(false)
</script>
