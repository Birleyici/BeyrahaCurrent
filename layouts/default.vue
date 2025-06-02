<template>
  <div class="min-h-screen flex flex-col bg-neutral-50">
    <!-- Header -->
    <header class="flex-shrink-0">
      <PartialsCommonHeader />
    </header>

    <!-- Ana İçerik -->
    <main class="flex-1">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="flex-shrink-0 mt-auto">
      <LazyPartialsCommonFooter />
    </footer>
  </div>
</template>
