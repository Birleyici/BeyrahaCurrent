<template>
  <button :class="colorClasses" class="mt-2 rounded-md duration-300 px-3 py-2">
    <slot />
  </button>
  
</template>

<script setup>
const { color } = defineProps(["color"]);

const colorClasses = computed(() => {
  if (color == "secondary") {
    return ["bg-secondary-500", "hover:bg-secondary-400", "text-white"];
  }
  if (color == "slate") {
    return ["bg-slate-200", "hover:bg-slate-300"];
  }
});
</script>
