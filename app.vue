<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { $changeMainState } = useNuxtApp()

onMounted(() => {
  $changeMainState({ isLoaded: true });
});

</script>
