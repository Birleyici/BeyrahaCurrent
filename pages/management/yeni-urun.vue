<template>
  <!-- Ürün resimleri Modal -->
  <UiModal
    header="Galeri"
    className="lg:!max-w-[800px] max-h-[500px]"
    :isOpen="isOpenMediaModal"
    @status-change="(e) => (isOpenMediaModal = e)"
  >
    <AdminPartialsMediaModal
      :selecteds="selecteds"
      @selecteds="(e) => (selecteds = e)"
    ></AdminPartialsMediaModal>
  </UiModal>

  <!-- Ürün resimleri Modal bitiş -->
  <h1 class="text-2xl my-4">Yeni ürün</h1>
  <div class="lg:grid space-y-4 lg:space-y-0 lg:grid-cols-3 gap-10">
    <div class="col-span-2 space-y-4">
      <UiFormInput placeholder="Ürün adı"></UiFormInput>
      <div class="relative mb-24">
        <label for="" class="text-sm">Ürün açıklaması</label>
        <div class="bg-tertiary-50">
          <quill-editor style="height: 300px" theme="snow" v-if="useMain().isLoaded" />
        </div>
      </div>

      <div>
        <b class="text-sm">Ürün verisi</b>
        <div class="flex items-center space-x-8">
          <button
            @click="currentTab = 'GeneralTab'"
            :class="{ ' border-secondary-500': currentTab == 'GeneralTab' }"
            class="flex items-center space-x-2 border-b-2 py-2 hover:border-secondary-500 duration-300"
          >
            <Icon name="mdi:view-dashboard" class="w-5 h-5"></Icon>
            <p>Genel</p>
          </button>
          <button
            @click="currentTab = 'StockTab'"
            :class="{ ' border-secondary-500': currentTab == 'StockTab' }"
            class="flex items-center space-x-2 border-b-2 py-2 hover:border-secondary-500 duration-300"
          >
            <Icon name="mdi:package" class="w-5 h-5"></Icon>
            <p>Stok</p>
          </button>

          <button
            @click="currentTab = 'AttributeTab'"
            :class="{ ' border-secondary-500': currentTab == 'AttributeTab' }"
            class="flex items-center space-x-2 border-b-2 py-2 hover:border-secondary-500 duration-300"
          >
            <Icon name="mdi:package" class="w-5 h-5"></Icon>
            <p>Nitelikler</p>
          </button>

          <button
            @click="currentTab = 'VariationTab'"
            :class="{ ' border-secondary-500': currentTab == 'VariationTab' }"
            class="flex items-center space-x-2 border-b-2 py-2 hover:border-secondary-500 duration-300"
          >
            <Icon name="mdi:package" class="w-5 h-5"></Icon>
            <p>Varyasyonlar</p>
          </button>
        </div>
        <div class="content p-minimal border">
          <KeepAlive> <component :is="tabs[currentTab]"></component></KeepAlive>
        </div>
      </div>
    </div>
    <div class="col-span-1 flex flex-col-reverse lg:block">
      <div class="bg-tertiary-100 border rounded-md p-minimal space-y-4">
        <UiButtonsBaseButton color="secondary" class="px-6">Yayınla</UiButtonsBaseButton>
      </div>

      <div class="bg-tertiary-100 rounded-md p-minimal border space-y-4 my-minimal">
        <div class="flex flex-auto flex-wrap gap-4">
          <NuxtImg class="w-16 h-16 object-cover rounded-md" v-for="item in selecteds" :src="item"></NuxtImg>
        </div>

        <button
          @click="isOpenMediaModal = true"
          class="w-full border-2 border-tertiary-300 p-minimal relative text-center overflow-hidden rounded-md border-dashed text-sm"
        >
          <Icon
            name="mdi:image"
            class="absolute left-0 opacity-10 w-20 h-20 -top-2"
            v-for="item in 3"
          ></Icon>

          Ürün görsellerini seç
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  LazyAdminPartialsProductStockTab,
  LazyAdminPartialsProductGeneralTab,
  LazyAdminPartialsProductAttributeTab,
  LazyAdminPartialsProductVariationTab,
} from "#components";

const selecteds = ref([]);
const isOpenMediaModal = ref(false);
const currentTab = ref("GeneralTab");
definePageMeta({
  layout: "admin",
});

const tabs = {
  StockTab: LazyAdminPartialsProductStockTab,
  GeneralTab: LazyAdminPartialsProductGeneralTab,
  VariationTab: LazyAdminPartialsProductVariationTab,
  AttributeTab: LazyAdminPartialsProductAttributeTab,
};
</script>
