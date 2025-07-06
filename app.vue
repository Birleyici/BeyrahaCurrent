<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <Transition name="page" appear>
        <NuxtPage :keepalive="{ max: 10 }" />
      </Transition>
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

  await cartState.cartDBToState()
});

watch(router.currentRoute, () => {
  uiStore.closeAll()
})
</script>

<style>
/* Native-style Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: translateY(0);
}

/* Subtle Layout Transitions */
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}

.layout-enter-to,
.layout-leave-from {
  opacity: 1;
}

/* Subtle loading indicator */
.nuxt-loading-indicator {
  background: linear-gradient(to right, #f97316, #ea580c) !important;
  height: 2px !important;
  opacity: 0.8 !important;
}
</style>
