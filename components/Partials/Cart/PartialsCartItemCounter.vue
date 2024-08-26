<template>
  <div class="flex items-center space-x-2 overflow-hidden bg-white">
    <UButton :loading="loadingMinus" :disabled="loadingMinus" @click="props.cartItem.qyt != 1 && decrease()"
      icon="i-heroicons-minus" size="2xs" color="gray" square :ui="{ rounded: 'rounded-full' }" variant="solid" />
    <Transition name="slide-up" mode="out-in">
      <p class="text-sm" :key="props.cartItem.qyt">{{ props.cartItem.qyt }} Ad.</p>
    </Transition>

    <UButton :loading="loadingPlus" :disabled="loadingPlus" @click="increase()"
      icon="i-heroicons-plus" size="2xs" color="gray" square :ui="{ rounded: 'rounded-full' }" variant="solid" />
  </div>
</template>

<script setup>
const props = defineProps(["cartItem"]);
const cartState = useCartState();
const loadingPlus = ref(false)
const loadingMinus = ref(false)

const increase = async () => {
  loadingPlus.value = true
  await cartState.patchCart(props.cartItem, +1)
  loadingPlus.value = false

}

const decrease = async () => {
  loadingMinus.value = true
  await cartState.patchCart(props.cartItem, -1)
  loadingMinus.value = false

}

</script>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
