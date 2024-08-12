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
const nuxtApp = useNuxtApp()
const router = useRouter()
await cartState.cartDBToState()

onMounted(async () => {
  $changeMainState({ isLoaded: true });
});

watch(router.currentRoute, () => {
  nuxtApp.$uiStore.closeAll()
})

</script>
