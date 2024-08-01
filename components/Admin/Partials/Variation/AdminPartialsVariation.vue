<template>
  <UiAccordion :key="item.id" @is-delete="variationState.deleteVariation(item.id)"
    headerClass="flex justify-between bg-tertiary-50 mt-2 border rounded-md text-sm px-minimal items-center"
    :isOpen="item.isOpen" @change-status="(e) => (item.isOpen = e)">


    <UModal v-model="isOpen" fullscreen>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Modal
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="isOpen = false" />
          </div>
        </template>
        <AdminPartialsMedia v-model="item.image" />
      </UCard>
    </UModal>

    <template v-slot:header>
      <div class="flex text-sm ">
        <p class="px-2 first:pl-0 border-r last:border-r-0"v-for="term in item.terms">
          {{ term.term_name }}
        </p>
      </div>
    </template>

    <div class="grid lg:grid-cols-2 gap-4 bg-white border border-t-0 p-minimal">
      <div class="inline-block col-span-2">
        <div class="bg-tertiary-50 border p-2 rounded-md flex space-x-2 items-center">
          <img @click="isOpen = true" :src="placeholderImg" alt="" class="cursor-pointer w-16 rounded-md" />
          <p v-if="!item.image" class="text-sm text-center">Görsel seçilmedi...</p>
          <NuxtImg v-else :src="'aws/' + item?.image?.path" width="42px" class="rounded-md" />
        </div>
      </div>

      <UiFormInput v-model="item.stockCode" placeholder="Stok kodu"></UiFormInput>
      <UiFormInput v-model="item.price" placeholder="Normal fiyat"></UiFormInput>
      <UiFormInput v-model="item.sale_price" placeholder="İndirimli fiyat"></UiFormInput>
      <UiFormInput v-model="item.coast" placeholder="Maliyet"></UiFormInput>

      <div class="grid gap-4">
        <UiFormCheckbox v-model="item.isStockManagement" :id="item.id" name="stock" :value="true">Stok yönetimini
          etkinleştir</UiFormCheckbox>
        <div v-show="item.isStockManagement">
          <UiFormInput placeholder="Stok miktarı"></UiFormInput>
        </div>
      </div>
    </div>
  </UiAccordion>
</template>

<script setup>
const variationState = useStateIndex().useVariationState();
const { item } = defineProps(["item"]);
const placeholderImg = "/img-placeholder.jpg";
const isOpen = ref(false);
</script>
