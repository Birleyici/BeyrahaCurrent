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

// UI Store
const uiStore = useUIStore()

// Dark mode support
const { initDarkMode } = useDarkMode();

// PWA support
const { checkInstallation } = usePwa()

onMounted(async () => {
  // Dark mode'u initialize et
  initDarkMode();

  // PWA durumunu kontrol et
  checkInstallation();

  $changeMainState({ isLoaded: true });
  await cartState.cartDBToState()
});

watch(router.currentRoute, () => {
  uiStore.closeAll()
})
</script>
