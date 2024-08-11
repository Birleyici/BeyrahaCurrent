<template>
  <div>
    <div class="lg:flex lg:justify-between items-center  p-2 border rounded-md lg:!rounded-l-full">
      <div class="flex space-x-8">
        <NuxtImg :src="'aws' + props.item.image.path"
          class="w-20 h-20 object-cover  object-top rounded-md lg:rounded-full" />
        <div>
          <p class="font-medium">{{ props.item.product_name }}</p>
          <div v-for="(value, key) in props.item.variation.terms">

            <div class="flex space-x-2 items-center">
              <b>{{ key }} :</b>
              <p>{{ value }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-between lg:space-x-12 border-t mt-2 pt-2 lg:p-0 lg:m-0 lg:border-none">
        <div>
          <p class="text-sm">Birim fiyat</p>
          <div class="flex space-x-2">
            <p class="text-secondary-500">{{ formatPrice(props.item.price) }}</p>
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
const props = defineProps(['item'])
</script>
