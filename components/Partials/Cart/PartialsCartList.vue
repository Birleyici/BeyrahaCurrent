<template>
  <div class="py-4 first:!pt-0 border-b last:border-b-0 border-dashed">
    <div class=" flex space-x-4">

      <NuxtImg width="70" class="object-cover rounded-md" :src="`aws/${props.item.product_thumb.path}`"></NuxtImg>
      <div class="w-full">
        <div class="flex items-start space-x-2 justify-between w-full">
          <p class="text-sm font-medium">
            {{ props.item.product_name }}
          </p>
          <UButton @click="deleteCartItem()" icon="i-heroicons-x-mark" size="2xs" color="red" square
            :ui="{ rounded: 'rounded-full' }" variant="soft" />
        </div>
        <div v-for="(value, key) in props.item.variation.attributes">

          <div class="flex space-x-2 items-center">
            <b>{{ key }} :</b>
            <p>{{ value }}</p>
          </div>
        </div>

        <div class="flex items-center space-x-2 justify-between">
          <p class="text-orange-500 font-medium">₺{{ props.item.variation.price }}</p>
          
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

const deleteCartItem = () => {

  cartState.deleteCartItem(props.item)

}
</script>