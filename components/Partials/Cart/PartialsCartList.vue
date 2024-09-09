<template>
  <div class="my-2 border rounded-md p-1 last:border-b-0 border-dashed">
    <div class="flex space-x-4">
      <!-- Product Image -->
      <NuxtImg v-if="props.item.image_path" width="80" height="120" fit="cover" class="object-cover rounded-md"
        :src="`aws/${props.item.image_path}`" />
      <img class="w-[70px] h-[70px] rounded-md" src="/img-placeholder.jpg" v-else>
      <div class="w-full">
        <!-- Product Name and Delete Button -->
        <div class="flex items-start space-x-2 justify-between w-full">
          <p class="text-sm font-medium">
            {{ props.item.product_name }}
          </p>
          <UButton :disabled="loading" :loading="loading" @click="deleteHandle()" icon="i-heroicons-x-mark" size="xs"
            color="red" square :ui="{ rounded: 'rounded-full' }" variant="soft" />
        </div>

        <!-- Display Variation Attributes -->
        <div v-if="props.item.variation">
          <div v-for="(value, key) in props.item.variation.attributes" :key="key"
            class="text-sm flex space-x-2 items-center">
            <p class="font-medium">{{ key }} :</p>
            <p>{{ value }}</p>
          </div>
        </div>
        <template v-if="props.item.input_value?.label">
          <div class="flex space-x-2 items-center text-sm">
            <p class="font-medium">{{ props.item.input_value.label }}:</p>
            <p>{{ props.item.input_value.value?.length > 10 ? props.item.input_value.value.substring(0, 10) + '...' :
              props.item.input_value.value }}</p>
          </div>
        </template>
      </div>
    </div>
    <div class="flex items-center space-x-2 justify-between mt-2">
      <div>
        <PartialsProductPrice type="card" :sale-price="props.item.variation?.sale_price || props.item.sale_price"
          :price="props.item.variation?.price || props.item.price" />
      </div>
      <PartialsCartItemCounter :cart-item="props.item" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['item'])
const cartState = useCartState()

const loading = ref(false)

const deleteHandle = async () => {
  loading.value = true
  await cartState.deleteCartItem(props.item)
  loading.value = false
}
</script>
