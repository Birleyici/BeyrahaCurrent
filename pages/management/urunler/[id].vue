<template>
  <div>

    <UModal v-model="isOpenMediaModal" fullscreen>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Media
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="isOpenMediaModal = false" />
          </div>
        </template>
        <AdminPartialsMedia v-model="productState.selectedImages" />
      </UCard>
    </UModal>


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


        <UiButtonsBaseButton :loading="productState.loading" @click="saveProduct(productState.id, true)"
          color="secondary" class="px-6 w-full">Yayınla</UiButtonsBaseButton>


        <AdminPartialsMediaSelectBox v-model:is-open-modal="isOpenMediaModal" :selected-images="productState.selectedImages"
          v-model:cover-image-id="productState.coverImageId" />

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
