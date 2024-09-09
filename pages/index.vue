<template>
  <div class="px-x-mobil lg:px-x-desktop">

    <div class="my-8">
      <UiSlidesProductSlide :lcp="true" title="Çarşaf" to="/carsaf-cilbab-a51" :is-ssr="true" :filters="{
        selectedCategoryIds: '[51]',
        piece: 1
      }">
      </UiSlidesProductSlide>
    </div>

    <div class="my-8">
      <UiSlidesProductSlide title="Peçe" to="/pece-a56" :is-ssr="true" :filters="{
        selectedCategoryIds: '[56]',
        piece: 1
      }">
      </UiSlidesProductSlide>
    </div>

    <div class="my-8">
      <UiSlidesProductSlide :is-ssr="true" title="Sufle" to="/sufle-a55" :filters="{
        selectedCategoryIds: '[55]',
        piece: 1
      }">
      </UiSlidesProductSlide>
    </div>

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
