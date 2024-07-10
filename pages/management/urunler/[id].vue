<template>
  <div>
    <!-- Ürün resimleri Modal -->
    <UiModal :okButton="true" header="Galeri" className="lg:!max-w-[800px] max-h-[500px]" :isOpen="isOpenMediaModal"
      @status-change="(e) => (isOpenMediaModal = e)">
      <AdminPartialsMediaModal :selecteds="productState.selectedImages"
        @selecteds="(e) => (productState.selectedImages = e)">
      </AdminPartialsMediaModal>
    </UiModal>

    <!-- Ürün resimleri Modal bitiş -->
    <h1 class="text-2xl my-4">Yeni ürün</h1>
    <div class="lg:grid space-y-4 lg:space-y-0 lg:grid-cols-3 gap-10">
      <div class="col-span-2 space-y-4">
        <UiFormInput v-model="productState.name" placeholder="Ürün adı" class="font-medium"></UiFormInput>
        <UiFormInput v-model="productState.description" placeholder="Ürün açıklaması"></UiFormInput>
        <div class="relative mb-24">
          <label for="" class="text-sm">Detaylı ürün açıklaması</label>
          <div class="bg-tertiary-50">
            <QuillEditor contentType="html" v-model:content="productState.additional_info" style="height: 300px"
              theme="snow" />
          </div>
        </div>

        <div>
          <b class="text-sm">Ürün verisi</b>
          <div class="flex items-center space-x-8">
            <button @click="currentTab = 'GeneralTab'" :class="{ ' border-secondary-500': currentTab == 'GeneralTab' }"
              class="flex items-center space-x-2 border-b-2 py-2 hover:border-secondary-500 duration-300">
              <Icon name="mdi:view-dashboard" class="w-5 h-5"></Icon>
              <p>Genel</p>
            </button>
            <button @click="currentTab = 'AttributeTab'"
              :class="{ ' border-secondary-500': currentTab == 'AttributeTab' }"
              class="flex items-center space-x-2 border-b-2 py-2 hover:border-secondary-500 duration-300">
              <Icon name="mdi:package" class="w-5 h-5"></Icon>
              <p>Nitelikler</p>
            </button>

            <button @click="currentTab = 'VariationTab'"
              :class="{ ' border-secondary-500': currentTab == 'VariationTab' }"
              class="flex items-center space-x-2 border-b-2 py-2 hover:border-secondary-500 duration-300">
              <Icon name="mdi:package" class="w-5 h-5"></Icon>
              <p>Varyasyonlar</p>
            </button>
          </div>
          <div class="content p-minimal border">
            <KeepAlive>
              <component :is="tabs[currentTab]"></component>
            </KeepAlive>
          </div>
        </div>
      </div>
      <div class="col-span-1 flex flex-col-reverse lg:block">
        <div class="bg-tertiary-100 border rounded-md p-minimal space-y-4">
          <UiButtonsBaseButton :loading="productState.loading" @click="saveProduct(useRoute().params.id)"
            color="secondary" class="px-6">Yayınla</UiButtonsBaseButton>
        </div>

        <div class="bg-tertiary-100 rounded-md p-minimal border space-y-4 my-minimal">
          <div class="flex flex-auto flex-wrap gap-4">
            <div class="relative" v-for="(item, index) in productState.selectedImages" :key="index">
              <NuxtImg :class="{
                'border-2 border-secondary-500':
                  item.id == productState.coverImage,
              }" class="w-16 h-16 object-cover rounded-md cursor-pointer" @click="productState.coverImage = item.id"
                :src="'aws' + item.path"></NuxtImg>

              <span v-if="item.id == productState.coverImage"
                class="absolute w-full bg-secondary-500 text-[10px] bottom-0 rounded-b-md text-white px-1 text-center">Kapak</span>
            </div>
          </div>

          <button @click="isOpenMediaModal = true"
            class="w-full border-2 border-tertiary-300 p-minimal relative text-center overflow-hidden rounded-md border-dashed text-sm">
            <Icon name="mdi:image" class="absolute left-0 opacity-10 w-20 h-20 -top-2" v-for="item in 3" :key="item">
            </Icon>

            Ürün görsellerini seç
          </button>
        </div>
        <div class="my-minimal">
          <UiCardsLiveSearchCard 
            title="Ürün kategorileri">
          </UiCardsLiveSearchCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});
const { productState, tabs, saveProduct, getProduct, getCategories } = useProductCreate();

const currentTab = ref("GeneralTab");

const route = useRoute();

if (route.params.id != "yeni") {
   getProduct(route.params.id);
} else {
  productState.$reset();
  getCategories()

}

const isOpenMediaModal = ref(false);


watch(
        () => productState.selectedImages,
        (newVal) => {
            // Eğer coverImage henüz ayarlanmamışsa VE selectedImages'ta eleman varsa
            if (!productState.coverImage && newVal.length > 0) {
                // selectedImages'in ilk elemanının id'sini coverImage olarak ayarla
                productState.coverImage = newVal[0].id;
            }
        },
        { immediate: true }
    ); // Bu, watcher'ın hemen çalışması için. Böylece ilk değer ataması da kontrol edilir.

    watch(
        () => productState.id, // İzlenecek değer  (productState.id)
        (newVal) => {
            // Eğer productState.id değişirse
            if (newVal) {
                //ürün id sinin düzenleme linkine yönlendirilmesi. yönlendirmeyi nuxtun navigateTo ile yap
                if (process.client) {
                    navigateTo("/management/urunler/" + newVal, { top: false });
                }
            }
        },
        { immediate: false }
    );

</script>
