<template>
    <div class="flex items-center space-x-2 overflow-hidden">
        <UButton @click="props.cartItem.qyt != 1 && props.cartItem.qyt--" icon="i-heroicons-minus" size="2xs"
            color="gray" square :ui="{ rounded: 'rounded-full' }" variant="solid" />
        <Transition name="slide-up" mode="out-in">
            <p class="text-sm" :key="props.cartItem.qyt">{{ props.cartItem.qyt }} Ad.</p>
        </Transition>

        <UButton @click="props.cartItem.qyt++" icon="i-heroicons-plus" size="2xs" color="gray" square
            :ui="{ rounded: 'rounded-full' }" variant="solid" />
    </div>
</template>

<script setup>
const props = defineProps(['cartItem'])
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
}</style>