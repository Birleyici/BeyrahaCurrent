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
onMounted(async () => {
  $changeMainState({ isLoaded: true });
 await cartState.cartDBToState()

});

watch(router.currentRoute, () => {
  nuxtApp.$uiStore.closeAll()
})

</script>
