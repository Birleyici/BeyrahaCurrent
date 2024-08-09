<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { $changeMainState } = useNuxtApp()
const { useCartState } = useStateIndex()
const cartState = useCartState()

onMounted(() => {
  $changeMainState({ isLoaded: true });
    cartState.cartDBToState()
});

</script>
