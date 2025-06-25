<template>
  <div class="grid gap-4">

    <AdminPartialsProductInputAddModal v-model="isOpenAddIpnutModal" :product="productState.product" />

    <div class="grid grid-cols-3 gap-6">
      <UButton class="justify-center" @click="isOpenAddIpnutModal = true" icon="i-heroicons-plus" size="sm"
        color="orange" variant="outline" label="Yeni özel alan" :trailing="false" />
      <div class="col-span-2" v-if="productState.product.vendor_inputs.length > 0">
        <USelectMenu color="orange" v-model="productState.product.selectedInput" searchable
          searchable-placeholder="Bir özel alan seçin..." class="w-full" placeholder="Bir özel alan seçin"
          :options="productState.product.vendor_inputs" option-attribute="label"
          :search-attributes="['label', 'placeholder', 'description']" />
      </div>
    </div>
    <hr />
    <div v-if="productState.product.selectedInput">
      <b class="font-medium">Seçilen özel alan:</b>
      <p>{{ productState.product.selectedInput.label }}</p>
      <div class="flex space-x-2">
        <UButton class="p-0" color="orange" variant="link">Düzenle</UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
const productState = useProductState();
const isOpenAddIpnutModal = ref(false);
</script>
