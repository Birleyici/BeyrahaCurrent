<template>
  <div class="grid gap-4">
    <div class="rounded-md gap-4">
      <UiAccordion header="Varyasyon detay" headerClass="flex justify-between bg-white border rounded-md text-sm p-minimal" :open="true">
        <div class="grid grid-cols-2 gap-4 bg-white border border-t-0 p-minimal">
          <div class="bg-tertiary-50 border p-2 rounded-md flex space-x-4 items-center">
            <img src="/img-placeholder.jpg" class="w-16 rounded-md" alt="" />
            <p class="text-sm text-center">Görsel seçilmedi...</p>
          </div>
          <div>
            <UiFormInput placeholder="Varyasyon adı"></UiFormInput>
          </div>
          <UiFormInput placeholder="Stok kodu"></UiFormInput>
          <UiFormInput placeholder="Normal fiyat"></UiFormInput>
          <UiFormInput placeholder="İndirimli fiyat"></UiFormInput>
          <UiFormInput placeholder="Maliyet"></UiFormInput>

          <div class="grid gap-4">
            <UiFormCheckbox
              v-model="isStockManagement"
              id="stock"
              name="stock"
              value="myStringValue"
              >Stok yönetimini etkinleştir</UiFormCheckbox
            >

            <div v-show="isStockManagement">
              <UiFormInput placeholder="Stok miktarı"></UiFormInput>
            </div>
          </div>
        </div>
      </UiAccordion>
    </div>
  </div>
</template>

<script setup>
const isStockManagement = ref(false);
</script>
