<template>
  <div>
    <div class="lg:flex lg:justify-between items-center relative p-2 border rounded-md lg:!rounded-l-full">
      <!-- <UButton v-if="props.deletable && props.editingMode" class="absolute -right-2 -top-2" size="2xs" icon="i-heroicons-x-mark" :ui="{ rounded: 'rounded-full' }"
        @click="deleteCartItem(props.item.id)" /> -->
      <div class="flex space-x-8">
        <NuxtImg v-if="props.item.image?.path" :src="'aws' + props.item.image?.path"
          class="w-20 h-20 object-cover  object-top rounded-md lg:rounded-full" />
        <img class="w-20 h-20 rounded-full" src="/img-placeholder.jpg" v-else>
        <div class="text-left">
          <NuxtLink :to="props.item.slug" class="font-medium">{{ props.item.product_name }}</NuxtLink>
          <div v-for="(value, key) in props.item.variation?.terms" :key="key">
            <div class="flex space-x-2 items-center text-sm">
              <p class="font-medium">{{ key }} :</p>
              <p>{{ value }}</p>
            </div>
          </div>

          <div v-for="input in props.item.order_item_inputs" :key="input.id">
            <div class="flex space-x-2 items-center text-sm">
              <p class="font-medium">{{ input.label }} :</p>
              <p v-if="!props.editingMode">{{ input.value }}</p>
              <div v-else class="flex space-x-2">
                <UInput v-model="input.new_value" :model-value="input.new_value || input.value" size="xs" />
                <UButton :loading="input.loading" icon="i-heroicons-check" @click="orderStore.saveInput(input)" size="xs" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-between lg:space-x-12 border-t mt-2 pt-2 lg:p-0 lg:m-0 lg:border-none">
        <div>
          <p class="text-sm">Birim fiyat</p>
          <div class="flex space-x-2">
            <PartialsProductPrice :del-price="false" type="card" :price="props.item.variation?.price || props.item.price" :sale-price="props.item.variation?.sale_price || props.item.sale_price" />
            <p>x {{ props.item.quantity }}</p>
          </div>
        </div>
        <div>
          <p class="text-sm">Toplam</p>
          <p class="font-medium text-secondary-500">{{ formatPrice(props.item.price * props.item.quantity) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const orderStore = useOrderManagementStore()
const props = defineProps(['item', 'deletable', 'editingMode'])
const deleteCartItem = async (itemId) => {
  if (await useConfirmation("İşlem Onayı", "Sipariş öğesini silmek istediğinize emin misiniz?")) {
    await orderStore.deleteSubOrderItem(itemId)
  }

}
</script>
