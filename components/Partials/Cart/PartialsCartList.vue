<template>
  <div class="py-4 first:!pt-0 border-b last:border-b-0 border-dashed">
    <div class="flex space-x-4">
      <!-- Product Image -->
      <NuxtImg width="70" class="object-cover rounded-md" :src="`aws/${props.item.product_thumb.path}`" />

      <div class="w-full">
        <!-- Product Name and Delete Button -->
        <div class="flex items-start space-x-2 justify-between w-full">
          <p class="text-sm font-medium">
            {{ props.item.product_name }}
          </p>
          <UButton 
            :disabled="loading" 
            :loading="loading" 
            @click="deleteHandle()" 
            icon="i-heroicons-x-mark" 
            size="xs" 
            color="red" 
            square 
            :ui="{ rounded: 'rounded-full' }" 
            variant="soft" 
          />
        </div>

        <!-- Display Variation Attributes -->
        <div v-if="props.item.variation">
          <div v-for="(value, key) in props.item.variation.attributes" :key="key" class="flex space-x-2 items-center">
            <b>{{ key }} :</b>
            <p>{{ value }}</p>
          </div>
        </div>

        <!-- Product Price and Counter -->
        <div class="flex items-center space-x-2 justify-between mt-2">
          <p class="text-orange-500 font-medium">
            {{ formatPrice(props.item.variation?.price || props.item.price) }} TL
          </p>
          <PartialsCartItemCounter :cart-item="props.item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['item'])
const { useCartState } = useStateIndex()
const cartState = useCartState()

const loading = ref(false)

const deleteHandle = async () => {
  loading.value = true
  await cartState.deleteCartItem(props.item)
  loading.value = false
}
</script>
