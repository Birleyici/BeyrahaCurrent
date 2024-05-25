<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>


onMounted(() => {
  useMain().isLoaded = true;
});

</script>
