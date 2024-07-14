<template>
  <div>
    <!-- Ürün resimleri Modal -->
    <UiModal :okButton="true" header="Galeri" className="lg:!max-w-[800px] max-h-[500px]" :isOpen="isOpenMediaModal"
      @status-change="(e) => (isOpenMediaModal = e)">
      <AdminPartialsMediaModal :selecteds="productState.selectedImages"
        @selecteds="(e) => (productState.selectedImages = e)">
      </AdminPartialsMediaModal>
    </UiModal>

    <UBreadcrumb class="mb-4" :links="links" />
    

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

            <button @click="currentTab = 'FeaturedTab'"
              :class="{ ' border-secondary-500': currentTab == 'FeaturedTab' }"
              class="flex items-center space-x-2 border-b-2 py-2 hover:border-secondary-500 duration-300">
              <Icon name="mdi:format-list-group" class="w-5 h-5"></Icon>
              <p>Öne Çıkanlar</p>
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
        
       
          <UiButtonsBaseButton  :loading="productState.loading" @click="saveProduct(productState.id, true)"
            color="secondary" class="px-6 w-full">Yayınla</UiButtonsBaseButton>
    

        <div class="bg-tertiary-100 rounded-md p-minimal border space-y-4 my-minimal">
          <div class="flex flex-auto flex-wrap gap-4">
            <div class="relative" v-for="(item, index) in productState.selectedImages" :key="index">
              <NuxtImg :class="{
                'border-2 border-secondary-500':
                  item.id == productState.coverImageId,
              }" class="w-16 h-16 object-cover rounded-md cursor-pointer" @click="productState.coverImageId = item.id"
                :src="'aws' + item.path">
              </NuxtImg>

              <span v-if="item.id == productState.coverImageId"
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

          <div class="h-[300px] overflow-y-scroll bg-slate-50 p-2 rounded-md">
            <UCommandPalette :emptyState="{
              queryLabel: 'Sonuç bulunamadı...'
            }" placeholder="Kategorilerde ara..." v-model="productState.selectedCategories" multiple nullable
              :autoselect="false" :groups="[{ key: 'label', commands: productState.categories }]"
              :fuse="{ resultLimit: -1 }" />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});
const { useNewProductStore } = useStateIndex()
const productState = useNewProductStore()

const { tabs, saveProduct, getProduct, getCategories } = useProductCreate();
const isOpenMediaModal = ref(false);
const currentTab = ref("GeneralTab");
const route = useRoute();
if (route.params.id == "yeni") {
  productState.$reset();
} else {
  await getProduct(route.params.id);
}
await getCategories()



const links = [{
  label: 'Ürünler',
  icon: 'i-heroicons-squares-2x2',
  to: '/management/urunler'
}, {
  label: 'Yeni ürün',
  icon: 'i-heroicons-squares-plus'
}]

</script>
