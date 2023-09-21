<template>
  <div class="grid grid-cols-3 gap-10">
    <div class="col-span-2 space-y-4">
      <UiFormInput placeholder="Ürün adı"></UiFormInput>
      <div class="relative mb-24">
        <label for="" class="text-sm">Ürün açıklaması</label>
        <quill-editor theme="snow" />
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
    <div class="col-span-1"></div>
  </div>
</template>

<script setup>
import {
  AdminPartialsProductStockTab,
  AdminPartialsProductGeneralTab,
  AdminPartialsProductVariationTab,
} from "#components";
const currentTab = ref("GeneralTab");
definePageMeta({
  layout: "admin",
});

const tabs = {
  StockTab: AdminPartialsProductStockTab,
  GeneralTab: AdminPartialsProductGeneralTab,
  VariationTab: AdminPartialsProductVariationTab,
};
</script>
