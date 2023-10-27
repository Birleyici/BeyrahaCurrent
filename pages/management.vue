<template>
  {{  useError() }}
  <NuxtPage />
</template>

<script setup>
definePageMeta({
  middleware: ["auth", "managertokenhandle"],
});


</script>
