<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications icon="i-heroicons-check-badge" color="orange" />
  <DialogWrapper />
  
</template>

<script setup>
import { DialogWrapper } from 'vue3-promise-dialog';
const { $changeMainState } = useNuxtApp()
const cartState = useCartState()
const nuxtApp = useNuxtApp()
const router = useRouter()

// await useAsyncData('cartInitApp', async () => {
//   await cartState.cartDBToState()
//   return true
// })

onMounted(async () => {
  $changeMainState({ isLoaded: true });
});

watch(router.currentRoute, () => {
  nuxtApp.$uiStore.closeAll()
})

</script>
