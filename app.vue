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
const nuxtApp = useNuxtApp()
const router = useRouter()
const cartState = useCartState()

onMounted(async () => {
  $changeMainState({ isLoaded: true });
  await cartState.cartDBToState()
});


watch(router.currentRoute, () => {
  nuxtApp.$uiStore.closeAll()
})

</script>
