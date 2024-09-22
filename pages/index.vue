<template>
  <div class="space-y-section-mobile md:space-y-section-desktop">
    <UiSlidesProductSlide :lcp="true" title="Çarşaf" to="/carsaf-cilbab-a51" :is-ssr="true" :filters="{
      selectedCategoryIds: '[51]',
      piece: 8
    }">
    </UiSlidesProductSlide>
    <UiSlidesProductSlide title="Peçe" to="/pece-a56" :is-ssr="true" :filters="{
      selectedCategoryIds: '[56]',
      piece: 8
    }">
    </UiSlidesProductSlide>
    <UiSlidesProductSlide :is-ssr="true" title="Sufle" to="/sufle-a55" :filters="{
      selectedCategoryIds: '[55]',
      piece: 8
    }">
    </UiSlidesProductSlide>
  </div>
</template>

<script setup>
useHead({
  title: 'Beyraha Tesettür Giyim - Ana Sayfa',
  meta: [
    { name: 'description', content: 'En sevdiğiniz tesettür mağazaları artık yeni Beyraha da sizleri bekliyor.' }
  ],
})


</script>
