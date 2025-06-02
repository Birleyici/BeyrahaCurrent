<template>
  <div class="flex items-center bg-neutral-50 rounded-full border border-neutral-200 p-1 min-w-0">
    <!-- Azalt Butonu -->
    <button :disabled="loadingMinus || props.cartItem.qyt <= 1" @click="props.cartItem.qyt > 1 && decrease()"
      class="w-7 h-7 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0">
      <UIcon v-if="!loadingMinus" name="i-heroicons-minus" class="w-3 h-3 text-neutral-600" />
      <UIcon v-else name="i-heroicons-arrow-path" class="w-3 h-3 text-neutral-600 animate-spin" />
    </button>

    <!-- Miktar -->
    <div class="px-2 min-w-[40px] flex justify-center">
      <Transition name="slide-up" mode="out-in">
        <span class="text-sm font-medium text-neutral-900 whitespace-nowrap" :key="props.cartItem.qyt">
          {{ props.cartItem.qyt }}
        </span>
      </Transition>
    </div>

    <!-- Artır Butonu -->
    <button :disabled="loadingPlus" @click="increase()"
      class="w-7 h-7 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0">
      <UIcon v-if="!loadingPlus" name="i-heroicons-plus" class="w-3 h-3 text-neutral-600" />
      <UIcon v-else name="i-heroicons-arrow-path" class="w-3 h-3 text-neutral-600 animate-spin" />
    </button>
  </div>
</template>

<script setup>
const props = defineProps(["cartItem"]);
const cartState = useCartState();
const loadingPlus = ref(false)
const loadingMinus = ref(false)

const increase = async () => {
  loadingPlus.value = true
  await cartState.patchCart(props.cartItem, +1, false).finally(() => {
    loadingPlus.value = false
  })
}

const decrease = async () => {
  loadingMinus.value = true
  await cartState.patchCart(props.cartItem, -1, false).finally(() => {
    loadingMinus.value = false
  })
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
