<template>
  <div class="px-x-mobil lg:px-x-desktop">

    <div class="my-8">
      <UiSlidesProductSlide title="Çarşaf" 
      to="/carsaf-cilbab-a51"
      :filters="{
        selectedCategoryIds: '[51]',
        piece: 8
      }">
      </UiSlidesProductSlide>
    </div>

    <div class="my-8">
      <UiSlidesProductSlide title="Peçe" 
      to="/pece-a56"
      :filters="{
        selectedCategoryIds: '[56]',
        piece: 8
      }">
      </UiSlidesProductSlide>
    </div>

    <div class="my-8">
      <UiSlidesProductSlide title="Sufle" 
      to="/sufle-a55"
      :filters="{
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
