<template>
  <div class="px-x-mobil lg:px-x-desktop">
    <!-- <NuxtImg width="100" src="cl/7e0a1a89-4b1e-424e-d29c-dfa42e644700/public" /> -->
    <div class="my-8">
      <UiSlidesProductSlide :lcp="true" title="Çarşaf" to="/carsaf-cilbab-a51" :is-ssr="true" :filters="{
        selectedCategoryIds: '[51]',
        piece: 8
      }">
      </UiSlidesProductSlide>
    </div>

    <div class="my-8">
      <UiSlidesProductSlide title="Peçe" to="/pece-a56" :is-ssr="true" :filters="{
        selectedCategoryIds: '[56]',
        piece: 8
      }">
      </UiSlidesProductSlide>
    </div>

    <div class="my-8">
      <UiSlidesProductSlide :is-ssr="true" title="Sufle" to="/sufle-a55" :filters="{
        selectedCategoryIds: '[55]',
        piece: 8
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
