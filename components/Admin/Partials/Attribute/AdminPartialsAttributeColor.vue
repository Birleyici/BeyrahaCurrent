<template>
  <div>
 
    <UAccordion :items="[{ label: props.item.attribute_name, slot: 'attr-content' }]"
      :ui="{ wrapper: 'flex flex-col w-full' }">
      <template #default="{ item, index, open }">

        <UButton color="gray" variant="ghost"
          class="bg-slate-100 text-md flex justify-between rounded-md border-b border-gray-200 dark:border-gray-700"
          :ui="{ rounded: 'rounded-none', padding: { sm: 'p-3' } }">

          <span class="truncate ">{{ item.label }}</span>

          <template #trailing>
            <div class="flex items-center">
              <UIcon name="i-heroicons-trash" class="text-red-500" @click.prevent="deleteAttr(props.item.product_attribute_id)">
              </UIcon>
              <UIcon name="i-heroicons-chevron-right-20-solid ml-4 "
                class="w-5 h-5  transform transition-transform duration-200 " :class="[open && 'rotate-90']" />
            </div>
          </template>
        </UButton>
      </template>

      <template #attr-content>


        <div class="border p-minimal rounded-md">

          <div class="flex space-x-12 bg-white">
            <UiFormInput @keydown.enter="addTerm(item)" placeholder="Nitelik terimi" v-model="props.item.termWord">
            </UiFormInput>
            <UiButtonsBaseButton @click="addTerm(item)" color="secondary">Ekle</UiButtonsBaseButton>
          </div>

          
          <div class="grid mt-4">
            <div>
              <p class="text-sm font-medium mb-2" v-if="props.item.product_attribute_terms.length > 0">
                Nitelik terimleri:
              </p>

              <div class="grid">
                <div v-for="term in props.item.product_attribute_terms">
                  <AdminPartialsAttributeColorTerm :term="term" :terms="props.item.product_attribute_terms" />
                </div>
              </div>
            </div>
           
          </div>


          <UiFormCheckbox class="mt-4" v-model="props.item.useForVariation" :value="true" :id="props.item.attribute_id">
            Varyasyonlar
            için
            kullan</UiFormCheckbox>
          <UiFormCheckbox class="mt-1" v-model="props.item.showProductPage" :value="true"
            :id="props.item.attribute_id + Math.floor(Math.random() * 10)">Ürün sayfasında göster</UiFormCheckbox>
        </div>
      </template>
    </UAccordion>
  </div>
</template>

<script setup>
const props = defineProps(['item'])
const isOpenMediaModal = ref(false);

const {
  deleteAttr,
  addTerm,
  removeTerm

} = useAttributes()



</script>
