<template>
  <header>
    <PartialsCommonHeader></PartialsCommonHeader>
  </header>
  <slot/>
  <footer>
    <LazyPartialsCommonFooter></LazyPartialsCommonFooter>
  </footer>
</template>

<script setup>
useHead({
  title: 'Hata - Sayfa bulunamadı'
})
</script>
