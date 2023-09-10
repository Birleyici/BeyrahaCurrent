<template>
  <div>
    <label class="text-sm" for="">Şifre</label>
    <div class="w-full relative flex items-center">
      <input
        :type="!status ? 'password':'text'"
        class="!pr-10 bg-slate-50 focus:bg-white duration-300 p-3 focus:!outline-0 focus:border-secondary w-full rounded-md border"
      />
    <button class="flex items-center">
        <Icon
        @click="status = !status"
        v-if="!status"
        name="mdi:eye-off-outline"
        class="w-6  h-6 absolute right-2 text-gray-800"
      ></Icon>
      <Icon
        @click="status = !status"
        v-else
        name="mdi:eye-outline"
        class="w-6  h-6 absolute right-2 text-gray-800"
      ></Icon>
      </button>
    </div>
  </div>
</template>

<script setup>
const status = ref(false)
</script>
