<template>
  <div class="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
    <!-- Header -->
    <header class="flex-shrink-0">
      <PartialsCommonHeader />
    </header>

    <!-- Ana İçerik -->
    <main class="flex-1  ">
      <NuxtPage />
    </main>

    <!-- PWA Install Prompt -->
    <ClientOnly>
      <PartialsCommonPwaInstallPrompt />
    </ClientOnly>

    <!-- Footer -->
    <footer class="flex-shrink-0 mt-8">
      <LazyPartialsCommonFooter />
    </footer>
  </div>
</template>

<script setup>
// Dark mode composable'ını initialize et
const { initDarkMode } = useDarkMode();

onMounted(() => {
  initDarkMode();
});
</script>
