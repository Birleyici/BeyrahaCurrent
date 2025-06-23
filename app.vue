<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications icon="i-heroicons-check-badge" color="orange" />
    <DialogWrapper />
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


onMounted(async () => {
  // Dark mode'u initialize et
  initDarkMode();

  $changeMainState({ isLoaded: true });

  $changeMainState({ isLoaded: true });
  await cartState.cartDBToState()
});

watch(router.currentRoute, () => {
  uiStore.closeAll()
})
</script>
