<template>
  <div
    class="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 shadow-sm hover:shadow-md dark:hover:shadow-lg transition-shadow duration-200 relative z-1">
    <div class="flex space-x-4">
      <!-- Product Image -->
      <div class="flex-shrink-0">
        <NuxtLink v-if="props.item.image_path" :to="props.item.product_url" class="block">
          <NuxtImg width="80" height="80" fit="cover"
            class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-neutral-200 dark:border-neutral-600"
            :src="`cl/${props.item.image_path}`" />
        </NuxtLink>
        <div v-else
          class="w-16 h-16 sm:w-20 sm:h-20 bg-neutral-100 dark:bg-neutral-700 rounded-lg border border-neutral-200 dark:border-neutral-600 flex items-center justify-center">
          <UIcon name="i-heroicons-photo" class="w-6 h-6 sm:w-8 sm:h-8 text-neutral-400 dark:text-neutral-500" />
        </div>
      </div>

      <!-- Product Details -->
      <div class="flex-1 space-y-3">
        <!-- Product Name and Delete Button -->
        <div class="flex items-start justify-between mb-2">
          <NuxtLink :to="props.item.product_url"
            class="text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors duration-200 line-clamp-2 pr-2 flex-1">
            {{ props.item.product_name }}
          </NuxtLink>

          <UButton :disabled="loading" :loading="loading" @click="deleteHandle()" icon="i-heroicons-trash" size="xs"
            color="red" variant="ghost" class="flex-shrink-0 hover:bg-red-50 dark:hover:bg-red-900/20 ml-2" />
        </div>

        <!-- Variation Attributes -->
        <div v-if="props.item.variation" class="space-y-1 mb-2">
          <div v-for="(value, key) in props.item.variation.attributes" :key="key"
            class="flex items-center space-x-2 text-xs">
            <span class="font-medium text-neutral-600 dark:text-neutral-400">{{ key }}:</span>
            <span
              class="text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-700 px-2 py-0.5 rounded-full">{{
              value }}</span>
          </div>
        </div>

        <!-- Custom Input Value -->
        <div v-if="props.item.input_value?.label" class="mb-2">
          <div class="flex items-center space-x-2 text-xs">
            <span class="font-medium text-neutral-600 dark:text-neutral-400">{{ props.item.input_value.label }}:</span>
            <span
              class="text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-700 px-2 py-0.5 rounded-full">
              {{ props.item.input_value.value?.length > 15 ? props.item.input_value.value.substring(0, 15) + '...' :
                props.item.input_value.value }}
            </span>
          </div>
        </div>

        <!-- Price and Counter -->
        <div class="mt-auto space-y-2">
          <div class="flex">
            <PartialsProductPrice type="card" :sale-price="props.item.variation?.sale_price || props.item.sale_price"
              :price="props.item.variation?.price || props.item.price" />
          </div>

          <div class="flex">
            <PartialsCartItemCounter :cart-item="props.item" />
          </div>
        </div>
      </div>
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

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
