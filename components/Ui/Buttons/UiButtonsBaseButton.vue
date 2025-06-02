<template>
  <button :class="colorClasses" class="rounded-md space-x-2 duration-300 flex justify-center items-center px-3 py-2">
    <slot />

    <Icon v-if="loading" name="mdi:loading" class="animate-spin"></Icon>
  </button>

</template>

<script setup>
const { color, loading } = defineProps(["color", "loading"]);

const colorClasses = computed(() => {
  if (color == "secondary") {
    return ["bg-secondary-500", "hover:bg-secondary-400", "text-white"];
  }
  if (color == "slate") {
    return ["bg-slate-200", "hover:bg-slate-300"];
  }
  if (color == "red") {
    return ["bg-red-500", "hover:bg-red-400", 'text-white'];
  }
});
</script>
