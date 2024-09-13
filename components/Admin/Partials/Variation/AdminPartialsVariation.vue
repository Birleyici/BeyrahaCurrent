<template>
  <UAccordion :items="[{ data: item, slot: 'attr-content' }]" :ui="{ wrapper: 'flex flex-col w-full' }">
    <template #default="{ item, index, open }">
      <UButton color="gray" variant="ghost"
        class="bg-slate-100 text-md flex justify-between rounded-md border-b border-gray-200 dark:border-gray-700"
        :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">

        <template #trailing>
          <div class="flex text-sm ">
            <p class="px-2  border-r last:border-r-0 !font-normal" v-for="term in item.data.terms">
              {{ term.term_name }}
            </p>
          </div>
          <div class="flex items-center">

            <UButton icon="i-heroicons-trash" color="red" variant="ghost"
              @click.prevent="variationState.deleteVariation(item.data)" :loading="item.data.loading" />

            <UIcon name="i-heroicons-chevron-right-20-solid ml-4 "
              class="w-5 h-5 transform transition-transform duration-200" :class="[open && 'rotate-90']" />
          </div>
        </template>
      </UButton>
    </template>

    <template #attr-content>
      <div class="grid lg:grid-cols-2 gap-4 bg-white border rounded-md p-minimal">
        <div class="inline-block col-span-2">
          <div class="bg-tertiary-50 border p-2 rounded-md flex space-x-2 items-center">
            <img @click="isOpen = true" :src="placeholderImg" alt="" class="cursor-pointer w-16 rounded-md" />
            <p v-if="!item.image" class="text-sm text-center">Görsel seçilmedi...</p>
            <NuxtImg v-else :src="'aws' + item?.image?.path" width="42px" class="rounded-md" />
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
    </template>
  </UAccordion>


</template>

<script setup>
const variationState = useVariationState()
const { item } = defineProps(["item"]);
const placeholderImg = "/img-placeholder.jpg";
const isOpen = ref(false);
</script>
