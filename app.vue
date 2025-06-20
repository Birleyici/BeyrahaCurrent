<template>
  <div>
    <VitePwaManifest />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications icon="i-heroicons-check-badge" color="orange" />
    <DialogWrapper />
    <PwaInstallPrompt />
    <PwaUpdatePrompt />
  </div>
</template>

<script setup>
import { DialogWrapper } from 'vue3-promise-dialog';

const { $changeMainState } = useNuxtApp()
const nuxtApp = useNuxtApp()
const router = useRouter()
const cartState = useCartState()

// Dark mode support
const { initDarkMode } = useDarkMode();

onMounted(async () => {
  // Dark mode'u initialize et
  initDarkMode();

  $changeMainState({ isLoaded: true });
  await cartState.cartDBToState()
});

watch(router.currentRoute, () => {
  nuxtApp.$uiStore.closeAll()
})
</script>
