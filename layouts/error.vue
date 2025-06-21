<template>
  <header>
    <PartialsCommonHeader></PartialsCommonHeader>
  </header>
  <slot />
  <footer>
    <LazyPartialsCommonFooter></LazyPartialsCommonFooter>
  </footer>
</template>

<script setup>
import { useSettings } from '~/composables/useSettings'
import { computed } from 'vue'

const { siteName } = useSettings()

useHead({
  title: computed(() => `Hata - Sayfa bulunamadı - ${siteName.value}`)
})
</script>
