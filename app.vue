<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
  console.log(useMain().isLoaded)

onMounted(() => {
  useMain().isLoaded = true;
});
</script>
